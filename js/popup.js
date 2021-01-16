// VKTricks popup script

// set event listeners
document.getElementById("configure_button").onclick = () => {
	let win = window.open(chrome.extension.getURL("../html/config.html"), "vktricks_tab");
	win.focus();
};
