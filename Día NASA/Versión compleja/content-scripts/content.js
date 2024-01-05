chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	$("body").prepend(
		`<img  src="${request.url}" id="${request.imageDivId}"
				class="slide-image" /> `
	);
	$("head").prepend(
		`<style>
			.slide-image {
				height: auto;
				width: 100vw;
			}
		</style>`
	);
	$(`#${request.imageDivId}`).click(function() {
		$(`#${request.imageDivId}`).remove(`#${request.imageDivId}`);
	});
	sendResponse({ fromcontent: "This message is from content.js" });
});


// ESTO ERA UN INTENTO QUE NO FUNCIONÓ

// Esperamos a que el documento esté listo
//document.addEventListener("DOMContentLoaded", function() {
	// CÓDIGO DE ARRIBA
//});