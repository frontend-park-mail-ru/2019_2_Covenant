import BaseComponent from '../../../common/BaseComponent/BaseComponent';
import template from './ArtistList.pug';
import {formatServerRootForArray} from '../../../services/Utils';

class ArtistList extends BaseComponent {
	constructor({artists = [], artistsClassName = 'artists-list'}) {
		const initialState = {
			artists: [],
			artistsClassName: artistsClassName
		};
		super(template, initialState);
		this.state = initialState;
		this.state.artists = artists;
		formatServerRootForArray(this.state.artists, 'photo');
		this.update(this.state);
	}

	onRender() {

	}
}

export default ArtistList;