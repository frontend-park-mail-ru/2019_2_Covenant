import LoginForm from '../components/LoginForm/LoginForm';
import BaseController from './BaseController';
import UserModel from '../models/UserModel';
import Header from '../components/Header/Header';
import EventBus from '../services/EventBus';
import Events from '../services/Events';
import Urls from '../services/Urls';


class LoginController extends  BaseController {
	constructor(view) {
		super(view);

		this.title = 'Login Page';
	}

	onShow() {
		const header = new Header();
		header.render('header');

		const form = new LoginForm();
		form.render('container');

		UserModel.getProfile().then(response =>
		{
			if (!response.error) {
				console.log(response);
				EventBus.publish(Events.ChangeRoute, Urls.ProfileUrl);
			}
		})
		.catch(error => {
			console.log(error);
		});
	}
}

export default LoginController;

