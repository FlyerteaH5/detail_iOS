$(function () {
  
  //间距
  deleteMorebr();
  clearImgMargin.atextNone();
  
  //字体 要在间距后面
  changeTextFont = new ChangeFontSize();
  var baseSize = parseFloat($('.comment-detail .comment-detail-main .comment-content-special').css('fontSize'));
  if (detailTextSize != baseSize) {
      changeTextFont.change(detailTextSize);
  }
  
  //夜间
  nightModeChange(nightMode);
  
  //获取用户 距离
  getAuthorToTopForClass();
  
  //获取正文广告位置
  getThreadAdFrame();
  //获取评论底部广告位置
  getCommentBottomAdFrame();
  
  //内容高度变化
  $("body").bind('resize',function(){
      getThreadAdFrame();
      getCommentBottomAdFrame();
  });
  
  bindClickEvent();
  
});


function bindClickEvent() {
    
    bindDetailClickEvent();
    bindCommentClickEvent();
}

function unbindClickEvent() {
    unbindDetailClickEvent();
    unbindCommentClickEvent();
}

function getAuthorToTopForClass() {
    var margin = $(".comment-author").offset().top;
    triggerAction('authorMaginToTop', margin);
}

function getThreadAdFrame() {
    var left = $("#content-detailadv").offset().left;
    var top = $("#content-detailadv").offset().top;
    var width = $("#content-detailadv").width();
    var height = $("#content-detailadv").height();
    triggerAction('threadAdFrame', left + "_" + top + "_" + width + "_" + height);
}

function changeReplyCount(count) {
    var node = document.getElementById("reply_number");
    if (node) {
        node.innerHTML = count;
    }
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
            el_g.find('.reply-message').html(goodStr);
        }
    }

    if (normalid) {
        var el_n = $('#commnet-list .comment-item#' + normalid);
        if (el_n.length > 0) {
            el_n.find('.reply-message').html(normalStr);
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


function changeSort(sort) {

    var ascNode = document.getElementById("reply_asc");
    var descNode = document.getElementById("reply_desc");

    if (sort == "desc") {
        ascNode.style.color = "#959FA9"
        descNode.style.color = "#0062E6"
    } else if (sort == "asc") {
        descNode.style.color = "#959FA9"
        ascNode.style.color = "#0062E6"
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

function hideBestAnswerPrompt(flag) {
    var node = document.getElementById("best_answer_id");
    if (flag == 1) {
        node.style.display = "none";
    } else {
        node.style.display = "block";
    }

}

function hideGoodBestAnswerPrompt(flag) {
    var node = document.getElementById("good-best_answer_id");
    if (flag == 1) {
        node.style.display = "none";
    } else {
        node.style.display = "block";
    }

}


function removeReply(id) {
    var node = document.getElementById(id);
    if (node) {
        node.parentNode.removeChild(node);
    }
}

function debugLog(msg) {
    triggerAction('debug_html_iOS', msg);
}


var clearImgMargin = {
  //隐藏全部无内容atext
  atextNone: function () {
    var atext = $('.atext');
    atext.each(function (idx, item) {
      var item_ = $(item);
      var text = item_.text().replace(/\r|\n|\\s|\s/g, '');
      if (!text.length) {
        item_.addClass('hidden');
      }
    })
    this.syncOldPost();
  },
  //同步新老发帖格式,图片后面必须紧跟atext
  syncOldPost: function () {
    var contentImage = $('.contentImage');
    contentImage.each(function (idx, item) {
      var item_ = $(item);

      if (!/atext/.test(item_.next().prop('className'))) {
        item_.after('<div class="atext hidden"></div>')
      }
    });
    this.clearMargin();
  },
  //消除图片之间的错误margin
  clearMargin: function () {
    var atextHidden = $('.atext.hidden');
    atextHidden.each(function (idx, item) {
      var nextEl = $(item)[0].nextSibling; //获取后面的文本节点
      var nextNode = $(item).next(); //获取后面的dom节点
      if (!nextEl || nextEl.nodeType != 3) return;
      var val = nextEl.nodeValue.replace(/\r|\n|\\s|\s/g, '')
      if (!val.length || nextNode.prop('className') != 'contentImage') return;
      nextNode.css('marginTop', '1.125rem');
    });
    setTimeout(function () {
      this.delBetweenPicBr();
    }.bind(this), 800);
  },
  //获取两个相邻图片坐标
  getImgIndex: function () {
    var allNode = $('.post-content').contents();
    var section = {
      startImg: '',
      endImg: ''
    };
    var res = [];
    for (var i = 0; i < allNode.length; i++) {
      if (allNode.eq(i).prop('className') != 'contentImage') continue;
      if (section.startImg) {
        section.endImg = i;
        res.push(section);
        section = {};
        section.startImg = i;
      } else {
        section.startImg = i;
      }
    }
    return res;
  },
  //删除图片之间的无用换行
  delBetweenPicBr: function () {
    var allNode = $('.post-content').contents();
    var index = this.getImgIndex();
    //判断是否能删除,添加flag
    for (var i = 0; i < index.length; i++) {
      var isDel = '';
      for (var j = index[i].startImg + 1; j < index[i].endImg; j++) {
        isDel += allNode[j].nodeValue;
      }
      if (!isDel.replace(/\r|\n|\\s|\s/g, '').replace(/null/g, '')) {
        index[i].del = true;
      }

    }
    //删除无用换行
    for (var i = 0; i < index.length; i++) {
      for (var j = index[i].startImg + 1; j < index[i].endImg; j++) {
        if (!index[i].del) continue;
        if (allNode[j].nodeType == 1 && allNode[j].className == 'nl2p') {
          $(allNode[j]).remove();
        }
      }
    }
  }
}

//修改封面图
$(".change-cover").click(function () {
    triggerAction('clickOnChangeCover', "");
})
//封面图回调
function changeCover(imgPath) {
    $('.article-img').css('background-image', 'url(' + imgPath + ')');
}

//小编注
$(".tip-box").click(function () {
    triggerAction('clickOnXiaobianzhu', "");
})

//文中提及内容
$('.mention-ls .mention-item').on('click',function(){
  triggerAction('clickOnThreadRefer', $(this).index());
})

//相关推荐
$(".panel").click(function () {
    var id = $(this).attr('id');
    triggerAction('clickOnRecommand', id);
});

//加关注
$(".attent").click(function () {
    if ($(this).attr('id') == 'user_atten_info') {
        triggerAction('clickOnAttention', "bottom");
    } else {
        triggerAction('clickOnAttention', "top");
    }

});

//取消关注
$(".unattent").click(function () {
    triggerAction('clickOnUnAttention', "");
});
//打赏
$(".userInfo .reward_btn a.btn_reward").click(function () {
    triggerAction('clickOnReward', "");
});
//评分
$(".userInfo .reward_btn a.btn_share").click(function () {
    triggerAction('clickOnShare', "");
});
//送花
$(".userInfo .reward_btn a.btn_flower").click(function () {
    triggerAction('sendFlower', '-1');
});
//打赏数点击事件
$(".reward .reward_num").click(function () {
    triggerAction('clickOnRewardDetail', "");
})

//定位标签点击
$(".locate").click(function () {
    triggerAction('clickOnLocation', "");
})

$(".gpd-btn").click(function () {
    if(this.className.indexOf('get-coupon') != -1){
        triggerAction('clickOnGPGetCouponBtn', "");
    }else{
        triggerAction('clickOnGoodPriceBtn', "");
    }
})


//加关注按钮点击回调方法
function callbackAttent() {
    $(".attent").hide();
    $(".unattent").show();
}
//取消关注回调
function callbackUnattent() {
    $(".attent").show();
    $(".unattent").hide();
}

//打赏回调
function callbackReward(num) {
    $(".userInfo .reward_btn a.btn_reward").html(num);
}
//评分回调
function callbackShare(num) {
    $(".userInfo .reward_btn a.btn_share").html(num);
}
//送花回调
function callbackFlower(num) {
    $(".userInfo .reward_btn a.btn_flower").html(num);
}

//视频广告播放
function threadVideoadvPlay(flag) {
    var video = document.getElementById("videoadv-player");
    var videoImg = $(".videoadv-img");

    if (flag == 1) {
        videoImg.hide();
        video.play();
        addVideoTimeListener();
    } else {
        videoImg.show();
        video.pause();
        removeVideoTimeListener();
    }
}

function threadVideoadvSeekSecond(second) {
    var video = document.getElementById("videoadv-player");
    video.currentTime = second;
    $(".videoadv-img").hide();
    video.play();
    addVideoTimeListener();
}

function addVideoTimeListener() {
    removeVideoTimeListener();

    //监听播放时间
    var video = document.getElementById("videoadv-player");
    //使用事件监听方式捕捉事件
    video.addEventListener("timeupdate", updateVideoTime);
}

function removeVideoTimeListener() {
    //移除监听
    var video = document.getElementById("videoadv-player");
    video.removeEventListener("timeupdate", updateVideoTime);
}

function updateVideoTime() {
    var video = document.getElementById("videoadv-player");
    var video_time = document.getElementById("video_time");

    var timeDisplay;
    var allTime;
    //用秒数来显示当前播放进度
    timeDisplay = Math.floor(video.currentTime);
    allTime = Math.floor(video.duration);
    video_time.innerHTML = sToHms(allTime - timeDisplay);
}

function sToHms(s) {
    s = Math.floor(s); //如果输入的是浮点数，则舍弃小数位

    var h = Math.floor(s / 3600); //计算得出小时数
    if (h < 10) { //调整为两位数的格式
        h = '0' + h;
    }

    var m = Math.floor(s / 60 - h * 60); //计算得出分钟数
    if (m < 10) { //调整为两位数的格式
        m = '0' + m;
    }

    var s = s % 60; //计算得出剩下的秒数
    if (s < 10) { //调整为两位数的格式
        s = '0' + s;
    }

    return m + ':' + s; //最后连接成字符串并返回
}


//只看楼主
function changeLzStatus(flag) {
    if (flag == 1) {
        $("#reply_number").removeClass("current");
        $("#lz_change").addClass("current");
    } else {
        $("#reply_number").addClass("current");
        $("#lz_change").removeClass("current");
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

function ChangeFontSize() {
    this.scale = '';
    this.defaultFs = null;
}
ChangeFontSize.prototype = {
  change: function (size) {
    var defaultFs = this.defaultFs;
    //默认字体大小
    var baseSize = parseFloat($('.comment-detail .comment-detail-main .comment-content-special').css('fontSize'));
    if (size < 12) return;
    this.scale = size / baseSize;

    var res = this.get();

    this.set();
    if (defaultFs) return;
    this.defaultFs = res;
  },
  get: function () {
    var size = this.size;
    var defaultFs = this.defaultFs;
    var scale = this.scale;

    var dataArr = [];
    $('.comment-content-special *').each(function (idx, item) {
      var el = $(item),
        fs = parseFloat(el.css('fontSize')),
        fontSize;
        console.log(idx)
      dataArr.push({
        el: el[0],
        fs
      });
      defaultFs ? fontSize = defaultFs[idx].fs * scale + 'px' : fontSize = fs * scale + 'px'
      el.data('font-size', fontSize);
    });
    return dataArr;
  },
  set: function () {
    $('.comment-content-special *').each(function (idx, item) {
      var el = $(item),
        fontSize = $(item).data('font-size');
      el.css({
        fontSize
      });
    });
  }
}

function webDidFinishLoad() {

    $("img.contentImage").lazyload({
        effect: "fadeIn"
    });
    $("img.commentImage").lazyload({
        effect: "fadeIn"
    });
}


//阿拉伯数字转换为简写汉字
function Arabia_To_SimplifiedChinese(Num) {
    for (i = Num.length - 1; i >= 0; i--) {
        Num = Num.replace(",", "") //替换Num中的“,”
        Num = Num.replace(" ", "") //替换Num中的空格
    }
    if (isNaN(Num)) { //验证输入的字符是否为数字
        //alert("请检查小写金额是否正确");
        return;
    }
    //字符处理完毕后开始转换，采用前后两部分分别转换
    part = String(Num).split(".");
    newchar = "";
    //小数点前进行转化
    for (i = part[0].length - 1; i >= 0; i--) {
        if (part[0].length > 10) {
            //alert("位数过大，无法计算");
            return "";
        } //若数量超过拾亿单位，提示
        tmpnewchar = ""
        perchar = part[0].charAt(i);
        switch (perchar) {
            case "0":
                tmpnewchar = "零" + tmpnewchar;
                break;
            case "1":
                tmpnewchar = "一" + tmpnewchar;
                break;
            case "2":
                tmpnewchar = "二" + tmpnewchar;
                break;
            case "3":
                tmpnewchar = "三" + tmpnewchar;
                break;
            case "4":
                tmpnewchar = "四" + tmpnewchar;
                break;
            case "5":
                tmpnewchar = "五" + tmpnewchar;
                break;
            case "6":
                tmpnewchar = "六" + tmpnewchar;
                break;
            case "7":
                tmpnewchar = "七" + tmpnewchar;
                break;
            case "8":
                tmpnewchar = "八" + tmpnewchar;
                break;
            case "9":
                tmpnewchar = "九" + tmpnewchar;
                break;
        }
        switch (part[0].length - i - 1) {
            case 0:
                tmpnewchar = tmpnewchar;
                break;
            case 1:
                if (perchar != 0) tmpnewchar = tmpnewchar + "十";
                break;
            case 2:
                if (perchar != 0) tmpnewchar = tmpnewchar + "百";
                break;
            case 3:
                if (perchar != 0) tmpnewchar = tmpnewchar + "千";
                break;
            case 4:
                tmpnewchar = tmpnewchar + "万";
                break;
            case 5:
                if (perchar != 0) tmpnewchar = tmpnewchar + "十";
                break;
            case 6:
                if (perchar != 0) tmpnewchar = tmpnewchar + "百";
                break;
            case 7:
                if (perchar != 0) tmpnewchar = tmpnewchar + "千";
                break;
            case 8:
                tmpnewchar = tmpnewchar + "亿";
                break;
            case 9:
                tmpnewchar = tmpnewchar + "十";
                break;
        }
        newchar = tmpnewchar + newchar;
    }
    //替换所有无用汉字，直到没有此类无用的数字为止
    while (newchar.search("零零") != -1 || newchar.search("零亿") != -1 || newchar.search("亿万") != -1 || newchar.search("零万") != -1) {
        newchar = newchar.replace("零亿", "亿");
        newchar = newchar.replace("亿万", "亿");
        newchar = newchar.replace("零万", "万");
        newchar = newchar.replace("零零", "零");
    }
    //替换以“一十”开头的，为“十”
    if (newchar.indexOf("一十") == 0) {
        newchar = newchar.substr(1);
    }
    //替换以“零”结尾的，为“”
    if (newchar.lastIndexOf("零") == newchar.length - 1) {
        newchar = newchar.substr(0, newchar.length - 1);
    }
    return newchar;
}
