import { html, render } from "../node_modules/lit-html/lit-html.js"

const root = document.querySelector('#root');
const input = document.querySelector('#towns');

const loadBtn = document.getElementById('btnLoadTowns')
loadBtn.addEventListener('click', (ev) => {
    ev.preventDefault();

    let template = html`<ul>
${input.value.split(', ').map(e => html`<li>${e}</li>`)}
</ul>`;
    render(template, root);
    console.log('click');
});
