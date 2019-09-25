'use strict';

(function () {
    class API {
        async signupreq({login = '', email = '', password = '', age = null} = {}) {
            const response = await fetch('/signup', {
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
    }

    globalThis.API = new API();
})();
