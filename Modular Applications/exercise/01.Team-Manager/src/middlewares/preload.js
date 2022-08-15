import * as teamsService from "../api/teams.js"

export async function preloadSingle(ctx, next){
    const recipeId = ctx.params.id;
    const recipe = await teamsService.getById(recipeId);
    ctx.recipe = recipe;

    if(ctx.user && ctx.user._id == recipe._ownerId) {
        recipe._isOwner = true;
    } else {
        recipe._isOwner = false;
    };
    next();
};

export async function preloadAll(ctx, next){
    const {teams, pages} = await teamsService.getAll();
    ctx.teams = teams;
    ctx.pages = pages;

    const membersList = await teamsService.getMembers();
    ctx.membersList = membersList;
    next();
};

