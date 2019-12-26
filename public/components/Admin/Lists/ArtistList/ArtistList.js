import ItemList from '../../../../common/Admin/ItemList/ItemList';
import Urls from '../../../../services/Urls';
import ArtistModel from '../../../../models/ArtistModel';

class ArtistList extends ItemList {
	constructor() {
		super({
			editorPath: Urls.AdminArtistEditor,
			addCaption: 'Add an artist',
			title: 'Artists',
			itemsName: 'artists'
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
		return ArtistModel.getArtists(count, offset);
	}

	deleteItem(id) {
		return ArtistModel.deleteArtist(id);
	}
}

export default ArtistList;