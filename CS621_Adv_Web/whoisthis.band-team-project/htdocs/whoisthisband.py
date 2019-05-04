#!/usr/bin/python  
# whoisthis.band - whoisthisband.py 
# Caleb Farris, Matthew Jackson 
# David Parsons, Dongho Jeon 
# 08-10-17

from flask import Flask, render_template, request, Response
from flask import jsonify, abort, make_response, url_for, redirect
from flask.ext.httpauth import HTTPBasicAuth
from collections import OrderedDict
from tweepy.api import API
import json, sys, pprint, hashlib, time
import spotipy, tweepy
import spotipy.util as util
from dbfunctions import *
import requests
from spotipy.oauth2 import SpotifyClientCredentials

app = Flask(__name__)
basic_auth = HTTPBasicAuth()

#---------------------------------CLASSES--------------------------------------

# -----------------------------------------------------------------------------
#                              STREAMLISTENER()
#                                                         
# Listens for 'tweet_limit' # of tweets, and determines popularity of the band 
# based on how quickly the band receives tweets.  The algorithm can be adjusted
# in tune with the tweet_limit, or even removed if the goal is to simply gather
# tweets.
# 
#------------------------------------------------------------------------------
class StreamListener(tweepy.StreamListener):
    def __init__(self, api=None):
        self.api = api or API()
        self.current_time = time.monotonic()
        self.count = 0
        self.limit = 1
        self.tweets = []
        self.dict = {} 
        self.output = open(sys.path[0] + 'tweets.txt', 'w')    
    
    # Whenever a status update arrives, the tweet is saved until it reaches
    # the designated limit, upon which the tweets are written to file.  For 
    # the purposes of this project, only one will be written, along with the
    # popularity of the band.  The rest of the tweets to be displayed will be
    # gathered statically.
    def on_status(self, status):
        self.dict = {   
                        'tweet': status.text.replace('\n', ' '), 
                        'screen_name' : status.user.screen_name, 
                        'profile_image' : status.user.profile_image_url,
                        'id_str' : status.id_str
                    } 
        self.tweets.append(self.dict)
        self.count += 1 
        if self.count < self.limit:
            return True
        else:
            #consider changing algorithm if tweet_limit is increased
            elapsed = self.get_current_time()
            popularity = pop_algorithm(elapsed)
            self.dict.update({'popularity':  popularity})
            for t in self.tweets:
                json.dump(t, self.output)
            self.output.close()
            return False

    def on_error(self, status_code):
        print(status_code)
        return False

    # Helper function to determine elapsed time since stream creation
    def get_current_time(self):
        return time.monotonic() - self.current_time

#-------------------------------END_CLASSES------------------------------------


#-------------------------------TWITTER_AUTH-----------------------------------

with open('info/twitter.txt') as f:
    CONSUMER_KEY = f.readline().strip()
    CONSUMER_SECRET = f.readline().strip()
    ACCESS_TOKEN = f.readline().strip()
    ACCESS_SECRET = f.readline().strip()

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_SECRET)
api = tweepy.API(auth)

#-----------------------------END_TWITTER_AUTH---------------------------------


#-------------------------------SPOTIFY_AUTH-----------------------------------

with open('info/spotipy.txt') as f:
    CLIENT_ID = f.readline().strip()
    CLIENT_SECRET = f.readline().strip()

client_credentials_manager = SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

#-----------------------------END_SPOTIFY_AUTH---------------------------------


#-------------------------------MAIN_ROUTES------------------------------------

@app.route("/")
@app.route("/index")
def index():
    return render_template('index.html')

# This route occurs whenever the user chooses to sign in, or whenever the user
# finishes creating an account
@app.route('/search', methods=['GET'])
@basic_auth.login_required
def search():
    return render_template('search.html', user=basic_auth.username())

# Renders the html for the signup page - a simple route
@app.route('/signup')
def signup():
    return render_template('signup.html')

# This route handles user login.  If the login name is already taken, then the
# signup page is rerendered.  Otherwise, a new user is created in the DB and 
# the route is redirected to /search
@app.route('/login', methods=['POST'])
def login():
    _username = request.form['username']
    _password = request.form['password']

    if checkLogin(_username):
        return render_template('signup.html', login_taken=True)
    elif _username is "" or _password is "":
        return render_template('signup.html', empty_fields=True)
    else:
        createUser(_username, createPassword(_password))
        return redirect('/search')

# This is the route that either takes in the data from the search, creates a 
# new view, and displays it; or displays the results of a single view via a 
# GET request - these requests would be coming from the table on the 
# /views page. 
@app.route('/results/<int:view_id>', methods=['POST', 'GET'])
def results(view_id):
    if request.method == 'POST':
        artist = request.form['inputVal']
        search_results = sp.search(q='artist:' + artist, type='artist')
        if search_results['artists']['total'] is 0 or artist is "":
            return render_template('search.html', 
                                    flag=True, user=basic_auth.username())
        else:
            # First, create the other 4 fields needed for createView
            # as artist has already been created
            user_id = getUserId(basic_auth.username())
            tracks = get_tracks_from_spotify(artist, search_results)
            tweets = get_tweets_from_twitter_static(artist)
            streamed_tweet = get_tweets_from_twitter_stream(artist)
            tweets.append(parse_tweet(streamed_tweet))
            popularity = streamed_tweet['popularity']
            
            # Performs a separate set of GET requests, which gather html for 
            # the embedded tweets
            embeds = get_embedded_tweets(tweets)
            
            # Creates the view in DB and returns view_id          
            view_id = createView(artist, popularity, user_id, tweets, tracks)
            return render_template('results.html', 
                                results=getSingleView(view_id), embeds=embeds)
    else:
        # Reaching this point means a GET request has occured from /views
        view = getSingleView(view_id)
        tweets = view['tweets']
        embeds = get_embedded_tweets(tweets)
        return render_template('results.html', results=view, embeds=embeds)

# This route will display all current views in the user's account
@app.route('/views', methods=['GET'])
def userViews():
    user_id = getUserId(basic_auth.username())
    views = getViews(user_id)
    return render_template('views.html', views=views, user=basic_auth.username())

# *API* This route will provide the popularity scores based on the username and
# artist name.  If the user currently has views by this artist, the method
# responds with a list of artists and their popularities, in JSON format.
@app.route('/whoisthisband/api/v1.0/<username>/<artist>', methods = ['GET'])
@basic_auth.login_required
def get_popularity(username, artist):
    view_ids = getViewIdsByArtist(username, artist)
    
    if view_ids:
        view_metadata = getViewMetadata(view_ids)
    
    resp = json.JSONEncoder().encode(
        {  
            "popularities": 
            { 
                "views" : view_metadata, 
                "user"  : username 
            }
        })

    return Response(resp.encode(), status=200, mimetype='application/json')

# *API* This route will provide all of the users views
@app.route('/whoisthisband/api/v1.0/<username>/views', methods = ['GET'])
@basic_auth.login_required
def get_user_views(username):
    user_id = getUserId(username)
    views = getViews(user_id)

    resp = json.JSONEncoder().encode(views)

    return Response(resp.encode(), status=200, mimetype='application/json')

#-----------------------------END_MAIN_ROUTES----------------------------------


#--------------------------------AUTH_INFO-------------------------------------

@basic_auth.get_password
def get_password(username):
    dbPwd = getPwd(username)
    return dbPwd

@basic_auth.hash_password
def hash_pw(password):
    pwd = hashlib.sha512(str.encode(password)).hexdigest()
    return pwd

@basic_auth.error_handler
def unauthorized():
    return make_response(jsonify( { 'error': 'Unauthorized access' } ), 401)
    # return 403 instead of 401 to prevent browsers from displaying the default
    # auth dialog

#------------------------------END_AUTH_INFO-----------------------------------


#-----------------------------ERROR_HANDLING-----------------------------------

@app.errorhandler(400)
def not_found(error):
    return make_response(jsonify( { 'error': 'Bad request' } ), 400)
 
@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify( { 'error': 'Not found' } ), 404)

#---------------------------END_ERROR_HANDLING---------------------------------


#--------------------------------FUNCTIONS-------------------------------------

# Returns a list of dictionaries of the tracks and relevant info
def get_tracks_from_spotify(artist, search_results):
    artist_uri = search_results['artists']['items'][0]['uri'] 
    top_tracks = sp.artist_top_tracks(artist_uri)
    tracks = []
    for t in top_tracks['tracks'][:3]:
        track = {   
                    'track': t['name'], 
                    'album': t['album']['name'] , 
                    'cover_art': t['album']['images'][0]['url'], 
                    'preview_url':  t['preview_url']
                }
        tracks.append(track)

    return tracks

# Returns a list of dicts of the tweets.  This method will connect to 
# the twitter API to search statically for tweets.
def get_tweets_from_twitter_static(artist):
    tweets_search = api.search(q=artist, lang= 'en', count=2)
    tweets = []
    for t in tweets_search:    
        tweet = {   
                    'tweet': t.text.replace('\n', ' '), 
                    'screen_name' : t.user.screen_name, 
                    'profile_image' : t.user.profile_image_url,
                    'id_str' : t.id_str
                }
        tweets.append(tweet)

    return tweets

# Starts a twitter stream, writes the first tweet that comes in to
# file, closes the stream, then returns the tweet.  The popularity is
# also written to file and must be extracted separately
def get_tweets_from_twitter_stream(artist):
    streamListener = StreamListener()
    stream = tweepy.Stream(auth = api.auth, listener=streamListener)
    stream.filter(track=[artist])

    with open('tweets.txt') as f:
        tweet = json.load(f)

    return tweet

# Due to the nature of how the streaming tweet is loaded to file, this method
# is needed to abstract the tweet information, minus the 'popularity'
def parse_tweet(tweet):
    return  {  
                'tweet': tweet['tweet'], 
                'screen_name' : tweet['screen_name'], 
                'profile_image' : tweet['profile_image'],
                'id_str' : tweet['id_str']
            }

# Determines popularity of a band based on the elapsed time.  This algroithm
# can be changed to suit the situation.
def pop_algorithm(time):

    # Variables make the algorithm easier to change and helps to avoid using
    # magic numbers in the following if-else clause
    a_ceiling = 1.5
    a_middle = 3.0
    a_floor = 5.0
    b_ceiling = 7.0
    b_middle = 9.0
    b_floor = 12.5
    c_ceiling = 16.0
    c_middle = 20.5
    c_floor = 25.0
    d_floor = 30.0

    if time < a_ceiling:
        return 'A+'
    elif a_ceiling < time < a_middle:
        return 'A'
    elif a_middle < time < a_floor:
        return 'A-'
    elif a_floor < time < b_ceiling:
        return 'B+'
    elif b_ceiling < time < b_middle:
        return 'B'
    elif b_middle < time < b_floor:
        return 'B-'
    elif b_floor < time < c_ceiling:
        return 'C+'
    elif c_ceiling < time < c_middle:
        return 'C'
    elif c_middle < time < c_floor:
        return 'C-'
    elif c_floor < time < d_floor:
        return 'D'
    else:
        return 'F'

# This performs the actual GET request w/ Twitter's status Oembed API
def embed_tweet(id_str):
    headers = {'Content-Type': 'application/json'}
    url = 'https://publish.twitter.com/oembed?url=https://twitter.com/Interior/status/' + id_str

    resp = requests.get(url, headers=headers)
    res = json.loads(resp.text)
    return res

# This performs a GET request on each separate tweet in 'tweets' in order to 
# gather html that can be embedded on the page results.html
def get_embedded_tweets(tweets):
    embedded = []
    for tweet in tweets:
        embed = embed_tweet(tweet['id_str'])
        html = embed['html']
        embedded.append(html)

    return embedded

#------------------------------END_FUNCTIONS-----------------------------------

# used for debugging in development only!  NOT for production!!!
if __name__ == "__main__":
    #app.debug = True
    app.run(host='0.0.0.0', port=8080)
