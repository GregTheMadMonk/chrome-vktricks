// get twitch emote list

let cache;

console.log(vt_emotes_list);

function emotify(node) {
	if (node.innerHTML) {
		cache.forEach(emote => {
			if ((emote.code == "PogChamp") && (vt_legacy_pog == "true"))
				node.innerHTML = node.innerHTML.replace(/PogChamp/g,
					"<img src=\"https://ih1.redbubble.net/image.588306971.1615/flat,800x800,075,f.jpg\" style=\"width: 2em; height: 2em; position: absolute;\"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
			else
				node.innerHTML = node.innerHTML.replace(new RegExp(emote.code, "g"),
					"<img src=\"https://static-cdn.jtvnw.net/emoticons/v2/" + emote.id + "/default/dark/1.0\" style=\"width: 2em; height: 2em; position: absolute;\" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
		});
	}
}

function replacer(node) {
	Array.from(document.getElementsByClassName("im-mess")).forEach(node => emotify(node));
}

var mutationObserver = new MutationObserver(function(mutations) {
	mutations.forEach(mutation => mutation.addedNodes.forEach(node => {
		if (node.classList)
			if (node.classList.contains("im-mess")) emotify(node); 
	}));
});

mutationObserver.observe(document.getElementsByClassName("im-page")[0], { childList: true, subtree: true });

fetch("https://api.twitchemotes.com/api/v4/channels/0").then(response => {
	return response.json();
}).then(data => {
	cache = [];
	data.emotes.forEach(emote => {
		if (vt_emotes_list.lastIndexOf(emote.code) != -1) {
			cache.push({ code: emote.code, id: emote.id });
		}
	});
	replacer(document.body);
});
