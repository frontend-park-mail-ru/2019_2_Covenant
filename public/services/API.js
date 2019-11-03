'use strict';

class API {

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

