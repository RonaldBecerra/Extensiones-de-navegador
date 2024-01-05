chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	function skipAdd(){
		try{
			button = document.getElementsByClassName("ytp-ad-skip-button-modern")[0];
			button.click();
			// Envía la respuesta después de hacer clic en el botón
			sendResponse({ fromcontent: "This message is from content.js" });
		}
		catch(e){}
	}
	setInterval(skipAdd, 30);
});
