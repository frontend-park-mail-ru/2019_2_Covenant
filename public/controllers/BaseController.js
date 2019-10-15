
class BaseController {
	constructor(view) {
		this.view = view;
		this.title = 'Base Title';
	}

	show() {
		this.view.show();
		this.onShow();
	}

	hide() {
		this.view.hide();
		this.onHide();
	}

	onShow() {}
	onHide() {}
}

export default BaseController;
