import BasePageController from './BasePageController';
import LoginForm from '../components/LoginForm/LoginForm';

class LoginController extends  BasePageController {
	constructor(view) {
		super(view);

		this.title = 'Login Page';
	}

	onShow() {
		super.onShow();

		const form = new LoginForm();
		form.render('container');
	}
}

export default LoginController;

