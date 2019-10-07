const pug = require('pug');

class SignupFormComponent {
    /**
     * @returns {string}
     */
    render() {
        return pug.compileFile('./SignupForm.pug')();
    }
}

export default SignupFormComponent;