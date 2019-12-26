import Urls from '../../../services/Urls';
import AlbumModel from '../../../models/AlbumModel';
import template from './Album.pug';
import CardItem from '../../../common/Content/CardItem/CardItem';
import {formatServerRoot, formatYear} from '../../../services/Utils';
import TrackList from '../../Lists/TrackList/TrackList';
import Link from '../../../common/Kit/Link/Link';

class Album extends CardItem {
	constructor() {
		super({
			path: Urls.AlbumURl,
			template: template
		});
		this.onLoadItem = this.onLoadItem.bind(this);
	}

	loadItem(id) {
		const albumPromise =  AlbumModel.getAlbum(id);
		const tracksPromise = AlbumModel.getTracks(id);

		return Promise.all([albumPromise, tracksPromise]);
	}

	onLoadItem() {
		formatServerRoot(this.state.item.album, 'photo');
		this.setAlbumPhotoToTracks();
		formatYear(this.state.item.album);

		this.trackList = new TrackList({
			trackClassName: 'track-list',
			tracks: this.state.item.tracks,
			withTitle: false,
			withIndexes: true
		});
	}

	onRender() {
		if (this.trackList) {
			this.trackList.render('album-track-list-id');
		}
		if (this.state.item) {
			const url = Urls.ArtistUrl.replace(/:\w+/, this.state.item.album.artist_id);
			new Link({elementId: 'item-album-artist', eventType: 'click', route: url});
		}
	}

	onDestroy() {
		if (this.trackList) {
			this.trackList.onDestroy();
		}
	}

	setAlbumPhotoToTracks() {
		this.state.item.tracks.forEach(track => {
			track.photo = this.state.item.album.photo;
		});
	}
}

export default Album;