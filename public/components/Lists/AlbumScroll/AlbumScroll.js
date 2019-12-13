import BaseComponent from '../../BaseComponent/BaseComponent';
import template from './AlbumScroll.pug';
import {SERVER_ROOT} from '../../../services/Settings';

class AlbumScroll extends BaseComponent {
	constructor({albums = [], title = 'Albums'} ={}) {
		const initialState = {
			albums: [],
			title: title
		};
		super(template, initialState);

		this.state = initialState;
		this.state.albums = albums;
		this.setServerRoot('albums');
		this.update(this.state);
	}

	setServerRoot(arrayName) {
		this.state[arrayName].forEach(item => {
			if (!item.photo.includes(SERVER_ROOT)) {
				item.photo = `${SERVER_ROOT}${item.photo}`;
			}
		});
	}
}

export default AlbumScroll;