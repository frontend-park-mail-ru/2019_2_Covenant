class BaseView {
	constructor(parent, templateFunc, tag = 'div') {
		this.element = document.createElement(tag);
		parent.appendChild(this.element);

		this.templateFunc = templateFunc;
	}

	show()
	{
		this.element.innerHTML = this.templateFunc();
		this.onShow();
	}

	hide()
	{
		this.element.innerHTML = '';
		this.onHide();
	}

	onShow() {}
	onHide() {}
}

export default BaseView;
