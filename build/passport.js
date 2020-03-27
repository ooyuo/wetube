"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _passport = _interopRequireDefault(require("passport"));

var _passportGithub = _interopRequireWildcard(require("passport-github"));

var _passportFacebook = _interopRequireDefault(require("passport-facebook"));

var _User = _interopRequireDefault(require("./models/User"));

var _userController = require("./controllers/userController");

var _routes = _interopRequireDefault(require("./routes"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
strategy는 로그인하는 방식이다.
ex) 페이스북으로 로그인하기, 깃헙으로 로그인하기, username과 password로 로그인하기
username과 password를 쓰는 strategy를 사용한다.

*/
_passport["default"].use(_User["default"].createStrategy()); // createStrategy(): 이미 구성된 passport-local의 LocalStrategy를 생성한다.


_passport["default"].use(new _passportGithub["default"]({
  clientID: process.env.GH_ID,
  clientSecret: process.env.GH_SECRET,
  callbackURL: "http://localhost:4000".concat(_routes["default"].githubCallback)
}, _userController.githubLoginCallback));

_passport["default"].use(new _passportFacebook["default"]({
  clientID: process.env.FB_ID,
  clientSecret: process.env.FB_SECRET,
  callbackURL: "https://fb0a0481.ngrok.io".concat(_routes["default"].facebookCallback),
  profileFields: ["id", "displayName", "photos", "email"],
  scope: ["public_profile", "email"]
}, _userController.facebookLoginCallback));

_passport["default"].serializeUser(function (user, done) {
  done(null, user._id); // if you use Model.id as your idAttribute maybe you'd want
  // done(null, user.id);
});

_passport["default"].deserializeUser(function (id, done) {
  _User["default"].findById(id, function (err, user) {
    done(err, user);
  });
});