import ItemEditor from '../../../../common/Admin/ItemEditor/ItemEditor';
import Urls from '../../../../services/Urls';
import template from './CollectionEditor.pug';

class CollectionEditor extends ItemEditor {
	constructor() {
		const initialValues = {
			id: -1,
			name: '',
			file: ''
		};
		super({
			path: Urls.AdminCollectionEditor,
			backPath: Urls.AdminCollections,
			title: 'Edit collection',
			item: initialValues,
			itemName: 'collection',
			template: template
		});
	}
}

export default CollectionEditor;