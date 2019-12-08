export const home = (req, res) => res.render("home", { pageTitle: "Home" }); // render함수의 첫번째인자: 템플릿, 두번째인자: 추가할 정보가 담긴 객체

export const search = (req, res) => {
    //const searchingBy = req.query.term;
    const {
        query: { term: searchingBy }
    } = req; //윗줄코드와 같음
    res.render("search", { pageTitle: "Search", searchingBy});
}

export const upload = (req, res) => 
res.render("upload", { pageTitle: "Upload"});

export const videoDetail = (req, res) => 
res.render("Video Detail", { pageTitle: "Video Detail"});

export const editVideo = (req, res) => 
res.render("Edit Video", { pageTitle: "Edit Video"});

export const deleteVideo = (req, res) => 
res.render("Delete Video", { pageTitle: "Delete Video"});
