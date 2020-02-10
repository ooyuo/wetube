const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsvideoPreview");

let streamObject;

const handleVideoData = (event) => {
    console.log(event);
}

const startRecording = () => {
    const videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.start();
    videoRecorder.addEventListener("dataavailable", handleVideoData);   
}
;
const getVideo = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { width: 1280, height: 720 }
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
        recordBtn.innerHTML = "Stop recording";
        streamObject = stream;
        console.log("here");
        startRecording();
    } catch(error) {
        recordBtn.innerHTML = "😝 Cant record";
    } finally {
        recordBtn.removeEventListener("click", getVideo);

    }
}

function init() {
    recordBtn.addEventListener("click", getVideo);
}

if (recorderContainer){
    init();
}