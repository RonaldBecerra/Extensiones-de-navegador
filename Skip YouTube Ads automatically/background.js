function sendSkipMessage(tabId){
	chrome.tabs.sendMessage(tabId, {action: "skipAd"});
}

// Escuchar el evento onMessage desde el contenido del script. 
// Esto sirve para todas las ventanas y pestañas que están abiertas al ejecutar la extensión.
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action === "skipAd") { // Verificar si el mensaje proviene del contenido del script
		// Recorrer todas las ventanas
		chrome.windows.getAll({populate: true}, function(windows) {
			windows.forEach(function(window) {
				// Recorrer todas las pestañas en cada ventana
				window.tabs.forEach(function(tab) {
					// Enviar mensaje a todas las pestañas para saltar la publicidad
					sendSkipMessage(tab.id)
				});
			});
		});
	}
});

// Escuchar el evento onUpdated para manejar la carga de nuevas pestañas.
// Esto incluye las pestañas de las nuevas ventanas que se vayan creando.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	// Verificar si lo que se actualizó fue el hecho de que la página estuviera completamente cargada
	if (changeInfo.status === "complete") {
		sendSkipMessage(tabId)
	}
});