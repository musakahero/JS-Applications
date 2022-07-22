import { request } from "./api.js";
import { showView } from "./dom.js";
import { userNav } from "./util.js";

const signInView = document.getElementById('signIn');
const form = signInView.querySelector('form');
form.addEventListener('submit', onSubmit);

//sign-in redirect
form.querySelector('a').addEventListener('click', (ev) => {
    ev.preventDefault();
    showView(document.getElementById('register'));
})

export function goToSignIn(){
    showView(signInView);
};

async function onSubmit(ev){
    ev.preventDefault();

    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const data = Object.fromEntries([...formData.entries()]);
    
    try {
        if(email.length < 3){
            throw Error('Email must be at least 3 characters long!')
        };
        if(password.length < 3){
            throw Error('Password must be at least 3 characters long!')
        }
    } catch (err) {
        alert(err.message);
        throw err;
    }

    const responseData = await request('post', 'users/login', data);
    sessionStorage.setItem('user', JSON.stringify(responseData));
    form.reset();
    userNav();
    showView(document.getElementById('home'));
}

