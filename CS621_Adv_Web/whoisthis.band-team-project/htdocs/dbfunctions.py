# whoisthis.band - reset.css 
# Caleb Farris, Matthew Jackson 
# David Parsons, Dongho Jeon 
# 
# Connect to the database.

import sys
import pymysql
import datetime
import hashlib
from collections import OrderedDict

def makeConnection():
    file = open(sys.path[0]+"/info/dbconfig.txt", "r")   
    dbStr = file.readline().strip() 
    userStr = file.readline().strip() 
    passwdStr = file.readline().strip() 
    hostStr = file.readline().strip() 

    conn = pymysql.connect(
        db=dbStr,
        user=userStr,
        passwd=passwdStr,
        host=hostStr,
        use_unicode=True,
        charset="utf8mb4")	 

    return conn

def createFields(cursor, viewId, tweets, tracks):
    for tweet in tweets:
        cursor.execute("CALL create_tweet(%s, %s, %s, %s, %s) ;", 
            (   
                tweet["tweet"], 
                tweet["screen_name"], 
                tweet["profile_image"],
                tweet["id_str"], 
                viewId
            ))
    for track in tracks:
        cursor.execute("CALL create_track(%s, %s, %s, %s, %s) ;", 
            (   
                track["track"],
                track["album"],
                track["cover_art"],
                track["preview_url"],
                viewId
            ))    

# for ease of use, this method also returns the viewId that was just created
def createView(artistName, popularity, userId, tweets, tracks):
    conn = makeConnection()
    c = conn.cursor()

    c.execute("CALL create_view(%s, %s, %s) ;", (artistName, popularity, userId))
    (viewId,) = c.fetchone()

    createFields(c, viewId, tweets, tracks)

    conn.commit()
    conn.close()

    return viewId

def getViewMetadata(viewIds):
    conn = makeConnection()
    c = conn.cursor()

    viewMetadata = []
    for viewId in viewIds:
        c.execute("CALL get_single_view(%s) ;", (viewId,))
        (artist, popularity, CUDDate) = c.fetchone()
        date = convertDatetime(CUDDate)
        viewMetadata.append(
            {   
                "artist" : artist,
                "popularity" : popularity, 
                "date" : date
            })

    conn.close()

    return viewMetadata

def getTweets(cursor, viewId):
    cursor.execute("CALL get_tweets(%s) ;", (viewId,))
    rows = cursor.fetchall()

    tweets = []
    for i, (tweet, screen_name, profile_image, id_str) in enumerate(rows):
        tweets.append( 
            {   
                "tweet": tweet, 
                "screen_name" : screen_name, 
                "profile_image" : profile_image,
                "id_str" : id_str
            })

    return tweets

def getTracks(cursor, viewId):
    cursor.execute("CALL get_tracks(%s) ;", (viewId,))
    rows = cursor.fetchall()

    tracks = []
    for i, (track, album, cover_art, preview_url) in enumerate(rows):
        tracks.append(
            { 
                "track":track, 
                "album":album, 
                "cover_art":cover_art, 
                "preview_url":preview_url
            })

    return tracks

def getViews(userId):
    conn = makeConnection()
    c = conn.cursor()

    c.execute("CALL get_views(%s) ;", (userId,))
    rows = c.fetchall()

    views = {}
    list_of_views = []
    for i, (viewId, artistName, popularity, CUDDate) in enumerate(rows):
        date = convertDatetime(CUDDate)
        view =  {   
                    "viewId" : viewId, 
                    "artistName" : artistName, 
                    "popularity" : popularity, 
                    "date" : date,
                    "tweets" : getTweets(c, viewId),
                    "tracks" : getTracks(c, viewId) 
                }
        list_of_views.append(view)

    views["views"] = list_of_views

    conn.close()
    return views

def getSingleView(viewId):
    conn = makeConnection()
    c = conn.cursor()

    c.execute("CALL get_single_view(%s) ;", (viewId,))
    (artist, popularity, CUDDate) = c.fetchone()

    date = convertDatetime(CUDDate)

    view =  {   
                "artist" : artist, 
                "popularity" : popularity, 
                "date" : date, 
                "tweets" : getTweets(c, viewId),
                "tracks" : getTracks(c, viewId)
            }
    
    conn.close()
    return view

def getPwd(login):
    conn = makeConnection()
    c = conn.cursor()

    #print("login: %s" %login)
    rows_count = c.execute("Call get_userPwd(%s) ;" ,  (login,))
    if rows_count > 0:
        rs = c.fetchall()
        #print("rs = %s" % rs)
        for i, r in enumerate(rs):
            pwd = r[0]
    else:
        pwd = None

    conn.close()		
    return pwd

def getUsername(userId):
    conn = makeConnection()
    c = conn.cursor()

    c.execute("SELECT login FROM users WHERE userId=%s ;", (userId,))
    (username,) = c.fetchone()

    conn.close()
    return username

def getUserId(username):
    conn = makeConnection()
    c = conn.cursor()

    c.execute("SELECT userId FROM users WHERE login=%s ;", (username,))
    (userId,) = c.fetchone()

    conn.close()
    return userId

# Mainly a utility function for eventually getting the popularity.  It is 
# possible that a list is returned instead of just a single viewId.  In 
# that case, there are multiple views with the given artist name.  As such, 
# the whole list of viewIds will be returned.
def getViewIdsByArtist(username, artist):
    conn = makeConnection()
    c = conn.cursor()

    viewIds = []
    userId = getUserId(username)
    if userId:
        c.execute("SELECT viewId FROM views WHERE userId=%s and artistName=%s ;", 
                    (userId, artist))
        rows = c.fetchall()

        if rows:
            for i, viewId in enumerate(rows):
                viewIds.append(viewId)

    conn.close()
    return viewIds

# Simply checks to see if the login username has already been taken or not
def checkLogin(login):
    conn = makeConnection()
    c = conn.cursor()

    c.execute("SELECT login FROM users WHERE login=%s ;", (login,))
    row = c.fetchone()
    flag = False

    if row:
        flag = True

    conn.close()

    return flag

# Creates the user with name 'login' and password 'pwd'.  Returns the login name
# for convenience
def createUser(login, pwd):
    conn = makeConnection()
    c = conn.cursor()

    c.execute("INSERT INTO users (login, pwd, CUDAction) values (%s, %s, 1) ;",
                (login, pwd))

    conn.commit()
    conn.close()
    return login

# Recreating the password hashing from lab, and returning the hashed password
def createPassword(password):
    pwd = password
    hashPwd = hashlib.sha512(str.encode(pwd))
    hexStr = hashPwd.hexdigest()
    return hexStr

def convertDatetime(date):
    return '{dt.month}/{dt.day}/{dt.year} @ {dt:%-I}:{dt:%M}{dt:%p} {dt:%Z}'.format(dt=date)