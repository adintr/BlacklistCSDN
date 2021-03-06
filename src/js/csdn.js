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
        var ele = $(e);
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
    $(".mod_topic_wrap.post").each(function (i, e) {
        var ele = $(e);
        replayer = ele.find('.nick_name a');
        replayname = replayer.text();
        if(is_black_user(replayname)) {
            replayer.css("color", "red");
            ele.find(".nickname").css("color", "red");
            ele.find('.data').css("background", "#c00000");
            ele.find('.post_body').css("background", "#c05050");
            ele.find('.topic_owner').css("background", "#c09090");
            ele.find('.topic_l').css("background", "#c09090");
        }
        else {
            ele.find('.user_nick_name').append('<dd><button style="color:red;" id="btn_addblack_' + global_id + '" value="' + replayname + '">加入黑名单</button></dd>');
            $("#btn_addblack_" + global_id).click(function(){ add_to_black($(this).val()); });
            global_id++;
        }
    })
}

var addCssRule = function() {
    // 创建一个 style， 返回其 stylesheet 对象
    function createStyleSheet() {
        var style = document.createElement('style');
        style.type = 'text/css';
        document.head.appendChild(style);
        return style.sheet;
    }
  
    // 创建 stylesheet 对象
    var sheet = createStyleSheet();
  
    // 返回接口函数
    return function(selector, rules, index) {
        index = index || 0;
        sheet.insertRule(selector + "{" + rules + "}", index);
    }
}();

function hide_ad_on_topic() {
    $(".detailed").find('table').each(function (i, e) {
        var ele = $(e);
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
    $(".bigimg-wrapper").hide();
    $(".mediav_ad").hide();
    $(".post_feed_box").hide();
    $("#ad_pop").hide();
    $(".meau-gotop-box").hide();
    $("#ad_pop_left").hide();

    $(".post_recommend").hide();

	addCssRule(".mediav_ad", "display: none;");
	addCssRule("#ad_pop_left", "display: none;");
}

function hide_ads() {
    
    if(location.href.indexOf('topics') != -1) {
        hide_ad_on_topic();
    }
    
}

function modify_style() {

    if(location.href.indexOf('topics') == -1) {
        $(".bbs_detail_wrap").css("width", "100%");
        $(".forums_title").css("font-weight", "100");
        $(".forums_comm_t").hide();
        $(".forums_com_b_r").hide();
        $(".forums_tab").hide();
        addCssRule(".forums_table_c .forums_tab_table tr th", "background: #069;")
    } else {
        $(".post_body").css("font-weight","100");
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
modify_style();



