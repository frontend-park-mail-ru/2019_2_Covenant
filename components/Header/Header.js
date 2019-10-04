const pug = require('pug');

class HeaderComponent {
    /**
     * @returns {string}
     */
    render() {
        return pug.compileFile('./Header.pug')();
    }
}

export default HeaderComponent;