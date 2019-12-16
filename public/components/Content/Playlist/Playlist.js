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
	}

	loadItem(id) {
		const playlistPromise = PlaylistModel.getPlaylist(id);
		const tracksPromise = PlaylistModel.getTracksFromPlaylist(id);

		return Promise.all([playlistPromise, tracksPromise]);
	}

	onLoadItem() {
		formatServerRoot(this.state.item.playlist, 'photo');

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
		this.trackList.onDestroy();
	}
}

export default Playlist;