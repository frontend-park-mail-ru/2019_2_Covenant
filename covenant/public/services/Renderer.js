'use strict';
/**
 * Renderer module
 * @module services/Renderer
 */

import getLoginPage from "../components/Login/Login.js";
import getSignupPage from "../components/Signup/Signup.js";
import getMainPage from "../components/Main/Main.js";

/** Class represents rendering pages */
class Renderer {

    /**
     * Rendering login page
     * @returns {string} rendered page
     */
    login() {
        return getLoginPage();
    }

    /**
     * Rendering sign up page
     * @returns {string} rendered page
     */
    signup() {
        return getSignupPage();
    }

    /**
     * Rendering main page
     * @returns {string} rendered page
     */
    main() {
        return getMainPage();
    }
}

export default Renderer