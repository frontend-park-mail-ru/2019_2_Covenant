'use strict'

const application = document.getElementById('wrapper');

const menuItems = {
    signup: 'Sign-Up',
    login: 'Log-In'
};

function createElement({tagName = 'div', className = null, innerText = null} = {}) {
    const element = document.createElement(tagName);
    if (className !== null) element.className = className;
    if (innerText !== null) element.innerText = innerText;

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
    alert('SignUp');
}

function createLogIn() {
    alert('LogIn');
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
