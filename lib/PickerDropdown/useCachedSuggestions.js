"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useCachedSuggestions;
Object.defineProperty(exports, "NOT_ENOUGH_CHARACTERS", {
  enumerable: true,
  get: function get() {
    return _utils.NOT_ENOUGH_CHARACTERS;
  }
});

var _react = require("react");

var _utils = require("../utils");

var _globalCache = require("./globalCache");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useForceUpdate() {
  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      setState = _useState2[1];

  return function () {
    return setState({});
  };
}

function useLoadingCache(globalCacheId) {
  var _useState3 = (0, _react.useState)({}),
      _useState4 = _slicedToArray(_useState3, 2),
      cache = _useState4[0],
      setCache = _useState4[1];

  var forceUpdate = useForceUpdate();
  var globalCache = globalCacheId ? (0, _globalCache.getGlobalCache)(globalCacheId) : false;
  (0, _react.useEffect)(function () {
    if (globalCache) {
      return globalCache.subscribeToUpdates(forceUpdate); //returns an unsubscribe function
    }
  }, [globalCache]);

  function getValue(key) {
    if (globalCache) {
      return globalCache.getValue(key);
    }

    return cache[key];
  }

  function setValue(key, value) {
    if (globalCache) {
      globalCache.setValue(key, value);
    } else {
      setCache(function (previousCache) {
        return _objectSpread({}, previousCache, _defineProperty({}, key, value));
      });
    }
  }

  return [getValue, setValue, function (key) {
    return setValue(key, _utils.LOADING);
  }];
}

function useIsMounted() {
  var isMounted = (0, _react.useRef)(true);
  (0, _react.useEffect)(function () {
    return function () {
      isMounted.current = false;
    };
  }, []);
  return function () {
    return isMounted.current;
  };
}

function useCachedSuggestions(isReadyToLoad, inputValue, chosenItems, getSuggestedItems, globalCacheId) {
  var fetchDelay = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  var _useLoadingCache = useLoadingCache(globalCacheId),
      _useLoadingCache2 = _slicedToArray(_useLoadingCache, 3),
      getSuggestions = _useLoadingCache2[0],
      storeSuggestions = _useLoadingCache2[1],
      setSuggestionsLoading = _useLoadingCache2[2];

  var isMounted = useIsMounted();
  (0, _react.useEffect)(function () {
    var finishedTimeout = false;
    var existingSuggestions = getSuggestions(inputValue);

    if (!existingSuggestions && isReadyToLoad) {
      setSuggestionsLoading(inputValue);
      var timeout = setTimeout(function () {
        finishedTimeout = true;
        (0, _utils.asPromise)(function () {
          return getSuggestedItems(inputValue, chosenItems);
        }).then(function (suggestions) {
          if (isMounted()) {
            (0, _utils.assertSuggestionsValid)(suggestions);
            storeSuggestions(inputValue, suggestions);
          }
        })["catch"](function (error) {
          if (isMounted()) {
            storeSuggestions(inputValue, error);
          }
        });
      }, fetchDelay);
      return function () {
        if (!finishedTimeout) {
          clearTimeout(timeout);
          storeSuggestions(inputValue, undefined);
        }
      };
    }
  }, [inputValue, chosenItems]);
  return getSuggestions(inputValue) || [];
}