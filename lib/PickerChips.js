"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ChipWithPopover = _interopRequireDefault(require("./ChipWithPopover"));

var _propTypes = require("prop-types");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DEFAULT_AVATAR = function DEFAULT_AVATAR() {
  return undefined;
};

function PickerChips(_ref) {
  var selectedItems = _ref.selectedItems,
      disabled = _ref.disabled,
      color = _ref.color,
      onDelete = _ref.onDelete,
      itemToString = _ref.itemToString,
      itemToLabel = _ref.itemToLabel,
      itemToPopover = _ref.itemToPopover,
      _ref$itemToAvatar = _ref.itemToAvatar,
      itemToAvatar = _ref$itemToAvatar === void 0 ? DEFAULT_AVATAR : _ref$itemToAvatar,
      variant = _ref.variant,
      classes = _ref.classes;

  if (Array.isArray(selectedItems)) {
    return _react["default"].createElement(_react["default"].Fragment, null, selectedItems.map(function (item) {
      return _react["default"].createElement(_ChipWithPopover["default"], {
        getPopoverContent: itemToPopover ? function () {
          return itemToPopover(item);
        } : undefined,
        key: itemToString(item),
        tabIndex: -1,
        className: classes.pickerChip,
        label: itemToLabel ? itemToLabel(item) : itemToString(item),
        onDelete: disabled ? undefined : function () {
          return onDelete(item);
        },
        avatar: itemToAvatar(item),
        color: color,
        variant: variant === "filled" ? "outlined" : "default"
      });
    }));
  }

  return false;
}

PickerChips.propTypes = {
  disabled: _propTypes.bool,
  selectedItems: _propTypes.array,
  color: _utils.materialColorPropType,
  onDelete: _propTypes.func,
  itemToString: _propTypes.func.isRequired,
  itemToLabel: _propTypes.func,
  itemToAvatar: _propTypes.func,
  itemToPopover: _propTypes.func,
  classes: _propTypes.object,
  variant: _propTypes.string
};
var _default = PickerChips;
exports["default"] = _default;