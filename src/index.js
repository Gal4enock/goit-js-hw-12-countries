import './styles.css';
import fetchCountries from './fetchCountries.js';
import debounce from 'lodash.debounce';
import handlebars from 'handlebars';

const refs = {
  box: document.querySelector('.qwery'),
  input: document.querySelector('[name="country"]'),
  list: document.querySelector('.list')
}

let word = '';
refs.input.addEventListener('input', debounce((e) => {
  word = e.target.value;
   if (word === '') {
    return
  }
  let url = `https://restcountries.eu/rest/v2/name/${word}`;
  refs.list.innerHTML = '';
  fetchCountries(url)
}, 500))


