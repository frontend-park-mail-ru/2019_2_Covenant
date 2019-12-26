import BaseController from './BaseController';
import adminView from '../views/AdminView/AdminView';
import Menu from '../components/Admin/Menu/Menu';
import ArtistList from '../components/Admin/Lists/ArtistList/ArtistList';
import ArtistEditor from '../components/Admin/Editors/ArtistEditor/ArtistEditor';
import AlbumList from '../components/Admin/Lists/AlbumList/AlbumList';
import AlbumEditor from '../components/Admin/Editors/AlbumEditor/AlbumEditor';
import TrackList from '../components/Admin/Lists/TrackList/TrackList';
import TrackEditor from '../components/Admin/Editors/TrackEditor/TrackEditor';
import CollectionList from '../components/Admin/Lists/CollectionList/CollectionList';
import CollectionEditor from '../components/Admin/Editors/CollectionEditor/CollectionEditor';

class AdminController extends BaseController {
	constructor(view, component) {
		super(view);

		this.adminComponent = component;
	}

	onShow() {
		const menu = new Menu();
		menu.render('admin-nav');

		const component = new this.adminComponent();
		component.render('admin-nav-aside');
	}

}

export class AdminArtistsController extends AdminController {
	constructor() {
		super(adminView, ArtistList);
	}
}

export class AdminArtistEditorController extends AdminController {
	constructor() {
		super(adminView, ArtistEditor);
	}
}

export class AdminAlbumsController extends AdminController {
	constructor() {
		super(adminView, AlbumList);
	}
}

export class AdminAlbumEditorController extends AdminController {
	constructor() {
		super(adminView, AlbumEditor);
	}
}

export class AdminTracksController extends AdminController {
	constructor() {
		super(adminView, TrackList);
	}
}

export class AdminTrackEditorController extends AdminController {
	constructor() {
		super(adminView, TrackEditor);
	}
}

export class AdminCollectionsController extends AdminController {
	constructor() {
		super(adminView, CollectionList);
	}
}

export class AdminCollectionEditorController extends AdminController {
	constructor() {
		super(adminView, CollectionEditor);
	}
}

export default AdminController;
