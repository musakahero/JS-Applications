import {html, nothing } from "../../node_modules/lit-html/lit-html.js"
import { del, getById, addLike, getTotalLikes, checkLikes} from "../api/booksService.js";

const detailsTemplate = (book, isOwner, isLogged, totalLikes, isLiked) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">
            <!-- Edit/Delete buttons ( Only for creator of this book )  -->
            ${isOwner ? html`<a class="button" href="/edit/${book._id}">Edit</a>
            <a class="button" href="javascript:void(0)" @click=${onDelete}>Delete</a>` 
            : nothing}

            <!-- Bonus -->
            <!-- Like button ( Only for logged-in users, which are not creators of the current book ) -->
            ${!isOwner && isLogged && isLiked==false ? html`<a class="button" href="javascript:void(0)" @click=${onLike}>Like</a>` : nothing}
            <!-- ( for Guests and Users )  -->
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${totalLikes}</span>
            </div>
            <!-- Bonus -->
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>
`;


let context;

export async function detailsPage(ctx){
    context = ctx;
    let book = await getById(ctx.params.id);
    let totalLikes = await getTotalLikes(ctx.params.id);
    let isLiked = 0;
    let isOwner = false;
    let isLogged = false;
    
    if(ctx.user){
        isLogged = true;
    }
    if(isLogged) {
        isLiked = await checkLikes(context.params.id, context.user._id);
    }
    if(isLogged && ctx.user._id == book._ownerId){
        isOwner = true;
    }

    ctx.render(detailsTemplate(book, isOwner, isLogged, totalLikes, isLiked))
}

async function onDelete(){
    await del(context.params.id);
    context.page.redirect('/dashboard');
};

async function onLike(){
    await addLike(context.params.id);
    context.page.redirect(`/details/${context.params.id}`)
};

