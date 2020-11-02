import './styles.css';
import {fetchCountries} from './fetchCountries';
import debounce from 'lodash.debounce';
import handlebars from 'handlebars';
import pars from './templates/pars.hbs';
import { alert, notice, info, success, error } from '@pnotify/core';

const refs = {
  box: document.querySelector('.qwery'),
  input: document.querySelector('[name="country"]'),
  list: document.querySelector('.list')
}

let word = '';
let url = '';
refs.input.addEventListener('input', debounce((e) => {
  word = e.target.value;
  if (word === '') {
    return
  }
  refs.list.innerHTML = '';
  url = `https://restcountries.eu/rest/v2/name/${word}`;
  render()
}, 500))

// let url = `https://restcountries.eu/rest/v2/name/${word}`;
// fetchCountries('usa').then(data => console.log(data))
const render = function () {
  fetchCountries(word)
    .then(arr => {
      if (arr.length > 10) {
        info('Too many mathes found. Please enter more specific query!')
      } 
      else if (arr.length > 1 && arr.length <= 10) {
        arr.map((el) => refs.list.insertAdjacentHTML('beforeend', `<li> ${el.name}</li>`))
      }
      else if (arr.length === 1) {
        const obj = arr[0];
        refs.list.innerHTML = pars(obj)
      }
    })
}
