import './styles.css';
import debounce from 'lodash.debounce';
import handlebars from 'handlebars';
import toPars from './templates/pars.hbs'
console.log(toPars);

const refs = {
  box: document.querySelector('.qwery'),
  input: document.querySelector('[name="country"]'),
  list: document.querySelector('.list')
}
console.dir(refs.input);

let word = '';
refs.input.addEventListener('input', debounce((e) => {
  word = e.target.value
  console.log(word);
  console.dir(refs.input);
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
      // console.log(arr);
      else if (arr.length > 1 && arr.length <= 10) {
        console.log(arr);
        arr.map((el) => refs.list.insertAdjacentHTML('beforeend', `<li> ${el.name}</li>`))
      }
      else if (arr.length === 1) {
        const obj = arr[0];
        const tag = toPars(obj);
        refs.list.insertAdjacentHTML('beforeend', tag)
      }
    })
}
