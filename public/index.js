'use strict';

import EventBusModule from './services/EventBus.js';
import Events from './services/Events.js';
import RouterModule from './services/Router.js';

const Router = new RouterModule();
const EventBus = new EventBusModule();

EventBus.subscribe(Events.ChangeRoute, Router.eventHandler);
Router.popState();

// window.onpopstate = Router.popState;


// function createProfile() {
//     API.profileReq().then(response => {
//         console.log(response);
//
//         if(!components.profile)
//             components.profile = new Profile();
//
//         const page = components.profile.render(response.user);
//         application.innerHTML = '';
//         application.innerHTML = page;
//
//         components.profile.afterRender();
//
//     }).catch(error => {
//         console.log(error);
//     });
// }
//
// function createSignUp() {
//     application.innerHTML = '';
//     application.innerHTML = Renderer.signup();
//     const signUpForm = document.getElementById('signup-form');
//
//     signUpForm.addEventListener('submit', function (e) {
//         e.preventDefault();
//
//         const form = {
//             email: signUpForm.elements['signup__email_input'].value,
//             password: signUpForm.elements['signup__password_input'].value
//         };
//
//         const repeat = signUpForm.elements['signup__repeat_password_input'].value;
//
//         if (form.password === repeat) {
//             Http.fetchPost({
//                path: '/signup',
//                body: JSON.stringify({...form})
//             })
//             .then(response => response.json())
//             .then(commits => console.log(commits))
//             .catch(error => {console.log(error);});
//         } else {
//             alert('Passwords are not equal.');
//         }
//     });
// }
//
// function createLogIn() {
//     application.innerHTML = '';
//     application.innerHTML = Renderer.login();
//
//     const loginForm = document.getElementById('login-form');
//
//     loginForm.addEventListener('submit', function (e) {
//         e.preventDefault();
//
//         const form = {
//             email: loginForm.elements['login__email_input'].value,
//             password: loginForm.elements['login__password_input'].value
//         };
//
//         Http.fetchPost({
//             path: '/login',
//             body: JSON.stringify({...form})
//         })
//         .then(response => response.json())
//         .then(commits => {console.log(commits); createProfile();})
//         .catch(error => {console.log(error);});
//     });
// }
//
// function auth(successCallback, failCallback) {
//     API.checkAuthReq().then(response => {
//         const status = response.status;
//
//         if (response.auth === true || status >= 200 && status < 400) {
//             successCallback();
//         } else {
//             console.log(response);
//             failCallback();
//         }
//     });
// }
//
// function onLogout() {
//     Http.fetchGet({
//         path: '/logout'
//     }).then( response => {
//         console.log(response);
//         createMainPage();
//     }).catch( error => {
//         console.log(error);
//     });
// }
//
// const functions = {
//     signup_link: () => auth(createProfile, createSignUp),
//     login_link: () => auth(createProfile, createLogIn),
//     logout_link: onLogout,
//     main_link: createMainPage,
//     profile: () => auth(createProfile, createLogIn)
// };
//
// application.addEventListener('click', function (evt) {
//     const {target} = evt;
//
//     if (target instanceof HTMLAnchorElement) {
//         evt.preventDefault();
//         functions[target.id]();
//     }
// });
//
// createMainPage();
