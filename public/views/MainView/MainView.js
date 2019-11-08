import templateFunc from './MainView.pug';
import BaseView from '../BaseView/BaseView.js';

const mainView = new BaseView(
	document.body,
	templateFunc
);

export default mainView;
