"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _propTypes = require("prop-types");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var TOP_MIDDLE = {
  vertical: "top",
  horizontal: "center"
};
var BOTTOM_MIDDLE = {
  vertical: "bottom",
  horizontal: "center"
};

function ChipWithPopover(_ref) {
  var getPopoverContent = _ref.getPopoverContent,
      chipProps = _objectWithoutProperties(_ref, ["getPopoverContent"]);

  var _useState = (0, _react.useState)(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      targetElement = _useState2[0],
      setTargetElement = _useState2[1];

  if (getPopoverContent) {
    var popoverContent = Boolean(targetElement) && getPopoverContent();

    var closePopover = function closePopover() {
      return setTargetElement(undefined);
    };

    var isOpen = Boolean(popoverContent);
    return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_core.Chip, _extends({
      onMouseEnter: function onMouseEnter(mouseOverEvent) {
        return setTargetElement(mouseOverEvent.currentTarget);
      },
      onMouseLeave: closePopover
    }, chipProps, {
      "aria-owns": isOpen ? "material-multi-picker-mouse-popover" : undefined,
      "aria-haspopup": "true"
    })), _react["default"].createElement(_core.Popover, {
      id: "material-multi-picker-mouse-popover",
      style: {
        pointerEvents: "none"
      },
      onClose: closePopover,
      anchorOrigin: TOP_MIDDLE,
      transformOrigin: BOTTOM_MIDDLE,
      anchorEl: targetElement,
      open: isOpen,
      disableRestoreFocus: true
    }, popoverContent));
  }

  return _react["default"].createElement(_core.Chip, chipProps);
}

ChipWithPopover.propTypes = {
  getPopoverContent: _propTypes.func
};
var _default = ChipWithPopover;
exports["default"] = _default;