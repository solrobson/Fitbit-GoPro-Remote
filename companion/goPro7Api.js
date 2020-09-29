export function GoProApi() {
  
};

GoProApi.prototype.setVideo = function() {
    let url = "https://10.5.5.9/gp/gpControl/command/mode?p=0";
  console.log("url " + url);
    return callGoPro(url);
};

GoProApi.prototype.setPhoto = function() {
   let url = "http://192.168.87.221/gp/gpControl/command/mode?p=1";
  return callGoPro(url);
};

GoProApi.prototype.startRecord = function() {
    let url = "http://10.5.5.9/gp/gpControl/command/shutter?p=1";
    return callGoPro(url);
};

GoProApi.prototype.stopRecord = function() {
  let url = "http://10.5.5.9/gp/gpControl/command/shutter?p=0";
  return callGoPro(url);
};

function callGoPro(url) {
  return new Promise(function(resolve, reject) {
    console.log(url);
    fetch(url, {method: "GET"}).then(function(response) {
      console.log(response);
      resolve({ m: respone, wasSuccessful: true});
    }).catch(function(error) {
      console.log('error1' + error);
      console.log("error" + JSON.stringify(error));
      reject(error);
    });
  });
}