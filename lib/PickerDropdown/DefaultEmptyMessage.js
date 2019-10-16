"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _propTypes = require("prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function DefaultEmptyMessage(_ref) {
  var inputValue = _ref.inputValue;
  return _react["default"].createElement(_core.Typography, {
    variant: "subtitle1",
    align: "center",
    className: "no-suggestions-message"
  }, "No suggestions found for ", _react["default"].createElement("strong", null, inputValue));
}

DefaultEmptyMessage.propTypes = {
  inputValue: _propTypes.string.isRequired
};
var _default = DefaultEmptyMessage;
exports["default"] = _default;