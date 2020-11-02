import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';

const refs = {
  box: document.querySelector('.qwery'),
  input: document.querySelector('[name="country"]'),
  list: document.querySelector('.list')
}


export function fetchCountries (word) {
  let url = `https://restcountries.eu/rest/v2/name/${word}`;
  return fetch(url)
  .then(res => {
    
        if (res.status >= 200 && res.status < 300) {
          return res.json()
        }
        else alert('Вы ввели неверное название!')
      })
}

