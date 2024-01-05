const sendMessageId = document.getElementById("sendmessageid");

if (sendMessageId) {
    sendMessageId.onclick = function() {
        chrome.runtime.sendMessage({action: "skipAd"}, function(response) {
            window.close();
        });
    };
}
