import { 
    ADD_SHOPPING_LIST, 
    FETCH_SHOPPING_LIST,
    COMPLETE_SHOPPING_ITEM,
    DELETE_SHOPPING_ITEM
} from "../actions/types";
import _ from 'lodash';

const shoppingListReducer = (state = {}, action) => {
    switch(action.type) {
        case ADD_SHOPPING_LIST:
            return {...state, [action.payload.userId]: { item: action.payload.item}, completed: false }

        case FETCH_SHOPPING_LIST:
            return {..._.mapKeys(action.payload, 'id')}

        case COMPLETE_SHOPPING_ITEM:
            return {...state, [action.payload.id]: action.payload }

        case DELETE_SHOPPING_ITEM:
            return _.omit(state, action.payload)

        default:
            return state;
    }
}

export default shoppingListReducer;