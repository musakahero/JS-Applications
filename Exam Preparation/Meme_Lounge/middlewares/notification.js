import {html, render, nothing} from "../node_modules/lit-html/lit-html.js"

const notificationSection = document.querySelector('#notifications');

export function decorateContextNotification(ctx, next){
    ctx.notificationState = notificationState;
    next();
};

function notificationState(bool, error){
    
    const errorTemplate = (err) => html`
    <div id="errorBox" class="notification" style="display:inline">
        <span>${err.message}</span>
    </div>
    `;

    if(!bool){
        render(errorTemplate(error), notificationSection);
        document.addEventListener('focusin', () => render(nothing, notificationSection));
    };
}