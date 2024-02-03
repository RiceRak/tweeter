/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Make sure the page loads first
$(document).ready(() => {

  // Handle post request for tweet-text form
  $('#tweet-form').on('submit', (event) => {
    event.preventDefault();
    let text = $('#tweet-text').serialize();

    $.ajax({
      url: 'http://localhost:8080/tweets',
      type: 'POST',
      data: { text },
      success: (res) => {
      },
      error: (error) => {
        console.log('There was an Error', error);
      }
    });
  });

  // Responsible for fetching tweets from the http://localhost:8080/tweets data page
  const loadTweets = function() {
  
    $.ajax({
      url: 'http://localhost:8080/tweets',
      type: 'GET',
      success: (tweets) => {
        // If successful, render the page
        renderTweets(tweets);
      },
      error: (error) => {
        console.log('Error loading tweets', error);
      }
    });
  };
  // Function call
  loadTweets();
  
  // Iterate through the http://localhost:8080/tweets array data
  const renderTweets = function(arr) {

    let tweetsContainer = $("#tweets-container").html('');
    for (let i = 0; i < arr.length; i++) {
      const tweet = arr[i];
      // Convert data into the mark up that is created in the createTweetElement function
      let storedTweet = createTweetElement(tweet);

      tweetsContainer.prepend(storedTweet);
    }
  };


  // Create markup article to show in new-tweet section
  const createTweetElement = function(obj) {
  
    let markUp = `
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
  `;
    const $tweet = $(`<article class="tweet">${markUp}</article>`);
  
    return $tweet;
  };

});