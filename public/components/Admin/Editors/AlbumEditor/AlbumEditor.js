import template from './AlbumEditor.pug';
import ItemEditor from '../../../../common/Admin/ItemEditor/ItemEditor';
import Urls from '../../../../services/Urls';
import Input from '../../../Input/Input';
import AlbumModel from '../../../../models/AlbumModel';

class AlbumEditor extends ItemEditor {
	constructor() {
		const initialValues = {
			id: -1,
			artistId: -1,
			name: '',
			file: ''
		};
		super({
			path: Urls.AdminAlbumEdtior,
			backPath: Urls.AdminAlbums,
			title: 'Edit album',
			item: initialValues,
			itemName: 'album',
			template: template
		});
	}

	loadItem(id) {
		return AlbumModel.getAlbum(id);
	}

	onRender() {
		super.onRender();

		this.nameInput = new Input({
			inputId: 'album-name-input'
		});
	}

	onUpdate() {
		return AlbumModel.updateAlbum({
			id: '',
			artistId: '',
			name: '',
			year: ''
		});
	}

	onSave() {
		return AlbumModel.createAlbum({
			artistId: '',
			name: '',
			year: ''
		});
	}
}

export default AlbumEditor;