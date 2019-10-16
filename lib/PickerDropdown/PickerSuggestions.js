"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _utils = require("../utils");

var _propTypes = require("prop-types");

var _DefaultError = _interopRequireDefault(require("./DefaultError"));

var _DefaultSuggestion = _interopRequireDefault(require("./DefaultSuggestion"));

var _DefaultEmptyMessage = _interopRequireDefault(require("./DefaultEmptyMessage"));

var _DefaultLoadingMessage = _interopRequireDefault(require("./DefaultLoadingMessage"));

var _DefaultMoreCharactersMessage = _interopRequireDefault(require("./DefaultMoreCharactersMessage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var HIGHLIGHT_GREY_SHADE = 300;

var styles = function styles(theme) {
  return {
    highlighted: {
      backgroundColor: theme.palette.grey[HIGHLIGHT_GREY_SHADE]
    }
  };
};

function PickerSuggestions(_ref) {
  var suggestions = _ref.suggestions,
      getItemProps = _ref.getItemProps,
      highlightedIndex = _ref.highlightedIndex,
      itemToString = _ref.itemToString,
      inputValue = _ref.inputValue,
      _ref$SuggestionCompon = _ref.SuggestionComponent,
      SuggestionComponent = _ref$SuggestionCompon === void 0 ? _DefaultSuggestion["default"] : _ref$SuggestionCompon,
      _ref$ErrorComponent = _ref.ErrorComponent,
      ErrorComponent = _ref$ErrorComponent === void 0 ? _DefaultError["default"] : _ref$ErrorComponent,
      classes = _ref.classes;

  if ((0, _utils.isError)(suggestions)) {
    return _react["default"].createElement(ErrorComponent, {
      error: suggestions,
      inputValue: inputValue
    });
  }

  if (suggestions === _utils.NOT_ENOUGH_CHARACTERS) {
    return _react["default"].createElement(_DefaultMoreCharactersMessage["default"], null);
  }

  if (suggestions === _utils.LOADING) {
    return _react["default"].createElement(_DefaultLoadingMessage["default"], {
      inputValue: inputValue
    });
  }

  if (Array.isArray(suggestions)) {
    if (suggestions.length) {
      return _react["default"].createElement(_react["default"].Fragment, null, suggestions.map(function (item, index) {
        var itemId = itemToString(item);
        var isHighlighted = highlightedIndex === index;
        var menuItemProps = getItemProps({
          index: index,
          item: item,
          role: "menuitem",
          className: isHighlighted ? classes.highlighted : "",
          style: {
            padding: 0,
            height: "auto"
          }
        });
        return _react["default"].createElement(_core.MenuItem, _extends({
          className: "suggestion",
          key: itemId
        }, menuItemProps), _react["default"].createElement(SuggestionComponent, {
          itemId: itemId,
          item: item,
          isHighlighted: isHighlighted,
          inputValue: inputValue
        }));
      }));
    }

    if (inputValue.length) {
      return _react["default"].createElement(_DefaultEmptyMessage["default"], {
        inputValue: inputValue
      });
    } else {
      return false;
    }
  }

  console.error(suggestions);
  throw new Error("should never happen!");
}

PickerSuggestions.propTypes = {
  suggestions: _utils.suggestionsPropType,
  getItemProps: _propTypes.func.isRequired,
  highlightedIndex: _propTypes.number,
  itemToString: _propTypes.func.isRequired,
  inputValue: _propTypes.string.isRequired,
  SuggestionComponent: _propTypes.any,
  ErrorComponent: _propTypes.any,
  classes: _propTypes.object
};

var _default = (0, _core.withStyles)(styles)(PickerSuggestions);

exports["default"] = _default;