"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLast = getLast;
exports.asPromise = asPromise;
exports.assertSuggestionsValid = assertSuggestionsValid;
exports.materialColorPropType = exports.suggestionsPropType = exports.NOT_ENOUGH_CHARACTERS = exports.LOADING = exports.isBackspace = exports.BACKSPACE_KEYCODE = exports.isError = exports.noop = void 0;

var _propTypes = require("prop-types");

var noop = function noop() {
  /* do nothing */
};

exports.noop = noop;

var isError = function isError(possibleError) {
  return possibleError instanceof Error;
};

exports.isError = isError;
var BACKSPACE_KEYCODE = 8;
exports.BACKSPACE_KEYCODE = BACKSPACE_KEYCODE;

var isBackspace = function isBackspace(keyEvent) {
  return keyEvent.keyCode === BACKSPACE_KEYCODE;
};

exports.isBackspace = isBackspace;

function getLast(sourceArray) {
  if (sourceArray.length) {
    return sourceArray[sourceArray.length - 1];
  }
}

function asPromise(delegate) {
  return new Promise(function (resolve, reject) {
    try {
      resolve(delegate());
    } catch (error) {
      reject(error);
    }
  });
}

var LOADING = Symbol("loading");
exports.LOADING = LOADING;
var NOT_ENOUGH_CHARACTERS = Symbol("not enough characters");
exports.NOT_ENOUGH_CHARACTERS = NOT_ENOUGH_CHARACTERS;

function assertSuggestionsValid(suggestions) {
  if (Array.isArray(suggestions)) {
    return true;
  }

  if (suggestions === NOT_ENOUGH_CHARACTERS) {
    return true;
  }

  throw new Error("Invalid suggestions returned - expected an array, but instead got ".concat(suggestions));
}

var suggestionsPropType = (0, _propTypes.oneOfType)([_propTypes.array, (0, _propTypes.instanceOf)(Error), (0, _propTypes.oneOf)([LOADING, NOT_ENOUGH_CHARACTERS])]);
exports.suggestionsPropType = suggestionsPropType;
var materialColorPropType = (0, _propTypes.oneOf)(["default", "primary", "secondary"]);
exports.materialColorPropType = materialColorPropType;