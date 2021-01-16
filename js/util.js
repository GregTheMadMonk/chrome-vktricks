// VKTricks util js

let msg_log = []; // messaage log
let log_depth = 100; // how many messages to store in the log

function log(message) {
	console.log(message);
	if (msg_log.length == log_depth) msg_log.shift();
	msg_log.push(message);

	chrome.runtime.sendMessage({ type: "o_log", data: msg_log });
}

log("js/util.js loaded");
