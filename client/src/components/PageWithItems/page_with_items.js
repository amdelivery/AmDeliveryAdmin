import React from 'react';
import './page_with_items.sass';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Button
  } from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import CategoriesEditModal from '../CategoriesEditModal';
import {getAllItems, changeItem, deleteOneItem, selectItem} from '../../actions/actions.js';


  const PageWithItems = ({allItems, getAllItems, changeItem, ChangedItem, deleteOneItem, selectItem, saveDone, categoriesModalIsOpen, categories,  currentUser, allUsers}) => {
      const saving = (saveDone === false) ? (<div className="page-with-items__saving">Сохранение данных...</div>) : null;
      const renderedItem = (allItems.length === 0) ? null : 
            (<div>
                {categories.map(cat => {
                    return (
                        <div className="page-with-items__category">
                            <h2 className="page-with-items__category__name">{(allItems.findIndex(item => item.category === cat.name) !== -1) ? cat.name : null}</h2>
                            <div className="page-with-items__category__line">
                                {allItems.filter(elem => (elem.category === cat.name) ? elem : null).map(item => {
                                    return (
                                        <div key={item._id} className="page-with-items__wrapper">
                                            <Card key={item.id} className={(ChangedItem === null) ? "page-with-items__card" : (ChangedItem._id === item._id) ? "page-with-items__card checked" : "page-with-items__card"} onClick={(e) => {
                                            changeItem(item, e);
                                            selectItem(item);
                                            }}>
                                            <CardImg top width="100%" src={item.imgUrl} alt="Card image cap" />
                                            <CardBody className={(ChangedItem && ChangedItem._id === item._id) ? "hidden" : null}>
                                                <CardTitle>{item.name}</CardTitle>
                                                <CardText>{item.price} Р</CardText>
                                                <CardText className={(item.available === "Нет") ? "red" : "green"}>{(item.available === "Нет") ? "НЕ ДОСТУПЕН" : "Доступен"}</CardText>
                                            </CardBody>
                                        
                                            </Card>
                                            <div className={(ChangedItem === null) ? "page-with-items__delete" : (ChangedItem._id === item._id) ? "page-with-items__delete active" : "page-with-items__delete"} onClick={(e) => deleteOneItem(item, e)}>Удалить</div>
                                        </div>
                                    )
                                })}
                            </div>
                            
                        </div>
                    )
                })}
            </div>)


      return (
          <div className="page-with-items">
              {saving}
              <Button onClick={(e) => getAllItems(e)} className="page-with-items__button">{(categoriesModalIsOpen) ? "К списку элементов" : "Обновить"}</Button>
              {(categoriesModalIsOpen) ? <CategoriesEditModal/> : renderedItem}

          </div>
      )
  }

  PageWithItems.propTypes = {
      allItems: PropTypes.array,
      getAllItems: PropTypes.func,
      changeItem: PropTypes.func,
      ChangedItem: PropTypes.object,
      deleteOneItem: PropTypes.func,
      saveDone: PropTypes.bool,
      categoriesModalIsOpen: PropTypes.bool,
      categories: PropTypes.array,
      currentUser: PropTypes.object,
      allUsers: PropTypes.array
  }


  const mapStateToProps = ({allItems, ChangedItem, saveDone, categoriesModalIsOpen, categories, currentUser, allUsers}) => {
      return {
          allItems,
          ChangedItem,
          saveDone,
          categoriesModalIsOpen,
          categories,
          currentUser,
          allUsers
      }

  }

  export default connect(mapStateToProps, {getAllItems, changeItem, deleteOneItem, selectItem})(PageWithItems);



