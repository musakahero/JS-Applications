import {html, render} from './node_modules/lit-html/lit-html.js'
import {towns} from './towns.js'

const townsDiv = document.querySelector('#towns');
const resultDiv = document.querySelector('#result');

const searchBtn = document.querySelector('button');
searchBtn.addEventListener('click', search);

const template = html`
   <ul>
      ${towns.map(e => html`<li>${e}</li>`)}
   </ul>`;
   render(template, townsDiv);

function search() {
   const input = document.querySelector('#searchText');
   const template = html`
   <ul>
      ${towns.map(e => html`<li class=${e.includes(input.value) && input.value != ''?'active':null}>${e}</li>`)}
   </ul>`;
   render(template, townsDiv);
   render(html`${townsDiv.querySelectorAll('li.active').length} matches found`, resultDiv);
}
