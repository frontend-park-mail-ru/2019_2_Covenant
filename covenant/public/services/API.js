'use strict';

/**
 * API module
 * @module services/API
 */

/** Class represents an API */
class API {

    /**
     * Server request for registration
     * @param {string} email - Email of user
     * @param {string} password - Password os user
     * @returns {Promise<any>} server response in json format
     */
    async signupReq({email = '', password = ''} = {}) {
        const response = await fetch('/signup', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password,
            })
        });

        return await response.json();
    }

    /**
     * Server request for authorization
     *  @param {string} email - Email of user
     * @param {string} password - Password os user
     * @returns {Promise<any>} server response in json format
     */
    async loginReq({email = '', password = ''} = {}) {
        const response = await fetch('/login', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password
            })
        });

        return await response.json();
    }

    /**
     * Server request for creating profile page
     * @param {string} login - User login
     * @param {string} session - Current session
     * @returns {Promise<any>} json with HTTP status code and server response in json format
     */
    async profileReq({login = '', session = ''} = {}) {
        const response = await fetch('/profile',{
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        });

        const data = await response.json();

        return {
            status: response.status,
            ...data
        }
    }

    /**
     * Server request for checking authorization
     * @returns {Promise<any>} server response in json format
     */
    async checkAuthReq() {
        const response = await fetch('/auth', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        });

        return await response.json();
    }
}

export default API;

