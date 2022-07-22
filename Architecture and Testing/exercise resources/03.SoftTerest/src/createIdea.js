import { showView } from "./dom.js";
const createIdeaView = document.getElementById('createIdea');

export function goToCreateIdea(){
    showView(createIdeaView);
};