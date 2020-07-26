import React from 'react';
import {connect} from 'react-redux';
import './side_panel.sass';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import PropTypes from 'prop-types';
import {addNewItem, changeExistItem, clearState, changeName, changeDescription, changePrice, changeImgUrl, changeCategory, categoriesModalOpen, changeAvailable, start, changeResto} from '../../actions/actions.js';

const SidePanel = ({itemInSidePanel, clearState, changeName, changeDescription, categories, changePrice, changeImgUrl, changeCategory, addNewItem, changeExistItem, categoriesModalOpen, categoriesModalIsOpen, changeAvailable, ChangedItem, allUsers, changeResto, currentUser}) => {

        
            
        
        return (
            <div className="side-panel">
                <div className={(categoriesModalIsOpen === true) ? "side-panel__overlay" : "hidden"}></div>
                <div className="side-panel__btn-wrapper">
                    <Button onClick={(e) => clearState(e)} className="side-panel__btn-clear">Сброс</Button>
                </div>
                
                <Form className="side-panel__form">
                <FormGroup className="side-panel__form__group">
                    <Label for="name">Название</Label>
                    <Input value={itemInSidePanel.name} onChange={(e) => changeName(e.target.value)} type="text" name="title" id="name" placeholder="Введите название" />
                </FormGroup>
                <FormGroup className="side-panel__form__group">
                    <Label for="description">Описание</Label>
                    <Input value={itemInSidePanel.description} onChange={(e) => changeDescription(e.target.value)} type="text" name="descr" id="description" placeholder="Введите описание" />
                </FormGroup>
                <FormGroup className="side-panel__form__group">
                    <Label for="price">Цена</Label>
                    <Input value={itemInSidePanel.price} onChange={(e) => changePrice(e.target.value)} type="text" name="price" id="price" placeholder="Введите цену" />
                </FormGroup>
                <FormGroup className="side-panel__form__group">
                    <Label for="imgurl">Ссылка на фото блюда</Label>
                    <Input value={itemInSidePanel.imgUrl} onChange={(e) => changeImgUrl(e.target.value)} type="text" name="imgurl" id="imgurl" placeholder="Вставьте ссылку на картинку" />
                </FormGroup>
                <FormGroup className={(currentUser.login === "admin" && ChangedItem) ? "side-panel__form__group" : "hidden"}>
                    <Label for="resto">Ресторан</Label>
                    <Input value={(currentUser.login === "admin") ? itemInSidePanel.resto : currentUser.resto} className="resto" onChange={(e) => changeResto(e.target.value)} type="select" name="resto" id="resto">
                        {allUsers.map(user => {
                            return (
                                <option key={user.name}>{user.name}</option>
                            )
                        })}
                    </Input>
                </FormGroup>
                <FormGroup className={(ChangedItem) ? "side-panel__form__group" : "hidden"}>
                    <Label for="available">Доступен: <Input className="available" type="select" value={itemInSidePanel.available} name="available" id="available" onChange={(e) => changeAvailable(e.target.value)}>
                                                        <option>Да</option>
                                                        <option>Нет</option>
                                                    </Input>
                    </Label>
                </FormGroup>
                <FormGroup className={(ChangedItem) ? "side-panel__form__group" : "hidden"}>
                    <Label for="category">Категория</Label>
                    <div className="side-panel__form__group__category-wrapper">
                        <Input type="select" value={itemInSidePanel.category} onChange={(e) => changeCategory(e.target.value)} name="category" id="category" className="cat">
                            {categories.map(cat => {
                                return (<option key={cat._id}>{cat.name}</option>)
                            })}
                        </Input>
                        <Button onClick={(e) => categoriesModalOpen(e)} className="side-panel__form__group__category-wrapper__btn">+</Button>
                    </div>
                    
                </FormGroup>
                
                
                <Button onClick={(itemInSidePanel._id.length === 0) ? (e) => {
                        addNewItem(itemInSidePanel);
                        console.log(itemInSidePanel._id);
                        clearState();
                    } :
                        (e) => {
                        changeExistItem(itemInSidePanel);
                        console.log(itemInSidePanel._id);
                        clearState();
                    }
                }>Сохранить изменения</Button>
                </Form>
                
    
            </div>
            
        )
}

SidePanel.propTypes = {
    categories: PropTypes.array,
    ChangedItem: PropTypes.object,
    allItems: PropTypes.array,
    changeExistItem: PropTypes.func,
    itemInSidePanel: PropTypes.object,
    clearState: PropTypes.func,
    changeName: PropTypes.func,
    changeDescription: PropTypes.func,
    changePrice: PropTypes.func,
    changeImgUrl: PropTypes.func,
    changeCategory: PropTypes.func,
    categoriesModalOpen: PropTypes.func,
    categoriesModalIsOpen: PropTypes.bool,
    changeAvailable: PropTypes.func,
    changeResto: PropTypes.func,
    currentUser: PropTypes.object
    
}


const mapStateToProps = ({categories, ChangedItem, allItems, itemInSidePanel, categoriesModalIsOpen, allUsers, currentUser}) => {
    return {
        categories,
        ChangedItem,
        allItems,
        itemInSidePanel,
        categoriesModalIsOpen,
        allUsers,
        currentUser
    }
}


export default connect(mapStateToProps, {addNewItem, changeExistItem, clearState, changeName, changeDescription, start, changePrice, changeImgUrl, changeAvailable, changeCategory, categoriesModalOpen, changeResto})(SidePanel);

// = ({categories, ChangedItem, startCreateNewItem, startCreateNew}) =>