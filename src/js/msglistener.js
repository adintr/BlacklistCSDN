var global_black_list = [];

function removeByValue(array, val) {
    for(var i=0; i<array.length; i++) {
        if(array[i] == val) {
            array.splice(i, 1);
            break;
        }
    }
}

function loadBloackList() {
    if(localStorage["black_list"] && localStorage["black_list"] != "") {
        global_black_list = JSON.parse(localStorage["black_list"]);
    }
}

function saveBlackList() {
    localStorage["black_list"] = JSON.stringify(global_black_list);
}

function add_black_user_and_save(username) {
    global_black_list.push(username);
    saveBlackList();
}

function deleteBloackUser(username) {
    if(confirm("从黑名单中删除 " + username + " ?")) {
        removeByValue(global_black_list, username);
        saveBlackList();
        return true;
    }

    return false;
}

loadBloackList();

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