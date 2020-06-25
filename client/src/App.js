import React from 'react';
import PageWithItems from './components/PageWithItems';
import SidePanel from './components/SidePanel';
import {Route, BrowserRouter, Link, Switch} from 'react-router-dom';
import OrdersPage from './components/OrdersPage';
import './App.sass';

const App = () => {
  return (
    
    <BrowserRouter>
      <div className="wrapper">
        <Link to="/main" className="link main">Редактирование меню</Link>
        <Link to="/orderspage" className="link orders">Заказы</Link>
      </div>
        <Route path='/main' component={SidePanel}/>
        <Route path='/main' component={PageWithItems}/>
        <Route path='/orderspage' component={OrdersPage}/>
      
      
    </BrowserRouter>
    
    
    
  )
}



export default App;
