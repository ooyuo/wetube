"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRouter = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router();

exports.userRouter = userRouter;
userRouter.get("/", function (req, res) {
  return res.send('user index');
});
userRouter.get("/edit", function (req, res) {
  return res.send('user edit');
});
userRouter.get("/password", function (req, res) {
  return res.send('user password');
});