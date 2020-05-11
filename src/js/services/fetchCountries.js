'use strict';

const baseUrl = 'https://restcountries.eu/rest/v2/name/';

export default{
  fetchCountries(searchQuery){
    
    return fetch(baseUrl + searchQuery)
    .then(response => response.json())
  }
  
}