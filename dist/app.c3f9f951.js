// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getElement = getElement;

function getElement(selector) {
  return document.querySelector(selector);
}
},{}],"js/refs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refs = exports.elemArrays = exports.BASE_URL = void 0;

var _utils = require("./utils.js");

var BASE_URL = exports.BASE_URL = 'https://68177c0a26a599ae7c3a8878.mockapi.io/notes';
var refs = exports.refs = {
  header: {
    searchBtn: (0, _utils.getElement)(".header__searchButton"),
    themeButton: (0, _utils.getElement)(".header__themeButton"),
    searchCloseButton: (0, _utils.getElement)(".header__closeButton"),
    searchBarWrapper: (0, _utils.getElement)(".header__searchBarBox"),
    searchText: (0, _utils.getElement)(".header__searchBar"),
    headerHeadline: (0, _utils.getElement)(".header__headline")
  },
  main: {
    createBtn: (0, _utils.getElement)(".main__createButton"),
    startPageContent: (0, _utils.getElement)(".main__emptyContent"),
    notFoundContent: (0, _utils.getElement)(".main__notFoundContent"),
    notesWrapper: (0, _utils.getElement)(".main__notesWrapper"),
    emptyParagraph: (0, _utils.getElement)(".main__paragraph"),
    notFoundParagraph: (0, _utils.getElement)(".main__paragraphNotFound")
  },
  formContainer: {
    saveButton: (0, _utils.getElement)(".header__saveButton"),
    backButton: (0, _utils.getElement)(".header__backButton"),
    noteForm: (0, _utils.getElement)(".main__form"),
    noteTitle: (0, _utils.getElement)(".main__formTitle"),
    noteText: (0, _utils.getElement)(".main__formText"),
    tagsBox: (0, _utils.getElement)(".main__tagBox"),
    tagButton: document.querySelectorAll(".tagButton"),
    prevClickedTagButton: null,
    formContainer: (0, _utils.getElement)(".formContainer")
  },
  editFormContainer: {
    editFormContainer: (0, _utils.getElement)(".editFormContainer"),
    editHeader: (0, _utils.getElement)(".header__rewriteEditor"),
    editBackButton: (0, _utils.getElement)(".header__rewriteBackButton"),
    editSaveButton: (0, _utils.getElement)(".header__rewriteSaveButton"),
    editForm: (0, _utils.getElement)(".main__editForm"),
    editTitle: (0, _utils.getElement)(".main__editTitle"),
    editTextArea: (0, _utils.getElement)(".main__editText")
  },
  deleteMessageWrapper: {
    deleteButton: (0, _utils.getElement)(".deleteButton"),
    cancelButton: (0, _utils.getElement)(".cancelButton"),
    deleteMessageWrapper: (0, _utils.getElement)(".deleteMessageWrapper"),
    deleteMessage: (0, _utils.getElement)(".deleteMessage")
  },
  eventHandlers: {
    currentDeleteHandler: null,
    currentCancelHandler: null,
    currentEditBackHandler: null,
    currentEditSaveHandler: null
  },
  objectAndArray: {
    noteObj: {},
    notesArr: []
  },
  main__deleteButton: null,
  body: (0, _utils.getElement)('body')
};
var elemArrays = exports.elemArrays = {
  formInputsArr: [refs.formContainer.noteTitle, refs.formContainer.noteText],
  editFormInputs: [refs.editFormContainer.editTitle, refs.editFormContainer.editTextArea]
};
},{"./utils.js":"js/utils.js"}],"js/deleteNote.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onDeleteButtonHandler = exports.onCancelButtonHandler = exports.deleteNoteOnServer = exports.deleteFoundNotes = void 0;

var _refs = require("./refs.js");

var _eventListeners = require("./eventListeners.js");

var _generateNotes = require("./generateNotes.js");

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i.return && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, catch: function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }

function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }

function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

var onDeleteButtonHandler = exports.onDeleteButtonHandler =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime().mark(function _callee(noteElement) {
    var notes;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          deleteNoteOnServer(noteElement.id);
          noteElement.remove();
          _context.next = 4;
          return (0, _generateNotes.checkIfNotesExist)();

        case 4:
          notes = _context.sent;

          if (!notes || notes.length === 0) {
            _refs.refs.main.startPageContent.style.display = 'flex';
          }

        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));

  return function onDeleteButtonHandler(_x) {
    return _ref.apply(this, arguments);
  };
}();

var onCancelButtonHandler = exports.onCancelButtonHandler = function onCancelButtonHandler() {
  _refs.refs.deleteMessageWrapper.deleteMessageWrapper.style.display = 'none';
};

var deleteFoundNotes = exports.deleteFoundNotes = function deleteFoundNotes(foundNotes) {
  foundNotes.forEach(function (note) {
    document.getElementById(note.id).querySelector('.main__deleteButton').addEventListener('click', function (event) {
      return (0, _eventListeners.addEventListenToDeleteAndCancelBtns)(event);
    });
  });
};

var deleteNoteOnServer = exports.deleteNoteOnServer =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime().mark(function _callee2(noteElementId) {
    var response, data;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return fetch("".concat(_refs.BASE_URL, "/").concat(noteElementId), {
            method: "DELETE"
          });

        case 3:
          response = _context2.sent;

          if (response.ok) {
            _context2.next = 6;
            break;
          }

          throw Error('Something went wrong!');

        case 6:
          _context2.next = 8;
          return response.json();

        case 8:
          data = _context2.sent;
          _refs.refs.deleteMessageWrapper.deleteMessageWrapper.style.display = 'none';
          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 12]]);
  }));

  return function deleteNoteOnServer(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
},{"./refs.js":"js/refs.js","./eventListeners.js":"js/eventListeners.js","./generateNotes.js":"js/generateNotes.js"}],"js/validation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formValidation = void 0;

var _refs = require("./refs.js");

var formValidation = exports.formValidation = function formValidation(form, inputsArr) {
  form.addEventListener('input', function () {
    inputsArr.forEach(function (input) {
      return input.classList.remove('emptyInput');
    });
  });
};

formValidation(_refs.refs.formContainer.noteForm, _refs.elemArrays.formInputsArr);
},{"./refs.js":"js/refs.js"}],"js/editNote.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveEditedNote = exports.openEditForm = exports.editNoteOnServer = exports.closeEditForm = void 0;

var _refs = require("./refs.js");

var _validation = require("./validation.js");

var _generateNotes = require("./generateNotes.js");

var _eventListeners = require("./eventListeners.js");

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i.return && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, catch: function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }

function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }

function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

var openEditForm = exports.openEditForm = function openEditForm(noteObject, notesFromServer) {
  scrollTo(0, 0);
  _refs.refs.editFormContainer.editFormContainer.style.display = 'flex';
  _refs.refs.editFormContainer.editTitle.value = noteObject.title;
  editText.value = noteObject.description;
  var editForm = document.getElementById('editForm');
  (0, _validation.formValidation)(editForm, _refs.elemArrays.editFormInputs);
  if (_refs.refs.eventHandlers.currentEditBackHandler) _refs.refs.editFormContainer.editBackButton.removeEventListener('click', _refs.refs.eventHandlers.currentEditBackHandler);
  if (_refs.refs.eventHandlers.currentEditSaveHandler) _refs.refs.editFormContainer.editSaveButton.removeEventListener('click', _refs.refs.eventHandlers.currentEditSaveHandler);

  _refs.refs.eventHandlers.currentEditBackHandler = function () {
    return closeEditForm();
  };

  _refs.refs.eventHandlers.currentEditSaveHandler = function () {
    return saveEditedNote(noteObject, notesFromServer);
  };

  _refs.refs.editFormContainer.editBackButton.addEventListener('click', _refs.refs.eventHandlers.currentEditBackHandler);

  _refs.refs.editFormContainer.editSaveButton.addEventListener('click', _refs.refs.eventHandlers.currentEditSaveHandler);
};

var saveEditedNote = exports.saveEditedNote = function saveEditedNote(noteObject, notesFromServer) {
  if (_refs.refs.editFormContainer.editTitle.value.trim() && editText.value.trim() !== '') {
    noteObject.title = _refs.refs.editFormContainer.editTitle.value.trim();
    noteObject.description = editText.value.trim();
    noteObject.time = new Date().toLocaleTimeString('uk-UA');
    noteObject.date = new Date().toLocaleDateString('uk-UA');
    editNoteOnServer(noteObject.id, noteObject);
  } else {
    editFormInputs.forEach(function (input) {
      if (input.value.trim() === '') {
        input.classList.add('emptyInput');
      }
    });
  }
};

var closeEditForm = exports.closeEditForm = function closeEditForm() {
  _refs.refs.editFormContainer.editFormContainer.style.display = 'none';

  _refs.refs.editFormContainer.editBackButton.removeEventListener('click', _refs.refs.eventHandlers.currentEditBackHandler);

  _refs.refs.editFormContainer.editSaveButton.removeEventListener('click', _refs.refs.eventHandlers.currentEditSaveHandler);
};

var editNoteOnServer = exports.editNoteOnServer =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime().mark(function _callee(noteElementId, editedNote) {
    var response, data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return fetch("".concat(_refs.BASE_URL, "/").concat(noteElementId), {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedNote)
          });

        case 3:
          response = _context.sent;

          if (response.ok) {
            _context.next = 6;
            break;
          }

          throw Error('Something went wrong!');

        case 6:
          _context.next = 8;
          return response.json();

        case 8:
          data = _context.sent;
          (0, _generateNotes.generateNote)();
          (0, _eventListeners.addeventListenersToNotes)();
          closeEditForm();
          _context.next = 17;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 14]]);
  }));

  return function editNoteOnServer(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
},{"./refs.js":"js/refs.js","./validation.js":"js/validation.js","./generateNotes.js":"js/generateNotes.js","./eventListeners.js":"js/eventListeners.js"}],"js/eventListeners.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addeventListenersToNotes = exports.addEventListenersToDeleteButtonsOnNotes = exports.addEventListenToDeleteAndCancelBtns = void 0;

var _refs = require("./refs.js");

var _deleteNote = require("./deleteNote.js");

var _editNote = require("./editNote.js");

var _generateNotes = require("./generateNotes.js");

var addEventListenersToDeleteButtonsOnNotes = exports.addEventListenersToDeleteButtonsOnNotes = function addEventListenersToDeleteButtonsOnNotes() {
  _refs.refs.main__deleteButton = document.querySelectorAll('.main__deleteButton');

  _refs.refs.main__deleteButton.forEach(function (button) {
    button.removeEventListener('click', addEventListenToDeleteAndCancelBtns);
    button.addEventListener('click', addEventListenToDeleteAndCancelBtns);
  });
};

var addEventListenToDeleteAndCancelBtns = exports.addEventListenToDeleteAndCancelBtns = function addEventListenToDeleteAndCancelBtns(event) {
  event.stopPropagation();
  _refs.refs.deleteMessageWrapper.deleteMessageWrapper.style.display = 'flex';
  var noteId = event.target.closest('.main__note').id;
  var noteElement = document.getElementById(noteId);
  if (_refs.refs.eventHandlers.currentDeleteHandler) _refs.refs.deleteMessageWrapper.deleteButton.removeEventListener('click', _refs.refs.eventHandlers.currentDeleteHandler);
  if (_refs.refs.eventHandlers.currentCancelHandler) _refs.refs.deleteMessageWrapper.cancelButton.removeEventListener('click', _refs.refs.eventHandlers.currentCancelHandler);

  _refs.refs.eventHandlers.currentDeleteHandler = function () {
    return (0, _deleteNote.onDeleteButtonHandler)(noteElement);
  };

  _refs.refs.eventHandlers.currentCancelHandler = function () {
    return (0, _deleteNote.onCancelButtonHandler)();
  };

  _refs.refs.deleteMessageWrapper.deleteButton.addEventListener('click', _refs.refs.eventHandlers.currentDeleteHandler);

  _refs.refs.deleteMessageWrapper.cancelButton.addEventListener('click', _refs.refs.eventHandlers.currentCancelHandler);
};

var addeventListenersToNotes = exports.addeventListenersToNotes = function addeventListenersToNotes() {
  var notesFromHTML = document.querySelectorAll('.main__note');
  (0, _generateNotes.checkIfNotesExist)().then(function (notesFromServer) {
    if (notesFromServer) {
      notesFromHTML.forEach(function (note) {
        var noteObject = notesFromServer.find(function (item) {
          return item.id.toString() === note.id;
        });

        var openFormToEdit = function openFormToEdit() {
          return (0, _editNote.openEditForm)(noteObject, notesFromServer);
        };

        if (noteObject) {
          note.removeEventListener('click', openFormToEdit);
          note.addEventListener('click', openFormToEdit);
        }
      });
    }
  });
};
},{"./refs.js":"js/refs.js","./deleteNote.js":"js/deleteNote.js","./editNote.js":"js/editNote.js","./generateNotes.js":"js/generateNotes.js"}],"js/generateNotes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateNote = exports.generateFoundNotes = exports.checkIfNotesExist = void 0;

var _refs = require("./refs.js");

var _eventListeners = require("./eventListeners.js");

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i.return && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, catch: function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }

function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }

function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

var generateNote = exports.generateNote = function generateNote() {
  _refs.refs.main.notesWrapper.innerHTML = '';
  checkIfNotesExist().then(function (notes) {
    if (notes && notes.length > 0) {
      _refs.refs.main.startPageContent.style.display = 'none';
      _refs.refs.main.notesWrapper.style.display = 'flex';
      notes.forEach(function (note) {
        var colorTag = note.tag.toLowerCase();

        _refs.refs.main.notesWrapper.insertAdjacentHTML('afterbegin', "<div id=\"".concat(note.id, "\" class=\"main__note ").concat(colorTag, "\">\n          <div class=\"main__headlineAndButtonWrapper\">\n            <h2 class=\"main__noteHeadline\">").concat(note.title, "</h2>\n            <button class=\"main__deleteButton\"></button>\n          </div>\n          <div class=\"main__dateCategory--wrapper\">\n            <p class=\"main__noteDate\">").concat(note.date, "</p>\n            <p class=\"main__noteCategory\">").concat(note.tag, "</p>\n          </div>\n        </div>"));

        (0, _eventListeners.addEventListenersToDeleteButtonsOnNotes)();
        (0, _eventListeners.addeventListenersToNotes)();
      });
    } else {
      _refs.refs.main.startPageContent.style.display = 'flex';
    }
  });
};

var generateFoundNotes = exports.generateFoundNotes = function generateFoundNotes(foundNotes) {
  foundNotes.forEach(function (note) {
    var colorTag = note.tag.toLowerCase();

    _refs.refs.main.notesWrapper.insertAdjacentHTML('beforeend', "<div id=\"".concat(note.id, "\" class=\"main__note ").concat(colorTag, "\">\n        <div class=\"main__headlineAndButtonWrapper\">\n          <h2 class=\"main__noteHeadline\">").concat(note.title, "</h2>\n          <button class=\"main__deleteButton\"></button>\n        </div>\n        <div class=\"main__dateCategory--wrapper\">\n          <p class=\"main__noteDate\">").concat(note.date, "</p>\n          <p class=\"main__noteCategory\">").concat(note.tag, "</p>\n        </div>\n      </div>"));
  });
  (0, _eventListeners.addeventListenersToNotes)();
};

var checkIfNotesExist = exports.checkIfNotesExist =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime().mark(function _callee() {
    var response, notes;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return fetch("".concat(_refs.BASE_URL));

        case 3:
          response = _context.sent;

          if (response.ok) {
            _context.next = 6;
            break;
          }

          throw Error('Something went wrong!');

        case 6:
          _context.next = 8;
          return response.json();

        case 8:
          notes = _context.sent;
          return _context.abrupt("return", notes);

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function checkIfNotesExist() {
    return _ref.apply(this, arguments);
  };
}();
},{"./refs.js":"js/refs.js","./eventListeners.js":"js/eventListeners.js"}],"js/openApp.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openApp = void 0;

var _refs = require("./refs.js");

var _generateNotes = require("./generateNotes.js");

var openApp = exports.openApp = function openApp() {
  (0, _generateNotes.checkIfNotesExist)().then(function (notes) {
    if (notes) {
      (0, _generateNotes.generateNote)();
    } else {
      _refs.refs.main.startPageContent.style.display = 'flex';
    }

    scrollTo(0, 0);
  });
};

openApp();
},{"./refs.js":"js/refs.js","./generateNotes.js":"js/generateNotes.js"}],"js/theme.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTheme = void 0;

var _refs = require("./refs.js");

var setTheme = exports.setTheme = function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

document.addEventListener('DOMContentLoaded', function () {
  var savedTheme = localStorage.getItem('theme');

  if (!savedTheme) {
    savedTheme = 'dark';
  }

  setTheme(savedTheme);
});

_refs.refs.header.themeButton.addEventListener('click', function () {
  var currentTheme = document.body.getAttribute('data-theme');
  var newTheme;

  if (currentTheme === 'dark') {
    newTheme = 'light';
  } else {
    newTheme = 'dark';
  }

  setTheme(newTheme);
});
},{"./refs.js":"js/refs.js"}],"js/tagColorAppearance.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearCategoryButtonsColorStyle = exports.chooseTagColors = void 0;

var _refs = require("./refs.js");

var clearCategoryButtonsColorStyle = exports.clearCategoryButtonsColorStyle = function clearCategoryButtonsColorStyle() {
  _refs.refs.formContainer.tagButton.forEach(function (tag_button) {
    return tag_button.style.color = 'black';
  });
};

var chooseTagColors = exports.chooseTagColors = function chooseTagColors(e) {
  if (_refs.refs.formContainer.prevClickedTagButton) _refs.refs.formContainer.prevClickedTagButton.style.color = 'black';
  e.target.style.color = 'white';
  _refs.refs.formContainer.prevClickedTagButton = e.target;
  _refs.refs.objectAndArray.noteObj.tag = e.target.textContent;
};
},{"./refs.js":"js/refs.js"}],"js/saveNote.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveNotesOnServer = exports.onSaveButtonHandler = void 0;

var _refs = require("./refs.js");

var _noteCreate = require("./noteCreate.js");

var _generateNotes = require("./generateNotes.js");

var _eventListeners = require("./eventListeners.js");

var onSaveButtonHandler = exports.onSaveButtonHandler = function onSaveButtonHandler() {
  if (_refs.refs.formContainer.noteTitle.value.trim() && _refs.refs.formContainer.noteText.value.trim() !== '') {
    (0, _noteCreate.createNote)();
    saveNotesOnServer(_refs.refs.objectAndArray.noteObj);
  } else {
    formInputsArr.forEach(function (input) {
      if (input.value.trim() === '') {
        input.classList.add('emptyInput');
      }
    });
  }
};

var saveNotesOnServer = exports.saveNotesOnServer = function saveNotesOnServer(note) {
  fetch("".concat(_refs.BASE_URL), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  }).then(function (response) {
    if (!response.ok) {
      throw Error('Something went wrong!');
    }

    return response.json();
  }).then(function (data) {
    _refs.refs.formContainer.noteTitle.value = '';
    _refs.refs.formContainer.noteText.value = '';
    _refs.refs.formContainer.formContainer.style.display = 'none';
    note.id = data.id;
    (0, _generateNotes.generateNote)();
    (0, _eventListeners.addeventListenersToNotes)();
  }).catch(function (error) {
    console.log(error);
  });
};
},{"./refs.js":"js/refs.js","./noteCreate.js":"js/noteCreate.js","./generateNotes.js":"js/generateNotes.js","./eventListeners.js":"js/eventListeners.js"}],"js/noteCreate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onCreateButtonClickHandler = exports.onBackButtonHandler = exports.createNote = void 0;

var _refs = require("./refs.js");

var _tagColorAppearance = require("./tagColorAppearance.js");

var _saveNote = require("./saveNote.js");

var onCreateButtonClickHandler = exports.onCreateButtonClickHandler = function onCreateButtonClickHandler() {
  _refs.refs.formContainer.formContainer.style.display = 'flex';
  _refs.refs.main.notFoundContent.style.display = 'none';
  _refs.refs.header.searchText.value = '';
  scrollTo(0, 0);

  _refs.refs.formContainer.tagsBox.removeEventListener('click', _tagColorAppearance.chooseTagColors);

  _refs.refs.formContainer.tagsBox.addEventListener('click', _tagColorAppearance.chooseTagColors);

  _refs.refs.objectAndArray.noteObj.tag = 'Without tag';
  (0, _tagColorAppearance.clearCategoryButtonsColorStyle)();

  _refs.refs.formContainer.saveButton.addEventListener('click', _saveNote.onSaveButtonHandler);

  _refs.refs.formContainer.backButton.addEventListener('click', _onBackButtonHandler);
};

var _onBackButtonHandler = exports.onBackButtonHandler = function onBackButtonHandler() {
  _refs.refs.formContainer.formContainer.style.display = 'none';

  _refs.refs.formContainer.noteTitle.classList.remove('emptyInput');

  _refs.refs.formContainer.noteText.classList.remove('emptyInput');

  _refs.refs.header.searchText.value = '';

  _refs.refs.formContainer.saveButton.removeEventListener('click', _onBackButtonHandler);
};

var createNote = exports.createNote = function createNote() {
  _refs.refs.objectAndArray.noteObj.title = _refs.refs.formContainer.noteTitle.value.trim();
  _refs.refs.objectAndArray.noteObj.description = _refs.refs.formContainer.noteText.value.trim();
  _refs.refs.objectAndArray.noteObj.id = new Date().getTime();
  _refs.refs.objectAndArray.noteObj.time = new Date().toLocaleTimeString('uk-UA');
  _refs.refs.objectAndArray.noteObj.date = new Date().toLocaleDateString('uk-UA');
};

_refs.refs.main.createBtn.addEventListener('click', onCreateButtonClickHandler);
},{"./refs.js":"js/refs.js","./tagColorAppearance.js":"js/tagColorAppearance.js","./saveNote.js":"js/saveNote.js"}],"js/searchNote.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showSearchingTools = exports.searchingByBar = exports.onSearchCloseButtonHandler = void 0;

var _refs = require("./refs.js");

var _generateNotes = require("./generateNotes.js");

var _eventListeners = require("./eventListeners.js");

var _deleteNote = require("./deleteNote.js");

var showSearchingTools = exports.showSearchingTools = function showSearchingTools() {
  _refs.refs.header.searchBtn.style.display = 'none';
  _refs.refs.header.searchBarWrapper.style.display = 'flex';
};

_refs.refs.header.searchBtn.addEventListener('click', showSearchingTools);

var onSearchCloseButtonHandler = exports.onSearchCloseButtonHandler = function onSearchCloseButtonHandler() {
  _refs.refs.header.searchBarWrapper.style.display = 'none';
  _refs.refs.main.notFoundContent.style.display = 'none';
  _refs.refs.header.searchBtn.style.display = 'block';
  _refs.refs.header.searchText.value = '';
  _refs.refs.main.notesWrapper.innerHTML = '';
  (0, _generateNotes.generateNote)();
  (0, _eventListeners.addeventListenersToNotes)();
};

_refs.refs.header.searchCloseButton.addEventListener('click', onSearchCloseButtonHandler);

var searchingByBar = exports.searchingByBar = function searchingByBar() {
  var searchWord = _refs.refs.header.searchText.value.toLowerCase();

  (0, _generateNotes.checkIfNotesExist)().then(function (notes) {
    if (notes) {
      _refs.refs.main.notesWrapper.innerHTML = '';
      var foundNotes = notes.filter(function (note) {
        return note.title.toLowerCase().includes(searchWord);
      });

      if (searchWord === '') {
        _refs.refs.main.notFoundContent.style.display = 'none';
        _refs.refs.main.notesWrapper.innerHTML = '';
        (0, _generateNotes.generateNote)();
        return;
      }

      if (foundNotes.length === 0) {
        _refs.refs.main.notFoundContent.style.display = 'flex';
        _refs.refs.main.startPageContent.style.display = 'none';
        _refs.refs.header.searchBtn.style.display = 'block';
        return;
      }

      if (notes.length === 0) {
        _refs.refs.main.startPageContent.style.display = 'flex';
        _refs.refs.main.notFoundContent.style.display = 'none';
        return;
      }

      _refs.refs.main.notFoundContent.style.display = 'none';
      _refs.refs.main.startPageContent.style.display = 'none';
      _refs.refs.main.notesWrapper.style.display = 'flex';
      (0, _generateNotes.generateFoundNotes)(foundNotes);
      (0, _deleteNote.deleteFoundNotes)(foundNotes);
    }
  });
};

_refs.refs.header.searchText.addEventListener('input', searchingByBar);
},{"./refs.js":"js/refs.js","./generateNotes.js":"js/generateNotes.js","./eventListeners.js":"js/eventListeners.js","./deleteNote.js":"js/deleteNote.js"}],"js/app.js":[function(require,module,exports) {
"use strict";

var _refs = require("./refs.js");

var _openApp = require("./openApp.js");

var _validation = require("./validation.js");

var _theme = require("./theme.js");

var _noteCreate = require("./noteCreate.js");

var _saveNote = require("./saveNote.js");

var _generateNotes = require("./generateNotes.js");

var _eventListeners = require("./eventListeners.js");

var _deleteNote = require("./deleteNote.js");

var _editNote = require("./editNote.js");

var _searchNote = require("./searchNote.js");
},{"./refs.js":"js/refs.js","./openApp.js":"js/openApp.js","./validation.js":"js/validation.js","./theme.js":"js/theme.js","./noteCreate.js":"js/noteCreate.js","./saveNote.js":"js/saveNote.js","./generateNotes.js":"js/generateNotes.js","./eventListeners.js":"js/eventListeners.js","./deleteNote.js":"js/deleteNote.js","./editNote.js":"js/editNote.js","./searchNote.js":"js/searchNote.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55557" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map