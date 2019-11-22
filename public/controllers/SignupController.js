import SignUpForm from '../components/SignupForm/SignUpForm';
import BaseController from './BaseController';
import UserModel from '../models/UserModel';
import Header from '../components/Header/Header';
import EventBus from '../services/EventBus';
import Events from '../services/Events';
import Urls from '../services/Urls';

class SignupController extends BaseController {
	constructor(view) {
		super(view);

		this.title = 'Signup Page';
	}

	onShow() {
		const header = new Header();
		header.render('header');

		const form = new SignUpForm();
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

export default SignupController;
