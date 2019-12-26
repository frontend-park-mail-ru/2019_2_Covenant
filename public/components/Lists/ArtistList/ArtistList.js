import BaseComponent from '../../../common/BaseComponent/BaseComponent';
import template from './ArtistList.pug';
import {formatServerRootForArray} from '../../../services/Utils';
import Link from '../../../common/Kit/Link/Link';

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
		this.addArtistHandlers();
	}

	addArtistHandlers() {
		this.state.artists.forEach(artist => {
			new Link({elementId: `artist-name-${artist.id}`, eventType: 'click', route: `/artist/${artist.id}`});
			new Link({elementId: `artist-img-${artist.id}`, eventType: 'click', route: `/artist/${artist.id}`});
		});
	}

	onDestroy() {

	}
}

export default ArtistList;