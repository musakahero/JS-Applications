import {hideAllViews, showView} from "./dom.js";
import { userNav } from "./util.js";
import { goToCreateIdea } from "./createIdea.js";
import { goToDashboard } from "./dashboard.js";
import { goToHome } from "./home.js";
import { goToRegister } from "./register.js";
import { goToSignIn } from "./signin.js";
import { request } from "./api.js";

//initial setup
userNav();
//hideAllViews();

//routing table
const navigation = {
    '/':goToHome,
    '/dashboard':goToDashboard,
    '/create':goToCreateIdea,
    '/logout':goToLogout,
    '/sign-in':goToSignIn,
    '/register':goToRegister
}

//Initialize app
navigation['/']();
document.getElementById('navbar').addEventListener('click', onNavigate);

function onNavigate(ev){
    if(ev.target.tagName == 'A' && ev.target.href){
        ev.preventDefault();
        const pathname = (new URL(ev.target.href)).pathname;

        navigation[pathname]();
    }
}

export function goToLogout(){
    request('get', 'users/logout');
    sessionStorage.removeItem('user');
    navigation['/']();
    userNav();
}
