import BaseView from '../BaseView/BaseView';
import templateFunc from './ProfileView.pug';

const profileView = new BaseView(
	document.body,
	templateFunc
);

export default profileView;
