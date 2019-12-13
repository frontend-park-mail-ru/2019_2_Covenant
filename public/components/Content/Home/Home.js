import BaseComponent from '../../BaseComponent/BaseComponent';
import template from './Home.pug';
import AlbumModel from '../../../models/AlbumModel';
import {SERVER_ROOT} from '../../../services/Settings';
import TrackModel from '../../../models/TrackModel';
import ArtistModel from '../../../models/ArtistModel';
import TrackList from '../../Lists/TrackList/TrackList';
import AlbumScroll from '../../Lists/AlbumScroll/AlbumScroll';

class Home extends BaseComponent {
	constructor() {
		const initialState = {
			albums: [],
			tracks: [],
			artists: []
		};
		super(template, initialState);

		this.state = initialState;
		this.loadData();
	}

	onRender() {
		const albumList = new AlbumScroll({
			albums: this.state.albums
		});
		albumList.render('home-album-list-id');

		const trackList = new TrackList({
			tracks: this.state.tracks
		});
		trackList.render('home-track-list-id');
	}

	loadData() {
		AlbumModel.getAlbums(15, 0)
		.then(response => {
			if (!response.error) {
				this.state.albums = response.body.albums;
				this.setServerRoot('albums');
				this.update(this.state);
			}
		})
		.catch(error => {
			console.log(error);
		});

		TrackModel.getPopular(12, 0)
		.then(response => {
			if (!response.error) {
				this.state.tracks = response.body.tracks;
			}
		})
		.catch(error => {
			console.log(error);
		});

		ArtistModel.getArtists(4, 0)
		.then(response => {
			if (!response.error) {
				this.state.artists = response.body.artists;
				this.setServerRoot('artists');
				this.update(this.state);
			}
		})
		.catch(error => {
			console.log(error);
		});
	}

	setServerRoot(arrayName) {
		this.state[arrayName].forEach(item => {
			if (!item.photo.includes(SERVER_ROOT)) {
				item.photo = `${SERVER_ROOT}${item.photo}`;
			}
		});
	}
}

export default Home;