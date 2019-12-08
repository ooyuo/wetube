export const join = (req, res) => res.render("Join", { pateTitle: "Home"});
export const login = (req, res) => res.render("Login", { pateTitle: "Home"});
export const logout = (req, res) => res.render("Logout", { pateTitle: "Home"});
export const users = (req, res) => res.render("Users", { pateTitle: "Home"});
export const userDetail = (req, res) => res.render("User Detail", { pateTitle: "Home"});
export const editProfile = (req, res) => res.render("Edit Profile", { pateTitle: "Home"});
export const changePassword = (req, res) => res.render("Change Password", { pateTitle: "Home"});
