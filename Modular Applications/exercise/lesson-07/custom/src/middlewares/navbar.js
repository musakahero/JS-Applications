let userLinks = document.getElementById('user');
let guestLinks = document.getElementById('guest');

let links = {
    '/catalog': document.getElementById('catalog'),
    '/create': document.getElementById('create'),
    '/login': document.getElementById('login'),
    '/register': document.getElementById('register')
};

export function updateNav(ctx, next) {
    Object.values(links).forEach(l => l.classList.remove('active'));
    let current = links[ctx.pathname];
    if(current){
        current.classList.add('active');
    };

    if(ctx.user) {
        userLinks.style.display = '';
        guestLinks.style.display = 'none';
    } else {
        userLinks.style.display = 'none';
        guestLinks.style.display = '';
    };

    next();
}