import passport from "passport";
import User from "./models/User";

/*
strategy는 로그인하는 방식이다.
ex) 페이스북으로 로그인하기, 깃헙으로 로그인하기, username과 password로 로그인하기
username과 password를 쓰는 strategy를 사용한다.

*/
passport.use(User.createStrategy()); // createStrategy(): 이미 구성된 passport-local의 LocalStrategy를 생성한다.

passport.serializeUser(User.serializeUser()); // passport는 쿠기에 오직 user.id만 담아서 보낸다.
passport.deserializeUser(User.deserializeUser()); 


