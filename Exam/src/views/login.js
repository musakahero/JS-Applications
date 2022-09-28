import { html } from "../../node_modules/lit-html/lit-html.js"
import { login } from "../api/user.js";
import { createSubmitHandler } from "../util.js";

const loginTemplate = (onSubmit) => html`
<section id="login">
    <div class="form" @submit=${onSubmit}>
        <h2>Login</h2>
        <form class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
                Not registered? <a href="/register">Create an account</a>
            </p>
        </form>
    </div>
</section>
`;

export function loginPage(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
    try {
        if (data.email == '' || data.password == '') {
            throw Error('All fields are required!');
        }

        await login(data.email, data.password);
        event.target.reset();
        ctx.page.redirect('/dashboard');
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

