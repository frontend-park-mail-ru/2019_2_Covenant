class Button {
	constructor({id = '', callback = () => {}} = {}) {
		const element = document.getElementById(id);
		if (element) {
			element.addEventListener('click', callback);
		}
	}
}

export default Button;