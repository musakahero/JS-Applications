
import page from '../node_modules/page/page.mjs'
import {render as litRender} from '../node_modules/lit-html/lit-html.js';
import { showAbout } from './views/about.js';
import { showHome } from './views/home.js';
import { showCatalog } from './views/catalog.js';
import { showDetails } from './views/details.js';
import * as api from './data/recipes.js'
window.api = api;

const main = document.querySelector('main');

page(decorateContext);
page('/', showHome);
page('/index.html', '/');
page('/catalog', showCatalog);
page('/catalog/:productId', showDetails);
page('/about', showAbout);
page('*', notFound)

page.start();


function render(templateResult){
    litRender(templateResult, main);
}

function decorateContext(ctx, next){
    ctx.render = render;
    next();
}

function notFound(ctx){
    ctx.render('404 not found')
}