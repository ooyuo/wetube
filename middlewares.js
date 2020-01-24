import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube"; // locals에 있는 건 템플릿에 변수명처럼 존재한다.
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null;
    next();
};

export const onlyPublic = (req, res, next) => {
    if(req.user) {
        res.redirect(routes.home);
    } else {
        next();
    }
};

export const onlyPrivate = (req, res, next) => {
    if(req.user) {
        next();
    } else {
        res.redirect(routes.home);
    }
};

export const uploadVideo = multerVideo.single("videoFile"); // videoFile: upload.pug> form의 input name