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
    $("#syncurl").val(localStorage["syncurl"]);

    $("a").click(function () {
        if(bg.deleteBloackUser($(this).attr("value"))) {
            location.reload();
        }
    });

    $("#syncurl").bind('input propertychange', function() {
        localStorage["syncurl"] = $("#syncurl").val();
    });

    $("#getfromWeb").click(function() {
        $.ajax({
            type: "GET",
            url: "http://www.adintr.com/config/csdnblack_" + $("#syncurl").val(),
            dataType: "json",
            success: function(json) {
                bg.global_black_list = json;
                bg.saveBlackList();
                location.reload();
            },
            error: function(req, textStatus) {
                alert(textStatus);
            }
        });
    });

    $("#sendtoweb").click(function () {
        $.ajax({
            type: "GET",
            url: "http://www.adintr.com/config/csdnblack_" + $("#syncurl").val() + "/" + $.toJSON(bg.global_black_list),
            dataType: "text",
            success: function(json) {
                alert("上传成功");
            },
            error: function(req, textStatus) {
                alert(textStatus);
            }
        });
    })
});

