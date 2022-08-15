let userLinks = Array.from(document.querySelectorAll('.user'));
let guestLinks = Array.from(document.querySelectorAll('.guest'));


export function updateNav(ctx, next) {
    if(ctx.user) {
        userLinks.map(l => l.style.display = '');
        guestLinks.map(l => l.style.display = 'none');
    } else {
        userLinks.map(l => l.style.display = 'none');
        guestLinks.map(l => l.style.display = '');
    };
    next();
}