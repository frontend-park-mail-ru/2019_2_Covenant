'use strict';

import RouterModule from './services/Router.js';

const Router = new RouterModule();
Router.start();

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
