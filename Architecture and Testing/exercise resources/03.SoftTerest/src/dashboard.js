import { request } from "./api.js";
import { createIdeaCard, showView } from "./dom.js";
import { onDetails } from "./ideaDetails.js";
import { loadingBar } from "./util.js";

const dashboardHolder = document.getElementById('dashboard-holder');
dashboardHolder.addEventListener('click', onDetails);

export async function goToDashboard() {
    loadingBar(dashboardHolder);

    showView(dashboardHolder);

    //make nav button active
    document.querySelector(`a[href="/dashboard"]`).parentElement.classList.add('active');

    let contents = await request('get', 'data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc');

    if(contents.length > 0){
        dashboardHolder.replaceChildren(...contents.map(createIdeaCard));
    };
   
};