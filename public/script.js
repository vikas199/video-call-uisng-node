//gets the video and audio from the chrome

const socket = io("/")
const videoGrid = document.getElementById("video-grid")
const myVideo = document.createElement("video")
myVideo.muted = true

var peer = new Peer(undefined, {
  path: "/peerjs",
  host: "/",
  port: "3030",
})

let myVideoStream
navigator.mediaDevices //check for available media devices
  .getUserMedia({
    video: true,
    audio: false,
  })
  .then((stream) => {
    myVideoStream = stream
    addVideoStream(myVideo, stream)

    peer.on("call", function (call) {
      call.answer(stream) // Answer the call with an A/V stream.
      const video = document.createElement("video")
      call.on("stream", function (remoteStream) {
        addVideoStream(video, remoteStream)
      })
    })

    socket.on("user-connected", (userId) => {
      connectToNewUser(userId, stream)
    })
  })

peer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id)
})

const connectToNewUser = (userId, stream) => {
  // console.log('new user', userId)
  const call = peer.call(userId, stream)
  const video = document.getElementById("video")
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream)
  })
}
const addVideoStream = (video, stream) => {
  video.srcObject = stream
  video.addEventListener("loadedmetadata", () => {
    video.play()
  })
  videoGrid.append(video)
}
