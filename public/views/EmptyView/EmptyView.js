import templateFunc from './EmptyView.pug';
import BaseView from '../BaseView/BaseView.js';

const emptyView = new BaseView(
	document.body,
	templateFunc
);

export default emptyView;
