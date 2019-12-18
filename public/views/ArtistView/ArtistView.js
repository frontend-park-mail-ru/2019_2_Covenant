import templateFunc from './ArtistView.pug';
import BaseView from '../../common/BaseView/BaseView.js';

const artistView = new BaseView(
	document.body,
	templateFunc
);

export default artistView;
