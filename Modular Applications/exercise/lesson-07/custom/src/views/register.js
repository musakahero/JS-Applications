import { html } from "../../node_modules/lit-html/lit-html.js"
import {register} from '../api/user.js'
import { createSubmitHandler } from "../util.js";

const registerTemplate = (onSubmit) => html`
<section id="login">
        <article>
            <h2>Login</h2>
            <form @submit=${onSubmit} id="registerForm">
                <label>E-mail: <input type="text" name="email"></label>
                <label>Password: <input type="password" name="password"></label>
                <label>Repeat password: <input type="password" name="repass"></label>
                <input type="submit" value="register">
            </form>
        </article>
    </section>
`;


export function registerPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event){
    try {
        if (data.password && data.password == data.repass) {
            await register(data.email, data.password);

            event.target.reset();
            ctx.page.redirect('/catalog');
        } else {
            throw Error('Passwords do not match!');
        };
    } catch (err) {
        alert(err.message);
        throw err;
    };
}