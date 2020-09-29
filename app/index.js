/*
 * Entry point for the watch app
 */
import document from "document";
import * as messaging from "messaging";
import {cameraCommands} from "../common/cameraCommands.js";

const modeSettings = {
  "photo": "photo",
  "video": "video",
  "unknown": "unknown"
};

const state = {
  isRecording: false,
  recordingMode: modeSettings.unknown
};

let photoMode = document.getElementById("photoMode");
let videoMode = document.getElementById("videoMode");
let startRecording = document.getElementById("startRecording");
var stopRecording = document.getElementById("stopRecording");

videoMode.addEventListener("click", (evt) => {
  videoMode.image = "video-roll-selected.png";
  photoMode.image = "camera.png"
  state.recordingMode = modeSettings.video;
  messaging.peerSocket.send(cameraCommands.videoMode);
});


photoMode.addEventListener("click", (evt) => {
  videoMode.image = "video-roll.png";
  photoMode.image = "camera-selected.png"
  state.recordingMode = modeSettings.photo;
  messaging.peerSocket.send(cameraCommands.photoMode);
});

startRecording.addEventListener("click", () => {
  messaging.peerSocket.send(cameraCommands.startRecording);
  
  if(state.recordingMode = modeSettings.videoMode) {
    //Show stop
  }
});

stopRecording.addEventListener("click", (evt) => {
  messaging.peerSocket.send(cameraCommands.stopRecording);
  var t = document.getElementById("stopRecording");
  console.log(JSON.stringify(t.style));
  t.style.fill = "blue";
});

messaging.peerSocket.onopen = function() {

  messaging.peerSocket.send("Hi!");
}

// Listen for the onmessage event
messaging.peerSocket.onmessage = function(evt) {
  let messageTxt = document.getElementById("message");
  messageTxt.text = JSON.stringify(evt);
  console.log("on message app" + JSON.stringify(evt));
}

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  console.log("app error");
}