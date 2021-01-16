// VKTricks background message listener

log("js/background_msg.js entry");

function save() {
	log("Saving...");

	var object = {};

	for (trick in tricks) {
		for (i in tricks[trick].manifest.options) {
			if (tricks[trick].manifest.options[i].default_value !=
				tricks[trick].manifest.options[i].value) {
				if (!object[trick]) object[trick] = {};
				object[trick][tricks[trick].manifest.options[i].name] =
					tricks[trick].manifest.options[i].value;
			}
		}
	}

	log(object);
	chrome.storage.local.set({ options: object });
}

function load() {
	log("Loading...");

	chrome.storage.local.get("options", options => {
		let object = options.options;
		log(object);
		for (trick in object) {
			for (option in object[trick]) {
				for (i in tricks[trick].manifest.options)
					if (tricks[trick].manifest.options[i].name == option)
						tricks[trick].manifest.options[i].value = object[trick][option];
			}
		}
	});
}

chrome.runtime.onMessage.addListener((request, sender, callback) => {
	log(request);
	switch (request.type) {
		case "i_tricks":
			chrome.runtime.sendMessage({ type: "o_tricks", data: tricks });
			break;
		case "i_log":
			chrome.runtime.sendMessage({ type: "o_log", data: msg_log });
			break;
		case "o_option":
			for (i in tricks[request.data.trick].manifest.options) {
				if (tricks[request.data.trick].manifest.options[i].name == request.data.name)
					tricks[request.data.trick].manifest.options[i].value = request.data.value;
			}
			save();
			break;
	}
});
