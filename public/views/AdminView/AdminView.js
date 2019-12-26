import templateFunc from './AdminView.pug';
import BaseView from '../../common/BaseView/BaseView.js';

const adminView = new BaseView(
	document.body,
	templateFunc
);

export default adminView;
