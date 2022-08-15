import * as api from "./api.js"

const endpoints = {
    byId: '/data/books/',
    create: '/data/books',
    edit: '/data/books/',
    del: '/data/books/',
    books:`/data/books?sortBy=_createdOn%20desc`,
    like:`/data/likes`
    
};

export async function getById(id) {
    return api.get(endpoints.byId + id);
};

export async function getByUser(userId) {
    return api.get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
};

export async function getAll(){
    return api.get(endpoints.books);
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

export async function addLike(bookId){
    return api.post(endpoints.like, { bookId })
}
export async function getTotalLikes(bookId){
    return api.get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
}
export async function checkLikes(bookId, userId){
    return api.get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}