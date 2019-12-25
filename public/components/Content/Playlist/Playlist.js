import Urls from '../../../services/Urls';
import template from './Playlist.pug';
import PlaylistModel from '../../../models/PlaylistModel';
import {formatServerRoot} from '../../../services/Utils';
import TrackList from '../../Lists/TrackList/TrackList';
import CardItem from '../../../common/Content/CardItem/CardItem';

class Playlist extends CardItem {
	constructor() {
		super({
			path: Urls.PlaylistUrl,
			template: template
		});

		this.setPlaylistsPhotoToTracks = this.setPlaylistsPhotoToTracks.bind(this);
	}

	loadItem(id) {
		const playlistPromise = PlaylistModel.getPlaylist(id);
		const tracksPromise = PlaylistModel.getTracksFromPlaylist(id);

		return Promise.all([playlistPromise, tracksPromise]);
	}

	onLoadItem() {
		formatServerRoot(this.state.item.playlist, 'photo');
		this.setPlaylistsPhotoToTracks();

		this.trackList = new TrackList({
			trackClassName: 'track-list',
			tracks: this.state.item.tracks,
			withTitle: false,
			withIndexes: true
		});
	}

	onRender() {
		if (this.trackList) {
			this.trackList.render('playlist-track-list-id');
		}
	}

	onDestroy() {
		if (this.trackList) {
			this.trackList.onDestroy();
		}
	}

	setPlaylistsPhotoToTracks() {
		this.state.item.tracks.forEach(track => {
			track.photo = this.state.item.playlist.photo;
		});
	}
}

export default Playlist;