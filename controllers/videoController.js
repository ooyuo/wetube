import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({
            _id: -1
        }); // 내림차순으로 정렬
        res.render("home", {
            pageTitle: "Home",
            videos
        }); // Video라는 model을 다 찾고나서 home page를 render한다.
    } catch (error) {
        console.log(error);
        res.render("home", {
            pageTitle: "Home",
            videos: []
        }); // video라는 model을 찾을때 error가 발생해도 home을 render한다.(videos라는 db가 빈 채로)
    }
}; // render함수의 첫번째인자: 템플릿, 두번째인자: 추가할 정보가 담긴 객체

export const search = (req, res) => {
    // const searchingBy = req.query.term;
    console.log(req.query);
    const {
        query: {
            term: searchingBy
        } // query로 term(단어)를 받는다.
    } = req; // 윗줄코드와 같음
    res.render("search", {
        pageTitle: "Search",
<<<<<<< HEAD
        searchingBy,
        videos
=======
        searchingBy
>>>>>>> 45261b38c5333d98ec436428d7051f245d0260de
    });
    // res.render("search", { pageTitle: "Search", searchingBy: searchingBy}); 와 같음
};

export const getUpload = (req, res) =>
    res.render("upload", {
        pageTitle: "Upload"
    });

export const postUpload = async (req, res) => {
    const {
        body: {
            title,
            description
        },
        file: {
            path
        }
    } = req;

    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description
    });
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
    const {
        params: {
            id
        }
    } = req;

    try {
        const video = await Video.findById(id);
        res.render("videoDetail", {
            pageTitle: video.title,
            video
        });
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
};

// 템플릿을 렌더링한다.
export const getEditVideo = async (req, res) => {
    const {
        params: {
            id
        }
    } = req;

    try {
        const video = await Video.findById(id);
        res.render("editVideo", {
            pageTitle: `Edit ${video.title}`,
            video
        });
    } catch (error) {
        res.redirect(routes.home);
    }
};


export const postEditVideo = async (req, res) => {
    const {
        params: {
            id
        },
        body: {
            title,
            description
        }
    } = req;

    try {
        await Video.findOneAndUpdate({
            _id: id
        }, {
            title,
            description
        });
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const deleteVideo = async (req, res) => {
    const {
        params: {
            id
        }
    } = req;

    try {
        await Video.findOneAndRemove({
            _id: id
        });
    } catch (error) {
        console.log(error);
    }
    res.redirect(routes.home);
};