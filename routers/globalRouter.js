import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import { getJoin, getLogin, logout, postJoin, postLogin } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin); // routes.js, userController
globalRouter.post(routes.join, postJoin, postLogin); // postJoin에서 받은 username, password를 postLogin으로 보내줄 것

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, logout);
 
export default globalRouter;
