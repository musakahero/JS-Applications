import * as api from "./api.js"

const endpoints = {
    byId: '/data/memes/',
    create: '/data/memes',
    edit: '/data/memes/',
    del: '/data/memes/',
    memes:`/data/memes?sortBy=_createdOn%20desc`
};

export async function getById(id) {
    return api.get(endpoints.byId + id);
};

export async function getByUser(id) {
    return api.get(`/data/memes?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);
};

export async function getAll(){
    return api.get(endpoints.memes);
}

export async function create(data) {
    return api.post(endpoints.create, data);
};

export async function edit(id, data) {
    return api.put(endpoints.edit + id, data);
};

export async function del(id) {
    return api.del(endpoints.del + id);
};