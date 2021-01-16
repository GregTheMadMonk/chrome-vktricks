// VKTricks main background script

log("js/background.js entry");

log("Loading extension tricks...");
log("Scanning for tricks/ subdirectories...");

chrome.runtime.getPackageDirectoryEntry(
	dir_e => dir_e.getDirectory("tricks", {}, 
		tricks_dir => tricks_dir.createReader().readEntries(
			entries => entries.forEach(
				entry => entry.getFile("manifest.json", {}, manifest => { // check for trick manifest
					manifest.file(manifest_file => {
						let manifest_reader = new FileReader();
						manifest_reader.onloadend = (e) => {
							// read manifest
							let manifest_o = JSON.parse(manifest_reader.result);
							log("Manifest finshed parsing");
							log(manifest_o);

							tricks[entry.name] = {
								manifest: manifest_o
							};

							load();
						};

						manifest_reader.readAsText(manifest_file);
					});
					}, () => log("No manifest found for " + entry.name + ". Skipped.")
				)
			)
		)
	)
);
