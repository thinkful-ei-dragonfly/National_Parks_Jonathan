'use strict';

const apiKey = 'Ge3GZdHiKTINhQDurFaEE7IOSZdsNuvf9IbrgBOs'
const searchURL = 'https://developer.nps.gov/api/v1/parks'

function formatQueryParams(params){
  const queryItems = Object.keys(params)
  .map(key=> `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function displayResults(res){
$('#results-list').empty();
for(let i = 0; i < res.data.length; i++){
  $('#results-list').append(
    `<li><h3>${res.data[i].fullName}</h3>
    <p>${res.data[i].description}</p>
    <a href=${res.data[i].url}>${res.data[i].url}</a>
    `
  )
};
$('#results').removeClass('hidden');
};

function getParks(states, maxResults=10){
  const params = {
    parkCode: '',
    api_key: apiKey,
    stateCode: states,
    limit: maxResults, 
  }

  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;
  console.log(url);

  fetch(url)
  .then(res => {
    if(res.ok){
      return res.json()
    }
    throw new Error(res.error.message)
  })
  .then(res => displayResults(res))
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
}
  )}

function watchForm(){
  $('form').submit(e => {
    e.preventDefault();
    const states = $('#js-search-term').val();
    console.log(states);
    const maxResults = $('#js-max-results').val();
    console.log(maxResults)
    getParks(states, maxResults);
  })
}
$(watchForm);