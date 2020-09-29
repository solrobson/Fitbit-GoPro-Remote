import {me } from "companion";
import * as messaging from "messaging";
import {settingsStorage } from "settings";
import { GoProApi } from "./goPro7Api.js";
import { cameraCommands} from "../common/cameraCommands.js";
var g = new GoProApi();

settingsStorage.onchange = (evt) => {
  console.log("setting storage change");
}

messaging.peerSocket.onopen = (evt) => {
  console.log("peer socket onopen");
}

messaging.peerSocket.onmessage = function(evt) {
  // Output the message to the console
  console.log("companion" + JSON.stringify(evt.data));
  let command = null;
  console.log("Data " + evt.data);
  
  switch(evt.data)
  {
    case cameraCommands.videoMode:
      command = g.setVideo();
      break;
    case cameraCommands.photoMode:
      command = g.setPhoto();
      break;
    case cameraCommands.startRecording:
      command = g.startRecord();
      break;
    case cameraCommands.stopRecording:
      command = g.stopRecord();
      break;
    default:
      break;
  }
  
  if(command) {
    command.then((res) => {
      messaging.peerSocket.send(res);
    }).catch((err) => {
      messaging.peerSocket.send(err);
    })
  }
  /*g.startRecord().then((res) => {
    console.log('api successful')
    console.log(res);
    messaging.peerSocket.send(res);
  })
  .catch((err) => {
    console.log(err);
    messaging.peerSocket.send(err);
  });*/
}