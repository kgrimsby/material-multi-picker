"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "NOT_ENOUGH_CHARACTERS", {
  enumerable: true,
  get: function get() {
    return _utils.NOT_ENOUGH_CHARACTERS;
  }
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _downshift = _interopRequireDefault(require("downshift"));

var _PickerInput = _interopRequireDefault(require("./PickerInput"));

var _PickerDropdown = _interopRequireDefault(require("./PickerDropdown"));

var _PickerChips = _interopRequireDefault(require("./PickerChips"));

var _propTypes = require("prop-types");

var _utils = require("./utils");

var _core = require("@material-ui/core");

var _styles = _interopRequireDefault(require("./styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function MultiPicker(props) {
  var itemToString = props.itemToString,
      value = props.value,
      onChange = props.onChange,
      error = props.error,
      disabled = props.disabled;

  var safeItemToString = function safeItemToString(item) {
    return item && itemToString(item);
  };

  var _useState = (0, _react.useState)(""),
      _useState2 = _slicedToArray(_useState, 2),
      inputValue = _useState2[0],
      setInputValue = _useState2[1];

  var inputRef = (0, _react.useRef)();
  var downshiftRef = (0, _react.useRef)();

  function handleAddItem(itemToAdd) {
    // downshift sends a deselect event when you press ESC, we ignore it
    if (itemToAdd) {
      onChange([].concat(_toConsumableArray(value), [itemToAdd]));
      setInputValue("");
    }
  }

  function handleDeleteItem(itemToDelete) {
    onChange(value.filter(function (item) {
      return safeItemToString(item) !== safeItemToString(itemToDelete);
    }));
  }

  function handleKeyDown(keyDownEvent) {
    if (!inputValue.length && (0, _utils.isBackspace)(keyDownEvent)) {
      var lastItem = (0, _utils.getLast)(value);

      if (lastItem) {
        handleDeleteItem(lastItem);
      }
    }
  }

  function handleBlur(blurEvent) {
    var clearInputOnBlur = props.clearInputOnBlur,
        _props$onBlur = props.onBlur,
        onBlur = _props$onBlur === void 0 ? _utils.noop : _props$onBlur;

    if (clearInputOnBlur) {
      setInputValue("");
    }

    onBlur(blurEvent);
  }

  function handleFocus(focusEvent) {
    var showDropdownOnFocus = props.showDropdownOnFocus,
        _props$onFocus = props.onFocus,
        onFocus = _props$onFocus === void 0 ? _utils.noop : _props$onFocus;

    if (showDropdownOnFocus) {
      downshiftRef.current.openMenu();
    }

    onFocus(focusEvent);
  }

  var itemToLabel = props.itemToLabel,
      itemToAvatar = props.itemToAvatar,
      itemToPopover = props.itemToPopover,
      chipColor = props.chipColor,
      variant = props.variant,
      classes = props.classes;
  var startAdornment = value.length ? _react["default"].createElement(_PickerChips["default"], {
    key: "picker-chips",
    selectedItems: value,
    color: chipColor,
    classes: classes,
    onDelete: function onDelete(itemToDelete) {
      return handleDeleteItem(itemToDelete);
    },
    itemToString: safeItemToString,
    itemToLabel: itemToLabel,
    itemToAvatar: itemToAvatar,
    itemToPopover: itemToPopover,
    disabled: disabled,
    variant: variant
  }) : false;
  return _react["default"].createElement(_downshift["default"], {
    ref: downshiftRef,
    inputValue: inputValue,
    onSelect: function onSelect(itemToAdd) {
      return handleAddItem(itemToAdd);
    },
    itemToString: safeItemToString,
    fullWidth: true
  }, function (_ref) {
    var getInputProps = _ref.getInputProps,
        dropdownProps = _objectWithoutProperties(_ref, ["getInputProps"]);

    return _react["default"].createElement("div", {
      style: {
        position: "relative"
      }
    }, _react["default"].createElement(_PickerInput["default"], _extends({}, getInputProps({
      startAdornment: startAdornment,
      onChange: function onChange(inputChangeEvent) {
        return setInputValue(inputChangeEvent.target.value);
      },
      onKeyDown: handleKeyDown,
      onBlur: handleBlur,
      onFocus: function onFocus(focusEvent) {
        return handleFocus(focusEvent);
      },
      onDragStart: props.onDragStart,
      error: error,
      disabled: disabled
    }), {
      fullWidth: props.fullWidth,
      label: props.label,
      variant: props.variant,
      helperText: props.helperText,
      required: props.required,
      name: props.name,
      inputRef: inputRef,
      autoFocus: props.autoFocus
    })), _react["default"].createElement(_PickerDropdown["default"], _extends({
      SuggestionComponent: props.SuggestionComponent,
      ErrorComponent: props.ErrorComponent,
      maxHeight: props.maxDropdownHeight,
      anchorElement: inputRef.current,
      itemToString: safeItemToString,
      useGlobalCache: props.useGlobalCache,
      getSuggestedItems: props.getSuggestedItems,
      fetchDelay: props.fetchDelay,
      pickedItems: props.value,
      disablePortals: props.disablePortals
    }, dropdownProps)));
  });
}

MultiPicker.propTypes = {
  value: _propTypes.array.isRequired,
  onChange: _propTypes.func.isRequired,
  onBlur: _propTypes.func,
  onFocus: _propTypes.func,
  onDragStart: _propTypes.func,
  getSuggestedItems: _propTypes.func.isRequired,
  itemToLabel: _propTypes.func,
  itemToString: _propTypes.func.isRequired,
  itemToAvatar: _propTypes.func,
  itemToPopover: _propTypes.func,
  fullWidth: _propTypes.bool,
  error: _propTypes.bool,
  label: _propTypes.string,
  fetchDelay: _propTypes.number,
  SuggestionComponent: _propTypes.any,
  ErrorComponent: _propTypes.any,
  chipColor: _utils.materialColorPropType,
  useGlobalCache: _propTypes.string,
  classes: _propTypes.object,
  disabled: _propTypes.bool,
  clearInputOnBlur: _propTypes.bool,
  variant: _propTypes.string,
  helperText: _propTypes.node,
  required: _propTypes.bool,
  name: _propTypes.string,
  maxDropdownHeight: _propTypes.number,
  autoFocus: _propTypes.bool,
  showDropdownOnFocus: _propTypes.bool,
  disablePortals: _propTypes.bool
};

var _default = (0, _core.withStyles)(_styles["default"])(MultiPicker);

exports["default"] = _default;