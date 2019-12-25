import BaseComponent from '../../../common/BaseComponent/BaseComponent';
import template from './Artist.pug';
import EventBus from '../../../services/EventBus';
import Events from '../../../services/Events';
import Urls from '../../../services/Urls';
import ArtistModel from '../../../models/ArtistModel';
import {formatServerRoot} from '../../../services/Utils';
import NewHeader from '../../NewHeader/NewHeader';
import AlbumScroll from '../../Lists/AlbumScroll/AlbumScroll';
import TrackList from '../../Lists/TrackList/TrackList';

class Artist extends BaseComponent {
	constructor() {
		const initState = {
			artist: null
		};
		super(template, initState);
		this.state = initState;
		this.path = Urls.ArtistUrl;
		this.id = null;

		this.setArtistId = this.setArtistId.bind(this);
		this.loadArtist = this.loadArtist.bind(this);
		this.loadAlbums = this.loadAlbums.bind(this);
		this.loadTracks = this.loadTracks.bind(this);

		this.setArtistId();
		this.loadArtist();
		this.loadAlbums();
		this.loadTracks();
	}

	onRender() {
		const header = new NewHeader({
			headerPositionClass: 'header__align-top'
		});
		header.render('header');
	}

	setArtistId() {
		const pattern = new RegExp('^' + this.path.replace(/:\w+/, '(-?\\d+)') + '$');
		const url = window.location.pathname;
		const params = url.match(pattern);
		const id = params[1];

		if (id < 0) {
			EventBus.publish(Events.ChangeRoute, {newUrl: Urls.MainUrl});
			return;
		}
		this.id = id;
	}

	loadArtist() {
		ArtistModel.getArtist(this.id)
		.then(response => {
			if (response.error) {
				console.log(response.error);
				return;
			}
			this.state.artist = response.body.artist;
			formatServerRoot(this.state.artist, 'photo');
			this.update(this.state);
		})
		.catch(error => {
			console.log(error);
		});
	}

	loadAlbums() {
		ArtistModel.getAlbums({
			id: this.id,
			count: 9
		})
		.then(response => {
			if (response.error) {
				return;
			}
			const albumList = new AlbumScroll({
				albums: response.body.albums
			});
			albumList.render('artist-album-list-id');
		})
		.catch(error => {
			console.log(error);
		});
	}

	loadTracks() {
		ArtistModel.getTracks({
			id: this.id,
			count: 20
		})
		.then(response => {
			if (response.error) {
				return;
			}
			const trackList = new TrackList({
				tracks: response.body.tracks,
				trackClassName: 'track-list col-3'
			});
			trackList.render('artist-track-list-id');
		})
		.catch(error => {
			console.log(error);
		});
	}
}

export default Artist;