export function updateNav(ctx, next) {
    let userLinks = document.querySelector('#user');
    let guestLinks = document.querySelector('#guest');

    if(ctx.user) {
        userLinks.style.display = '';
        guestLinks.style.display = 'none';
        document.querySelector('#user span').textContent = `Welcome, ${ctx.user.email}`;
    } else {
        userLinks.style.display = 'none';
        guestLinks.style.display = '';
    };

    next();
}