import {html} from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs'
import { updateNav } from './middlewares/navbar.js';
import {preloadAll} from './middlewares/preload.js';
import { decorateContext } from './middlewares/render.js';
import { addSession } from './middlewares/session.js'
import { browsePage } from './views/browse.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import {logout} from './api/user.js'


page(addSession);
page(updateNav);
page(decorateContext);
page('/', homePage);
page('/register', registerPage);
page('/login', loginPage);
page('/browse', preloadAll, browsePage)
//page('/my-teams', myTeamsPage) 
page.start();


document.querySelector('#logoutBtn').addEventListener('click', onLogout);
function onLogout(e){
    e.preventDefault();
    logout();
    page.redirect('/');

}
