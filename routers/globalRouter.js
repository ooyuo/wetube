import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import { getJoin, getLogin, logout, postJoin, postLogin, githubLogin, postGithubLogIn, getMe } from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin); // routes.js, userController
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin); // postJoin에서 받은 username, password를 postLogin으로 보내줄 것

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.gitHub, githubLogin);

globalRouter.get(
    routes.githubCallback, 
    passport.authenticate("github", { failureRedirect: "/login" }), 
    postGithubLogIn
);

globalRouter.get(routes.me, getMe);
 
export default globalRouter;
