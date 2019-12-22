import { videos } from "../db";
import routes from "../routes";

export const home = (req, res) => {
    res.render("home", { pageTitle: "Home", videos });
}; // render함수의 첫번째인자: 템플릿, 두번째인자: 추가할 정보가 담긴 객체

export const search = (req, res) => {
    //const searchingBy = req.query.term;
    console.log(req.query);
    const {
        query: { term: searchingBy }
    } = req; //윗줄코드와 같음
    res.render("search", { pageTitle: "Search", searchingBy, videos});
    //res.render("search", { pageTitle: "Search", searchingBy: searchingBy}); 와 같음
}

export const getUpload = (req, res) => 
res.render("upload", { pageTitle: "Upload"});

export const postUpload = (req, res) => {
    const {
        body: {file, title, description}
    } = req;
    // To Do: Upload and save video
    res.redirect(routes.videoDetail(324393));
}

export const videoDetail = (req, res) => 
res.render("Video Detail", { pageTitle: "Video Detail"});

export const editVideo = (req, res) => 
res.render("Edit Video", { pageTitle: "Edit Video"});

export const deleteVideo = (req, res) => 
res.render("Delete Video", { pageTitle: "Delete Video"});
