var global_black_list = [];

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        if (request.command == "getBlackList") {
            sendResponse({data: global_black_list });
        }
        else if(request.command == "addBlackUser") {
            global_black_list.push(request.username);
            sendResponse({success: true});
        }
    }
);