import routes from "../routes";

export const getJoin = (req, res) => {
    res.render("Join", { pateTitle: "Join"});
};

export const postJoin = (req, res) => {
    const {
        body: { name, email, password, password2 }
    } = req;

    if(password !== password2) {
        res.status(400);
        res.render("join", { pageTitle: "Join"});
    } else {
        // To Do: Register User
        // To Do: Log user in
        res.redirect(routes.home);
    }
};

export const getLogin = (req, res) => {
    res.render("login", { pateTitle: "Log In"});
};

export const postLogin = (req, res) => {
    res.redirect(routes.home);
};

export const logout = (req, res) => res.render("logout", { pateTitle: "Log Out"});
export const users = (req, res) => res.render("users", { pateTitle: "Users"});
export const userDetail = (req, res) => res.render("userDetail", { pateTitle: "User Detail"});
export const editProfile = (req, res) => res.render("editProfile", { pateTitle: "Edit Profile"});
export const changePassword = (req, res) => res.render("changePassword", { pateTitle: "Change Password"}); // ""안에있는 라우터명은 routes파일의 객체명과 일치해야함
