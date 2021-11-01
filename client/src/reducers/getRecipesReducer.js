import { GET_RECIPES, GET_RECIPE } from "../actions/types"

const getRecipesReducer = (state = [], action) => {
    switch(action.type) {
        case GET_RECIPES:
            return action.payload
        case GET_RECIPE:
            return action.payload
        default:
            return state
    }
}

export default getRecipesReducer;