import {html} from "../../node_modules/lit-html/lit-html.js"
import { register } from "../api/user.js";
import { createSubmitHandler } from "../util.js";

const registerTemplate = (onSubmit) => html`
<section id="register">
    <div class="form" @submit=${onSubmit}>
        <h2>Register</h2>
        <form class="login-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">login</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
</section>
`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event){
    try {
        if(data.email=='' || data.password == ''){
            throw Error('All fields are required!');
        }
        if(data.password != data['re-password']){
            throw Error(`Passwords don't match!`);
        }

        await register(data.email, data.password);
        event.target.reset();
        ctx.page.redirect('/dashboard');
    } catch (err) {
        alert(err.message);
        throw err;
    } 
}

