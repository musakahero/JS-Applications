import {html, render} from '../node_modules/lit-html/lit-html.js';
import {data, nav} from './data.js'
import {classMap} from '../node_modules/lit-html/directives/class-map.js'

const template = (name) => html`<h2>Hello there, ${name}</h2>`;

start();

function start(){
    const main = document.querySelector('main');

    const templateResult = template('Peter');

    console.log(templateResult);

    render(templateResult, main);

    
}