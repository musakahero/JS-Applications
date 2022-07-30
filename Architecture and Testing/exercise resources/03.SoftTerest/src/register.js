import { request } from "./api.js";
import { showView } from "./dom.js";
import { goToSignIn } from "./signin.js";
import { userNav } from "./util.js";
const registerView = document.getElementById('register');
const form = registerView.querySelector('form')
form.addEventListener('submit', onSubmit);

//sign-in redirect
form.querySelector('a').addEventListener('click', (ev) => {
    ev.preventDefault();
    goToSignIn();
})

export function goToRegister(){
    showView(registerView);
    //make nav button active
    document.querySelector(`a[href="/register"]`).parentElement.classList.add('active');
};

async function onSubmit(ev){
    ev.preventDefault();

    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const repass = formData.get('repeatPassword');
    const data = Object.fromEntries([...formData.entries()]);
    delete data.repeatPassword;

    try {
        if(email.length < 3){
            throw Error('Email must be at least 3 characters long!')
        };
        if(password.length < 3){
            throw Error('Password must be at least 3 characters long!')
        }
        if(password != repass){
            throw Error('Paswords must match!');
        }
    } catch (err) {
        alert(err.message);
        throw err;
    }

    const responseData = await request('post', 'users/register', data);
    sessionStorage.setItem('user', JSON.stringify(responseData));
    form.reset();
    userNav();
    showView(document.getElementById('home'));
    
}

