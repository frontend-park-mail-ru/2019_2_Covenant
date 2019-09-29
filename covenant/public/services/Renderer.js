'use strict';

import getLoginPage from "../components/Login/Login.js";
import getSignupPage from "../components/Signup/Signup.js";
import getMainPage from "../components/Main/Main.js";
import getProfilePage from "../components/Profile/Profile.js";

export default class Renderer {
    login() {
        return getLoginPage();
    }

    signup() {
        return getSignupPage();
    }

    main() {
        return getMainPage();
    }

    profile() {
        return getProfilePage();
    }
}