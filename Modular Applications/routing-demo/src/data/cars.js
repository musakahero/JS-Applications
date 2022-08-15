import * as api from './api.js';


const endpoints = {
    cars: '/data/cars',
    carById: '/data/cars/',
};

export async function getAllCars() {
    return api.get(endpoints.cars);
}

export async function getById(id) {
    return api.get(endpoints.carById + id);
}