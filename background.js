chrome.webRequest.onBeforeRequest.addListener(
	function(event) {
		var path = event.url
		var tmp = document.createElement('a');
		tmp.href = path;

		if (tmp.hostname == "z.net") {
			path = path.substr(13, path.length);
		} else if (tmp.hostname.endsWith(".zeronet") || tmp.hostname.endsWith(".zero")) {
			path = tmp.hostname.substr(0,tmp.hostname.lastIndexOf(".zero")) + tmp.pathname + tmp.search + tmp.hash
		} else {
			if (path.startsWith("https://")) {
				path = path.substr(8,path.length);
			}
			if (path.startsWith("http://")) {
				path = path.substr(7,path.length);
			}
		}

		chrome.tabs.update(event.tabId, {url: "http://127.0.0.1:43110/" + path});
		return {cancel: true};
	},
	{urls: ["<all_urls>"]},
	["blocking"]
);

chrome.omnibox.onInputEntered.addListener(function(text){
	chrome.tabs.update({url: "http://127.0.0.1:43110/" + text});
});
