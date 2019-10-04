const pug = require('pug');

class SignInFormComponent {
    /**
     * @returns {string}
     */
    render() {
        pug.compileFile('./SignInForm.pug')();
    }
}

export default SignInFormComponent;