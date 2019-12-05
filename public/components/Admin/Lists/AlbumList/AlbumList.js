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
				dataIndex: 'id',
				className: 'list_header_num'
			},
			{
				title: 'Name',
				dataIndex: 'name',
				className: 'list_header_name'
			},
			{
				title: 'Actions',
				className: 'list_header_btn'
			}
		];
	}

	loadItems(count, offset) {
		return AlbumModel.getAlbums(count, offset);
	}
}

export default AlbumList;