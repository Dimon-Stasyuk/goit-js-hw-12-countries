import countriesMarkup from './templates/countries.hbs';
import countriesList from './templates/countries-list.hbs';
import getRefs from './js/get-refs';
import API from './js/fetchCountries.js';

import '@pnotify/core/dist/BrightTheme.css';
import { info } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';

const refs = getRefs();

refs.inputRef.addEventListener('input', _.debounce(fetchCountry, 500));

function fetchCountry(e) {
  const searchQuery = e.target.value;
  API.fetchCountryByName(searchQuery).then(renderCountryInfo);
}

function clearCountryList() {
  refs.countryContainer.innerHTML = '';
}

function renderCountryInfo(data) {
  const dataLength = data.length;
  clearCountryList();
  if (data.length >= 10) {
    infoFn();
  } else if (dataLength < 10 && dataLength > 1) {
    clearCountryList();
    renderCountryList(data);
  } else if (dataLength === 1) {
    clearCountryList();
    renderCountryCard(data);
  }
}

function renderCountryList(data) {
  const countryList = countriesList(data);
  refs.countryContainer.insertAdjacentHTML('beforeend', countryList);
}
function renderCountryCard(data) {
  const city = countriesMarkup(...data);
  refs.countryContainer.insertAdjacentHTML('beforeend', city);
}

function infoFn() {
  info({
    text: `Too many matches found. Please enter a more specific query!`,
    delay: 2000,
  });
}
