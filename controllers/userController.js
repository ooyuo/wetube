export const join = (req, res) => res.render("Join", { pateTitle: "Home"});
export const login = (req, res) => res.render("Login", { pateTitle: "Home"});
export const logout = (req, res) => res.render("Logout", { pateTitle: "Home"});
export const users = (req, res) => res.render("Users", { pateTitle: "Home"});
export const userDetail = (req, res) => res.render("UserDetail", { pateTitle: "Home"});
export const editProfile = (req, res) => res.render("EditProfile", { pateTitle: "Home"});
export const changePassword = (req, res) => res.render("ChangePassword", { pateTitle: "Home"}); // ""안에있는 라우터명은 routes파일의 객체명과 일치해야함
