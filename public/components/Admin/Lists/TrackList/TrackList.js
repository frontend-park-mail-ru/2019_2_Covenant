import ItemList from '../../../../common/Admin/ItemList/ItemList';
import Urls from '../../../../services/Urls';
import TrackModel from '../../../../models/TrackModel';

class TrackList extends ItemList {
	constructor() {
		super({
			editorPath: Urls.AdminTrackEditor,
			addCaption: 'Add a track',
			title: 'Tracks',
			itemsName: 'tracks',
			editBtn: false
		});
	}

	getColumns() {
		return [
			{
				title: '#',
				dataIndex: 'id',
			},
			{
				title: 'Name',
				dataIndex: 'name'
			},
			{
				title: 'Artist name',
				dataIndex: 'artist'
			},
			{
				title: 'Album name',
				dataIndex: 'album'
			},
			{
				title: 'Actions'
			}
		];
	}

	loadItems(count, offset) {
		return TrackModel.getPopular(count, offset);
	}
}

export default TrackList;