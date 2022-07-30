import { request } from "./api.js";
import { goToDashboard } from "./dashboard.js";
import { showView } from "./dom.js";
const createIdeaView = document.getElementById('createIdea');
const form = createIdeaView.querySelector('form');
form.addEventListener('submit', onSubmit);

export function goToCreateIdea(){
    showView(createIdeaView);
    //make nav button active
    document.querySelector(`a[href="/create"]`).parentElement.classList.add('active');
};

async function onSubmit(ev){
    ev.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageURL');

    try {
        if(title.length < 6){
            throw Error('Title must be at least 6 characters long!');
        }
        if(description.length < 10){
            throw Error('Description must be at least 10 characters long!');
        }
        if(img.length < 5){
            throw Error('Image URL must be at least 5 characters long!');
        }
    } catch (err) {
        alert(err.message);
        throw err;
    }

    await request('post', 'data/ideas', {title, description, img});

    form.reset();
    goToDashboard();
}