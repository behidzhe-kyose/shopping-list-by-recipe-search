import { combineReducers } from "redux";
import googleReducer  from "./googleReducer";
import getRecipesReducer from "./getRecipesReducer";
import shoppingListReducer from "./shoppingListReducer";

export default combineReducers({
    recipes: getRecipesReducer,
    auth: googleReducer,
    shopping: shoppingListReducer,
})