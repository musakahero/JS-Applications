import { html, nothing } from "../../node_modules/lit-html/lit-html.js"

const browseTemplate = (user, teams, members, pages, page) => html`
<section id="browse">
            <article class="pad-med">
                <h1>Team Browser</h1>
            </article>
            
            <article class="layout narrow" style="display:${user ? 'default' : 'none'}">
                <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
            </article>
            ${pager(page, pages)}
            ${teams.map(t => teamPreviewTemplate(members, t))}

        </section>
`;

const teamPreviewTemplate = (members, team) => {
    let membersCount = members.filter(m => m.teamId == team._id).length;

    return html`
    <article class="layout">
                        <img src=${team.logoUrl} class="team-logo left-col">
                        <div class="tm-preview">
                            <h2>${team.name}</h2>
                            <p>${team.description}</p>
                            <span class="details">${membersCount} Members</span>
                            <div><a href="/details/${team._id}" class="action">See details</a></div>
                        </div>
                    </article>
    `
}


export function browsePage(ctx){
    const query = parseQuerystring(ctx.querystring);
    const page = Number(query.page) || 1;

    console.log(ctx.teams);
    ctx.render(browseTemplate(ctx.user, ctx.teams, ctx.membersList, ctx.pages, page));
};

const pager = (page, pages) => html`
<header class="section-title">
    Page ${page} of ${pages}
    ${page != 1 ? html`<a class="pager" href="/browse?page=${page-1}">&lt;Prev</a>`: nothing}
    ${page < pages ? html`<a class="pager" href="/browse?page=${page+1}">Next&gt;</a>`: nothing}
    </header>
`;

export function parseQuerystring(query = '') {
    return Object.fromEntries(query.split('&').map(kvp => kvp.split('=')));
};

