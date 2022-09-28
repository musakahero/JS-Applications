export function updateNav(ctx, next) {
    let userLinks = document.querySelector('div.user');
    let guestLinks = document.querySelector('div.guest');

    if(ctx.user) {
        userLinks.style.display = '';
        guestLinks.style.display = 'none';
    } else {
        userLinks.style.display = 'none';
        guestLinks.style.display = '';
    };

    next();
}