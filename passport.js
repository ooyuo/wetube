import passport from "passport";
import GithubStrategy, { Strategy } from "passport-github";
import FacebookStrategy from "passport-facebook";
import User from "./models/User";
import { githubLoginCallback, facebookLoginCallback } from "./controllers/userController";
import routes from "./routes";

/*
strategy는 로그인하는 방식이다.
ex) 페이스북으로 로그인하기, 깃헙으로 로그인하기, username과 password로 로그인하기
username과 password를 쓰는 strategy를 사용한다.

*/
passport.use(User.createStrategy()); // createStrategy(): 이미 구성된 passport-local의 LocalStrategy를 생성한다.

passport.use(
  new GithubStrategy(
    {
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);  

passport.use(
  new FacebookStrategy({
    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: `https://baba1023.ngrok.io${routes.facebookCallback}`,
    profileFields: ["id", "displayName", "photos", "email"],
    scope: ["public_profile", "email"],
  },
  facebookLoginCallback
  )
);
passport.serializeUser(function(user, done) {
    done(null, user._id);
    // if you use Model.id as your idAttribute maybe you'd want
    // done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});




