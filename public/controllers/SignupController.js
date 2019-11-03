import BasePageController from './BasePageController';
import SignUpForm from '../components/SignupForm/SignUpForm';

class SignupController extends BasePageController {
	constructor(view) {
		super(view);

		this.title = 'Signup Page';
	}

	onShow() {
		super.onShow();

		const form = new SignUpForm();
		form.render('container');
	}

}

export default SignupController;
