"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _core = require("@material-ui/core");

var _PickerSuggestions = _interopRequireDefault(require("./PickerSuggestions"));

var _propTypes = require("prop-types");

var _reactDebounceRender = _interopRequireDefault(require("react-debounce-render"));

var _useCachedSuggestions = _interopRequireDefault(require("./useCachedSuggestions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DELAYED_RENDER_MILLISECONDS = 30;
var DROPDOWN_STYLE = {
  position: "absolute",
  zIndex: 1400,
  width: "100%",
  overflowY: "auto",
  padding: 0,
  margin: 0
};

function getRelativeDropdownPositionStyle(anchorElement) {
  if (anchorElement && anchorElement.offsetParent) {
    var offsetParent = anchorElement.offsetParent;
    return {
      left: offsetParent.offsetLeft,
      right: offsetParent.offsetLeft + offsetParent.offsetWidth,
      top: offsetParent.offsetTop + offsetParent.offsetHeight
    };
  }

  return {};
} //adapted from https://plainjs.com/javascript/styles/get-the-position-of-an-element-relative-to-the-document-24/


function getDocumentBoundingRect(element) {
  var viewportRectangle = element.getBoundingClientRect();
  return {
    top: viewportRectangle.top + window.pageYOffset,
    left: viewportRectangle.left + window.pageXOffset,
    bottom: viewportRectangle.bottom + window.pageYOffset,
    right: viewportRectangle.left + window.pageXOffset,
    width: viewportRectangle.width,
    height: viewportRectangle.height
  };
}

function getViewportDropdownPositionStyle(anchorElement) {
  if (anchorElement && anchorElement.offsetParent) {
    var offsetParent = anchorElement.offsetParent;
    var anchorRectangle = getDocumentBoundingRect(offsetParent);
    return {
      left: anchorRectangle.left,
      width: anchorRectangle.width,
      top: anchorRectangle.bottom
    };
  }

  return {};
}

function getDropdownStyle(anchorElement, relativeToOffsetParent, maxHeight) {
  var dropdownPositionStyle = relativeToOffsetParent ? getRelativeDropdownPositionStyle(anchorElement) : getViewportDropdownPositionStyle(anchorElement);
  var dropdownMaxHeightStyle = maxHeight ? {
    maxHeight: maxHeight
  } : {};
  return _objectSpread({}, DROPDOWN_STYLE, {}, dropdownPositionStyle, {}, dropdownMaxHeightStyle);
}

function useUnpickedSuggestions(isReadyToLoad, inputValue, pickedItems, getSuggestedItems, itemToString, useGlobalCache, fetchDelay) {
  var suggestions = (0, _useCachedSuggestions["default"])(isReadyToLoad, inputValue, pickedItems, getSuggestedItems, useGlobalCache, fetchDelay);

  if (Array.isArray(suggestions) && Array.isArray(pickedItems)) {
    var pickedItemIds = pickedItems.map(function (item) {
      return itemToString(item);
    });

    var isUnpicked = function isUnpicked(suggestion) {
      return !pickedItemIds.includes(itemToString(suggestion));
    };

    return suggestions.filter(isUnpicked);
  }

  return suggestions;
}

function Dropdown(_ref) {
  var isOpen = _ref.isOpen,
      suggestions = _ref.suggestions,
      anchorElement = _ref.anchorElement,
      maxHeight = _ref.maxHeight,
      disablePortals = _ref.disablePortals,
      otherProps = _objectWithoutProperties(_ref, ["isOpen", "suggestions", "anchorElement", "maxHeight", "disablePortals"]);

  if (isOpen && suggestions) {
    var dropdownStyle = getDropdownStyle(anchorElement, disablePortals, maxHeight);

    var dropdown = _react["default"].createElement(_core.Paper, {
      role: "menu",
      component: "ul",
      square: true,
      style: dropdownStyle
    }, _react["default"].createElement(_PickerSuggestions["default"], _extends({
      suggestions: suggestions
    }, otherProps)));

    return disablePortals ? dropdown : (0, _reactDom.createPortal)(dropdown, document.body);
  }

  return false;
}

Dropdown.propTypes = {
  isOpen: _propTypes.bool,
  maxHeight: _propTypes.number
};
var DebouncedDropdown = (0, _reactDebounceRender["default"])(Dropdown, DELAYED_RENDER_MILLISECONDS);

function PickerDropdown(props) {
  var isOpen = props.isOpen,
      inputValue = props.inputValue,
      pickedItems = props.pickedItems,
      getSuggestedItems = props.getSuggestedItems,
      itemToString = props.itemToString,
      useGlobalCache = props.useGlobalCache,
      fetchDelay = props.fetchDelay;
  var suggestions = useUnpickedSuggestions(isOpen, inputValue, pickedItems, getSuggestedItems, itemToString, useGlobalCache, fetchDelay);
  return _react["default"].createElement(DebouncedDropdown, _extends({}, props, {
    suggestions: suggestions
  }));
}

PickerDropdown.propTypes = {
  isOpen: _propTypes.bool,
  inputValue: _propTypes.string,
  pickedItems: _propTypes.array,
  getSuggestedItems: _propTypes.func.isRequired,
  itemToString: _propTypes.func.isRequired,
  useGlobalCache: _propTypes.string,
  fetchDelay: _propTypes.number,
  disablePortals: _propTypes.bool
};
var _default = PickerDropdown;
exports["default"] = _default;