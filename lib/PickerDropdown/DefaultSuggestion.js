"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _propTypes = require("prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function DefaultSuggestion(_ref) {
  var itemId = _ref.itemId;
  // This padding mimics the default padding that would normally be applied to the parent
  // MenuItem, but we remove that to give more flexibility for custom components
  return _react["default"].createElement(_core.Typography, {
    style: {
      padding: "11px 16px"
    }
  }, itemId);
}

DefaultSuggestion.propTypes = {
  itemId: _propTypes.string.isRequired
};
var _default = DefaultSuggestion;
exports["default"] = _default;