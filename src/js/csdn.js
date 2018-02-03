var global_black_list = [];
var global_id = 1;

function is_black_user(username) {
    return global_black_list.indexOf(username) != -1;
}

function add_to_black(username) {
    if(confirm("将 " + username + " 加入黑名单? ")) {
        chrome.extension.sendRequest({command: "addBlackUser", username: username },
            function(response) {
                if(response.success) {
                    location.reload();
                }
            }
        );
    }
}

function mark_blacks_on_formlist() {
    $(".content table").find("tr").each(function (index, e) {
        ele = $(e);
        quest = $(ele.find("td a")[3]);
        questuser = quest.text();
        if(is_black_user(questuser)){
            ele.css("text-decoration", "line-through");
            mark = ele.find('strong');
            mark.attr("class", "red");
            mark.html("X");
            quest.css("color", "red");
        }
    })
}

function mark_blacks_on_topic() {
    $(".detailed").find('table').each(function (i, e) {
        ele = $(e);
        replayer = ele.find('.username a');
        replayname = replayer.text();
        if(is_black_user(replayname)) {
            replayer.css("color", "red");
            ele.find(".nickname").css("color", "red");
            ele.find('.data').css("background", "#c00000");
            ele.find('.post_body').css("background", "#c05050");
            ele.find('.user_info').css("background", "#c09090");
        }
        else {
            ele.find('.user_info').append('<dd><button style="color:red;" id="btn_addblack_' + global_id + '" value="' + replayname + '">加入黑名单</button></dd>');
            $("#btn_addblack_" + global_id).click(function(){ add_to_black($(this).val()); });
            global_id++;
        }
    })
}

function hide_ad_on_topic() {
    $(".detailed").find('table').each(function (i, e) {
        ele = $(e);
        replayer = ele.find('.username a');
        replayname = replayer.text();
        if(replayname == "CSDN官网" ||
           replayname == "CSDN官方推荐" ||
           replayname == "CSDN推荐") {
            ele.hide();
        }
    });
    
    $("iframe").hide();
    $("[data-mod=popu_592]").hide();
    $("#bd_ad_2").hide();
}

function hide_ads() {
    
    if(location.href.indexOf('topics') != -1) {
        hide_ad_on_topic();
    }
    
}

chrome.extension.sendRequest({command: "getBlackList"}, function(response) {
    global_black_list = response.data;

    if(location.href.indexOf('forums') != -1
        || location.href.indexOf('user/replied_topics') != -1
        || location.href.indexOf('user/pointed_topics') != -1) {
        mark_blacks_on_formlist();
    }
    else if(location.href.indexOf('topics') != -1) {
        mark_blacks_on_topic();
    }
});

hide_ads();



