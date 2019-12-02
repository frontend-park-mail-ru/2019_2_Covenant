import BaseController from './BaseController';
import adminView from '../views/AdminView/AdminView';
import Menu from '../components/Admin/Menu/Menu';
import ArtistList from '../components/Admin/Lists/ArtistList/ArtistList';

class AdminController extends BaseController {
	constructor(view, component) {
		super(view);

		this.adminComponent = component;
	}

	onShow() {
		const menu = new Menu();
		menu.render('admin-nav');

		const component = this.adminComponent;
		component.render('admin-nav-aside');
	}

}

export class AdminArtistsController extends AdminController {
	constructor() {
		super(adminView, new ArtistList());
	}

	onShow() {
		super.onShow();
	}
}

export class AdminAlbumsController extends AdminController {
	constructor() {
		super(adminView, {});
	}

	onShow() {
		super.onShow();
	}
}

export class AdminTracksController extends AdminController {
	constructor() {
		super(adminView, {});
	}

	onShow() {
		super.onShow();
	}
}

export default AdminController;
