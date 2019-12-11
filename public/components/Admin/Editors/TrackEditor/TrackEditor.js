import ItemEditor from '../../../../common/Admin/ItemEditor/ItemEditor';
import template from './TrackEditor.pug';
import Urls from '../../../../services/Urls';

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
	}
}

export default TrackEditor;