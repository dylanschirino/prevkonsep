"use strict";

var _express = require("./core/express");

var _express2 = _interopRequireDefault(_express);

var _mongodb = require("./core/mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log();

console.log("Starting");

(0, _mongodb2.default)().then(function () {
    (0, _express2.default)(12345);
}).catch(function (oError) {
    console.error(oError);
});