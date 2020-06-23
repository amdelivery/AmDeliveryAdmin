import React from 'react';
import {connect} from 'react-redux';
import './side_panel.sass';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import PropTypes from 'prop-types';
import {addNewItem, changeExistItem, clearState, changeName, changeDescription, changePrice, changeImgUrl, changeCategoryName, changeCategoryWeight} from '../../actions/actions.js';


const SidePanel = ({allItems, itemInSidePanel, clearState, changeName, changeDescription, changePrice, changeImgUrl, changeCategoryName, changeCategoryWeight, addNewItem, changeExistItem}) => {

        
            
        
        return (
            <div className="side-panel">
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
                <FormGroup className="side-panel__form__group">
                    <Label for="category">Категория</Label>
                    <Input value={itemInSidePanel.category.name} onChange={(e) => changeCategoryName(e.target.value)} type="text" name="category" id="category" placeholder="Выберите категорию"/>
                </FormGroup>
                <FormGroup className="side-panel__form__group">
                    <Label for="category-weight">Вес категории</Label>
                    <Input value={itemInSidePanel.category.weight} onChange={(e) => changeCategoryWeight(e.target.value)} type="text" name="category" id="category" placeholder="Выберите категорию"/>
                </FormGroup>
                
                <Button onClick={(e) => {
                    const findItemById = allItems.find(examp => examp._id === itemInSidePanel._id );
                    if (findItemById === undefined) {
                        addNewItem(itemInSidePanel);
                        console.log(itemInSidePanel._id);
                    } else {
                        changeExistItem(itemInSidePanel);
                        console.log(itemInSidePanel._id);
                    }
                }}>Сохранить изменения</Button>
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
    changeCategoryName: PropTypes.func,
    changeCategoryWeight: PropTypes.func
    
}


const mapStateToProps = ({categories, ChangedItem, allItems, itemInSidePanel}) => {
    return {
        categories,
        ChangedItem,
        allItems,
        itemInSidePanel
    }
}


export default connect(mapStateToProps, {addNewItem, changeExistItem, clearState, changeName, changeDescription, changePrice, changeImgUrl, changeCategoryName, changeCategoryWeight})(SidePanel);

// = ({categories, ChangedItem, startCreateNewItem, startCreateNew}) =>