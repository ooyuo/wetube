import express from "express"; // express라는 이름을 내 파일들안에서 찾고, 못찾으면 node_modules> express> index.js 순으로 찾는다.
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

const app = express(); // server생성

// middleware
app.use(cookieParser()); //cookie에 user infomation 저장
app.use(bodyParser.json()); //body의 json을 얻게 해줌
app.use(bodyParser.urlencoded({extended: true})); //body의 url을 얻게 해줌
app.use(helmet()); // 보안을 위해 사용
app.use(morgan("dev")); // 모든걸 기록(?)


app.use("/user", userRouter);
app.use("/video", videoRouter);
app.use("/", globalRouter); // join, search, about page, home...


export default app;