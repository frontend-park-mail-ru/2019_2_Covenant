'use strict';

class API {
    async profileReq() {
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

    async profileSaveReq(name) {
        const response = await fetch('/profile',{
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

        const response = await fetch('/upload/avatar',{
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: formData
        });

        return await response.json();
    }

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

