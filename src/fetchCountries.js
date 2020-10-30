import handlebars from 'handlebars';
import pars from './templates/pars.hbs';
import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';

const refs = {
  box: document.querySelector('.qwery'),
  input: document.querySelector('[name="country"]'),
  list: document.querySelector('.list')
}

export default function fetchCountries (url) {
  fetch(url)
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return res.json()
      } else alert('Вы ввели неверное название!')
    })
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
