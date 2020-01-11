import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
    res.render("Join", {
        pageTitle: "Join"
    });
};

export const postJoin = async (req, res) => {
    const {
        body: {
            name,
            email,
            password,
            password2
        }
    } = req;

    if (password !== password2) {
        res.status(400);
        res.render("join", { pageTitle: "Join" });
    } else {
        try {
            const user = await User({
                name,
                email
            }); // 계정이 생성되면 이 코드를 실행시킨다.
            await User.register(user, password);
            
        } catch(error) {
            console.log(error);
        }

        res.redirect(routes.home);
    }
};

export const getLogin = (req, res) => {
    res.render("login", {
        pageTitle: "Log In"
    });
};

export const postLogin = (req, res) => {
    res.redirect(routes.home); // res.redirect("/");
};

export const logout = (req, res) => {
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