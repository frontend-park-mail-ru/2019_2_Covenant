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

function createElement(
    {
        tagName = 'div',
        className = null,
        innerText = null,
        placeholder = null,
        type = null,
        name = null,
        value = null,
    } = {}) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (innerText) element.innerText = innerText;
    if (placeholder) element.placeholder = placeholder;
    if (type) element.type = type;
    if (name) element.name = name;
    if (value) element.value = value;

    return element;
}

function createMainPage() {
    const header = createElement({tagName: 'div', className: 'header'});

    const headerLogo = createElement({tagName: 'div', className: 'header__logo'});
    const logo = createElement({tagName: 'h1', innerText: 'Covenant'});
    headerLogo.appendChild(logo);

    const menu = createElement({tagName: 'nav', className: 'header__menu'});
    const list = createElement({tagName: 'ul'});

    Object.keys(menuItems).forEach(function (key) {
        let item = createElement({tagName: 'li'});
        let link = createElement({tagName: 'a', innerText: key});
        link.href = `/${key}`;
        link.dataset.section = key;
        item.appendChild(link);
        list.appendChild(item);
    });

    menu.appendChild(list);

    header.appendChild(headerLogo);
    header.appendChild(menu);

    application.innerHTML = '';
    application.appendChild(header);
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
    signup: createSignUp,
    login: createLogIn,
};

application.addEventListener('click', function (evt) {
    const {target} = evt;

    if (target instanceof HTMLAnchorElement) {
        evt.preventDefault();
        functions[target.dataset.section]();
    }
});

createMainPage();
