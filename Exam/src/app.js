import page from "../node_modules/page/page.mjs"
import { logout } from "./api/user.js";
import { updateNav } from "./middlewares/navbar.js";
import { decorateContext } from "./middlewares/render.js";
import { addSession } from "./middlewares/session.js";
import { createPage } from "./views/create.js";
import { dashboardPage } from "./views/dashboard.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";


page(addSession);
page(updateNav);
page(decorateContext);
page('/', homePage);
page('/register', registerPage);
page('/login', loginPage);
page('/dashboard', dashboardPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage)
page.start();

//logout
document.getElementById('logoutBtn').addEventListener('click', onLogout);

async function onLogout(){
    logout();
    page.redirect('/dashboard');
}