function querySelectorIncludesText (selector, text){
	return Array.from(document.querySelectorAll(selector))
		.find(el => el.textContent.includes(text));
}

const deleteNoLabelFunction = function(request, sender, sendResponse) {
	if (request.action != "deleteNoLabel"){
		return;
	}

	let continueFlux = true;
	let span, numElems, container;
	try{
		span = querySelectorIncludesText("span", "no label");
		numElems = parseInt(span.children[0].innerHTML.slice(1,-1));
		container = span.parentElement;
	}
	catch(e){
		continueFlux = false;
	}

	if (!continueFlux){
		return;
	}
	// Recursive auxiliar
	function deleteOne(time=30){
		try{
			if (numElems > 0){
				let elem = container.nextElementSibling.nextElementSibling;
				elem.click();

				setTimeout(() => {
					let button = document.querySelector(".icon-button[data-tip='Delete']");
					if (button){
						button.click();
						numElems--;
						time=30
					}
					else{
						// We wait twice in the next try
						time *=2
					}
					setTimeout(deleteOne, time*2);
				}, time)
			}
		} catch(e){}
	}
	// Call the recursive function for first time
	deleteOne();

	// Return true to indicate that the response will be sent asynchronously
	return true;					
}

// To eliminate previous instances of the listener
if (chrome.runtime.onMessage.hasListener(deleteNoLabelFunction)){
	chrome.runtime.onMessage.removeListener(deleteNoLabelFunction);
}

// To start listening
if (!chrome.runtime.onMessage.hasListener(deleteNoLabelFunction)){
	chrome.runtime.onMessage.addListener(deleteNoLabelFunction);
}
