import document from "document";

const messageTxt = document.getElementById("message");

export function Logger() {
  
};

export function log (msg) {
  messageTxt.text = msg;
  console.log(msg);
}