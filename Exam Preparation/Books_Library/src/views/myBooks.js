import {html, nothing } from "../../node_modules/lit-html/lit-html.js"
import { getByUser } from "../api/booksService.js";

const myBooksTemplate = (books) => html`
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    <!-- Display ul: with list-items for every user's books (if any) -->
    ${books.length > 0 ? html`
    <ul class="my-books-list">
        ${books.map(bookPreviewTemplate)}
    </ul>
    ` : noBooksTemplate()}
</section>
`;

const bookPreviewTemplate = (book) => html`
<li class="otherBooks">
<h3>${book.title}</h3>
<p>Type: ${book.type}</p>
<p class="img"><img src=${book.imageUrl}></p>
<a class="button" href="/details/${book._id}">Details</a>
</li>
`;

const noBooksTemplate = () => html`<p class="no-books">No books in database!</p>`;

export async function myBooksPage(ctx){
    let books = await getByUser(ctx.user._id);
    ctx.render(myBooksTemplate(books));
}

