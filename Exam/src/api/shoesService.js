import * as api from "./api.js"

const endpoints = {
    byId: '/data/shoes/',
    create: '/data/shoes',
    edit: '/data/shoes/',
    del: '/data/shoes/',
    shoes:`/data/shoes?sortBy=_createdOn%20desc`,
    
};

export async function getById(id) {
    return api.get(endpoints.byId + id);
};

export async function getByUser(userId) {
    return api.get(`/data/shoes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
};

export async function getAll(){
    return api.get(endpoints.shoes);
}

export async function create(data) {
    return api.post(endpoints.create, data);
};

export async function edit(shoesId, data) {
    return api.put(endpoints.edit + shoesId, data);
};

export async function del(shoesId) {
    return api.del(endpoints.del + shoesId);
};

// export async function addLike(shoesId){
//     return api.post(endpoints.like, { shoesId })
// }
// export async function getTotalLikes(bookId){
//     return api.get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
// }
// export async function checkLikes(bookId, userId){
//     return api.get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
// }