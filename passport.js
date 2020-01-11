import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy()); // createStrategy(): 이미 구성된 passport-local의 LocalStrategy를 생성한다.