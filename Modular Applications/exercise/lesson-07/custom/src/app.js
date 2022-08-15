import page from '../node_modules/page/page.mjs'
import { updateNav } from './middlewares/navbar.js'
import { preload } from './middlewares/preload.js';
import { decorateContext } from './middlewares/render.js';
import { addSession } from './middlewares/session.js'
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';

//TODO: Implement search, implement edit, implement delete

page(addSession);
page(updateNav);
page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', catalogPage);
page('/create', createPage);
page('/catalog/:id', preload, detailsPage);
page('/edit/:id', preload, editPage)
page.start(); 