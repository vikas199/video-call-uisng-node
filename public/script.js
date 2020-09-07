//gets the video and audio from the chrome


const videoGrid = document.getElementById('video-grid')
const myVideo = document.createElement("video")
myVideo.muted = true

let myVideoStream
navigator.mediaDevices     //check for available media devices
  .getUserMedia({
    video: true,
    audio: true,
  }).then(stream => {
    myVideoStream = stream
    addVideoStream(myVideo, stream)
  })

const addVideoStream = (video, stream) => {
  video.srcObject = stream
  video.addEventListener("loadedmetadata", () => {
    video.play()
  })
  videoGrid.append(video)
}
