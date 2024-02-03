/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(() => {

  
  $('#tweet-form').on('submit', (event) => {
    event.preventDefault();
    let text = $('#tweet-text').serialize();
    console.log(text);
    

    $.ajax({
      url: 'http://localhost:8080/tweets',
      type: 'POST',
      data: { text },
      success: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.log('There was an Error', error)
      }
    });
  });


  
  const renderTweets = function(tweets) {
    // loops through tweets
    let tweetsContainer = $("#tweets-container").html('');
    for (let i = 0; i < tweets.length; i++) {
      const tweet = tweets[i];
      let storedTweet = createTweetElement(tweet);
      tweetsContainer.prepend(storedTweet);
    }
}



  const createTweetElement = function (obj) {

    const markup = `
    <div class="tweet-header" id="user-info">
    <div id="user-real-name">
    <img src="${obj.user.avatars}">
    ${obj.user.name}
    </div>
    <div id="username">${obj.user.handle}</div>
  </div>
  <p class="tweet-content">${obj.content.text}</p>
  <hr>
  <div class="tweet-footer">
    <div class="tweet-footer-date">${obj.created_at}</div>
    <div class="tweet-footer-icons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </div>
  `
    const $tweet = $(`<article class="tweet">${markup}</article>`);
  
    return $tweet;
  }
  
 renderTweets(data);

});