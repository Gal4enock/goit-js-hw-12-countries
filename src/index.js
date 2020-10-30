import './styles.css';
import debounce from 'lodash.debounce';
import handlebars from 'handlebars';
import pars from './templates/pars.hbs';

import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';




const refs = {
  box: document.querySelector('.qwery'),
  input: document.querySelector('[name="country"]'),
  list: document.querySelector('.list')
}

let word = '';
refs.input.addEventListener('input', debounce((e) => {
  word = e.target.value;
  refs.list.innerHTML = '';
  getACountry()
}, 500))

const getACountry = function () {
    if (word === '') {
    return
  }
  let url = `https://restcountries.eu/rest/v2/name/${word}`;
  fetch(url)
    .then(resp => resp.json())
    .then(arr => {
      if (arr.length > 10) {
        alert('Too many mathes found. Please enter more specific query!')
      } 
      else if (arr.length > 1 && arr.length <= 10) {
        console.log(arr);
        arr.map((el) => refs.list.insertAdjacentHTML('beforeend', `<li> ${el.name}</li>`))
      }
      else if (arr.length === 1) {
        const obj = arr[0];
        refs.list.innerHTML = pars(obj)
      }
    })
}
