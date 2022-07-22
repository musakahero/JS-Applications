import { request } from "./api.js";
import { createIdeaCard, showView } from "./dom.js";
import { onDetails } from "./ideaDetails.js";

const dashboardHolder = document.getElementById('dashboard-holder');
dashboardHolder.addEventListener('click', onDetails);

export async function goToDashboard() {
    showView(dashboardHolder);

    let contents = await request('get', 'data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc');
    dashboardHolder.replaceChildren(...contents.map(createIdeaCard));
};