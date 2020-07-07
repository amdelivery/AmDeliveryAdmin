import React from 'react';
import PageWithItems from './components/PageWithItems';
import SidePanel from './components/SidePanel';
import {Route, BrowserRouter, Link} from 'react-router-dom';
import OrdersPage from './components/OrdersPage';
import './App.sass';
import {connect} from 'react-redux';
import {getAllItems, start} from './actions/actions.js';

const App = ({getAllItems, start}) => {
  return (
    
    <BrowserRouter>
      <div className="wrapper">
        <Link to="/main" className="link main" onClick={(e) => {
          start(e);
          getAllItems(e);
        }}>Редактирование меню</Link>
        <Link to="/orderspage" className="link orders">Заказы</Link>
      </div>
        <Route path='/main' component={SidePanel}/>
        <Route path='/main' component={PageWithItems}/>
        <Route path='/orderspage' component={OrdersPage}/>
      
      
    </BrowserRouter>
    
    
    
  )
}

const mapStateToProps = ({allItems}) => {
  return {
    allItems
  }
}



export default connect(mapStateToProps, {getAllItems, start})(App);
