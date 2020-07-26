import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userEditModal, getAllUsers, delUser} from '../../actions/actions.js';
import './users.sass';
import UserEditModal from '../UserEditModal';
import {Link} from 'react-router-dom';


class Users extends Component {

    componentDidUpdate() {
        this.props.getAllUsers()
    }

    render() {
        return (
            <div className="users">
                <div className="users__list container">
                <button className="users__list__add-btn" onClick={(e) => this.props.userEditModal(e)}>Добавить нового</button>
                <Link to='/'><button className="users__list__main-btn">На главную</button></Link>
                    {this.props.allUsers.map(user => {
                        const renderedItem = (user.type !== "admin") ? (

                        <div className="users__list__item">
                            <div className="users__list__item__info">
                                <div className="users__list__item__name">Название ресторана: {user.name}</div>
                                <div className="users__list__item__adress">Адрес ресторана: {user.adress}</div>
                                <div className="users__list__item__adress">Время работы: {user.worktime}</div>
                                <div className="users__list__item__restid">ID ресторана: {user.restId}</div>
                            </div>
                            <div className="users__list__item__info">
                                <div className="users__list__item__type">Тип учетной записи: {user.type}</div>
                                <div className="users__list__item__login">Логин: {user.login}</div>
                                <div className="users__list__item__password">Пароль: {user.password}</div>
                                <div className="users__list__item__id">ID в базе: {user._id}</div>
                                
                                
                            </div>
                            <button className="users__list__item__delete-btn" onClick={(e) => this.props.delUser({_id: user._id})}>Удалить</button>
                        </div>) : null;
                        return (
                            <>
                                {renderedItem}
                            </>
                            
                        )
                    })}
                </div>
                
                {(this.props.userEditModalIsOpen) ? <UserEditModal/> : null}
            </div>
        )
    }
    
}

const mapStateToProps = ({allUsers, userEditModalIsOpen}) => {
    return {
        allUsers,
        userEditModalIsOpen
    }
}


export default connect(mapStateToProps, {userEditModal, getAllUsers, delUser})(Users);