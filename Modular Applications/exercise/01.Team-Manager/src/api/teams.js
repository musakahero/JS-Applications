import * as api from "./api.js"

let pageSize = 2;

const endpoints = {
    byId: '/data/teams/',
    create: '/data/teams',
    edit: '/data/teams/',
    del: '/data/teams/',
    count: '/data/teams?count',
    // recent: '/data/recipes?select=_id%2Cname%2Cimg&sortBy=_createdOn%20desc&pageSize=3',
    teams: `/data/teams?pageSize=${pageSize}&offset=`,
    teams0: `/data/teams?pageSize=${pageSize}&offset=`,
    members: '/data/members?where=status%3D%22member%22'
};

// export async function getRecent() {
//     return api.get(endpoints.recent);
// };

export async function getById(id) {
    return api.get(endpoints.byId + id);
};

export async function getAll(page = 1) {
    const [teams, count] = await Promise.all([
            api.get(endpoints.teams0 + (page-1) * pageSize),
            api.get(endpoints.count)
        ]);
        
    return {
        teams,
        pages:Math.ceil(count/pageSize)
    }
};

export async function create(data) {
    return api.post(endpoints.create, data);
};

export async function edit(id, data) {
    return api.put(endpoints.edit + id, data);
};

export async function del(id) {
    return api.del(endpoints.del + id);
};

export async function getMembers() {
    return api.get(endpoints.members);
}