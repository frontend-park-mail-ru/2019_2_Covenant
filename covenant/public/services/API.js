'use strict';

class API {
    async signupreq({login = '', email = '', password = '', age = null} = {}) {
        const response = await fetch('/Signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'nickname': login,
                'email': email,
                'password': password,
                'age': age
            })
        });

        return await response.json();
    }

    async loginreq({login = '', password = ''} = {}) {
        const response = await fetch('/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'nickname': login,
                'password': password
            })
        });

        return await response.json();
    }
}

export default API;

