import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube"; // locals에 있는 건 템플릿에 변수명처럼 존재한다.
    res.locals.routes = routes;
    next();
};