export function createHistoryRouter(main, views,start){
    window.addEventListener('popstate', () => start(getName()));
    document.body.addEventListener('click', ev => {
        if(ev.target.tagName == 'A'){
            window.history.pushState(null, '', ev.target.href);
            if(start(getName())){
                ev.preventDefault();
            }
        }
    })
    return getName;

    function getName(){
        return window.location.pathname;

    }
}

