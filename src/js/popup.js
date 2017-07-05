var bg = chrome.extension.getBackgroundPage();

$(document).ready(function () {
    var listhtml = "";
    $(bg.global_black_list).each(function(i, name) {
        listhtml += "<li>";
        listhtml += name;
        listhtml += "<a style='margin-left: 50px;' href='#' value='" + name +"'>删除</a>"
        listhtml += "</li>";
    });

    $("#blacklist").html(listhtml);
    $("a").click(function () {
        if(bg.deleteBloackUser($(this).attr("value"))) {
            location.reload();
        }
    });
});

