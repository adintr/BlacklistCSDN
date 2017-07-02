
chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        alert(request);
        if (request.command == "getBlackList") {
            sendResponse({data: ["zjl13595325243", "ipqtjmqj"]});
        }
    }
);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendRequest){
        alert(request);
        sendRequest({success: true});
    }
);