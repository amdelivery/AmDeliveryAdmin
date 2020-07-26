import {v4 as uuid} from 'uuid';


const initialState = {
    allItems: [],
    allUsers: [],
    currentUser: {
        name: "",
        password: "",
        type: "",
        login: "",
        restId: "",
        worktime: "",
        adress: ""
    },
    ChangedItem: null,
    categories: [],
    categoriesModalIsOpen: false,
    userEditModalIsOpen: false,
    categoryForEdit: null,
    saveDone: true,
    authDone: false,
    itemInSidePanel: {
        _id: "",
        name: "",
        description: "",
        imgUrl: "",
        price: "",
        available: "Да",
        category: "Без категории",
        resto: "Admin"
    },

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_DATA": {
            return {
                ...state,
                allItems: action.payload,
                categoriesModalIsOpen: false
            }
        }

        case "START": {
            return {
                ...state,
                categories: action.payload
            }
        }

        case "SET_CUR_USER": {
            return {
                ...state,
                currentUser: {
                    name: action.payload.name,
                    password: action.payload.password,
                    type: action.payload.type,
                    login: action.payload.login,
                    restId: action.payload.restId,
                    worktime: action.payload.worktime,
                    adress: action.payload.adress
                },
                authDone: true
            }
        }
        
        case "GET_ALL_USERS": {
            return {
                ...state,
                allUsers: action.payload

            }
        }

        case "CHANGE_ITEM":
            return {
                ...state,
                ChangedItem: action.payload
            }


        case "SELECT_ITEM": {
            console.log(state.itemInSidePanel)
            return {
                ...state,
                itemInSidePanel: {
                    _id: action.payload._id,
                    name: action.payload.name,
                    description: action.payload.description,
                    imgUrl: action.payload.imgUrl,
                    price: action.payload.price,
                    available: action.payload.available,
                    category: action.payload.category,
                    resto: action.payload.resto
                }
            }
        }

        case "CHANGE_NAME": {
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

        case "CHANGE_RESTO": {
            return {
                ...state,
                itemInSidePanel: {
                    ...state.itemInSidePanel,
                    resto: action.payload
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

        case "CHANGE_AVAILABLE": {
            console.log(state.itemInSidePanel.available);
            return {
                ...state,
                itemInSidePanel: {
                    ...state.itemInSidePanel,
                    available: action.payload
                }
            }
        }

        case "CHANGE_CATEGORY": {
            console.log(action.payload)
            return {
                ...state,
                itemInSidePanel: {
                    ...state.itemInSidePanel,
                    category: action.payload
                }
            }
        }

        
        case "CLEAR_SIDE_PANEL" : {
            return {
                ...state,
                ChangedItem: null,
                itemInSidePanel: {
                    ...initialState.itemInSidePanel,
                    _id: ""
               }
            }
        }

        case "CAT_MODAL_OPEN": {
            return {
                ...state,
                categoriesModalIsOpen: true,
                categories: action.payload,
                categoryForEdit: null,
                allItems: []
            }
        }

        case "CAT_EDIT": {
            let categorySearch = null;
            state.categories.filter(cat => (cat._id === action.payload) ? categorySearch = cat : null);
            console.log(categorySearch);
            return {
                ...state,
                categoryForEdit: categorySearch
            }
        }

        case "CLEAR_CAT_FOR_EDIT": {
            return {
                ...state,
                categoryForEdit: null
            }
        }

        case "ADD_NEW_MOD": {
            const emptyMod = {name: "", price: "", id: uuid()};
            return {
                ...state,
                categoryForEdit: {
                    ...state.categoryForEdit,
                    modificators: [...state.categoryForEdit.modificators, emptyMod]
                }
            }
        }

        case "DEL_MOD": {
            const index = state.categoryForEdit.modificators.findIndex(item => item.id === action.payload);
            return {
                ...state,
                categoryForEdit: {
                    ...state.categoryForEdit,
                    modificators: [...state.categoryForEdit.modificators.slice(0, index), ...state.categoryForEdit.modificators.slice(index + 1)]
                }
            }
        }

        case "CHANGE_MOD_NAME": {
            const index = state.categoryForEdit.modificators.findIndex(item => item.id === action.payload.id);
            const modForEdit = state.categoryForEdit.modificators.filter(item => item.id === action.payload.id);
            const modWithChangedName = {
                id: modForEdit[0].id,
                price: modForEdit[0].price,
                name: action.payload.value
            };
            return {
                ...state,
                categoryForEdit: {
                    ...state.categoryForEdit,
                    modificators: [...state.categoryForEdit.modificators.slice(0, index), modWithChangedName, ...state.categoryForEdit.modificators.slice(index + 1)]
                }
            }
        }

        case "CHANGE_MOD_PRICE": {
            const index = state.categoryForEdit.modificators.findIndex(item => item.id === action.payload.id);
            const modForEdit = state.categoryForEdit.modificators.filter(item => item.id === action.payload.id);
            const modWithChangedPrice = {
                id: modForEdit[0].id,
                price: action.payload.value,
                name: modForEdit[0].name
            };
            return {
                ...state,
                categoryForEdit: {
                    ...state.categoryForEdit,
                    modificators: [...state.categoryForEdit.modificators.slice(0, index), modWithChangedPrice, ...state.categoryForEdit.modificators.slice(index + 1)]
                }
            }
        }

        case "CHANGE_CAT_NAME": {
            return {
                ...state,
                categoryForEdit: {
                    ...state.categoryForEdit,
                    name: action.payload
                }
            }
        }

        case "CHANGE_CAT_WEIGHT": {
            return {
                ...state,
                categoryForEdit: {
                    ...state.categoryForEdit,
                    weight: action.payload
                }
            }
        }

        case "ADD_NEW_CAT": {
            return {
                ...state,
                categoryForEdit: {
                    name: "",
                    weight: "",
                    modificators: []
                }
            }
        }

        case "USER_EDIT_MODAL": {
            return {
                ...state,
                userEditModalIsOpen: !state.userEditModalIsOpen
            }
        }

            
        default :
        return state
    }
}

export default reducer;
