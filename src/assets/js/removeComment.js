import axios from "axios";
const removeBtn = document.querySelectorAll(".jsRemoveCommentBtn");

const handleRemoveComment = event => {
    const li = event.target.parentNode;
    li.parentNode.removeChild(li);   
};

const removeComment = async event => {
    const comment = event.target.value;
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url: `/api/${videoId}/remove-comment`,
        method: "POST",
        data: {
            comment
        }
    });
    if(response.status === 200) { // comment가 database에 저장됐을 경우에만 removeComment하겠다.
        handleRemoveComment(event);
    } 
};


function init() {
    console.log(removeBtn.length);
    for(const item of removeBtn) {
        item.onclick = removeComment;
    }
}
  
if (removeBtn) {
    init();
}