// Import things
var twitter     = require('twitter');
var moment      = require('moment');

// Auth to Twitter
var client = new twitter({
    consumer_key: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
    consumer_secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    access_token_key: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    access_token_secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
});

// Do things!
function snapTweet () {

    // Let's get some tweets
    client.get('statuses/user_timeline', {trim_user: true, count: 20}, function(error, tweets, response){
      if(error) throw error;

      var i = 0;
      var len = tweets.length;

      // Loop through them
      for (i; i < len; i++) {

          var id = tweets[i].id_str;
          var favd = tweets[i].favorited;
          var tweetDate = new Date(Date.parse(tweets[i].created_at.replace(/( \+)/, ' UTC$1')));

          // Set an expiry date of 24 hours after a tweet has been published
          var expiryDate = moment(tweetDate).add(1440, 'minutes')._d;
          var now = moment();

          // If we find a tweet which is expired, call the function to delete it.
          // Unless it's favourited, in which case leave it alone.
          if (moment(now).isAfter(expiryDate) && moment(tweetDate).isAfter('2016-03-03') && favd === false) {
              deleteTweet(id);
          }

      }

    });

}

// Delete a specific tweet
function deleteTweet (e) {
    client.post('statuses/destroy', {id: e}, function(error, tweet, response){
        if(error) console.log(error);
    });
}

// Run every minute
setInterval(function(){
    snapTweet();
}, 60000);
