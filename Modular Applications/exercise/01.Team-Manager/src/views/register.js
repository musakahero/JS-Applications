import { html } from "../../node_modules/lit-html/lit-html.js"
import { register } from "../api/user.js";
import { createSubmitHandler, validateEmail } from "../util.js";

const registerTemplate = (onSubmit) => html`
<section id="register">
            <article class="narrow">
                <header class="pad-med">
                    <h1>Register</h1>
                </header>
                <form id="register-form" class="main-form pad-large" @submit=${onSubmit}>
                    <div class="error" style="display:none">Error message.</div>
                    <label>E-mail: <input type="text" name="email"></label>
                    <label>Username: <input type="text" name="username"></label>
                    <label>Password: <input type="password" name="password"></label>
                    <label>Repeat: <input type="password" name="repass"></label>
                    <input class="action cta" type="submit" value="Create Account">
                </form>
                <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a>
                </footer>
            </article>
        </section>
`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)));
};

async function onSubmit(ctx, data, event){
    let errorDiv = document.querySelector('.error');
    try {
        if(data.repass != data.password){
            throw Error('Passwords do not match!')
        };
        if(validateEmail(data.email)==false){
            throw Error('Invalid email!');
        };
        if(data.username.length < 3){
            throw Error('Username must be at least 3 characters!')
        };
        if(data.password.length < 3){
            throw Error('Password must be at least 3 characters/digits!')
        };

        await register(data.email, data.password, data.username);
        event.target.reset();
        ctx.page.redirect('/my-teams');

    } catch (err) {
        errorDiv.textContent = err.message;
        errorDiv.style.display = '';
        throw err;
    };

    
}

