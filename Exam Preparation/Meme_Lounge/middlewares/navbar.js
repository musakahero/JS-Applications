
export function updateNav(ctx, next) {
    let userLinks = document.querySelector('div.user');
    let guestLinks = document.querySelector('div.guest');

    if(ctx.user) {
        userLinks.style.display = '';
        guestLinks.style.display = 'none';
        document.querySelector('div.profile span').textContent = `Welcome, ${ctx.user.username}`;
    } else {
        userLinks.style.display = 'none';
        guestLinks.style.display = '';
    };

    next();
}