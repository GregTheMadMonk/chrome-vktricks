// Content renamer content script

const replacers = {
	"https://vk.com/feed":		() => { return sr_feed; },
	"https://vk.com/im":		() => { return sr_im; },
	"https://vk.com/friends":	() => { return sr_friends; },
	"https://vk.com/groups":	() => { return sr_groups; },
	"https://vk.com/albums":	() => { return sr_albums; },
	"https://vk.com/audios":	() => { return sr_audios; },
	"https://vk.com/video":		() => { return sr_videos; },
	"https://vk.com/bookmarks":	() => { return sr_bookmarks; },
	"https://vk.com/docs":		() => { return sr_files; },
};

Array.from(document.getElementsByClassName("left_label inl_bl")).forEach(node => {
	var replacer = "none";
	for (loc in replacers)
		if (node.parentElement.href.lastIndexOf(loc) != -1)
			replacer = replacers[loc]();

	if (replacer != "none") node.innerText = replacer;

	if ((document.getElementById("top_profile_link").href == node.parentElement.href) &&
		(sr_profile != "none"))
		node.innerText = sr_profile;
});

for (loc in replacers)
	if (window.location.href.lastIndexOf(loc) != -1)
		if (replacers[loc]() != "none") document.title = replacers[loc]();
