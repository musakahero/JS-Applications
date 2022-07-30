import { html, render } from './node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js'

const section = document.getElementById('allCats');

const template = cats.map(cat => html`
<ul>
    <li>
        <img src=./images/${cat.imageLocation}.jpg width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn" @click=${onClick}>Show status code</button>
            <div class="status" style="display: none" id="${cat.id}">
            <h4 class="card-title">Status Code: ${cat.statusCode}</h4>
            <p class="card-text">${cat.statusMessage}</p>
            </div>
        </div>
    </li>
</ul>
`)
;

render(template, section);

function onClick(e) {
    const cat = e.target.parentElement;
    const details = cat.querySelector('.status');
    if(details.style.display == 'none'){
        details.style.display = '';
    } else {
        details.style.display = 'none';
    }
}
