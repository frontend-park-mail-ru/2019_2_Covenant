import BasePageController from './BasePageController';

class MainController extends BasePageController {
	constructor(view){
		super(view);

		this.title = 'Main Page';
	}
}

export default MainController;
