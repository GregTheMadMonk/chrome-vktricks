// VKTricks config page js

let tricks = {};
let sidebar = document.getElementById("sidebar");
let content = document.getElementById("config_content");

let current_tab_name;

// opens configuration tab
function set_tab(tab_name) {
	chrome.runtime.sendMessage({ type: "i_tricks" });
	current_tab_name = tab_name;
	content.innerHTML = "";

	document.getElementById("apply_button").hidden = (tab_name == "main");

	if (tab_name == "main") {
		let log_header = document.createElement("h1");
		log_header.innerHTML = "Extension log";
		content.appendChild(log_header);
		let log_container = document.createElement("div");
		log_container.id = "log_container";
		content.appendChild(log_container);

		chrome.runtime.sendMessage({ type: "i_log" });

		return;
	}

	let log_header = document.createElement("h1");
	log_header.innerHTML = tricks[tab_name].manifest.display_name;
	content.appendChild(log_header);
	tricks[tab_name].manifest.options.forEach(option => {
		let label = document.createElement("div");
		label.className = "option_label";
		label.innerText = option.display_name;
		let switcher = document.createElement("input");
		switcher.type = "text";
		switcher.id = tab_name + "_" + option.name;
		switcher.value = option.value || option.default_value;
		let nl = document.createElement("br");
		content.appendChild(label);
		content.appendChild(switcher);
		content.appendChild(nl);
	});
}

chrome.runtime.onMessage.addListener((request, sender, callback) => {
	console.log(request);
	switch (request.type) {
		case "o_tricks":
			sidebar.innerHTML = ""; // clear sidebar

			tricks = request.data;

			// create UI for trick settings
			let main_switch = document.createElement("input");
			main_switch.type = "button";
			main_switch.value = "Main";
			main_switch.title = "Go to main extension configuration page";
			main_switch.id = "main_switch";
			main_switch.className = "trick_switch";
			main_switch.onclick = () => set_tab("main");
			sidebar.appendChild(main_switch);

			for (trick in tricks) {
				let trick_switch = document.createElement("input");
				trick_switch.type = "button";
				trick_switch.value = tricks[trick].manifest.display_name;
				trick_switch.title = tricks[trick].manifest.description;
				trick_switch.id = trick + "_switch";
				trick_switch.className = "trick_switch";
				trick_switch.onclick = () => set_tab(trick);

				sidebar.appendChild(trick_switch);

				for (i in tricks[trick].manifest.options) {
					let id = trick + "_" + tricks[trick].manifest.options[i].name;
					let element = document.getElementById(id);
					if (element) element.value = tricks[trick].manifest.options[i].value || tricks[trick].manifest.options[i].default_value;
				}
			};
			break;
		case "o_log":
			if (current_tab_name != "main") break; // log is visible only on main tab
			let log_container = document.getElementById("log_container");
			log_container.innerHTML = "";
			for (let line = request.data.length - 1; line >= 0; line--) {
				let content = request.data[line];
				if (typeof content != "string") content = JSON.stringify(content);
				log_container.appendChild(document.createTextNode(content));
				log_container.appendChild(document.createElement("br"));
			}
			break;
	}
});

document.getElementById("apply_button").onclick = () => {
	for (trick in tricks) {
		tricks[trick].manifest.options.forEach(option => {
			const v = document.getElementById(trick + "_" + option.name).value;
			chrome.runtime.sendMessage({ type: "o_option", data: { trick: trick, name: option.name, value: v } });
		});
	}
};

set_tab("main");
chrome.runtime.sendMessage({ type: "i_tricks" });
