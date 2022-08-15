import page from "../node_modules/page/page.mjs";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { updateInfo } from '../app.js'

const detailsTemplate = (furniture) => {
let owner = '';
if(localStorage.length > 0){
    owner = JSON.parse(localStorage.user)._id;
}


return html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${furniture.img}/>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${furniture.make}</span></p>
        <p>Model: <span>${furniture.model}</span></p>
        <p>Year: <span>${furniture.year}</span></p>
        <p>Description: <span>${furniture.description}</span></p>
        <p>Price: <span>${furniture.price}</span></p>
        <p>Material: <span>${furniture.material}</span></p>
        <div>
            <a href="/edit/${furniture._id}" class="btn btn-info" style="display: ${furniture._ownerId == owner ? '' : 'none'}">Edit</a>
            <a href="" id=${furniture._id} class="btn btn-red" style="display: ${furniture._ownerId == owner ? '' : 'none'}" @click=${onDelete}>Delete</a>
        </div>
    </div>
</div>
`};

const getDetails = async (detailsId) => {
    let res = await fetch(`http://localhost:3030/data/catalog/${detailsId}`);

    if(!res.ok){
        const error = await res.json();
        throw Error (error.message);
    }

    return await res.json();
};

export const detailsView = async (ctx) =>  {
    let furniture = await getDetails(ctx.params.detailsId);
    render(detailsTemplate(furniture), document.querySelector('.container'));
};

async function onDelete(e){
    e.preventDefault();
    if(confirm('Are you sure you want to delete this?') == true){
        let res = await fetch(`http://localhost:3030/data/catalog/${e.currentTarget.id}`, {
            method:'delete',
            headers:{
                'X-Authorization': JSON.parse(localStorage.user).accessToken
            }
        });

        page.redirect('/catalog');
    }
};
