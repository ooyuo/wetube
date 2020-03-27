"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _passport = _interopRequireDefault(require("passport"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _path = _interopRequireDefault(require("path"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _routes = _interopRequireDefault(require("./routes"));

var _middlewares = require("./middlewares");

var _userRouter = _interopRequireDefault(require("./routers/userRouter"));

var _videoRouter = _interopRequireDefault(require("./routers/videoRouter"));

var _globalRouter = _interopRequireDefault(require("./routers/globalRouter"));

var _apiRouter = _interopRequireDefault(require("./routers/apiRouter"));

require("./passport");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// express라는 이름을 내 파일들안에서 찾고, 못찾으면 node_modules> express> index.js 순으로 찾는다.
var app = (0, _express["default"])(); // server생성

var cors = require('cors');

app.use(cors()); // pug와 express에는 view파일들의 위치에 관한 기본 설정이있다.

var CokieStore = (0, _connectMongo["default"])(_expressSession["default"]);
console.log(process.env.COOKIE_SECRET); // middleware

app.use((0, _helmet["default"])()); // application이 더 안전하도록 만들어준다.                                         

app.set("view engine", "pug");
/*
누군가 "/Uploads"로 간다면 express.static()을 이용해서 directory에서 file을 보내준다.
그냥 file만 확인하는 것.
directory는 "upload/" => "uploads/"로 가면 "uploads"라는 directory로 들어간다.
*/

app.set("views", _path["default"].join(__dirname, "views"));
app.use("/static", _express["default"]["static"](_path["default"].join(__dirname, "static")));
app.use((0, _cookieParser["default"])()); // cookie를 전달받아서 사용할 수 있도                                                                                                                                                                                                                                                                                                                                                                                록 만들어주는 미들웨어

app.use(_bodyParser["default"].json()); // 사용자가 웹사이트로 전달하는 정보들을 검사하는 미들웨어, request정보에서 form이나 json형태로된 body를 검사한다

app.use(_bodyParser["default"].urlencoded({
  extended: true
})); // body의 url을 얻게 해줌

app.use((0, _morgan["default"])("dev")); // application에서 발생하는 모든 일들을 logging한다.

app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: true,
  saveUninitialized: false,
  store: new CokieStore({
    mongooseConnection: _mongoose["default"].connection
  }) // mongoose는 이 저장소를 db.js에 저장시켜줄것임

}));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
app.use(_middlewares.localsMiddleware);
app.use(_routes["default"].home, _globalRouter["default"]); // join, search, about page, home...

app.use(_routes["default"].users, _userRouter["default"]);
app.use(_routes["default"].videos, _videoRouter["default"]);
app.use(_routes["default"].api, _apiRouter["default"]);
var _default = app;
exports["default"] = _default;