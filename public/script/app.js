console.log("Sanity Check: JS is working!");
var $quotesList;
var allQuotes = [];
var user = String;

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
  return `<hr>
          <p>
            <b>${quote.quote}</b>
            - ${quote.name}
            ${quote.quoteAuthor[0]._id === user ?
              `<button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${quote._id}>Delete</button>`
              :
              `<button type="button" name="button" class="btn btn-secondary pull-right" disabled>Disabled</button>`
            }
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
  allQuotes = json.quotes;
  user = json.user;
  render(allQuotes);
}

function handleError(e) {
  res.send('uh oh', e);
}

function newQuoteSuccess(json) {
  $('#newQuoteForm input').val('');
  allQuotes.push(json);
  render();
}

function newQuoteError() {
  res.send('newquote error!');
}

function deleteQuoteSuccess(json) {
  var quote = json;
  var quoteId = quote._id;
  for(var index = 0; index < allQuotes.length; index++) {
    if(allQuotes[index]._id === quoteId) {
      allQuotes.splice(index, 1);
      break;
    }
  }
  render();
}

function deleteQuoteError() {
  res.send('deletequote error!');
}
