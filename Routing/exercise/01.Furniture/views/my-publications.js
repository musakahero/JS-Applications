import { html, render } from "../node_modules/lit-html/lit-html.js";


const myPublicationsTemplate = (catalog) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>My Furniture</h1>
        <p>This is a list of your publications.</p>
    </div>
</div>
<div class="row space-top">
    ${catalog.map(c => html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                    <img src=${c.img} />
                    <p>${c.description}</p>
                    <footer>
                        <p>Price: <span>${c.price} $</span></p>
                    </footer>
                    <div>
                        <a href="/details/${c._id}" class="btn btn-info">Details</a>
                    </div>
            </div>
        </div>
    </div>
    `)}
</div>
`;

const getMyPublications = async () => {
    let owner = JSON.parse(localStorage.user)._id;
    try {
        let res = await fetch('http://localhost:3030/data/catalog');
        if (!res.ok){
            const error = await res.json();
            throw Error(error.message);
        }

        let data = await res.json();
        return Object.values(data.filter(x => x._ownerId == owner));
    } catch (err) {
        alert(err.message);
    }
}

export const myPublicationsView = async (ctx) => {
    let catalog = await getMyPublications();
    render(myPublicationsTemplate(catalog), document.querySelector('.container'));
}
