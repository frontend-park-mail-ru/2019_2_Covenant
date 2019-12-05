import Urls from '../../../../services/Urls';
import ArtistModel from '../../../../models/ArtistModel';
import Input from '../../../Input/Input';
import ItemEditor from '../../../../common/Admin/ItemEditor/ItemEditor';
import template from './ArtistEditor.pug';

class ArtistEditor extends ItemEditor {
	constructor() {
		const initialValues = {
			id: -1,
			name: '',
			file: ''
		};
		super({
			path: Urls.AdminArtistEditor,
			backPath: Urls.AdminArtists,
			title: 'Edit artist',
			item: initialValues,
			itemName: 'artist',
			template: template
		});
	}

	loadItem(id) {
		return ArtistModel.getArtist(id);
	}

	onRender() {
		super.onRender();

		this.nameInput = new Input({
			inputId: 'artist-name-input'
		});
	}

	onUpdate() {
		return ArtistModel.updateArtist({
			id: this.state.item.id,
			name: this.nameInput.value
		});
	}

	onSave() {
		return ArtistModel.createArtist(this.nameInput.value);
	}
}

export default ArtistEditor;