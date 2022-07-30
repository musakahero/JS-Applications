import { request } from "./api.js";
import { goToDashboard } from "./dashboard.js";
import { createDetails, showView } from "./dom.js";

const ideaDetails = document.getElementById('ideaDetails');
ideaDetails.addEventListener('click', async (ev) => {
    await request('delete', `data/ideas/${ev.target.dataset.id}`);
    goToDashboard();
})

export function goToIdeaDetails() {
    showView(document.getElementById('ideaDetails'));
    
};

export async function onDetails(ev) {

    if (ev.target.tagName == 'A') {
        ev.preventDefault();

        const idea = await request('get', `data/ideas/${ev.target.dataset.id}`);
        ideaDetails.replaceChildren(createDetails(idea));
        showView(ideaDetails);
    }

}
