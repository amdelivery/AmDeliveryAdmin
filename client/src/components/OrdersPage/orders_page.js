import React, {Component} from 'react';
import './orders_page.sass';
import './orders_page_media.sass';
import axios from 'axios';
import {v4 as uuid} from 'uuid';



class OrdersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsInDB: []
        };
        this.updateOrderStatus = this.updateOrderStatus.bind(this);
        this.sendOrderToArchive = this.sendOrderToArchive.bind(this);
    }

    componentDidMount() {
        axios('/api/orders').then(res => {
            this.setState({
                itemsInDB: res.data
            })
        })
    }

    refreshItems() {
        axios('/api/orders').then(res => {
            this.setState({
                itemsInDB: res.data
            })
        })
    }

    async updateOrderStatus(id) {
        await axios.post(`/api/update`, id).then(res => (res.status === 200) ? alert("Заказ принят в работу") : null)
             .catch(err => alert(`Во время сохранения данных возникла ошибка ${err}`));
        this.refreshItems();

    }

    async sendOrderToArchive (item) {
        await axios.post('/api/complete', item).then(res => res.status === 200 ? axios.post('/api/orderdel', {id: item._id}).then(res => res.status === 200 ? alert("Заказ выполнен, информация по заказу перенесена в архив") : alert("Ошибка, проверьте подключение")) : alert("Ошибка, проверьте подключение"));
        this.refreshItems();
    }

    
    
    


    render() {
        return (
            <div className="orders-page">
                <h1>Заказы</h1>
                <div className="orders-page__wrapper container">
                    {this.state.itemsInDB.map(({accepted, date, cost, comment, adress, phone, items, _id}) => {
                        let dateObj = new Date(+date)

                        return(
                            <div key={_id} className={(Date.now() - date < 300000 || accepted === true) ? "orders-page__order" : "orders-page__order alert"}>
                                <div className="orders-page__order__leftside">
                                    <div><strong>Дата заказа:</strong> {dateObj.getDate()}.{dateObj.getMonth() + 1}.{dateObj.getFullYear()}</div>
                                    <div><strong>Время заказа:</strong> {dateObj.getHours()}:{dateObj.getMinutes()}</div>
                                    <div><strong>Адрес доставки:</strong> {adress}</div>
                                    <div><strong>Телефон для связи:</strong> {phone}</div>
                                    <div><strong>Итоговая стоимость:</strong> {cost} руб.</div>
                                    <div><strong>Комментарии к заказу:</strong> {comment}</div>
                                </div>
                                <div className="orders-page__order__rightside">
                                {items.map((item, i) => {
                                                return (item.map(element => {
                                                    return (
                                                        <div key={uuid()} className="orders-page__order__rightside__line">
                                                            <div>{element.name}</div>
                                                            <div>{element.quantity} шт.</div>
                                                        </div>
                                                        )
                                                        
                                                    }))
                                            })}
                                </div>
                                <div className="orders-page__order__button">
                                    <button
                                         onClick={(accepted) ? (e) => this.sendOrderToArchive({cost, comment, adress, phone, items, _id}, e) : (e) => this.updateOrderStatus({id: _id}, e)}>{(accepted) ? "Завершить выполнение" : "Принять в работу"}</button>
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

