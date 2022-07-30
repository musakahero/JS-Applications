import { request } from "./api.js";

export function hideAllViews() {
    document.querySelectorAll('.view').forEach(e => e.style.display = 'none');
    //remove active
    document.querySelectorAll('nav li.active').forEach(e => e.classList.remove('active'));
};

export function showView(section) {
    hideAllViews();
    document.querySelector('nav').style.display = '';
    section.style.display = '';
}

export function createDetails(idea) {
    const fragment = document.createDocumentFragment();
    const image = createEl('img', '', fragment, 'det-img');
    image.src = idea.img;
    const descDiv = createEl('div', '', fragment, 'desc');
    createEl('h2', idea.title, descDiv, 'display-5');
    createEl('p', 'Description:', descDiv, 'infoType');
    createEl('p', idea.description, descDiv, 'idea-description');

    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user != null && user._id == idea._ownerId) {
        const deleteDiv = createEl('div', '', fragment, 'text-center');
        const deleteBtn = createEl('a', 'Delete', deleteDiv, 'btn detb');
        deleteBtn.dataset.id = idea._id;
        
    }
    return fragment;
}

export function createIdeaCard(idea) {
    const mainDiv = document.createElement('div');
    mainDiv.className = 'card overflow-hidden current-card details';
    mainDiv.style = 'width: 20rem; height: 18rem;';
    const cardBodyDiv = createEl('div', '', mainDiv, 'card-body');
    createEl('p', `${idea.title}`, cardBodyDiv, 'card-text');
    const image = createEl('img', '', mainDiv, 'card-image');
    image.src = `${idea.img}`;
    image.alt = 'Card image cap';
    const detailsBtn = createEl('a', 'Details', mainDiv, 'btn');
    detailsBtn.href = '';
    detailsBtn.dataset.id = idea._id;

    return mainDiv;
}

function createEl(type, content, parentEl, className) {
    const element = document.createElement(type);
    element.textContent = content;

    if (className) {
        element.className = className;
    }

    parentEl.appendChild(element);
    return element;
}