function onClickUserLink(info, tab) {
    alert(info.linkUrl);
}
function onClickSelectText(info, tab) {
    alert(info.selectionText);
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

