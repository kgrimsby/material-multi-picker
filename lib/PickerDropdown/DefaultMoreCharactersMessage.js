"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function DefaultEmptyMessage() {
  return _react["default"].createElement(_core.Typography, {
    variant: "subtitle1",
    align: "center",
    className: "more-characters-message"
  }, "Type more characters to see suggestions");
}

var _default = DefaultEmptyMessage;
exports["default"] = _default;