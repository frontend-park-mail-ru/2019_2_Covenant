import ItemList from '../../../../common/Admin/ItemList/ItemList';
import Urls from '../../../../services/Urls';
import CollectionModel from '../../../../models/CollectionModel';

class CollectionList extends ItemList {
	constructor() {
		super({
			editorPath: Urls.AdminCollections,
			addCaption: 'Add a collection',
			title: 'Collections',
			itemsName: 'collections'
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
		return CollectionModel.getCollections(count, offset);
	}

}

export default CollectionList;