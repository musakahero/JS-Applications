import { del, getById } from "../../api/memeService.js";
import {html, nothing } from "../../node_modules/lit-html/lit-html.js"

const detailsTemplate = (meme, isOwner) => html`
<section id="meme-details">
<h1>Meme Title: ${meme.title}

</h1>
<div class="meme-details">
    <div class="meme-img">
        <img alt="meme-alt" src=${meme.imageUrl}>
    </div>
    <div class="meme-description">
        <h2>Meme Description</h2>
        <p>
            ${meme.description}
        </p>

        <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
        ${isOwner ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
        <button class="button danger" @click=${onDelete}>Delete</button>`
        : nothing}
    </div>
</div>
</section>
`;

let context;

export async function detailsPage(ctx){
    context = ctx;

    let result = await getById(ctx.params.id);
    
    if(ctx.user && result._ownerId == ctx.user._id){
        ctx.isOwner = true;
    } else {
        ctx.isOwner = false;
    }
    ctx.render(detailsTemplate(result, ctx.isOwner))
};

async function onDelete(){
    del(context.params.id);
    context.page.redirect('/catalog')
    
}