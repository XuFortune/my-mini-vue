/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/runtime/index.js":
/*!******************************!*\
  !*** ./src/runtime/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fragment: () => (/* reexport safe */ _vnode__WEBPACK_IMPORTED_MODULE_0__.Fragment),
/* harmony export */   Text: () => (/* reexport safe */ _vnode__WEBPACK_IMPORTED_MODULE_0__.Text),
/* harmony export */   h: () => (/* reexport safe */ _vnode__WEBPACK_IMPORTED_MODULE_0__.h),
/* harmony export */   render: () => (/* reexport safe */ _render__WEBPACK_IMPORTED_MODULE_1__.render)
/* harmony export */ });
/* harmony import */ var _vnode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vnode */ "./src/runtime/vnode.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/runtime/render.js");



/***/ }),

/***/ "./src/runtime/render.js":
/*!*******************************!*\
  !*** ./src/runtime/render.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _vnode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vnode */ "./src/runtime/vnode.js");
function _readOnlyError(r) { throw new TypeError('"' + r + '" is read-only'); }


function render(vnode, container) {
  mount(vnode, container);
}
function mount(vnode, container) {
  var shapeFlag = vnode.shapeFlag;
  if (shapeFlag & _vnode__WEBPACK_IMPORTED_MODULE_1__.ShapeFlags.ELEMENT) {
    mountElement(vnode, container);
  } else if (shapeFlag & _vnode__WEBPACK_IMPORTED_MODULE_1__.ShapeFlags.TEXT) {
    mountTextNode(vnode, container);
  } else if (shapeFlag & _vnode__WEBPACK_IMPORTED_MODULE_1__.ShapeFlags.FRAGMENT) {
    mountFragment(vnode, container);
  } else {
    mountComponent(vnode, container);
  }
}
function mountElement(vnode, container) {
  var type = vnode.type,
    props = vnode.props,
    children = vnode.children;
  var el = document.createElement(type);
  mountProps(props, el);
  mountChildren(vnode, el);
  container.appendChild(el);
}
function mountTextNode(vnode, container) {
  var textNode = document.createTextNode(vnode.children);
  container.appendChild(textNode);
}
function mountFragment(vnode, container) {
  mountChildren(vnode, container);
}
function mountComponent(vnode, container) {}
var domPropsRE = /[A-Z]|^(value|checked|selected|muted|disabled)$/;
function mountProps(props, el) {
  for (var key in props) {
    var value = props[key];
    switch (key) {
      case 'class':
        el.className = value;
        break;
      case 'style':
        for (var styleName in value) {
          el.style[styleName] = value[styleName];
        }
        break;
      default:
        if (/^on[A-Z]/.test(key)) {
          var eventName = key.slice(2).toLowerCase();
          el.addEventListener(eventName, value);
        } else if (domPropsRE.test(key)) {
          if (value === '' && (0,_utils__WEBPACK_IMPORTED_MODULE_0__.isBoolean)(el[key])) {
            true, _readOnlyError("value");
          }
          el[key] = value;
        } else {
          if (value == null || value === false) {
            el.removeAttribute(key);
          } else {
            el.setAttribute(key, value);
          }
        }
        break;
    }
  }
}
function mountChildren(vnode, container) {
  var shapeFlag = vnode.shapeFlag,
    children = vnode.children;
  if (shapeFlag & _vnode__WEBPACK_IMPORTED_MODULE_1__.ShapeFlags.TEXT_CHILDREN) {
    mountTextNode(vnode, container);
  } else if (shapeFlag & _vnode__WEBPACK_IMPORTED_MODULE_1__.ShapeFlags.ARRAR_CHILDREN) {
    children.forEach(function (child) {
      mount(child, container);
    });
  }
}

/***/ }),

/***/ "./src/runtime/vnode.js":
/*!******************************!*\
  !*** ./src/runtime/vnode.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fragment: () => (/* binding */ Fragment),
/* harmony export */   ShapeFlags: () => (/* binding */ ShapeFlags),
/* harmony export */   Text: () => (/* binding */ Text),
/* harmony export */   h: () => (/* binding */ h)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");

var ShapeFlags = {
  ELEMENT: 1,
  //00000001
  TEXT: 1 << 1,
  //00000010
  FRAGMENT: 1 << 2,
  //00000100
  COMPONENT: 1 << 3,
  //00001000
  TEXT_CHILDREN: 1 << 4,
  //00010000
  ARRAR_CHILDREN: 1 << 5,
  //00100000
  CHILDREN: 1 << 4 | 1 << 5 //00110000
};
var Text = Symbol('Text');
var Fragment = Symbol('Fragment');

/**
 * 
 * @param {string|object|Text|Fragment} type 
 * @param {Object|null} props 
 * @param {string|number|Array|null} children 
 * @returns VNode
 */
function h(type, props, children) {
  var shapeFlags = 0;
  if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isString)(type)) {
    shapeFlags = ShapeFlags.ELEMENT;
  } else if (type === Text) {
    shapeFlags = ShapeFlags.TEXT;
  } else if (type === Fragment) {
    shapeFlags = ShapeFlags.FRAGMENT;
  } else {
    shapeFlags = ShapeFlags.COMPONENT;
  }
  if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isString)(children) || (0,_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber)(children)) {
    shapeFlags |= ShapeFlags.TEXT_CHILDREN;
    children = children.toString();
  } else if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isArray)(children)) {
    shapeFlags |= ShapeFlags.ARRAR_CHILDREN;
  }
  return {
    type: type,
    props: props,
    children: children,
    shapeFlags: shapeFlags
  };
}

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasChanged: () => (/* binding */ hasChanged),
/* harmony export */   isArray: () => (/* binding */ isArray),
/* harmony export */   isBoolean: () => (/* binding */ isBoolean),
/* harmony export */   isFunction: () => (/* binding */ isFunction),
/* harmony export */   isNumber: () => (/* binding */ isNumber),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isString: () => (/* binding */ isString)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function isObject(target) {
  return _typeof(target) === 'object' && target !== null;
}
function hasChanged(oldValue, value) {
  return oldValue !== value && !(Number.isNaN(oldValue) && Number.isNaN(value));
}
function isArray(target) {
  return Array.isArray(target);
}
function isFunction(target) {
  return typeof target === 'function';
}
function isString(target) {
  return typeof target === 'string';
}
function isBoolean(target) {
  return typeof target === 'boolean';
}
function isNumber(target) {
  return typeof target === 'number';
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _runtime_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./runtime/index */ "./src/runtime/index.js");

var vnode = (0,_runtime_index__WEBPACK_IMPORTED_MODULE_0__.h)('div', {
  "class": 'a b',
  style: {
    border: '1px solid',
    fontSize: '14px'
  },
  onClick: function onClick() {
    return console.log('click');
  },
  id: 'foo',
  checked: '',
  custom: false
}, [(0,_runtime_index__WEBPACK_IMPORTED_MODULE_0__.h)('ul', null, [(0,_runtime_index__WEBPACK_IMPORTED_MODULE_0__.h)('li', {
  style: {
    color: 'red'
  }
}, 1), (0,_runtime_index__WEBPACK_IMPORTED_MODULE_0__.h)('li', null, 2), (0,_runtime_index__WEBPACK_IMPORTED_MODULE_0__.h)('li', {
  style: {
    color: 'blue'
  }
}, 3), (0,_runtime_index__WEBPACK_IMPORTED_MODULE_0__.h)(_runtime_index__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,_runtime_index__WEBPACK_IMPORTED_MODULE_0__.h)('li', null, '4'), (0,_runtime_index__WEBPACK_IMPORTED_MODULE_0__.h)('li')]), (0,_runtime_index__WEBPACK_IMPORTED_MODULE_0__.h)('li', null, [(0,_runtime_index__WEBPACK_IMPORTED_MODULE_0__.h)(_runtime_index__WEBPACK_IMPORTED_MODULE_0__.Text, null, 'hello world')])])]);
(0,_runtime_index__WEBPACK_IMPORTED_MODULE_0__.render)(vnode, document.body);
})();

/******/ })()
;