import page from "../node_modules/page/page.mjs";
import { updateInfo } from '../app.js'


export const onLogout = async () => {
    let token = JSON.parse(localStorage.getItem('user')).accessToken;

    let res = await fetch('http://localhost:3030/users/logout', {
        method:'get',
        headers:{
            'Content-Type':'application/json',
            'X-Authorization':token
        }
    });

    if(!res.ok){
        const error = await res.json();
        throw Error(error.message);
    } else {
        localStorage.clear();
        page.redirect('/catalog');
        updateInfo(); 
    }
}