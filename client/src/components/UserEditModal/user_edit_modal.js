import React, {Component} from 'react';
import {connect} from 'react-redux';
import './user_edit_modal.sass';
import {saveNewUser, userEditModal} from '../../actions/actions.js';


class UserEditModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: "",
            name: "",
            password: "",
            type: "rest",
            restId: "",
            adress: "",
            worktime: ""
        }
        this.setName = this.setName.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setRestId = this.setRestId.bind(this);
        this.setAdress = this.setAdress.bind(this);
        this.setWorktime = this.setWorktime.bind(this);
    }

    setName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    setLogin = (e) => {
        this.setState({
            login: e.target.value
        })
    }

    setPassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    setRestId = (e) => {
        this.setState({
            restId: e.target.value
        })
    }

    setAdress = (e) => {
        this.setState({
            adress: e.target.value
        })
    }

    setWorktime = (e) => {
        this.setState({
            worktime: e.target.value
        })
    }


    render() {

        return (

            <div className="user-edit-modal">
                <form className="user-edit-modal__form" onSubmit={(e) => {
                    e.preventDefault();
                    this.props.saveNewUser(this.state)
                }}>
                    <div className="user-edit-modal__close" onClick={(e) => this.props.userEditModal(e)}>X</div>
                    <input type="text" required className="user-edit-modal__form__login" placeholder="Логин" onChange={(e) => this.setLogin(e)}/>
                    <input type="text" required className="user-edit-modal__form__password" placeholder="Пароль для входа" onChange={(e) => this.setPassword(e)}/>
                    <input type="text" required className="user-edit-modal__form__name" placeholder="Название ресторана" onChange={(e) => this.setName(e)}/>
                    <input type="text" required className="user-edit-modal__form__restid" placeholder="Номер ресторана в системе AmRest" onChange={(e) => this.setRestId(e)}/>
                    <input type="text" required className="user-edit-modal__form__adress" placeholder="Фактический адрес ресторана" onChange={(e) => this.setAdress(e)}/>
                    <input type="text" required className="user-edit-modal__form__adress" placeholder="Время работы в формате HH:MM-HH:MM" onChange={(e) => this.setWorktime(e)}/>
                    <button>Сохранить</button>
                </form>
                
    
            </div>
        )
    }
    
}

const mapStateToProps = ({allItems}) => {
    return {
        allItems
    }
}


export default connect(mapStateToProps, {userEditModal, saveNewUser})(UserEditModal);