import page from "../node_modules/page/page.mjs"
import { updateNav } from "./middlewares/navbar.js";
import { decorateContext } from "./middlewares/render.js";
import { addSession } from "./middlewares/session.js"
import { registerPage } from "./views/register.js";
import { logout } from "./api/user.js"
import { loginPage } from "./views/login.js";
import { dashboardPage } from "./views/dashboard.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { myBooksPage } from "./views/myBooks.js";
page(addSession);
page(updateNav);
page(decorateContext);
page('/register', registerPage);
page('/login', loginPage);
page('/dashboard', dashboardPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/my-books', myBooksPage)
page.start();

document.getElementById('logoutBtn').addEventListener('click', () => {
    logout();
    page.redirect('/dashboard');
})