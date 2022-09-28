import { html, nothing } from "../../node_modules/lit-html/lit-html.js"
import { del, getById } from "../api/shoesService.js";

const detailsTemplate = (shoe, isOwner) => html`
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Shoe Details</p>
        <div id="img-wrapper">
            <img src=${shoe.imageUrl} alt=${(shoe.imageUrl).slice(8).split('.')[0]} />
        </div>
        <div id="info-wrapper">
            <p>Brand: <span id="details-brand">${shoe.brand}</span></p>
            <p>
                Model: <span id="details-model">${shoe.model}</span>
            </p>
            <p>Release date: <span id="details-release">${shoe.release}</span></p>
            <p>Designer: <span id="details-designer">${shoe.designer}</span></p>
            <p>Value: <span id="details-value">${shoe.value}</span></p>
        </div>

        <!--Edit and Delete are only for creator-->
        ${isOwner ? html`
        <div id="action-buttons">
        <a href="/edit/${shoe._id}" id="edit-btn">Edit</a>
        <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
        </div>
        ` : nothing}        
    </div>
</section>
`;

let context;

export async function detailsPage(ctx) {
    context = ctx;

    let shoe = await getById(ctx.params.id);
    let isOwner = false;
    
    if(ctx.user && shoe._ownerId == ctx.user._id){
        isOwner = true;
    }
    ctx.render(detailsTemplate(shoe, isOwner));
}


async function onDelete() {
    await del(context.params.id);
    context.page.redirect('/dashboard');
}