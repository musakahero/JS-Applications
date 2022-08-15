import { edit, getById } from "../../api/memeService.js";
import {html } from "../../node_modules/lit-html/lit-html.js"
import { createSubmitHandler } from "../util.js";

const editTemplate = (meme, onSubmit) => html`
<section id="edit-meme">
    <form id="edit-form" @submit=${onSubmit}>
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description" .value=${meme.description}> 
                </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>
`;

export async function editPage(ctx){
    let result = await getById(ctx.params.id);

    ctx.render(editTemplate(result, createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event){
    try {
        if(data.title == '' || data.description == '' || data.imageUrl == '') {
            throw Error('All fields are required!');
        };

        await edit(ctx.params.id, data);
        event.target.reset();
        
        ctx.page.redirect(`/details/${ctx.params.id}`)
    } catch (err) {
        ctx.notificationState(false, err)
        throw err;
    }
}