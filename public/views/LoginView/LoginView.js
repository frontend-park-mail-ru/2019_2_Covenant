import templateFunc from './LoginView.pug';
import BaseView from '../BaseView/BaseView';

const loginView = new BaseView(
	document.body,
	templateFunc
);

export default loginView;
