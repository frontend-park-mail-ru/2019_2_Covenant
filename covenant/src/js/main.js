'use strict';

const API = globalThis.API;
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
    const signUpForm = document.createElement('form');

    const inputs = {
        loginInput: createElement({tagName: 'input', type: 'text', name: 'login', placeholder: 'Никнейм'}),
        emailInput: createElement({tagName: 'input', type: 'email', name: 'email', placeholder: 'Е-майл'}),
        passwordInput: createElement({tagName: 'input', type: 'password', name: 'password', placeholder: 'Пароль'}),
        repeatInput: createElement({
            tagName: 'input',
            type: 'password',
            name: 'repeat',
            placeholder: 'Повторите пароль'
        }),
        ageInput: createElement({tagName: 'input', type: 'number', name: 'age', placeholder: 'Возраст'}),
        submitBtn: createElement({tagName: 'input', type: 'submit', value: 'Зарегистрироваться'})
    };

    Object.values(inputs).forEach(function (value) {
        signUpForm.appendChild(value);
    });

    signUpForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const form = {
            login: signUpForm.elements['login'].value,
            email: signUpForm.elements['email'].value,
            password: signUpForm.elements['password'].value,
            age: parseInt(signUpForm.elements['age'].value)
        };

        const repeat = signUpForm.elements['repeat'].value;

        if (form.password === repeat) {
            (async function () {
                const data = await API.signupreq({...form});
                console.log(data);
            })();
        } else {
            alert("Passwords are not equal.");
        }
    });

    application.innerHTML = '';
    application.appendChild(signUpForm);
}

function createLogIn() {
    const loginForm = document.createElement('form');

    const inputs = {
        loginInput: createElement({tagName: 'input', type: 'text', name: 'login', placeholder: 'Никнейм'}),
        passwordInput: createElement({tagName: 'input', type: 'password', name: 'password', placeholder: 'Пароль'}),
        submitBtn: createElement({tagName: 'input', type: 'submit', value: 'Войти'})
    };

    Object.values(inputs).forEach(function (value) {
        loginForm.appendChild(value);
    });

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const form = {
            login: loginForm.elements['login'].value,
            password: loginForm.elements['password'].value
        };

        (async function () {
            const data = await API.loginreq({...form});
            console.log(data);
        })();
    });

    application.innerHTML = '';
    application.appendChild(loginForm);
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
