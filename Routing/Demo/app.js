import { createHashRouter } from "./hashRouter.js";

const views = {
    '#home': () => `<h2>Home Page</h2><p>Welcome to our site!</p>`,
    '#catalog': () => `<h2>Catalog Page</h2>
    <ul>
        <li>Product 1</li>
        <li>Product 2</li>
        <li>Product 3</li>
    </ul>`,
    '#about': () => `<h2>About Page</h2><p>Contact: +1-555-1234</p>`,
};

const main = document.querySelector('main');

const start = createHashRouter(main, views);
//start app
start();