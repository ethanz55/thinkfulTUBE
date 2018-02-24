/* 
Make the images clickable, leading the user to the YouTube video, on YouTube

Make the images clickable, playing them in a lightbox

Show a link for more from the channel that each video came from

Show buttons to get more results (using the previous and next page links from the JSON)
*/

const YOUTUBE_ENDPOINT = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi (searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: 'AIzaSyDFp7Hbu0EkTcBShxcxXcgoVHDBYpWqM2k',
    q: `${searchTerm}`,
    page: 1,
    per_page: 5
  };
  $.getJSON(YOUTUBE_ENDPOINT, query, callback);
}

//this._update(this._pad(time.getHours()) + this._pad(time.getMinutes()) + this._pad(time.getSeconds()));

function renderResults(result) {
  let editedDate = new Date(result.snippet.publishedAt);
  let dateString = `${editedDate.getFullYear()}-${editedDate.getMonth()}-${editedDate.getDate()}`;
  return `
    <div class="image-container-style">
      <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank" tabindex="-1">
        <img src="${result.snippet.thumbnails.medium.url}" class="image-size" alt="youtube thumbnail">
      </a>
      <ul>
        <li>
          <a href="https://www.youtube.com/watch?v=${result.id.videoId}" class="title-link" target="_blank"><h3 tabindex="0">${result.snippet.title}</h3></a>
        </li>
        <li class="channel">
          <a href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">${result.snippet.channelTitle}</a> &#8226; Published: 
          <span class="date-style">${dateString}</span>
        </li>
        <li class="description">
          ${result.snippet.description}
        </li>
      </ul>
    </div>
`;
}

function displayYoutubeSearchData(data) {
  const results = data.items.map((item, index) => renderResults(item));
  $('.js-page-inserts').html(results);
  $('.js-results-header').html(`<h2 class="js-result-number">Results</h2>`);
  $('.js-result-number').html(`
    <span class="resultNumber">${pageInfo.totalResults} </span>Results
  `);
}

function handleSubmitButton() {
  $('.js-form').submit(function(event){
    event.preventDefault();
    const queryTarget = $(this).find('.js-search-text');
    const query = queryTarget.val();
    if(query === '') {
      $('.js-page-inserts').html(`        
          <div class="validation-style">
            <h2>Ha! We haven't forgetten to validate the form!</h2>
            <h2><strong>Please</strong> enter something. <strong>Please....</strong></h2>
          </div>`);
    }
    else {
      getDataFromApi(query, displayYoutubeSearchData);
    }
  });
}

$(handleSubmitButton);

/*
function handlePreviousButton() {
  $('.prev-button').on('click', function(event){
    pageNum--;
    const queryTarget = $('#search');
    const query = queryTarget.val();
    getDataFromApi(query, pageNum, displayYoutubeSearchData);
    console.log(pageNum);
  });
}

function handleNextButton() {
  $('.next-button').on('click', function(event){
    pageNum++;
    const queryTarget = $('#search');
    const query = queryTarget.val();
    getDataFromApi(query, pageNum, displayYoutubeSearchData);
  });
}

function handleAllButtons() {
  $(handleSubmitButton);
  $(handlePreviousButton);
  $(handleNextButton);
}

$(handleAllButtons);
*/








