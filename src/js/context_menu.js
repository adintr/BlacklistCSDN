
function add_to_black(username) {
    if(confirm("将 " + username + " 加入黑名单? ")) {
        add_black_user_and_save(username);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.reload(tabs[0].id);
        });
    }
}

function onClickUserLink(info, tab) {
    var names = info.linkUrl.split("/");
    add_to_black(names.pop());
}

function onClickSelectText(info, tab) {
    add_to_black(info.selectionText);
}

chrome.contextMenus.create(
    {
        "title": "将此用户加入黑名单",
        "contexts":["link"],
        "documentUrlPatterns": ["http://bbs.csdn.net/*"],
        "targetUrlPatterns": ["http://my.csdn.net/*"],
        "onclick": onClickUserLink
    }
);

chrome.contextMenus.create(
    {
        "title": "将 %s 加入黑名单",
        "contexts":["selection"],
        "documentUrlPatterns": ["http://bbs.csdn.net/*"],
        "onclick":onClickSelectText
    }
);

