import {html } from "../../node_modules/lit-html/lit-html.js"
import { getAll } from "../../api/memeService.js";

const catalogTemplate = (memes) => html`
<section id="meme-feed">
            <h1>All Memes</h1>
            <div id="memes">
                ${memes.length > 0 ? memes.map(memePreviewTemplate) : noMemesTemplate()}
			</div>
        </section>
`;

let noMemesTemplate = () => html`<p class="no-memes">No memes in database.</p>`;

let memePreviewTemplate = (meme) => html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${meme.title}</p>
            <img class="meme-image" alt="meme-img" src=${meme.imageUrl}>
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${meme._id}">Details</a>
        </div>
    </div>
</div>
`;

export async function catalogPage(ctx) {
    let result = await getAll();
    ctx.render(catalogTemplate(result));
};