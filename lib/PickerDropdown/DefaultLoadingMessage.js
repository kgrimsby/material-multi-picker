"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _propTypes = require("prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function DefaultLoadingMessage(_ref) {
  var inputValue = _ref.inputValue;
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_core.Typography, {
    variant: "h6",
    align: "center",
    gutterBottom: true
  }, "Loading suggestions for ", _react["default"].createElement("strong", null, inputValue), "\u2026"), _react["default"].createElement(_core.LinearProgress, null));
}

DefaultLoadingMessage.propTypes = {
  inputValue: _propTypes.string
};
var _default = DefaultLoadingMessage;
exports["default"] = _default;