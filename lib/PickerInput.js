"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = require("prop-types");

var _core = require("@material-ui/core");

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ONE_QUARTER = 0.25;
var ONE_HALF = 0.5;

var styles = function styles(theme) {
  return {
    InputRoot: {
      display: "flex",
      flexWrap: "wrap",
      padding: "".concat(theme.spacing(ONE_HALF), "px 0"),
      boxSizing: "border-box"
    },
    InputLabelRoot: {
      top: theme.spacing()
    },
    InputLabelFilled: {
      top: theme.spacing(2)
    },
    InputLabelShrink: {
      top: 0
    },
    inputRoot: {
      flex: "1 1 auto",
      marginTop: theme.spacing(ONE_QUARTER),
      minWidth: "200px",
      width: "auto"
    }
  };
};

var isFilledOrOutlined = function isFilledOrOutlined(variant) {
  return ["filled", "outlined"].includes(variant);
};

function getInputPaddingStyle(variant) {
  if (variant === "outlined") {
    return {
      padding: "18.5px 14px"
    };
  }

  if (variant === "filled") {
    return {
      padding: "27px 12px 10px"
    };
  }
}

function PickerInput(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      startAdornment = _ref.startAdornment,
      classes = _ref.classes,
      fullWidth = _ref.fullWidth,
      label = _ref.label,
      onBlur = _ref.onBlur,
      onFocus = _ref.onFocus,
      onKeyDown = _ref.onKeyDown,
      disabled = _ref.disabled,
      error = _ref.error,
      variant = _ref.variant,
      helperText = _ref.helperText,
      required = _ref.required,
      name = _ref.name,
      inputRef = _ref.inputRef,
      autoFocus = _ref.autoFocus,
      otherProps = _objectWithoutProperties(_ref, ["value", "onChange", "startAdornment", "classes", "fullWidth", "label", "onBlur", "onFocus", "onKeyDown", "disabled", "error", "variant", "helperText", "required", "name", "inputRef", "autoFocus"]);

  var InputProps = {
    inputProps: _objectSpread({}, otherProps, {
      className: classes.inputRoot,
      style: isFilledOrOutlined(variant) ? {
        padding: "6.5px 0"
      } : undefined
    }),
    style: getInputPaddingStyle(variant),
    startAdornment: startAdornment,
    classes: {
      root: classes.InputRoot
    },
    inputRef: inputRef
  }; //this ensures that the label will be shown above the input field if there are selected items,
  //even if there is no input text

  var InputLabelProps = {
    shrink: Boolean(value.length || startAdornment),
    classes: {
      root: classes.InputLabelRoot,
      shrink: classes.InputLabelShrink,
      filled: classes.InputLabelFilled
    }
  };
  return _react["default"].createElement(_core.TextField, {
    autoFocus: autoFocus,
    label: label,
    value: value,
    onChange: onChange,
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyDown: onKeyDown,
    InputProps: InputProps,
    InputLabelProps: InputLabelProps,
    fullWidth: fullWidth,
    disabled: disabled,
    error: error,
    variant: variant,
    helperText: helperText,
    required: required,
    name: name
  });
}

PickerInput.propTypes = {
  autoFocus: _propTypes.bool,
  disabled: _propTypes.bool,
  error: _propTypes.bool,
  label: _propTypes.string,
  value: _propTypes.string.isRequired,
  onChange: _propTypes.func,
  onBlur: _propTypes.func,
  onFocus: _propTypes.func,
  onKeyDown: _propTypes.func,
  fullWidth: _propTypes.bool,
  startAdornment: _propTypes.node,
  variant: _propTypes.string,
  classes: _propTypes.object,
  helperText: _propTypes.node,
  required: _propTypes.bool,
  name: _propTypes.string,
  inputRef: _propTypes.any
};
PickerInput.defaultProps = {
  label: "",
  fullWidth: false,
  startAdornment: false
};

var _default = (0, _styles.withStyles)(styles)(PickerInput);

exports["default"] = _default;