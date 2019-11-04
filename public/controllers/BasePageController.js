import BaseController from './BaseController.js';
import Header from '../components/Header/Header';

class BasePageController extends BaseController {
	constructor(view) {
		super(view);
	}

	onShow() {
		const header = new Header();
		header.render('header');
	}
}

export default BasePageController;
