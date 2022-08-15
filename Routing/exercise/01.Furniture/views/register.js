import page from "../node_modules/page/page.mjs";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { updateInfo } from '../app.js'

let registerTemplate = () => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class="form-control" id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class="form-control" id="password" type="password" name="password">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>
`;

async function onSubmit(e) {
    e.preventDefault();
    
    let form = document.querySelector('form');
    let formData = new FormData(form);
    let email = formData.get('email');
    let password = formData.get('password');
    let repass = formData.get('rePass');

    if(password != repass){
        alert('Passwords do not match!');
        return;
    }
    try {
        let res = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            const error = await res.json();
            throw Error(error.message);
        } else {
            let data = await res.json();
            console.log(data);
            localStorage.setItem('user', JSON.stringify(data));
            form.reset();
            updateInfo();
            page.redirect('/catalog');
        }
    } catch (err){
        alert(err.message);
    }
};

export const registerView = (ctx) => render(registerTemplate(), document.querySelector('.container'));