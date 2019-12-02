class BaseComponent {
	constructor(templateFunc, data = null) {
		this.parentId = null;
		this.templateFunc = templateFunc;
		this.currentElement = this.createNodeElement(data);
	}

	createNodeElement(data = null) {
		const nodeElement = document.createElement('div');
		nodeElement.innerHTML = this.templateFunc(data);
		return nodeElement.firstElementChild;
	}

	get element() {
		return this.currentElement;
	}

	update(data) {
		this.currentElement = this.createNodeElement(data);
		this.render(this.parentId);
	}

	render(parentId) {
		this.parentId = parentId;

		const parent = document.getElementById(parentId);
		if (parent) {
			parent.innerHTML = '';
			parent.append(this.currentElement);
			this.onRender();
		}
	}

	onRender() {}
}

export default BaseComponent;
