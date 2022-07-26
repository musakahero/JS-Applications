import { html } from "../../node_modules/lit-html/lit-html.js"
import { login } from "../../api/user.js"
import { createSubmitHandler } from "../util.js";

const loginTemplate = (onSubmit) => html`
<section id="login">
<form id="login-form" @submit=${onSubmit}>
    <div class="container">
        <h1>Login</h1>
        <label for="email">Email</label>
        <input id="email" placeholder="Enter Email" name="email" type="text">
        <label for="password">Password</label>
        <input id="password" type="password" placeholder="Enter Password" name="password">
        <input type="submit" class="registerbtn button" value="Login">
        <div class="container signin">
            <p>Dont have an account?<a href="/register">Sign up</a>.</p>
        </div>
    </div>
</form>
</section>
`;

export function loginPage(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(ctx, onSubmit)))
};

async function onSubmit(ctx, data, event) {
    

    try {
        if (data.password == '' || data.email == '') {
            throw Error('All fields are required!');
        }
        await login(data.email, data.password);
        event.target.reset();
        ctx.page.redirect('/catalog');

    } catch (err) {
        ctx.notificationState(false, err);
        throw err;
    };
}