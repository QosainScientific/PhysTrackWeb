window.camVideoElementId = [];
window.startCamera = (videoElementId) => {
    window.camVideoElementId = videoElementId;
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
window.captureFrame = () => {
    var videoElementId = window.videoElementId;
    const video = document.getElementById(videoElementId);
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/png'); // Returns the image as a base64 encoded PNG
};