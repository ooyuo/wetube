import express from "express"; // express라는 이름을 내 파일들안에서 찾고, 못찾으면 node_modules> express> index.js 순으로 찾는다.
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import { localsMiddleware } from "./middlewares";

import "./passport";

const app = express(); // server생성
// pug와 express에는 view파일들의 위치에 관한 기본 설정이있다.
const CokieStore = MongoStore(session);

console.log(process.env.COOKIE_SECRET);
// middleware
app.use(helmet()); // application이 더 안전하도록 만들어준다.                                         
app.set("view engine", "pug");
/*
누군가 "/Uploads"로 간다면 express.static()을 이용해서 directory에서 file을 보내준다.
그냥 file만 확인하는 것.
directory는 "upload/" => "uploads/"로 가면 "uploads"라는 directory로 들어간다.
*/
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser()); // cookie를 전달받아서 사용할 수 있도                                                                                                                                                                                                                                                                                                                                                                                록 만들어주는 미들웨어
app.use(bodyParser.json()); // 사용자가 웹사이트로 전달하는 정보들을 검사하는 미들웨어, request정보에서 form이나 json형태로된 body를 검사한다
app.use(bodyParser.urlencoded({extended: true})); // body의 url을 얻게 해줌
app.use(morgan("dev")); // application에서 발생하는 모든 일들을 logging한다.
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: false,
        store: new CokieStore({ mongooseConnection: mongoose.connection }) // mongoose는 이 저장소를 db.js에 저장시켜줄것임
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);
app.use(routes.home, globalRouter); // join, search, about page, home...
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;


