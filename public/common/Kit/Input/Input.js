
class Input {
	constructor({inputId = '', errorId = ''} = {}) {
		this.input =  document.getElementById(inputId);
		this.error = document.getElementById(errorId);
	}

	get value() {
		return this.input.value;
	}

	setError(text) {
		if (this.error) {
			this.error.innerText = text;
		}
	}

	clearError() {
		if (this.error) {
			this.error.innerText = '';
		}
	}
}

export default Input;
