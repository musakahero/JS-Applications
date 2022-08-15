import { html } from "../../node_modules/lit-html/lit-html.js"
import { createSubmitHandler } from "../util.js";
import { register } from "../api/user.js"

const registerTemplate = (onSubmit) => html`
<section id="register-page" class="register">
    <form id="register-form" action="" method="" @submit=${onSubmit}>
        <fieldset>
            <legend>Register Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <p class="field">
                <label for="repeat-pass">Repeat Password</label>
                <span class="input">
                    <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Register">
        </fieldset>
    </form>
</section>
`;

export function registerPage(ctx){

    ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)))
};

async function onSubmit(ctx, data, event){
    try {
        if(data.email == '' || data.password == ''){
            throw Error('All fields are required!');
        };

        if(data.password != data['confirm-pass']){
            throw Error('Passwords don\'t match!');
        };

        await register(data.email, data.password);
        event.target.reset();
        ctx.page.redirect('/dashboard');
    } catch (err) {
        alert(err.message);
        throw err;
    }
}