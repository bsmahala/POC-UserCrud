import { userActionNames } from '../actions/actionNames';
// user operation reducer
export const users = (state={selected: undefined, list: []}, action) => {
    switch (action.type) {
        case userActionNames.LIST:
            return  {selected:undefined, list: action.payload};
        case userActionNames.SELECTUSER:
            return  {selected: action.payload, list: state.list};
        case userActionNames.ADDUPDATE:
            return  {selected: undefined, list: state.list};    
        case userActionNames.DELETEUSER:
            return {selected: undefined, list: [ ...state.list.filter(e=>e.id !== action.payload.id)]};
        default:
            return state;
    }
}