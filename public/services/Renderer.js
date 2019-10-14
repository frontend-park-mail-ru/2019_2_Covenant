'use strict';

import LoginPage from '../components/Login/Login.js';
import SignupPage from '../components/Signup/Signup.js';
import MainPage from '../components/Main/Main.js';

export default class Renderer {
    login() {
        const login = new LoginPage();
        return login.render();
    }

    signup() {
        const signup = new SignupPage();
        return signup.render();
    }

    main() {
        const main = new MainPage();
        return main.render();
    }
}
