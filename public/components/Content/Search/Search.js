import BaseComponent from '../../../common/BaseComponent/BaseComponent';
import template from './Search.pug';
import Urls from '../../../services/Urls';
import SearchModel from '../../../models/SearchModel';
import TrackList from '../../Lists/TrackList/TrackList';
import AlbumScroll from '../../Lists/AlbumScroll/AlbumScroll';
import ArtistList from '../../Lists/ArtistList/ArtistList';

class Search extends BaseComponent {
	constructor() {
		const initialState = {
			artists: [],
			albums: [],
			tracks: [],
			maxTracks: 4,
			maxAlbums: 10,
			maxArtists: 10
		};
		super(template, initialState);

		this.state = initialState;
		this.loadItems();
	}

	loadItems() {
		const pattern = new RegExp('^'+ Urls.SearchUrl + '(\\?s=?(.+))?$');
		const url = `${window.location.pathname}${window.location.search}`;
		const params = url.match(pattern);
		const text = params[2];

		if (text === '') {
			return;
		}

		SearchModel.search(text)
		.then(response => {
			if (response.error) {
				console.log(response.error);
				return;
			}

			this.state.artists = response.body.artists || [];
			this.state.albums = response.body.albums || [];
			this.state.tracks = response.body.tracks || [];

			this.state.val = text;
			this.update(this.state);
		})
		.catch(error => {
			console.log(error);
		});
	}

	onRender() {
		const albumList = new AlbumScroll({
			albums: this.state.albums
		});
		albumList.render('search-albums-container-id');

		const trackList = new TrackList({
			tracks: this.state.tracks
		});
		trackList.render('search-tracks-container-id');

		const artistList = new ArtistList({
			artists: this.state.artists,
			artistsClassName: 'artists-list col-3'
		});
		artistList.render('search-artists-container-id');
	}
}

export default Search;