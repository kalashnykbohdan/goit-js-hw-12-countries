'use strict';

import serviceFetchCountries from './services/fetchCountries.js'
import oneCountryInfo from '../templates/countryInfo.hbs'
import ListCountryName from '../templates/listCountryInfo.hbs'
import '@pnotify/core/dist/BrightTheme.css';

import {debounce} from '../../node_modules/lodash'  

const { error } = require('@pnotify/core');
const refs = {
    jsInput: document.querySelector('#js-input'),
    jsListCountry: document.querySelector('#js-list'),
};


refs.jsInput.addEventListener('input', debounce(createJsListCountry, 500));

function createJsListCountry(e){

    clearListItems()

    serviceFetchCountries.fetchCountries(e.target.value).then(data => {
        

        if(data.length > 10){
            error({
                text: "Too many matches found. Please enter a more specific query!"
                });
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
    .catch(error => {
        if(data.status === 500){
            error({
                text: "Server is temporarily unavailable!"
                });
        }
        else if(data.status === 404){
            error({
                text: "Server not found"
                });
        }
        error({
            text: "unidentified error"
            });
    })
    
    
}//----------------------------------------------------------------

function buildList(countrys, view) {
    const markup = countrys.map(iteam => view(iteam)).join('');
    refs.jsListCountry.insertAdjacentHTML('afterbegin', markup) 
    
}

function clearListItems() {
    refs.jsListCountry.innerHTML = '';
}

