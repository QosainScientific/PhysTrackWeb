var camVideoElementId = [];
export function startCamera (videoElementId) {
    camVideoElementId = videoElementId;
    console.log("vid ID ", camVideoElementId);
    const video = document.getElementById(videoElementId);

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            video.play();
        })
        .catch(err => {
            console.error("Error accessing camera: " + err);
        });

};
export function captureOneFrame () {
    console.log("vid ID ", camVideoElementId);
    var videoElementId = camVideoElementId;
    const video = document.getElementById(videoElementId);
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/png'); // Returns the image as a base64 encoded PNG
};
var allowAutoTrigger = false;
export function triggerFrameLoop() {
    async function triggerUnit() {
        var base64 = captureOneFrame();
        await sendFrame(base64);
        if (allowAutoTrigger)
            requestAnimationFrame(triggerFrameLoop);
    }
    allowAutoTrigger = true;
    triggerUnit();
}
export function stopFrameLoop() {
    allowAutoTrigger = false;
}

// Auto frame fire
var camListener = null;
export function registerFrameSink(objRef) {
    camListener = objRef;
}

async function sendFrame(frame) {
    if (camListener == null)
        return;
    await camListener.invokeMethodAsync("OnNewFrame", frame);
}
