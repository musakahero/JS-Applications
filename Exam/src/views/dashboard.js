import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAll } from "../api/shoesService.js";

const dashboardTemplate = (shoes) => html`
<section id="dashboard">
    <h2>Collectibles</h2>
    ${shoes.length > 0 ? html`
    <ul class="card-wrapper">
    <!-- Display a li with information about every post (if any)-->
    ${shoes.map(shoesPreviewTemplate)}
    </ul>
    ` : html`<h2>There are no items added yet.</h2>`}
</section>
`; 

const shoesPreviewTemplate = (shoe) => html`
<li class="card">
    <img src=${shoe.imageUrl} alt=${(shoe.imageUrl).slice(8).split('.')[0]} />
    <p>
        <strong>Brand: </strong><span class="brand">${shoe.brand}</span>
    </p>
    <p>
        <strong>Model: </strong><span class="model">${shoe.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
    <a class="details-btn" href="/details/${shoe._id}">Details</a>
</li>
`;

export async function dashboardPage(ctx){    
    let shoes = await getAll();
    ctx.render(dashboardTemplate(shoes));
};



