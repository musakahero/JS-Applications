import { html } from "../../node_modules/lit-html/lit-html.js"
import { del } from "../api/recipe.js";

let ctx;

const detailsTemplate = (recipe) => html`
<section id="details">
        <article>
            <h2>${recipe.name}</h2>
            <div class="band">
                <div class="thumb"><img src="../../${recipe.img}"/></div>
                <div class="ingredients">
                
                <h3>Ingredients:</h3>
                <ul>
                    ${recipe.ingredients.map(i => html`<li>${i}</li>`)}
                </ul>
                </div>
            </div>
            <div class="description">
                <h3>Preparation:</h3>
                ${recipe.steps.map(s => html`<p>${s}</p>`)}
            </div>
            <div class="controls" style=${recipe._isOwner ? 'display:default' : 'display:none'}>
                <a href="/edit/${recipe._id}" class="actionLink">Edit</a>
                <a href="javascript:void(0)" class="actionLink" @click=${onDelete}>Delete</a>
            </div>
        </article>
    </section>
`;

export async function detailsPage(context) {
    const recipe = context.recipe;
    ctx = context;
    context.render(detailsTemplate(recipe));
};

async function onDelete(event){
    event.preventDefault();
    if(confirm('Are you sure you want to delete this recipe?')){
        del(ctx.params.id);
        ctx.page.redirect('/catalog');
    }

}