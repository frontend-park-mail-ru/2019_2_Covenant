import BaseComponent from '../../../common/BaseComponent/BaseComponent';
import template from './Home.pug';
import AlbumModel from '../../../models/AlbumModel';
import TrackModel from '../../../models/TrackModel';
import ArtistModel from '../../../models/ArtistModel';
import TrackList from '../../Lists/TrackList/TrackList';
import AlbumScroll from '../../Lists/AlbumScroll/AlbumScroll';
import {formatServerRootForArray} from '../../../services/Utils';
import ArtistList from '../../Lists/ArtistList/ArtistList';

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

		const artistList = new ArtistList({
			artists: this.state.artists
		});
		artistList.render('home-artist-list-id');

		this.trackList = new TrackList({
			tracks: this.state.tracks
		});
		this.trackList.render('home-track-list-id');
	}

	loadData() {
		const albums = AlbumModel.getAlbums(15, 0);
		const tracks = TrackModel.getPopular(12, 0);
		const artists = ArtistModel.getArtists(4, 0);

		Promise.all([albums, tracks, artists])
		.then(response => {
			if (!response.error) {
				this.state.albums = response[0].body.albums;
				this.state.tracks = response[1].body.tracks;
				this.state.artists = response[2].body.artists;
				formatServerRootForArray(this.state.artists, 'photo');
				this.update(this.state);
			}
		})
		.catch(error => {
			console.log(error);
		});
	}

	onDestroy() {
		this.trackList.onDestroy();
	}
}

export default Home;