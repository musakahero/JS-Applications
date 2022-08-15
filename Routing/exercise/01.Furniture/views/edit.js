import page from "../node_modules/page/page.mjs";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { updateInfo } from '../app.js'
let detailsId = '';

const editTemplate = (furniture) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${editItem}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control" id="new-make" type="text" name="make" value=${furniture.make}>
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control is-valid" id="new-model" type="text" name="model" value=${furniture.model}>
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control is-invalid" id="new-year" type="number" name="year" value=${furniture.year}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control" id="new-description" type="text" name="description" value=${furniture.description}>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control" id="new-price" type="number" name="price" value=${furniture.price}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img" value=${furniture.img}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" value=${furniture.material ? furniture.material : ""}>
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>
`;

const getDetails = async (id) => {
    detailsId = id;
    let res = await fetch(`http://localhost:3030/data/catalog/${detailsId}`);

    if (!res.ok) {
        const error = await res.json();
        throw Error(error.message);
    }

    return await res.json();
};


export async function editItem(e) {
    e.preventDefault();

    let make = document.getElementById('new-make');
    let model = document.getElementById('new-model');
    let year = document.getElementById('new-year');
    let description = document.getElementById('new-description');
    let price = document.getElementById('new-price');
    let image = document.getElementById('new-image');
    let material = document.getElementById('new-material');
    let isValid = true;

    make.value.year >= 4 ? validate(make, true) : validate(make, false);
    model.value.length >= 4 ? validate(model, true) : validate(model, false);
    Number(year.value) >= 1950 && Number(year.value) <= 2050 ? validate(year, true) : validate(year, false);
    description.value.length >= 10 ? validate(description, true) : validate(description, false);
    price.value.length > 0 ? validate(price, true) : validate(price, false);
    image.value != '' ? validate(image, true) : validate(image, false)

    function validate(element, bool) {
        if (bool == false) {
            isValid = false;
            element.classList.add('is-invalid');
            element.classList.remove('is-valid');
        } else {
            element.classList.add('is-valid');
            element.classList.remove('is-invalid');
        }
    };
    try {
        let res = await fetch(`http://localhost:3030/data/catalog/${detailsId}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': JSON.parse(localStorage.user).accessToken
            },
            body: JSON.stringify({
                make: make.value,
                model: model.value,
                year: year.value,
                description: description.value,
                price: price.value,
                img: image.value,
                material: material.value
            })
        });

        if (!res.ok) {
            const error = await res.json();
            throw Error(error.message);
        }

        page.redirect('/catalog');
    } catch (err) {
        alert(err.message);
    };

};

export const editView = async (ctx) => {
    console.log(detailsId);
    let furniture = await getDetails(ctx.params.detailsId);
    render(editTemplate(furniture), document.querySelector('.container'));
};

