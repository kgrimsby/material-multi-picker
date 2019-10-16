"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

var _propTypes = require("prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var styles = function styles(theme) {
  return {
    root: {
      color: theme.palette.error.main
    }
  };
};

function DefaultError(_ref) {
  var classes = _ref.classes;
  var className = "".concat(classes.root, " suggestion-error-message");
  return _react["default"].createElement(_core.Typography, {
    variant: "h6",
    align: "center",
    className: className
  }, "An error occurred!");
}

DefaultError.propTypes = {
  classes: _propTypes.object
};

var _default = (0, _styles.withStyles)(styles)(DefaultError);

exports["default"] = _default;