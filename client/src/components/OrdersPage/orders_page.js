import React, {Component} from 'react';
import './orders_page.sass';
import axios from 'axios';



class OrdersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsInDB: []
        }
    }

    componentDidMount() {
        axios('/api/orders').then(res => {
            this.setState({
                itemsInDB: res.data
            })
        })
    }


    render() {
        return (
            <div className="orders-page">
                <h1 onClick={(e) => console.log(this.state.itemsInDB)}>Заказ</h1>
                <div className="orders-page__wrapper">
                    {this.state.itemsInDB.map(({date, cost, comment, adress, phone, items}) => {
                        return(
                            <div className="orders-page__order">
                                <div className="orders-page__order__leftside">
                                    <div>Дата заказа: {date}</div>
                                    <div>Адрес доставки: {adress}</div>
                                    <div>Телефон для связи: {phone}</div>
                                    <div>Итоговая стоимость: {cost} рублей</div>
                                    <div>Комментарии к заказу: {comment}</div>
                                </div>
                                <div className="orders-page__order__rightside">
                                {items.map(item => {
                                                return (item.map(element => {
                                                    return (
                                                        <div className="orders-page__order__rightside__line">
                                                            <div>{element.name}</div>
                                                            <div>{element.quantity} шт.</div>
                                                        </div>
                                                        )
                                                        
                                                    }))
                                            })}
                                </div>
                                
                            </div>
                        )
                        
                    })}
                </div>
            </div>
        )
    }
    
}

export default OrdersPage;

