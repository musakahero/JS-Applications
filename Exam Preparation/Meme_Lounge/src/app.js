import { updateNav } from "../middlewares/navbar.js";
import { decorateContext } from "../middlewares/render.js";
import { addSession } from "../middlewares/session.js"
import page from "../node_modules/page/page.mjs"
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import {logout} from "../api/user.js"
import { catalogPage } from "./views/catalog.js";
import { homePage } from "./views/home.js";
import { detailsPage } from "./views/details.js";
import { createPage } from "./views/create.js";
import { editPage } from "./views/edit.js";
import { myProfilePage } from "./views/myprofile.js";
import { decorateContextNotification } from "../middlewares/notification.js";

page(addSession);
page(updateNav);
page(decorateContext);
page(decorateContextNotification);
page('/', homePage);
page('/register', registerPage);
page('/login', loginPage);
page('/catalog', catalogPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage)
page('/create', createPage);
page('/my-profile', myProfilePage)
page.start();

//Logout
document.querySelector('#logoutBtn').addEventListener('click', onLogout);
function onLogout(e){
    e.preventDefault();
    logout();
    page.redirect('/');
}