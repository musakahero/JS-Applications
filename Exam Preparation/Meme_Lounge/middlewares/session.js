import { getUserData } from "../src/util.js";

export function addSession(ctx, next){
    ctx.user = getUserData();
    next();
}