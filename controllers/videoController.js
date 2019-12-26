import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({});
        res.render("home", { pageTitle: "Home", videos }); // Video라는 model을 다 찾고나서 home page를 render한다.
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videos: []}); // video라는 model을 찾을때 error가 발생해도 home을 render한다.(videos라는 db가 빈 채로)
    }
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
