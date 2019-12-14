import Urls from '../../../services/Urls';
import AlbumModel from '../../../models/AlbumModel';
import template from './Album.pug';
import CardItem from '../../../common/Content/CardItem/CardItem';
import {formatServerRoot, formatYear} from '../../../services/Utils';
import TrackList from '../../Lists/TrackList/TrackList';

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
	}
}

export default Album;