'use strict';

class API {
    async signupreq({email = '', password = ''} = {}) {
        const response = await fetch('/signup', {
            method: 'POST',
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

    async loginreq({email = '', password = ''} = {}) {
        const response = await fetch('/login', {
            method: 'POST',
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

    async profilereq({login = '', session = ''} = {}) {
        const response = await fetch('/profile',{
            method: 'GET'
        });

        const data = await response.json();

        return {
            status: response.status,
            ...data
        }
    }
}

export default API;

