chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	// This is to use the service "CORS Anywhere", an inverse proxy that adds 
	// the header "Access-Control-Allow-Origin" to any request 
	const INVERSE_PROXY_URL = "https://cors-anywhere.herokuapp.com/";

	function clickButtons(document, classList, functionToExecute){
		try{
			classList.forEach(function (className)
				{
					Array.from(document.getElementsByClassName(className)).forEach(function (button){
						console.log("Voy a hacer click")
						button.click();
					});	
				}, 
				() => functionToExecute()
			)
			sendResponse({ fromcontent: "This message is from content.js" });		
		}
		catch(e){}
	}

	function skipAdd(classList){
		// Try to find the button(s) in the document of the main page
		clickButtons(document, classList);

		// Try to find the button(s) in the iframes
		try{
			document.querySelectorAll('iframe').forEach(frame => {
				const frameChanged = false;

				if (!frame.src.includes(INVERSE_PROXY_URL)){
					var oldFrame = frame;
					frameChanged = true;

					// We always append the inverse proxy URL to avoid CORS errors
					var newFrame = document.createElement("iframe");
					newFrame.setAttribute("src", INVERSE_PROXY_URL + frame.src);

					// Replace the original iframe with the new one
					frame.parentNode.replaceChild(newFrame, frame);
					frame = frame.parentNode.lastChild;
				}
				// Try to click the buttons
				const iframeDocument = frame.contentDocument || frame.contentWindow.document;
				clickButtons(
					iframeDocument, classList,
					() => {
						// We don't want to keep the changed frame
						if frameChanged{
							console.log("Voy a reemplazar")
							frame.parentNode.replaceChild(oldFrame, frame);
						}
					}
				);
			});
		}
		catch(e){}
	}
	setInterval(() => 
		skipAdd([
			"ytp-ad-skip-button-modern", // YouTube
			"videoAdUiSkipButton", // TokyVideo
		]), 20
	);
});

/*
// ESTO SIRVE PARA SIMULAR QUE SE HACE CLICK CON EL MOUSE SOBRE EL BOTÓN

var rect = boton.getBoundingClientRect (); // obtenemos el rectángulo del botón
var x = rect.left + rect.width / 2; // calculamos la coordenada X del centro del botón
var y = rect.top + rect.height / 2; // calculamos la coordenada Y del centro del botón
var evento = new MouseEvent ('click', { // creamos el evento
  view: window, // la ventana es la actual
  bubbles: true, // el evento se propaga
  cancelable: true, // el evento se puede cancelar
  clientX: x, // la coordenada X es la calculada
  clientY: y // la coordenada Y es la calculada
});
boton.dispatchEvent (evento); // lanzamos el evento
*/