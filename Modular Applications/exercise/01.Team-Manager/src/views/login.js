import { html } from "../../node_modules/lit-html/lit-html.js"
import { login } from "../api/user.js";
import { createSubmitHandler } from "../util.js";

const loginTemplate = (onSubmit) => html`
<section id="login">
            <article class="narrow">
                <header class="pad-med">
                    <h1>Login</h1>
                </header>
                <form id="login-form" class="main-form pad-large" @submit=${onSubmit}>
                    <div class="error" style="display:none">Error message.</div>
                    <label>E-mail: <input type="text" name="email"></label>
                    <label>Password: <input type="password" name="password"></label>
                    <input class="action cta" type="submit" value="Sign In">
                </form>
                <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
                </footer>
            </article>
        </section>
`;

export function loginPage(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(ctx, onSubmit)));
};

async function onSubmit(ctx, data, event){
    let errorDiv = document.querySelector('.error');
    try {
        await login(data.email, data.password);
        event.target.reset();
        ctx.page.redirect('/my-teams');

    } catch (err) {
        errorDiv.textContent = err.message;
        errorDiv.style.display = '';
        throw err;
    };
}

