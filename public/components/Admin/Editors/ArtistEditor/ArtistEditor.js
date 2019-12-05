import Urls from '../../../../services/Urls';
import ArtistModel from '../../../../models/ArtistModel';
import Input from '../../../Input/Input';
import ItemEditor from '../../../../common/Admin/ItemEditor/ItemEditor';
import template from './ArtistEditor.pug';

class ArtistEditor extends ItemEditor {
	constructor() {
		const initialValues = {
			id: -1,
			name: 'John',
			file: ''
		};
		super({
			path: Urls.AdminArtistEditor,
			backPath: Urls.AdminArtists,
			title: 'Edit artist',
			item: initialValues,
			template: template
		});
	}

	loadItem() {
		const pattern = new RegExp('^' + this.path.replace(/:\w+/, '(-?\\d+)') + '$');
		const url = window.location.pathname;
		const params = url.match(pattern);
		const id = params[1];

		if (id > 0) {
			// need request
			return {};
		}

		return {
			id: -1,
			name: '',
			file: ''
		};
	}


	onRender() {
		super.onRender();

		this.nameInput = new Input({
			inputId: 'artist-name-input'
		});
	}

	onSave() {
		return ArtistModel.createArtist(this.nameInput.value);
	}
}

export default ArtistEditor;