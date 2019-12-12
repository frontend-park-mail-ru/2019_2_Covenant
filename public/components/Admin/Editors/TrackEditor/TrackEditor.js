import ItemEditor from '../../../../common/Admin/ItemEditor/ItemEditor';
import template from './TrackEditor.pug';
import Urls from '../../../../services/Urls';
import Autocomplete from '../../../../common/Autocomplete/Autocomplete';
import SearchModel from '../../../../models/SearchModel';
import Input from '../../../Input/Input';
import File from '../../../../common/Kit/File/File';
import TrackModel from '../../../../models/TrackModel';

class TrackEditor extends ItemEditor {
	constructor() {
		const initialValues = {
			id: -1,
			name: '',
			aritstId: null,
			albumId: null,
			photo: ''
		};
		super({
			path: Urls.AdminTrackEditor,
			backPath: Urls.AdminTracks,
			title: 'Edit track',
			item: initialValues,
			itemName: 'track',
			template: template
		});

		this.onSave = this.onSave.bind(this);
	}

	onRender() {
		super.onRender();

		this.albumAutocomplete = new Autocomplete({
			loadItems: this.loadAlbums
		});
		this.albumAutocomplete.render('album-autocomplete-id');

		this.nameInput = new Input({
			inputId: 'track-name-input'
		});

		this.fileInput = new File({asButton: true, accept: '.mp3, .wav, .flac'});
		this.fileInput.render('track-file-container');
	}

	loadAlbums(text) {
		return SearchModel.search(text)
			.then(response => {
				return response.body.albums;
			});
	}

	onSave() {
		const album = this.albumAutocomplete.value;

		return TrackModel.createTrack({
			id: album.id,
			name: this.nameInput.value,
			file: this.fileInput.value
		});
	}
}

export default TrackEditor;