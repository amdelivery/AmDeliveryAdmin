import {GET_DATA,
        ADD_NEW_ITEM, 
        CHANGE_ITEM, 
        DELETE_ONE, 
        CHANGE_EXIST, 
        SELECT_ITEM, 
        CHANGE_NAME, 
        CHANGE_DESCRIPTION, 
        CHANGE_PRICE, 
        CHANGE_IMGURL, 
        CHANGE_CATEGORY_NAME, 
        CHANGE_CATEGORY_WEIGHT, 
        CLEAR_SIDE_PANEL,
        CLEAR_DB,
        SAVE_DB} from './types.js';
import axios from 'axios';

export const getAllItems = () => dispatch => {
    axios.get('/api').then(res => dispatch({
        type: GET_DATA,
        payload: res.data
    }))
}


export const addNewItem = (item) => {
    return {
        type: ADD_NEW_ITEM,
        payload: item
    }
}

export const changeItem = (item) => {
    return {
        type: CHANGE_ITEM,
        payload: item
    }
}

export const deleteOneItem = (item) => {
    return {
        type: DELETE_ONE,
        payload: item
    }
}

export const changeExistItem = (item) => {
    return {
        type: CHANGE_EXIST,
        payload: item
    }
}

export const selectItem = (item) => {
    return {
        type: SELECT_ITEM,
        payload: item
    }
}

export const clearState = () => {
    return {
        type: CLEAR_SIDE_PANEL
    }
}


export const changeName = (value) => {
    return {
        type: CHANGE_NAME,
        payload: value
    }
}

export const changeDescription = (value) => {
    return {
        type: CHANGE_DESCRIPTION,
        payload: value
    }
}

export const changePrice = (value) => {
    return {
        type: CHANGE_PRICE,
        payload: value
    }
}

export const changeImgUrl = (value) => {
    return {
        type: CHANGE_IMGURL,
        payload: value
    }
}

export const changeCategoryName = (value) => {
    return {
        type: CHANGE_CATEGORY_NAME,
        payload: value
    }
}

export const changeCategoryWeight = (value) => {
    return {
        type: CHANGE_CATEGORY_WEIGHT,
        payload: value
    }
}



export const clearDb = (allItems) => async dispatch => {
       await dispatch ({
               type: CLEAR_DB  
       }); 
       await dispatch ({
               type: SAVE_DB,
               payload: allItems
       });
       
}






