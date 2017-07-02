function is_black_user(username) {
    return username == "zjl13595325243" || username == "ipqtjmqj";
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
    })
}

if(location.href.indexOf('forums') != -1)
{
    mark_blacks_on_formlist();
}
else if(location.href.indexOf('topics') != -1)
{
    mark_blacks_on_topic();
}
