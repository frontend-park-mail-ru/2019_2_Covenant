'use strict';

import Profile from "./components/Profile/Profile.js";

import RendererModule from "./services/Renderer.js";
import APIModule from "./services/API.js";
import EventBus from "./services/PublisherSubscriber.js";

const API = new APIModule('https://covenant-backend.marshalityy.now.sh');
const Renderer = new RendererModule();

const application = document.getElementById('wrapper');

const menuItems = {
    signup: 'Sign-Up',
    login: 'Log-In'
};

const components = {
    profile: null
};

EventBus.subscribe('renderProfile', createProfile);

function createMainPage() {
    application.innerHTML = '';
    application.innerHTML = Renderer.main();
}

function createProfile() {
    API.profileReq().then(response => {
        console.log(response);

        if(!components.profile)
            components.profile = new Profile();

        const page = Mustache.render(components.profile.render(), response.user);
        application.innerHTML = '';
        application.innerHTML = page;

        components.profile.afterRender();

    }).catch(error => {
        console.log(error);
    });
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
            API.signupReq({...form}).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            });
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

        API.loginReq({...form}).then(response => {
            console.log(response);
            createProfile();
        }).catch(error => {
            console.log(error);
        });
    });
}

function auth(successCallback, failCallback) {
    API.checkAuthReq().then(response => {
        const status = response.status;

        if (response.auth === true || status >= 200 && status < 400) {
            successCallback();
        } else {
            console.log(response);
            failCallback();
        }
    });
}

function onLogout(evt) {
    API.logoutReq().then(response => {
        console.log(response);
        createMainPage();
    }).catch(error => {
        console.log(error);
    });
}

const functions = {
    signup_link: () => auth(createProfile, createSignUp),
    login_link: () => auth(createProfile, createLogIn),
    logout_link: onLogout,
    main_link: createMainPage,
    profile: () => auth(createProfile, createLogIn)
};

application.addEventListener('click', function (evt) {
    const {target} = evt;

    if (target instanceof HTMLAnchorElement) {
        evt.preventDefault();
        functions[target.id]();
    }
});

createMainPage();
