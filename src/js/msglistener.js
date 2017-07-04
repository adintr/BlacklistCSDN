var global_black_list = [];

function add_black_user_and_save(username) {
    global_black_list.push(username);
}

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        if (request.command == "getBlackList") {
            sendResponse({data: global_black_list });
        }
        else if(request.command == "addBlackUser") {
            add_black_user_and_save(request.username);
            sendResponse({success: true});
        }
    }
);