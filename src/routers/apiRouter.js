import express from "express";
import routes from "../routes";
import { postRegisterView, postAddComment, postRemoveComment } from "../controllers/videoController";

const apiRouter = express.Router();


apiRouter.post(routes.registerView, postRegisterView); // database를 변경하려면 post Request 사용해야함
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.removeComment, postRemoveComment);

export default apiRouter;