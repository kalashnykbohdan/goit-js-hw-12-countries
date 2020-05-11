'use strict';

import './services/fetchCountries.js';

import serviceFetchCountries from './services/fetchCountries.js'
import oneCountryInfo from '../templates/countryInfo.hbs'
import ListCountryName from '../templates/listCountryInfo.hbs'

import '../../node_modules/lodash'  

const refs = {
    jsInput: document.querySelector('#js-input'),
    jsListCountry: document.querySelector('#js-list'),
};


refs.jsInput.addEventListener('input', _.debounce(createJsListCountry, 500));

function createJsListCountry(e){

    clearListItems()
    // console.log(event.currentTarget.value)
    serviceFetchCountries.fetchCountries(e.target.value).then(data => {
        

        if(data.length > 10){
            alert("Too many matches found. Please enter a more specific query!"
            );
        }
        else if(data.length === 1){
            console.log(data);
            buildList(data, oneCountryInfo);
        }
        else if(data.length <= 10){
            console.log(data);
            buildList(data, ListCountryName);
        }
    })
    .catch(error => {console.log(error)})
    
    
}//----------------------------------------------------------------

function buildList(countrys, view) {
    const markup = countrys.map(iteam => view(iteam)).join('');
    refs.jsListCountry.insertAdjacentHTML('afterbegin', markup) 
    
}

function clearListItems() {
    refs.jsListCountry.innerHTML = '';
}

