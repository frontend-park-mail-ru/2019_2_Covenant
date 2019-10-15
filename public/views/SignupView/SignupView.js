import BaseView from '../BaseView/BaseView';
import templateFunc from './SignupView.pug';

const signupView  = new BaseView(
	document.body,
	templateFunc
);

export default signupView;
