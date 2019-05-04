During the presentation, our app was not running on localhost:8080, but I have
resolved the issue - it was with the Spotify API (issues with access token).  
Also, there was another error (I don't know why it popped up all of a sudden).
I needed to change the permissons of tweets.txt.  I will add this to the bootstrap, but JUST IN CASE, here is the command I ran in the VM.  

sudo chmod 777 /var/www/html/htdocs/tweets.txt