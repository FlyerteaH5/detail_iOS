$(function () {
    bindClickEvent();

    //夜间模式
    nightModeChange(nightMode);
    deleteMorebr();

  //获取评论底部广告位置
  getCommentBottomAdFrame();
  //内容高度变化
  $("body").bind('resize',function(){
      getCommentBottomAdFrame();
  });
});

function bindClickEvent() {
    bindCommentClickEvent();
}

function unbindClickEvent() {
    unbindCommentClickEvent();
}

//点击事件
//相关推荐
$(".panel").click(function () {
    var id = $(this).attr('id');
    triggerAction('clickOnRecommand', id);
});

function scrollToSpecifiedFloor(floor) {

    $(floor).addClass('sel');
    
    $('html, body').animate({
        scrollTop: $(floor).offset().top
    }, 500);
}

function appendComment(comment) {
    document.getElementById("commnet-list").style.display = "";
    $("#commnet-list").append(comment);
    unbindClickEvent();
    bindClickEvent();

    nightModeChange(nightMode);
    deleteMorebr();

    $("img.commentImage").lazyload({
        effect: "fadeIn"
    });
}

function appendGoodComment(comment) {
    document.getElementById("good-commnet-list").style.display = "";
    $("#good-commnet-list").append(comment);
    unbindClickEvent();
    bindClickEvent();

    nightModeChange(nightMode);

    $("img.commentImage").lazyload({
        effect: "fadeIn"
    });
}

function reloadComment(comment, goodcomment) {
    if (comment.length > 0) {
        document.getElementById('commnet-list').style.display = '';
        $('#commnet-list').css('height', $('#commnet-list').height() + 'px');
        $('#commnet-list .comment-item').remove();
        $('#commnet-list').append(comment);
        $('#commnet-list').css('height', 'auto');
    } else {
        document.getElementById('commnet-list').style.display = 'none';
        $('#commnet-list .comment-item').remove();
    }
    if (goodcomment.length > 0) {
        document.getElementById('good-commnet-list').style.display = '';
        $('#good-commnet-list').css('height', $('#good-commnet-list').height() + 'px');
        $('#good-commnet-list .comment-item').remove();
        $('#good-commnet-list').append(goodcomment);
        $('#good-commnet-list').css('height', 'auto');
    } else {
        document.getElementById('good-commnet-list').style.display = 'none';
        $('#good-commnet-list .comment-item').remove();
    }

    if (comment.length > 0 || goodcomment.length > 0) {
        unbindClickEvent();
        bindClickEvent();
        nightModeChange(nightMode);
        $("img.commentImage").lazyload({
            effect: "fadeIn"
        });
    }
}

function refreshEditComment(goodid, goodStr, normalid, normalStr) {

    if (goodid) {
        var el_g = $('#good-commnet-list .comment-item#' + goodid);
        if (el_g.length > 0) {
            el_g.find('.reply-message').html(normalStr);
        }
    }

    if (normalid) {
        var el_n = $('#commnet-list .comment-item#' + normalid);
        if (el_n.length > 0) {
            el_n.find('.reply-message').html(goodStr);
        }
    }

    if (goodStr.length > 0 || normalStr.length > 0) {
        unbindClickEvent();
        bindClickEvent();
        nightModeChange(nightMode);
        $("img.commentImage").lazyload({
            effect: "fadeIn"
        });
    }

}

function changeBestAnswer(type, del, index) {
    var node = document.getElementById("showBest" + index);
    var array = ["bestAnswer.png", "brilliantAnswer.png"]
    if (del == 0) {
        node.src = array[type];
        node.style.display = "block";
    } else {
        node.style.display = "none";
    }
}


function removeReply(id) {
    var node = document.getElementById(id);
    if (node) {
        node.parentNode.removeChild(node);
    }
}

//夜间模式
function nightModeChange(night) {
    nightMode = night;
    if (nightMode == '1') {
        tabNight();
    } else {
        tabLight();
    }
}

function webDidFinishLoad() {

    $("img.commentImage").lazyload({
        effect: "fadeIn"
    });
}


