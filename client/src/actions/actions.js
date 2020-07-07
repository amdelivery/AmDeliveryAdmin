import {START,
        GET_DATA, 
        CHANGE_ITEM,
        SELECT_ITEM, 
        CHANGE_NAME, 
        CHANGE_DESCRIPTION, 
        CHANGE_PRICE, 
        CHANGE_IMGURL, 
        CHANGE_CATEGORY,
        CHANGE_CAT_NAME,
        CHANGE_CAT_WEIGHT,
        CHANGE_AVAILABLE,
        CLEAR_SIDE_PANEL,
        CAT_MODAL_OPEN,
        CAT_EDIT,
        CLEAR_CAT_FOR_EDIT,
        ADD_NEW_MOD,
        ADD_NEW_CAT,
        DEL_MOD,
        CHANGE_MOD_PRICE,
        CHANGE_MOD_NAME} from './types.js';
import axios from 'axios';

export const start = () => dispatch => {
    axios.get('/api/category').then(res => dispatch({
        type: START,
        payload: res.data
    }))
}

export const getAllItems = () => dispatch => {
    axios.get('/api').then(res => dispatch({
        type: GET_DATA,
        payload: res.data
    })).then(res => axios.get('/api/category').then(res => dispatch({
        type: START,
        payload: res.data
    })))
}


export const addNewItem = (item) => dispatch =>  {
    axios.post('/api/', item).then(res => alert("Элемент добавлен в базу данных")).then(res => {
        axios.get('/api').then(res => dispatch({
            type: GET_DATA,
            payload: res.data
        })).then(res => axios.get('/api/category').then(res => dispatch({
            type: START,
            payload: res.data
        })))
    })
}

export const changeItem = (item) => {
    return {
        type: CHANGE_ITEM,
        payload: item
    }
}

export const deleteOneItem = (item) => dispatch =>  {
    axios.post('/api/del', item).then(res => alert("Элемент успешно удален")).then(res => {
        axios.get('/api').then(res => dispatch({
            type: GET_DATA,
            payload: res.data
        }))
    })
}

export const changeExistItem = (item) => dispatch => {
    axios.post('/api/item-update', item).then(res => alert("Элемент успешно изменен"))
                                        .then(res => {
                                            axios.get('/api')
                                                .then(res => dispatch({
                                                    type: GET_DATA,
                                                    payload: res.data
                                                }))
                                        })
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

export const changeCategory = (value) => {
    return {
        type: CHANGE_CATEGORY,
        payload: value
    }
}

export const changeAvailable = (value) => {
    return {
        type: CHANGE_AVAILABLE,
        payload: value
    }
}




export const categoriesModalOpen = () => dispatch => {
    axios.get('/api/category').then(res => dispatch({
        type: CAT_MODAL_OPEN,
        payload: res.data
    }))
}

export const categoryEdit = (id) => {
    return {
        type: CAT_EDIT,
        payload: id
    }
}

export const clearCategoryForEdit = () => {
    return {
        type: CLEAR_CAT_FOR_EDIT
    }
}


export const addNewMod = () => {
    return {
        type: ADD_NEW_MOD
    }
}

export const delMod = (id) => {
    return {
        type: DEL_MOD,
        payload: id
    }
}

export const changeModName = (value, id) => {
    return {
        type: CHANGE_MOD_NAME,
        payload: {
            value,
            id
        }
    }
}

export const changeModPrice = (value, id) => {
    return {
        type: CHANGE_MOD_PRICE,
        payload: {
            value,
            id
        }
    }
}

export const changeCatName = (value) => {
    return {
        type: CHANGE_CAT_NAME,
        payload: value
    }
}

export const changeCatWeight = (value) => {
    return {
        type: CHANGE_CAT_WEIGHT,
        payload: value
    }
}

export const addNewCat = () => {
    return {
        type: ADD_NEW_CAT
    }
}


export const delCat = (cat) => dispatch => {
    axios.post('/api/category-delete', cat).then(res => alert('Категория успешно удалена')).then(res => {
        axios.get('/api/category').then(res => dispatch({
            type: CAT_MODAL_OPEN,
            payload: res.data
        }));
    }).catch(err => alert(`Произошла ошибка ${err}`));
}


export const addNewCatInDB = (cat) => dispatch => {
    axios.post('/api/category', cat).then(res => alert('Категория успешно добавлена')).then(res => {
        axios.get('/api/category').then(res => dispatch({
            type: CAT_MODAL_OPEN,
            payload: res.data
        }));
        }).catch(err => alert(`Произошла ошибка ${err}`));
}

export const updateExistCat = (cat) => dispatch => {
    axios.post('/api/category-edit-exist', cat).then(res => alert('Категория успешно обновлена')).then(res => {
        axios.get('/api/category').then(res => dispatch({
            type: CAT_MODAL_OPEN,
            payload: res.data
        }));
    }).catch(err => alert(`Произошла ошибка ${err}`));
}


