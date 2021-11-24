if (!document.body.hasAttribute("drunk")) {
	function spin() {
		Array.from(document.querySelectorAll(".image_status__statusImage, .emoji, .TopNavBtn__icon, .ui_actions_menu_icons, .left_count_wrap, .im_grid, .TopNavBtn__notifyCount")).forEach(
			node => node.setAttribute("style", "transition: .7s; transform: rotate(" + (Math.random() * 360) + "deg)")
		);
		setTimeout(spin, 1000);
	}
	spin();
}
document.body.setAttribute("drunk", "true");
