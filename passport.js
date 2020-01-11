import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy()); // createStrategy(): 이미 구성된 passport-local의 LocalStrategy를 생성한다.

passport.serializeUser(User.serializeUser()); // passport는 쿠기에 오직 user.id만 담아서 보낸다.
passport.deserializeUser(User.deserializeUser()); 


