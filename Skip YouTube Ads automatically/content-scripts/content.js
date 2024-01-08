chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	// This is to use the service "CORS Anywhere", an inverse proxy that adds 
	// the header "Access-Control-Allow-Origin" to any request 
	const INVERSE_PROXY_URL = "https://cors-anywhere.herokuapp.com/";

	function clickButtons(document, className){
		try{
			Array.from(document.getElementsByClassName(className)).forEach(function (button){
				button.click();
			});	
			sendResponse({ fromcontent: "This message is from content.js" });		
		}
		catch(e){}
	}

	function skipAdd(className){
		// Try to find the button(s) in the document of the main page
		clickButtons(document, className);

		// Try to find the button(s) in the iframes
		try{
			document.querySelectorAll('iframe').forEach(frame => {
				if (!frame.src.includes(INVERSE_PROXY_URL)){
					// We always append the inverse proxy URL to avoid CORS errors
					let newFrame = document.createElement("iframe");
					newFrame.setAttribute("src", INVERSE_PROXY_URL + frame.src);

					// Replace the original iframe with the new one
					frame.parentNode.replaceChild(newFrame, frame);
					frame = frame.parentNode.lastChild;
				}
				// Try to click the buttons
				const iframeDocument = frame.contentDocument || frame.contentWindow.document;
				clickButtons(iframeDocument, className);
			});
		}
		catch(e){}
	}
	setInterval(() => skipAdd("ytp-ad-skip-button-modern"), 20);
	setInterval(() => skipAdd("videoAdUiSkipButton"), 20);
});
