import React, {Component} from 'react';
import './orders_page.sass';
import './orders_page_media.sass';
import axios from 'axios';
import {v4 as uuid} from 'uuid';
import {connect} from 'react-redux';
import alarm from '../../alarm.mp3';



class OrdersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsInDB: []
        };
        this.updateOrderStatus = this.updateOrderStatus.bind(this);
        this.sendOrderToArchive = this.sendOrderToArchive.bind(this);
        this.refreshItems = this.refreshItems.bind(this);
    }

    componentDidMount() {
        axios('/api/orders').then(res => {
            this.setState({
                itemsInDB: res.data
            })
        })
        this.setTimerUpdate = setInterval(this.refreshItems, 10000)
    }

    componentWillUnmount() {
        clearInterval(this.setTimerUpdate);
    }

    

    refreshItems() {
        console.log('Refreshed');
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
                    {this.state.itemsInDB.map(({accepted, date, cost, comment, visHours, visMinutes, phone, items, _id, resto, number}) => {
                        let dateObj = new Date(+date);
                        let audio = new Audio(alarm);
                        if (Date.now() - date > 30000 && accepted === false) {
                            audio.play();
                        } 
                        let renderedItem = (this.props.currentUser.name === resto || this.props.currentUser.name === "Admin") ? (
                            <div key={_id} className={(Date.now() - date < 30000 || accepted === true) ? "orders-page__order" : "orders-page__order alert"}>
                                <div className="orders-page__order__leftside">
                                    <div><strong>Дата заказа:</strong> {dateObj.getDate()}.{dateObj.getMonth() + 1}.{dateObj.getFullYear()}</div>
                                    <div><strong>Номер заказа:</strong> {number}</div>
                                    <div><strong>Время заказа:</strong> {(String(dateObj.getHours()).length === 2) ? dateObj.getHours() : "0" + dateObj.getHours()}:{(String(dateObj.getMinutes()).length === 2) ? dateObj.getMinutes() : "0" + dateObj.getMinutes()}</div>
                                    <div><strong>Время визита:</strong> {visHours}:{visMinutes}</div>
                                    <div><strong>Телефон для связи:</strong> {phone}</div>
                                    <div><strong>Ресторан:</strong> {resto}</div>
                                    <div><strong>Комментарии к заказу:</strong> {comment}</div>
                                </div>
                                <div className="orders-page__order__rightside">
                                {items.map((item, i) => {
                                                return (item.map(element => {
                                                    return (
                                                        <>
                                                            <div key={uuid()} className="orders-page__order__rightside__line">
                                                                <div className="orders-page__order__rightside__line__elem">{element.name} ({element.modificators.map((mod, i) => (<span key={i}>{mod.name}/</span>))})</div>
                                                                <div>{element.quantity} шт.</div>
                                                            </div>
                                                            <hr/>
                                                        </>
                                                        
                                                        )
                                                        
                                                    }))
                                            })}
                                </div>
                                <div className="orders-page__order__button">
                                    <button
                                         onClick={(accepted) ? (e) => this.sendOrderToArchive({cost, comment, phone, items, _id, resto, date}, e) : (e) => this.updateOrderStatus({id: _id}, e)}>{(accepted) ? "Завершить выполнение" : "Принять в работу"}</button>
                                </div>
                                
                            </div>
                        ) : null;

                        return (<>{renderedItem}</>);
                        
                        
                    })}
                </div>
            </div>
        )
    }
    
}

const mapStateToProps = ({currentUser}) => {
    return {
        currentUser
    }
}

export default connect(mapStateToProps)(OrdersPage);

