import React, {Component} from 'react';
import PageWithItems from './components/PageWithItems';
import SidePanel from './components/SidePanel';
import Users from './components/Users';
import {Route, BrowserRouter, Link} from 'react-router-dom';
import OrdersPage from './components/OrdersPage';
import './App.sass';
import {connect} from 'react-redux';
import {getAllItems, start, getAllUsers, setCurUser} from './actions/actions.js';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: "",
			password: ""
		};
		this.getLogin = this.getLogin.bind(this);
		this.getPassword = this.getPassword.bind(this);
	}




	componentDidMount() {
		this.props.getAllUsers();
	}


	getLogin = (e) => {
		this.setState({
			login: e.target.value
		})
	}

	getPassword = (e) => {
		this.setState({
			password: e.target.value
		})
	}

	render() {

		const renderedItem = (this.props.authDone === true) ? (
			<BrowserRouter>
				<div className="wrapper">
					<Link to="/main" className="link main" onClick={(e) => {
						this.props.start(e);
						this.props.getAllItems(e);
					}}>Редактирование меню</Link>
					<Link to="/orderspage" className="link orders">Заказы</Link>
					<Link to='/users' className={(this.props.currentUser.login === "admin") ? "link users-link" : "hidden"}>Пользователи</Link>
				</div>
					<Route path='/main' component={SidePanel}/>
					<Route path='/main' component={PageWithItems}/>
					<Route path='/orderspage' component={OrdersPage}/>
					<Route path='/users' component={Users} />
				
			</BrowserRouter>
		) :
		(
			<form className="authform" onSubmit={async (e) => {
				e.preventDefault();
				console.log(this.props.allUsers);
				const returnedUser = this.props.allUsers.find(user => user.login === this.state.login && user.password === this.state.password);
				(returnedUser === undefined) ? alert("Неправильный логин или пароль") : this.props.setCurUser(returnedUser);
			} }>
				<input type="text" require placeholder="Логин" onChange={(e) => this.getLogin(e)}/>
				<input type="password" require placeholder="Пароль" onChange={(e) => this.getPassword(e)}/>
				<button>Войти</button>
			</form>
		)

		return (
			<>{renderedItem}</>
		)
	}

         
}

const mapStateToProps = ({allItems, authDone, allUsers, currentUser}) => {
  return {
		allItems,
		authDone,
		allUsers,
		currentUser
  }
}



export default connect(mapStateToProps, {getAllItems, start, getAllUsers, setCurUser})(App);
