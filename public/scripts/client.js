/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Make sure the page loads first
$(document).ready(() => {
  const tweetTextArea = $('#tweet-text');
  const errorElement = $('#show-error');
  // Handle post request for tweet-text form
  $('#tweet-form').on('submit', (event) => {
    
    // Let the browser know that you will handle the form submission differently
    event.preventDefault();
    errorElement.html('').slideUp();

    let inputText = $('#tweet-text').val();

    if (inputText === '' || inputText === null) {
      return errorElement.html('⚠ You are not humming about anything. Fill out the form and try again! ⚠').slideDown();
    }

    if (inputText.length > 140) {
      return errorElement.html('⚠ You are humming about too much. Use 140 characters or less! ⚠').slideDown();
    }

    tweetTextArea.val('');

    let text = $('#tweet-text').serialize();
    // Post request to udpate tweeter db
    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: { text: inputText },
      success: () => {
        $('.counter').text(140);
        loadTweets(text);
      },
      error: (error) => {
        console.log('There was an Error', error);
      }
    });

    loadTweets(text);
  });

  // Responsible for fetching tweets from /tweets data page
  const loadTweets = function() {
  
    $.ajax({
      url: '/tweets',
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
  
  // Iterate through /tweets array data
  const renderTweets = function(arr) {

    let tweetsContainer = $("#tweets-container").empty();
    for (let i = 0; i < arr.length; i++) {
      const tweet = arr[i];
      // Convert data into the mark up that is created in the createTweetElement function
      let storedTweet = createTweetElement(tweet);

      tweetsContainer.prepend(storedTweet);
    }
  };


  // Create markup article to show in new-tweet section
  const createTweetElement = function(obj) {
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

  let date = timeago.format(obj.created_at)
  
    let markUp = `
  <div class="tweet-header" id="user-info">
      <div class="avatar-and-real-name"><img src="${obj.user.avatars}">&nbsp;&nbsp;
       <div id="user-real-name">${obj.user.name}
       </div>
      </div>
    <div id="username">${obj.user.handle}</div>
  </div>
    <p class="tweet-content">${escape(obj.content.text)}</p>
     <hr>
  <div class="tweet-footer">
    <div class="tweet-footer-date">${date}</div>
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