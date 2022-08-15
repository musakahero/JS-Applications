import { html } from '../../node_modules/lit-html/lit-html.js';
import { repeat } from '../../node_modules/lit-html/directives/repeat.js';
import { getAllCars } from '../data/cars.js';


const catalogTemplate = (cars) => html`
<h2>Catalog</h2>
<ul>
    ${repeat(cars, c => c._id, carCard)}
</ul>`;

const carCard = (car) => html`<li><a href="/catalog/${car._id}">${car.make} ${car.model}</a></li>`;


export async function showCatalog(ctx) {
    console.log(ctx.query.page);
    ctx.render(catalogTemplate([]));
    const cars = await getAllCars();
    ctx.render(catalogTemplate(cars));
}