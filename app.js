import express from "express"; // express라는 이름을 내 파일들안에서 찾고, 못찾으면 node_modules> express> index.js 순으로 찾는다.
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

const app = express(); // server생성
// pug와 express에는 view파일들의 위치에 관한 기본 설정이있다.
app.set("view engine", "pug");

// middleware
app.use(cookieParser()); // cookie를 전달받아서 사용할 수 있도록 만들어주는 미들웨어
app.use(bodyParser.json()); // 사용자가 웹사이트로 전달하는 정보들을 검사하는 미들웨어, request정보에서 form이나 json형태로된 vody를 검사한다
app.use(bodyParser.urlencoded({extended: true})); //body의 url을 얻게 해줌
app.use(helmet()); // application이 더 안전하도록 만들어준다.
app.use(morgan("dev")); // application에서 발생하는 모든 일들을 logging한다.


app.use(routes.home, globalRouter); // join, search, about page, home...
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);


export default app;