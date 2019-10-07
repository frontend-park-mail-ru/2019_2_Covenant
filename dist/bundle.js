/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./base/application/Application.ts":
/*!*****************************************!*\
  !*** ./base/application/Application.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar Application = /** @class */ (function () {\n    /** Manual creation of instances is prohibited. Use static method 'instance' instead */\n    function Application() {\n        if (Application._instance) {\n            return Application._instance;\n        }\n        Application._instance = this;\n    }\n    Object.defineProperty(Application, \"instance\", {\n        /** The only lifecycle method. Returns the only instance */\n        get: function () {\n            if (!Application._instance) {\n                Application._instance = new Application();\n            }\n            return Application._instance;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    return Application;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (Application);\n\n\n//# sourceURL=webpack:///./base/application/Application.ts?");

/***/ }),

/***/ "./base/eventbus/EventBus.ts":
/*!***********************************!*\
  !*** ./base/eventbus/EventBus.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar EventBus = /** @class */ (function () {\n    function EventBus() {\n        this._channels = new Map();\n    }\n    /**\n     * Subscribes on named channel. If channel doesn't exist, creates it. Returns callback id\n     * @param channelName Name of channel to subscribe\n     * @param callback Callback on publish\n     */\n    EventBus.prototype.subscribe = function (channelName, callback) {\n        var channel = this._channels.get(channelName);\n        if (!channel) {\n            channel = [];\n            this._channels.set(channelName, channel);\n        }\n        return channel.push(callback);\n    };\n    /**\n     * Unsubscribes from named channel\n     * @param channelName Name of channel to unsubscribe\n     * @param callbackId Callback id\n     */\n    EventBus.prototype.unsubscribe = function (channelName, callbackId) {\n        var channel = this._channels.get(channelName);\n        if (!channel || !channel.length) {\n            return;\n        }\n        delete channel[callbackId];\n    };\n    /**\n     * Emits all callbacks subscribed to named channel\n     * @param channelName Name of channel to emit\n     * @param data Data to pass to callback\n     */\n    EventBus.prototype.publish = function (channelName, data) {\n        var channel = this._channels.get(channelName);\n        if (!channel || !channel.length) {\n            return;\n        }\n        channel.forEach(function (callback) { return callback(data); });\n    };\n    return EventBus;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (EventBus);\n\n\n//# sourceURL=webpack:///./base/eventbus/EventBus.ts?");

/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var base_application_Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! base/application/Application */ \"./base/application/Application.ts\");\n/* harmony import */ var base_eventbus_EventBus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! base/eventbus/EventBus */ \"./base/eventbus/EventBus.ts\");\n\n\nvar app = base_application_Application__WEBPACK_IMPORTED_MODULE_0__[\"default\"].instance;\nObject.defineProperty(window, 'bus', {\n    value: new base_eventbus_EventBus__WEBPACK_IMPORTED_MODULE_1__[\"default\"]()\n});\n\n\n//# sourceURL=webpack:///./index.ts?");

/***/ })

/******/ });