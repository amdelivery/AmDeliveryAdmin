import {v4 as uuid} from 'uuid';


const initialState = {
    allItems: [],
    saveDone: true,
    ChangedItem: null,
    categories: [],
    itemInSidePanel: {
        _id: uuid(),
        name: "",
        description: "",
        imgUrl: "",
        price: "",
        avalaible: true,
        category: {
            name: "",
            weight: ""
        }
    },

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_DATA": {
            const allCat = action.payload.map(item => item.category.name);
            const categories = [];
            allCat.filter(cat => categories.includes(cat) ? null : categories.push(cat));
            return {
                ...state,
                allItems: action.payload,
                categories: [...categories]
            }
        }
        
        case "ADD_NEW_ITEM":
            return {
                ...state,
                allItems: [...state.allItems, action.payload]
            }

        case "CHANGE_ITEM":
            return {
                ...state,
                ChangedItem: action.payload
            }

        case "DELETE_ONE": {
            const index = state.allItems.indexOf(action.payload);
            console.log(index, action.payload)
            return {
                ...state,
                allItems: [...state.allItems.slice(0, index), ...state.allItems.slice(index + 1)]
            }
        }

        case "CHANGE_EXIST": {
            const index = state.allItems.findIndex(item => item._id === action.payload._id)
            return {
                ...state,
                allItems: [...state.allItems.slice(0, index), action.payload, ...state.allItems.slice(index + 1)]
            }
        }

        case "SELECT_ITEM": {
            return {
                ...state,
                itemInSidePanel: {
                    _id: action.payload._id,
                    name: action.payload.name,
                    description: action.payload.description,
                    imgUrl: action.payload.imgUrl,
                    price: action.payload.price,
                    avalaible: true,
                    category: {
                        name: action.payload.category.name,
                        weight: action.payload.category.weight
                    }
                }
            }
        }

        case "CHANGE_NAME": {
            console.log(action.payload)
            return {
                ...state,
                itemInSidePanel: {
                    ...state.itemInSidePanel,
                    name: action.payload
                }
            }
        }
        
        case "CHANGE_DESCRIPTION": {
            return {
                ...state,
                itemInSidePanel: {
                    ...state.itemInSidePanel,
                    description: action.payload
                }
            }
        }

        case "CHANGE_PRICE": {
            return {
                ...state,
                itemInSidePanel: {
                    ...state.itemInSidePanel,
                    price: action.payload
                }
            }
        }

        case "CHANGE_IMGURL": {
            return {
                ...state,
                itemInSidePanel: {
                    ...state.itemInSidePanel,
                    imgUrl: action.payload
                }
            }
        }

        case "CHANGE_CATEGORY_NAME": {
            return {
                ...state,
                itemInSidePanel: {
                    ...state.itemInSidePanel,
                    category: {
                        ...state.itemInSidePanel.category,
                        name: action.payload
                    }
                }
            }
        }

        case "CHANGE_CATEGORY_WEIGHT": {
            return {
                ...state,
                itemInSidePanel: {
                    ...state.itemInSidePanel,
                    category: {
                        ...state.itemInSidePanel.category,
                        weight: action.payload
                    }
                }
            }
        }
        
        case "CLEAR_SIDE_PANEL" : {
            return {
                ...state,
                ChangedItem: null,
                itemInSidePanel: initialState.itemInSidePanel
            }
        }

        case "SAVE_DONE_TOGGLE": {
            console.log(state.saveDone)
            return {
                ...state,
                saveDone: !state.saveDone
            }
        }
            
        default :
        return state
    }
}

export default reducer;
