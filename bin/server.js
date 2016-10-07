"use strict";

var _express = require("./core/express");

var _express2 = _interopRequireDefault(_express);

var _mongodb = require("./core/mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

var _zouti = require("zouti");

var _zouti2 = _interopRequireDefault(_zouti);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_zouti2.default.spacer(2); // pour avoir 2 ligne vide

_zouti2.default.log("Starting...", "Dylan/prevkonsep"); // pour afficher un message

(0, _mongodb2.default)().then(function () {
    (0, _express2.default)(12345);
}).catch(function (oError) {
    _zouti2.default.error(oError, "Dylan/prevkonsep");
});