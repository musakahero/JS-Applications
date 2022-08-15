import { create } from "../../api/memeService.js";
import {html } from "../../node_modules/lit-html/lit-html.js"
import { createSubmitHandler } from "../util.js";


const createTemplate = (onSubmit) => html`
<section id="create-meme">
<form id="create-form" @submit=${onSubmit}>
    <div class="container">
        <h1>Create Meme</h1>
        <label for="title">Title</label>
        <input id="title" type="text" placeholder="Enter Title" name="title">
        <label for="description">Description</label>
        <textarea id="description" placeholder="Enter Description" name="description"></textarea>
        <label for="imageUrl">Meme Image</label>
        <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
        <input type="submit" class="registerbtn button" value="Create Meme">
    </div>
</form>
</section>
`;

export function createPage(ctx) {
    ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)));

} 

async function onSubmit(ctx, data, event){
    try {
        if(data.title == '' || data.description == '' || data.imageUrl == '') {
            throw Error('All fields are required!');
        };

        await create(data);
        event.target.reset();
       
        ctx.page.redirect('/catalog')
    } catch (err) {
        ctx.notificationState(false, err);
        throw err;
    }
}