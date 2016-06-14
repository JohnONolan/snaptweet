# SnapTweet

I tiny Node app which automatically deletes your tweets after 24 hours, a bit like Snapchat.

## Setup

1. [Register](https://apps.twitter.com/app/new) a new Twitter App, give it all permissions.
2. Fill your consumer key/secret and access token key/secret in `app.js`
3. Change the date on line 38, if you want a hard cutoff. Eg. Don’t delete any tweets before: March 3rd, 2016.
4. Deploy [somewhere](https://www.digitalocean.com/), keep it running using [Forever.js](https://github.com/foreverjs/forever)
5. Have fun!