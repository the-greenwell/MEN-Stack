console.log("Sanity Check: JS is working!");
var $quotesList;
var allQuotes = [];

$(document).ready(function(){

  $quotesList = $('#QuoteTarget');
  $.ajax({
    method: 'GET',
    url: '/api/quotes',
    success: handleSuccess,
    error: handleError
  });

  $('#newQuoteForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/quotes',
      data: $(this).serialize(),
      success: newQuoteSuccess,
      error: newQuoteError
    });
  });

  $quotesList.on('click', '.deleteBtn', function() {
    console.log('clicked delete button to', '/api/quotes/'+$(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/quotes/'+$(this).attr('data-id'),
      success: deleteQuoteSuccess,
      error: deleteQuoteError
    });
  });

  $('#show-pword').on('click', function(){
    if('password' == $('#pword-input').attr('type')){
         $('#pword-input').prop('type', 'text');
    }else{
         $('#pword-input').prop('type', 'password');
    }  });

});

function getQuoteHtml(quote) {
  var author = quote.quoteAuthor[0].username
  return `<hr>
          <p>
            <b>${quote.quote}</b>
            - ${quote.name}
            <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${quote._id}>Delete</button>
          </p>`;
}

function getAllQuotesHtml(quotes) {
  return quotes.map(getQuoteHtml).join("");
}

function render () {
  $quotesList.empty();
  var quotesHtml = getAllQuotesHtml(allQuotes);
  $quotesList.append(quotesHtml);
};

function handleSuccess(json) {
  allQuotes = json;
  render(allQuotes);
}

function handleError(e) {
  console.log('uh oh', e);
}

function newQuoteSuccess(json) {
  $('#newQuoteForm input').val('');
  allQuotes.push(json);
  render();
}

function newQuoteError() {
  console.log('newquote error!');
}

function deleteQuoteSuccess(json) {
  var quote = json;
  console.log(json);
  var quoteId = quote._id;
  console.log('delete quote', quoteId);
  for(var index = 0; index < allQuotes.length; index++) {
    if(allQuotes[index]._id === quoteId) {
      allQuotes.splice(index, 1);
      break;
    }
  }
  render();
}

function deleteQuoteError() {
  console.log('deletequote error!');
}
