import {html } from "../../node_modules/lit-html/lit-html.js"
import { edit, getById } from "../api/booksService.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (book, onSubmit) => html`
<section id="edit-page" class="edit">
                <form id="edit-form" action="#" method="" @submit=${onSubmit}>
                    <fieldset>
                        <legend>Edit my Book</legend>
                        <p class="field">
                            <label for="title">Title</label>
                            <span class="input">
                                <input type="text" name="title" id="title" .value=${book.title}>
                            </span>
                        </p>
                        <p class="field">
                            <label for="description">Description</label>
                            <span class="input">
                                <textarea name="description"
                                    id="description" .value=${book.description}></textarea>
                            </span>
                        </p>
                        <p class="field">
                            <label for="image">Image</label>
                            <span class="input">
                                <input type="text" name="imageUrl" id="image" .value=${book.imageUrl}>
                            </span>
                        </p>
                        <p class="field">
                            <label for="type">Type</label>
                            <span class="input">
                                <select id="type" name="type" value="Fiction">
                                    <option value="Fiction" >Fiction</option>
                                    <option value="Romance" selected>Romance</option>
                                    <option value="Mistery" >Mistery</option>
                                    <option value="Classic" >Clasic</option>
                                    <option value="Other" >Other</option>
                                </select>
                            </span>
                        </p>
                        <input class="button submit" type="submit" value="Save">
                    </fieldset>
                </form>
            </section>
`;

export async function editPage(ctx){
    let book = await getById(ctx.params.id);
    ctx.render(editTemplate(book, createSubmitHandler(ctx, onSubmit)));
    document.querySelector(`#type option[value="${book.type}"]`).setAttribute('selected', true);
};

async function onSubmit(ctx, data, event){
    try {
        if(data.title == '' || data.description == '' || data.imageUrl == ''){
            throw Error('All fields are required!');
        }
        await edit(ctx.params.id, data);
        event.target.reset();
        ctx.page.redirect(`/details/${ctx.params.id}`);
    } catch (err) {
        alert(err.message);
        throw err;
    };
};