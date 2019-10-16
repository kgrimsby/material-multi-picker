"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = themeToStyles;
var ONE_QUARTER = 0.25;
var ONE_HALF = 0.5;

function themeToStyles(theme) {
  return {
    pickerChip: {
      marginRight: theme.spacing(ONE_HALF),
      marginTop: theme.spacing(ONE_QUARTER)
    }
  };
}