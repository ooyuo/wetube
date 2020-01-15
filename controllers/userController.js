import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
    res.render("Join", {
        pageTitle: "Join"
    });
};

export const postJoin = async (req, res, next) => {
    const {
        body: {
            name,
            email,
            password,
            password2
        }
    } = req;

    if (password !== password2) {
        res.status(400); // 잘못된 문법으로 인해 서버가 요청을 이해할 수 없음
        res.render("join", { pageTitle: "Join" });
    } else {
        try {
            const user = await User({
                name,
                email
            }); // 계정이 생성되면 이 코드를 실행시킨다.
            await User.register(user, password);
            next();
            
        } catch(error) {
            console.log(error);
            res.redirect(routes.home);
        }

    }
};

export const getLogin = (req, res) => {
    res.render("login", {
        pageTitle: "Log In"
    });
};

export const githubLogin = passport.authenticate("github");

/* cd는 passport로부터 나에게 제공되는 것임 */
export const githubLoginCallback = (accessToken, refreshToken, profile, cd) => {
    console.log(accessToken, refreshToken, profile, cd);
};

export const postGithubLogIn = (req, res) => {
    res.send(routes.home);
};
/*
passport.authenticate은 username과 passport를 찾아보도록 설정되어짐
*/
export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home
});         

export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home); // res.redirect("/");
};

export const users = (req, res) => res.render("users", {
    pageTitle: "Users"
});
export const userDetail = (req, res) => res.render("userDetail", {
    pageTitle: "User Detail"
});
export const editProfile = (req, res) => res.render("editProfile", {
    pageTitle: "Edit Profile"
});
export const changePassword = (req, res) => res.render("changePassword", {
    pageTitle: "Change Password"
}); // ""안에있는 라우터명은 routes파일의 객체명과 일치해야함