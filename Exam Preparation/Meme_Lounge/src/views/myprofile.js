import { getByUser } from "../../api/memeService.js";
import {html } from "../../node_modules/lit-html/lit-html.js"

const myProfileTemplate = (memes, user) => html`
<section id="user-profile-page" class="user-profile">
<article class="user-info">
    <img id="user-avatar-url" alt="user-profile" src="/images/${user.gender}.png">
    <div class="user-content">
        <p>Username: ${user.username}</p>
        <p>Email: ${user.email}</p>
        <p>My memes count: ${memes.length}</p>
    </div>
</article>
<h1 id="user-listings-title">User Memes</h1>
<div class="user-meme-listings">
    <!-- Display : All created memes by this user (If any) --> 
    ${memes.length > 0 ? memes.map(memePreviewTemplate) : noMemesTemplate()}
</div>
</section>
`;

const memePreviewTemplate = (meme) => html `
<div class="user-meme">
        <p class="user-meme-title">${meme.title}</p>
        <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
        <a class="button" href="/details/${meme._id}">Details</a>
    </div>
`;
const noMemesTemplate = () => html`
<p class="no-memes">No memes in database.</p>
`;

export async function myProfilePage(ctx) {

    let result = await getByUser(ctx.user._id);
    
    ctx.render(myProfileTemplate(result, ctx.user))
} 