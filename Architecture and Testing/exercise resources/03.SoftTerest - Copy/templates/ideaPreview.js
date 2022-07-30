import {html, render} from '../node_modules/lit-html/lit-html.js';

export function createIdeaPreview(ideas, section){

    let template;
    if(ideas.length == 0){
         template = html`<h1>No ideas yet! Be the first one :)</h1>`;
    } else {
         template = ideas.map(i => html`
        <div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
             <div class="card-body">
                <p class="card-text">${i.title}</p>
            </div>
            <img class="card-image" src="${i.img}" alt="Card image cap">
         <a data-id="${i._id}" class="btn" href="/details">Details</a>
        </div> 
        `);
    };

    render(template, section);
}