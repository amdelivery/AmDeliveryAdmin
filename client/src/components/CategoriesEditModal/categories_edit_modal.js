import React from 'react';
import './categories_edit_modal.sass';
import {connect} from 'react-redux';
import {categoryEdit, clearCategoryForEdit, addNewMod, delMod, delCat, changeModName, changeModPrice, changeCatName, changeCatWeight, addNewCat, addNewCatInDB, updateExistCat} from '../../actions/actions.js';


const CategoriesEditModal = ({categories, categoryForEdit, categoryEdit, clearCategoryForEdit, addNewMod, delMod, delCat, changeModName, changeModPrice, changeCatName, changeCatWeight, addNewCat, addNewCatInDB, updateExistCat}) => {

    const window = (categoryForEdit) ? (<div className="categories-edit-modal__overlay" >
                        <div className="categories-edit-modal__window" >
                            <div className="categories-edit-modal__window__cat-name-price" >
                                <label>Название:
                                    <input name="name" type="text" value={categoryForEdit.name} onChange={(e) => changeCatName(e.target.value)}></input>
                                </label>
                                
                                <label>Вес:
                                    <input name="weight" type="text" value={categoryForEdit.weight} onChange={(e) => changeCatWeight(e.target.value)}></input>
                                </label>
                            </div>
                            
                            
                            <div className="categories-edit-modal__window__mods">
                                {(categoryForEdit.modificators.length > 0) ? categoryForEdit.modificators.map((mod, i) => {
                                    return (<div key={mod.id} className="categories-edit-modal__window__mods__mod">
                                                <label>Название модификатора:
                                                    <input type="text" name="mod-name" value={mod.name} onChange={(e) => changeModName(e.target.value, mod.id)}></input>
                                                </label>
                                                
                                                <label>Цена: 
                                                    <input type="text" name="mod-price" value={mod.price} onChange={(e) => changeModPrice(e.target.value, mod.id)}></input>
                                                </label>
                                                
                                                <button className="categories-edit-modal__window__mods__del" onClick={(e) => delMod(mod.id, e)}>Удалить</button>
                                                <button className="categories-edit-modal__window__mods__add" onClick={(e) => addNewMod(e)} >Добавить новый</button>
                                            </div>)
                                } ) : (<button className="categories-edit-modal__window__mods__add__single" onClick={(e) => addNewMod(e)}>Добавить модификатор</button>)}
                            </div>
                            <div className="categories-edit-modal__window__close" onClick={(e) => clearCategoryForEdit(e)}>X</div>
                            <button className="categories-edit-modal__window__save-btn" onClick={(categoryForEdit._id) ? (e) => updateExistCat(categoryForEdit) : (e) => addNewCatInDB(categoryForEdit)}>Сохранить</button>
                        </div>
                    </div>) : null; 

    return (<div className="categories-edit-modal">
                {categories.map(cat => {
                    return (
                        <div key={cat._id} className="categories-edit-modal__category-item">
                            <div className="categories-edit-modal__category-item__wrapper">
                                <div><strong>Название категории:</strong> {cat.name}</div>
                                <div><strong>Вес категории:</strong> {cat.weight}</div>
                            </div>
                            
                            <div className="categories-edit-modal__category-item__mods" ><strong>Модификаторы: </strong>
                                <div className="categories-edit-modal__category-item__mods-item">
                                    {cat.modificators.map((mod, i) => {
                                        return (<div key={i} className="categories-edit-modal__category-item__mods-item__wrapper">
                                                    <div className="categories-edit-modal__category-item__mods-item__name">{mod.name}</div>
                                                    <div className="categories-edit-modal__category-item__mods-item__price">{mod.price} руб.</div>
                                                </div>)
                                    })}
                                </div>
                            </div>
                            <div className="categories-edit-modal__category-item__button-wrapper">
                                <button className="categories-edit-modal__category-item__button-edit" onClick={(e) => categoryEdit(cat._id)}>Редактировать</button>
                                <button className="categories-edit-modal__category-item__button-delete" onClick={(e) => delCat(cat)}>Удалить</button>
                            </div>
                            

                            
                        </div>
                    )
                })}
                <button className="categories-edit-modal__add-new-button" onClick={(e) => addNewCat(e)}>Добавить новую категорию</button>
                {window}

            </div>)
}


const mapStateToProps = ({categories, categoryForEdit}) => {
      return {
          categories,
          categoryForEdit
      }
}


export default connect(mapStateToProps, {categoryEdit, clearCategoryForEdit, addNewMod, delMod, delCat, changeModName, changeModPrice, changeCatName, changeCatWeight, addNewCat, addNewCatInDB, updateExistCat})(CategoriesEditModal)
