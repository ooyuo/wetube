import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY
});

const multerVideo = multer({
    storage: multerS3({
        s3,
        acl: "public-read",
        bucket: "wetube-by-yun/video"
    })
});

const multerAvatar = multer({
    storage: multerS3({
        s3,
        acl: "public-read",
        bucket: "wetube-by-yun/avatar"
    })
});
export const uploadVideo = multerVideo.single("videoFile"); // videoFile: upload.pug> form의 input name
export const uploadAvatar = multerAvatar.single("avatar");

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
