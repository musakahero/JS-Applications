import { getAllIdeas } from "../api/data.js";
import { createIdeaPreview } from "../../templates/ideaPreview.js";

const section = document.getElementById('dashboard-holder');
section.addEventListener('click', onDetailsSelect);

let ctx = null;

export async function showCatalog(context) {
    ctx = context;
    context.showSection(section);
 
    createIdeaPreview(await getAllIdeas(), section);
   
};

function onDetailsSelect(ev){
    if(ev.target.tagName == 'A'){
        ev.preventDefault();
        const id = ev.target.dataset.id;
        if(id){
            ctx.goTo('/details', id);
        }
    }
}