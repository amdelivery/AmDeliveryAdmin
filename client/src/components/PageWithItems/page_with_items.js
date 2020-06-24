import React from 'react';
import './page_with_items.sass';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Button
  } from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getAllItems, changeItem, deleteOneItem, selectItem, clearDb} from '../../actions/actions.js';
import axios from 'axios';


  const PageWithItems = ({allItems, getAllItems, changeItem, ChangedItem, deleteOneItem, selectItem, saveDone, clearDb}) => {
      const saving = (saveDone === false) ? (<div className="page-with-items__saving">Сохранение данных...</div>) : null;
      const renderedItem = (allItems.length === 0) ? null : (
        <>
            {allItems.map((item, i) => {
            return (
                <div key={i} className="page-with-items__wrapper">
                    <Card key={item.id} className={(ChangedItem === null) ? "page-with-items__card" : (ChangedItem._id === item._id) ? "page-with-items__card checked" : "page-with-items__card"} onClick={(e) => {
                    changeItem(item, e);
                    selectItem(item);
                    }}>
                    <CardImg top width="100%" src={item.imgUrl} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        <CardText>{item.price} Р</CardText>
                    </CardBody>
                    
                    </Card>
                    <div className={(ChangedItem === null) ? "page-with-items__delete" : (ChangedItem._id === item._id) ? "page-with-items__delete active" : "page-with-items__delete"} onClick={(e) => deleteOneItem(item, e)}>Удалить</div>
                </div>
              
            )
        })}
      
        </>
      )
      return (
          <div className="page-with-items">
              {saving}
              <Button onClick={(e) => clearDb(allItems, e)} className="page-with-items__button__save">Сохранить в базу</Button>
              <Button onClick={(e) => getAllItems(e)} className="page-with-items__button">Обновить</Button>
              {renderedItem}

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
      clearDb: PropTypes.func
  }


  const mapStateToProps = ({allItems, ChangedItem, saveDone}) => {
      return {
          allItems,
          ChangedItem,
          saveDone
      }

  }

  export default connect(mapStateToProps, {getAllItems, changeItem, deleteOneItem, selectItem, clearDb})(PageWithItems);

