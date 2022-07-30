import { goToDashboard } from "./dashboard.js";
import { showView } from "./dom.js";
import { goToRegister } from "./register.js";

const homeView = document.getElementById('home');

export function goToHome(){
    showView(homeView);
    

    homeView.querySelector('a').addEventListener('click', (ev) => {
        ev.preventDefault();

        const user = JSON.parse(sessionStorage.getItem('user'));
        if(user == null){
            goToRegister();
        } else {
            goToDashboard();
        }
        
    });
};