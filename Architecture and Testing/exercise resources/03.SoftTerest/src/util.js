export function userNav(){
    const user = JSON.parse(sessionStorage.getItem('user'));
    //console.log(user);
    if(user == null){
        document.querySelectorAll('.user').forEach(e => e.style.display = 'none');
        document.querySelectorAll('.guest').forEach(e => e.style.display = '');
    } else {
        document.querySelectorAll('.user').forEach(e => e.style.display = '');
        document.querySelectorAll('.guest').forEach(e => e.style.display = 'none');
    }
}

export function loadingBar(section){
    let p = document.createElement('p');
    p.textContent = 'Brainstorming, please wait...';
    section.replaceChildren(p);
};