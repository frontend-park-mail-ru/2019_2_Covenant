'use strict';

class API {
    constructor(host) {
        this.host = host;
    }

    async signupReq({email = '', password = ''} = {}) {
        const response = await fetch(`${this.host}/signup`, {
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

    async loginReq({email = '', password = ''} = {}) {
        const response = await fetch(`${this.host}/login`, {
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

    async logoutReq() {
        const response = await fetch(`${this.host}/logout`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        });

        const data = await response.json();

        return {
            auth: false,
            status: response.status,
            ...data
        }
    }

    async profileReq() {
        const response = await fetch(`${this.host}/profile`,{
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

    async profileSaveReq(name) {
        const response = await fetch(`${this.host}/profile`,{
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': name
            })
        });

        return await response.json();
    }

    async uploadAvatarReq(file) {
        const formData = new FormData();
        formData.append('avatar', file);
        formData.append('name', file.name);

        const response = await fetch(`${this.host}/upload/avatar`,{
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: formData
        });

        return await response.json();
    }

    async checkAuthReq() {
        const response = await fetch(`${this.host}/auth`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        });

        return await response.json();
    }
}

export default API;

