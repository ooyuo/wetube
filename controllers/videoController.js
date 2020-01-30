import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({_id: -1 }); // 내림차순으로 정렬
        res.render("home", { pageTitle: "Home", videos }); // Video라는 model을 다 찾고나서 home page를 render한다.
    } catch (error) {
        console.log(error);
        res.render("home", {pageTitle: "Home", videos: [] }); // video라는 model을 찾을때 error가 발생해도 home을 render한다.(videos라는 db가 빈 채로)
    }
}; // render함수의 첫번째인자: 템플릿, 두번째인자: 추가할 정보가 담긴 객체

export const search = async (req, res) => {
    // const searchingBy = req.query.term;
    console.log(req.query);
    const {
        query: { term: searchingBy } // query로 term(단어)를 받는다.
    } = req; // 윗줄코드와 같음

    let videos = [];

    try {
        videos = await Video.find({
          title: { $regex: searchingBy, $options: "i" }
        });
        console.log(videos);
      } catch (error) {
        console.log(error);
    }
    res.render("search", { pageTitle: "Search", searchingBy, videos });
    // res.render("search", { pageTitle: "Search", searchingBy: searchingBy}); 와 같음
};

export const getUpload = (req, res) =>
    res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
    const {
        body: { title, description },
        file: { path }
    } = req;

    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description,
        creator: req.user.id // request에는 항상 user가 있다. 로그인을 했기때문에..
    });
    req.user.videos.push(newVideo.id);
    req.user.save();

    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
    const {
        params: { id }
    } = req;

    try {
        const video = await Video.findById(id).populate("creator"); // populate(): 객체를 데려온다. 객체로 선언된 경우에만 사용할 수 있다.

        res.render("videoDetail", { pageTitle: video.title, video });
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
};

// 템플릿을 렌더링한다.
export const getEditVideo = async (req, res) => {
    const {
        params: { id } 
    } = req;

    try {
        const video = await Video.findById(id);
        if (String(video.creator) !== req.user.id) {    
            throw Error(); // try문안에서 error가 발생할 경우 자동적으로 catch문으로 가게되어있음
        } else {
            res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
        }
    } catch (error) {
        res.redirect(routes.home);
    }
};


export const postEditVideo = async (req, res) => {
    const {
        params: { id },
        body: { title, description }
    } = req;

    try {
        await Video.findOneAndUpdate({ _id: id }, { title, description });
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const deleteVideo = async (req, res) => {
    const {
        params: { id }
    } = req;

    try {
        const video = await Video.findById(id);
        if (String(video.creator) !== req.user.id) {    
            throw Error(); // try문안에서 error가 발생할 경우 자동적으로 catch문으로 가게되어있음
        } else {
            await Video.findOneAndRemove({ _id: id });
        }
    } catch (error) {
        console.log(error);
    }
    res.redirect(routes.home);
};
