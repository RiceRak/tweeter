$(document).ready(function() {
  let maxCharacters = 140;

  $("#tweet-text").on('input', function() {
    // calculate the remaining characters
    let remainingCharacters = maxCharacters - $(this).val().length;

    $(this).closest('form').find('.counter').text(remainingCharacters);

    // Add or remove the 'negative' class based on the counter value
    $(this).closest('form').find('.counter').toggleClass("negative", remainingCharacters < 0);
  });
});