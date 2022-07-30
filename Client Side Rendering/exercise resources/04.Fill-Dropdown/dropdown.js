import { html, render } from './node_modules/lit-html/lit-html.js'

const baseURL = 'http://localhost:3030/jsonstore/advanced/dropdown';
const select = document.getElementById('menu');
;
const form = document.querySelector('form');
form.addEventListener('submit', addItem);

getData();
async function getData() {

    const res = await fetch(baseURL);
    const data = Object.values(await res.json())

    const optionTemplate = html`${data.map(e => html`<option value=${e._id}>${e.text}</option>`)}`;
    render(optionTemplate, select);
}
async function addItem(e) {
    e.preventDefault();
    const text = form.querySelector('#itemText').value;
 
    try {
        let res = await fetch(baseURL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text
            })
        });

        if(res.ok == false){
            const error = await res.json();
            throw Error(error.message);
        }
        form.reset();
        getData();
    } catch (err) {
        alert(err.message);
    }
}