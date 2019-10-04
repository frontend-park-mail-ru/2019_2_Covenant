const pug = require('pug');

class SignUpFormComponent {
    /**
     * @returns {string}
     */
    render() {
        return pug.compileFile('./SignUpForm.pug')();
    }
}

export default SignUpFormComponent;