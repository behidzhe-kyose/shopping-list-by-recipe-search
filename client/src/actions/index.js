import { 
    SIGN_IN, 
    SIGN_OUT, 
    GET_RECIPES, 
    GET_RECIPE,
    ADD_SHOPPING_LIST, 
    FETCH_SHOPPING_LIST, 
    COMPLETE_SHOPPING_ITEM,
    DELETE_SHOPPING_ITEM
} from "./types";
import recipe from '../apis/recipe';
import shopping from '../apis/shopping';
import history from '../history'


export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

export const getRecipes = (term) => async dispatch => {
    history.push('/');
    const response = await recipe.get(`/complexSearch`, {
        params: {
            query: term,
            addRecipeNutrition: true,
            addRecipeInformation: true
        }
    });
    dispatch({ type: GET_RECIPES, payload: response.data.results })
}

export const getRecipe = (id) => async dispatch => {
    console.log(id)
    const response = await recipe.get(`/informationBulk?ids=${id}`, {
        params: {
            includeNutrition: true
        }
    })
    console.log(response.data)
    dispatch({ type: GET_RECIPE, payload: response.data })
}

export const addShoppingListItem = (item) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await shopping.post(`/shopping`, {userId, item: item, completed: false} );

    dispatch({ type: ADD_SHOPPING_LIST, payload: response.data })
}

export const completeShoppingListItem = (id, completed) => async dispatch => {
    const response = await shopping.patch(`/shopping/${id}`, { completed: !completed } );

    dispatch({ type: COMPLETE_SHOPPING_ITEM, payload: response.data })
}

export const deleteShoppingListItem = (id) => async dispatch => {
    await shopping.delete(`/shopping/${id}`)

    dispatch({ type: DELETE_SHOPPING_ITEM, payload: id })
}

export const fetchShoppingList = (userId) => async dispatch => {
    const response = await shopping.get(`/shopping?userId=${userId}`);

    dispatch({ type: FETCH_SHOPPING_LIST, payload: response.data})
}

