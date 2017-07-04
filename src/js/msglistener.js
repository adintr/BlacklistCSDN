var global_black_list = [];

if(localStorage["black_list"] && localStorage["black_list"] != "") {
    global_black_list = JSON.parse(localStorage["black_list"]);
}

function add_black_user_and_save(username) {
    global_black_list.push(username);
    localStorage["black_list"] = JSON.stringify(global_black_list);
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