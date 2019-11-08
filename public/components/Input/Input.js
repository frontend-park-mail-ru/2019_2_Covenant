
class Input {
	constructor({inputClass = '', errorClass = '', component = null} = {}) {
		this.input =  component.getElementsByClassName(inputClass)[0];
		this.error = component.getElementsByClassName(errorClass)[0];
	}

	get value() {
		return this.input.value;
	}

	setError(text) {
		this.error.innerText = text;
	}

	clearError() {
		this.error.innerText = '';
	}
}

export default Input;
