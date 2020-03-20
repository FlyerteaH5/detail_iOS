//夜间模式
function tabNight() {
    $('body').removeClass('body_sun');
    $('body').addClass('body-bgc');
    //标题
    $('.comment-header').removeClass('content-sun');
    $('.comment-header').addClass('content-bgc');
    $('.comment-header h4').addClass('content-font');

    //帖子内容
    $('.comment-detail-main').removeClass('content-sun');
    $('.comment-detail-main').addClass('content-bgc');

    //帖子作者
    $('.author-name h4').addClass('content-font');
    $('.author-name p').addClass('content-font-sm');
    //帖子正文
    $('.comment-content-special').addClass('content-font');

    //评论
    $('.comment-reply').removeClass('content-sun');
    $('.comment-reply').addClass('content-bgc');


    $('.comment-reply .comment-item .comment-content .reply-message').not('.btn_flower').addClass('content-font');
    $('.comment-reply .reply-header .reply_header_bottom').addClass('content-font');
    $('.comment-reply .comment-content .reply-phrase-bg').addClass('reply-phrase-bg-night');
    $('.comment-reply .comment-content .reply-phrase-bg').addClass('content-font');

    $('.comment-reply .comment-content .reply-phrase').addClass('content-font');
    $('.reply-phrase .reply-author').addClass('content-font');
    $('.reply-text').addClass('content-font');
    $('.userInfo .user_msg .user_name').addClass('content-font');
    //投票区域
    $('.voteBox').addClass('body-bgc');
    //超链接
    $('a').each(function (idx, item) {
        if (/http/g.test($(item).prop('href'))) {
            $(item).css('color', '#519AFB')
        }
    });

    $('.link-txt').addClass('content-font');

    $('.lz_change').addClass('content-font').css('border-color', '#DBE0E8');


    $('.comment-reply .reply-header').addClass('content-font');



    $('#topic-line').removeClass('comment-line-sun');
    $('#topic-line').addClass('comment-line-night');

    $('.more_title').addClass('more-title-night');
    $('.topic_bg').addClass('topic_bg_night');
    $('#best_answer_id').addClass('content-bgc-fore');

    $('.userInfo .userBox').css('border-color', '#292D34');
    $('.title').css('border-color', '#292D34');
    $('.comment-reply .comment-item .comment-author .author-name h4 span').css({
        color: '#DBE0E8',
        border: '1px solid #DBE0E8'
    });
    $('.tag-item-value').css({
        color: '#DBE0E8',
        border: '1px solid #292D34'
    });



    //超链接
    $('.link-card').css('background-color', '#40454F');
    $('.link-img').each(function (idx, item) {
        if (!/http/g.test($(item).prop('src'))) {
            $(item).prop('src', 'link_card_night.png'); //夜间图片
        }
    });


    // 模板页新加元素
    $('.content').addClass('content-bgc');
    $('.content').addClass('content-font');

    $('.video').each(function () {
        $(this).addClass('night-mask')
    })

    $('.attent_btn.attent').css({
        color: '#959FA9',
        borderColor: '#959FA9'
    })
    $('.attent_btn.unattent').css({
        background: '#959FA9',
        color: '#DBE0E8'
    })
    $('.attent_btn img').prop('src', 'icon-add-gray.png');


    $('.sendFLower').each(function (idx, item) {
        var img = $(item).find('img'),
            number = $(item).find('.flower_num'),
            isClick = /light/.test(img.prop('src'));

        if (isClick) return;
        img.prop('src', 'flower-night.png');
        number.css('color', '#959FA9');
    })


    $('.article-img').addClass('night-mask')
}
//白天模式
function tabLight() {
    $('body').removeClass('body-bgc');
    $('body').addClass('body_sun');

    //标题
    $('.comment-header').removeClass('content-bgc');
    $('.comment-header').addClass('content-sun');
    $('.comment-header h4').removeClass('content-font');

    //帖子内容
    $('.comment-detail-main').removeClass('content-bgc');
    $('.comment-detail-main').addClass('content-sun');

    //帖子作者
    $('.author-name h4').removeClass('content-font');
    $('.author-name p').removeClass('content-font-sm');
    //帖子正文
    $('.comment-content-special').removeClass('content-font');


    //评论
    $('.comment-reply').removeClass('content-bgc');
    $('.comment-reply').addClass('content-sun');


    $('.comment-reply .comment-item .comment-content .reply-message').not('.btn_flower').removeClass('content-font');
    $('.comment-reply .reply-header .reply_header_bottom').removeClass('content-font');
    $('.comment-reply .comment-content .reply-phrase-bg').removeClass('reply-phrase-bg-night').css('background', '#F4F5F7');

    $('.comment-reply .comment-content .reply-phrase-bg').removeClass('content-font');

    $('.comment-reply .comment-content .reply-phrase').removeClass('content-font');
    $('.reply-phrase .reply-author').removeClass('content-font');
    $('.reply-text').removeClass('content-font');
    $('.userInfo .user_msg .user_name').removeClass('content-font');

    //投票区域
    $('.voteBox').removeClass('body-bgc');
    //超链接
    $('a').each(function (idx, item) {
        if (/http/g.test($(item).prop('href'))) {
            $(item).css('color', '')
        }
    });

    $('.link-txt').removeClass('content-font');

    $('.lz_change').removeClass('content-font').css('border-color', '#051039');

    $('.comment-reply .reply-header').removeClass('content-font');

    $('#topic-line').removeClass('content-font comment-line-night');
    $('#topic-line').addClass('comment-line-sun');

    $('.more_title').removeClass('more-title-night');


    $('.topic_bg').removeClass('topic_bg_night');


    $('#best_answer_id').removeClass('content-bgc-fore');


    $('.userInfo .userBox').css('border-color', '#ECECEC');
    $('.title').css('border-color', '#ECECEC');
    $('.comment-reply .comment-item .comment-author .author-name h4 span').css({
        color: '#0062E6',
        border: '0.03125rem solid #0062E6'
    });
    $('.tag-item-value').css({
        color: '#3492F0',
        border: '1px solid #3492F0'
    });

    $('.link-card').css('background-color', '#E7F3FF');

    $('.link-img').each(function (idx, item) {
        if (!/http/g.test($(item).prop('src'))) {
            $(item).prop('src', 'link_card.png'); //默认图片
        }
    });

    // 模板页新加元素
    $('.content').removeClass('content-bgc');
    $('.content').removeClass('content-font');

    $('.video').each(function () {
        $(this).removeClass('night-mask')
    })

    $('.attent_btn.attent').css({
        color: '#0062E6',
        borderColor: '#0062E6'
    })
    $('.attent_btn.unattent').css({
        background: '#F4F5F6',
        color: '#959FA9'
    })
    $('.attent_btn img').prop('src', 'icon-add.png');

    $('.sendFLower').each(function (idx, item) {
        var img = $(item).find('img'),
            number = $(item).find('.flower_num'),
            isClick = /light/.test(img.prop('src'));

        if (isClick) {
            number.css('color', '#FF7800');
        } else {
            number.css('color', '#959FA9');
            img.prop('src', 'flower.png');
        }
    })


    $('.article-img').removeClass('night-mask')
}
