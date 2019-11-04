
class BaseComponent {
	constructor(templateFunc) {
		const nodeElement = document.createElement('div');
		nodeElement.innerHTML = templateFunc();
		this.currentElement = nodeElement.firstElementChild;
	}

	get element() {
		return this.currentElement;
	}

	render(parentId) {
		const parent = document.getElementById(parentId);
		parent.append(this.currentElement);
		this.onRender();
	}

	onRender() {}
}

export default BaseComponent;
