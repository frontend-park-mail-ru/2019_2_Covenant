import ItemList from '../../../../common/Admin/ItemList/ItemList';
import Urls from '../../../../services/Urls';
import AlbumModel from '../../../../models/AlbumModel';

class AlbumList extends ItemList {
	constructor() {
		super({
			editorPath: Urls.AdminAlbumEdtior,
			addCaption: 'Add an album',
			title: 'Albums',
			itemsName: 'albums'
		});
	}

	getColumns() {
		return [
			{
				title: '#',
				dataIndex: 'id'
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
				title: 'Actions'
			}
		];
	}

	loadItems(count, offset) {
		return AlbumModel.getAlbums(count, offset);
	}

	deleteItem(id) {
		return AlbumModel.deleteAlbum(id);
	}
}

export default AlbumList;