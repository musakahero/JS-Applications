import { html } from "../../node_modules/lit-html/lit-html.js"
import * as recipeService from '../api/recipe.js'
import { createSubmitHandler } from "../util.js";

const editTemplate = (recipe, onSubmit) => html`
<section id="create">
    <article>
        <h2>New Recipe</h2>
        <form @submit=${onSubmit} id="createForm">
            <label>Name: <input type="text" name="name" placeholder="Recipe name" .value=${recipe.name}></label>
            <label>Image: <input type="text" name="img" placeholder="Image URL" .value=${recipe.img}></label>
            <label class="ml">Ingredients: <textarea name="ingredients" placeholder="Enter ingredients on separate lines" .value=${recipe.ingredients.join('\n')}></textarea></label>
            <label class="ml">Preparation: <textarea name="steps" placeholder="Enter preparation steps on separate lines" .value=${recipe.steps.join('\n')}></textarea></label>
            <input type="submit" value="Save Recipe">
        </form>
    </article>
</section>
`;


export async function editPage(ctx) {
    const recipe = ctx.recipe;
    ctx.render(editTemplate(recipe, createSubmitHandler(ctx, onSubmit)));
};

async function onSubmit(ctx, data, event){

    const result = await recipeService.edit(ctx.params.id, {
        name: data.name,
        img: data.img,
        ingredients:data.ingredients.split('\n').map(l => l.trim()).filter(k => k != ''),
        steps:data.steps.split('\n').map(l => l.trim()).filter(k => k != '')
    });
    event.target.reset();
    ctx.page.redirect(`/catalog/${result._id}`);
};