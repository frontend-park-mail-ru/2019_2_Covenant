const pug = require('pug');

class SigninForm {
    /**
     * @returns {string}
     */
    render() {
        pug.compileFile('./SigninForm.pug')();
    }
}

export default SigninForm;