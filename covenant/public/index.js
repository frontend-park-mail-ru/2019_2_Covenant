'use strict';

import RendererModule from "./services/Renderer.js";
import APIModule from "./services/API.js";

const API = new APIModule();
const Renderer = new RendererModule();

const application = document.getElementById('wrapper');

const menuItems = {
    signup: 'Sign-Up',
    login: 'Log-In'
};

function createMainPage() {
    application.innerHTML = '';
    application.innerHTML = Renderer.main();
}

function createSignUp() {
    application.innerHTML = '';
    application.innerHTML = Renderer.signup();
    const signUpForm = document.getElementById('signup-form');

    signUpForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const form = {
            email: signUpForm.elements['signup__email_input'].value,
            password: signUpForm.elements['signup__password_input'].value
        };

        const repeat = signUpForm.elements['signup__repeat_password_input'].value;

        if (form.password === repeat) {
            (async function () {
                const data = await API.signupreq({...form});
                console.log(data);
            })();
        } else {
            alert("Passwords are not equal.");
        }
    });
}

function createLogIn() {
    application.innerHTML = '';
    application.innerHTML = Renderer.login();

    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const form = {
            email: loginForm.elements['login__email_input'].value,
            password: loginForm.elements['login__password_input'].value
        };

        (async function () {
            const data = await API.loginreq({...form});
            console.log(data);
        })();
    });
}

const functions = {
    signup_link: createSignUp,
    login_link: createLogIn,
    main_link: createMainPage
};

application.addEventListener('click', function (evt) {
    const {target} = evt;

    if (target instanceof HTMLAnchorElement) {
        evt.preventDefault();
        functions[target.id]();
    }
});

createMainPage();
