/**
 * @author YANXUEFENG
 */

require.config({
    shim:{
        'zepto': {
            exports: 'Zepto'
        },
        'baiduTemplate': {
            exports: 'baidu.template'
        }
    }
});
require(['zepto', 'screen', 'score', 'i18n!nls/data', 'baiduTemplate'], function ($, Screen, Score, data, bt) {

    function initData() {
        var html;
        
        document.title = data.title;
        
        html = bt('t:header', {data: data.header});
        $('#header').html(html);
        
        html = bt('t:score', {data: data.score});
        $('#score').html(html);
        
        html = bt('t:menu', {data: data.menu});
        $('#menu').html(html);
        
        html = bt('t:download', {data: data.download});
        $('#download').html(html);
        
        html = bt('t:restart-game-pop', {data: data.restartGamePop});
        $('#restart-game-pop').html(html);
        
        html = bt('t:restart-level-pop', {data: data.restartLevelPop});
        $('#restart-level-pop').html(html);
        
        html = bt('t:success-pop', {data: data.successPop});
        $('#success-pop').html(html);
        
        html = bt('t:hightLevel-pop', {data: data.hightLevelPop});
        $('#hightLevel-pop').html(html);
        
        html = bt('t:share-pop', {data: data.sharePop});
        $('#share-pop').html(html);
        
        html = bt('t:intro-pop', {data: data.introPop});
        $('#intro-pop').html(html);
        
        html = bt('t:comment', {data: data.comment});
        $('#comment').html(html);
        
        $('body').append(document.getElementById('t:' + data.comment).innerHTML);
    }
    initData();


	var	screen = new Screen;
	var	score = new Score;
    var $pops = $('.js-pop');
    var click = document.hasOwnProperty("ontouchstart") ? 'tap' : 'click';

    function updateShare(level, click) {
        var
            url = encodeURIComponent('http://yanhaijing.com/inverter'),
            weiboTitle = encodeURIComponent('变色方块 史上最难智力游戏，我逆天用了' + click + '次点击，通过了第' + (level - 1) + '关，你，你，你快快来挑战我吧@颜海镜 '),
            pic = encodeURIComponent('http://yanhaijing.com/inverter/media/5.png'),
            desc = encodeURIComponent('变色方块 史上最难智力游戏，我逆天用了' + click + '次点击，通过了第' + (level - 1) + '关，你，你，你快快来挑战我吧'),
            summary = encodeURIComponent('变色方块 史上最难智力游戏'),
            qqTitle = encodeURIComponent('变色方块 史上最难智力游戏'),
            weibo = 'http://service.weibo.com/share/share.php?url=' + url + '&title=' + weiboTitle + '&pic=' + pic,
            qq = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + url + '&desc=' + desc + '&title=' + qqTitle + '&summary=' + summary + '&pic=' + pic,
            duoshuo = 'http://yanhaijing.com/inverter ' + '变色方块 史上最难智力游戏，我逆天用了' + click + '次点击，通过了第' + (level - 1) + '关，你，你，你快快来挑战我吧@颜海镜 ',
            title = '变色方块 史上最难智力游戏，我逆天用了' + click + '次点击，通过了第' + (level - 1) + '关，你，你，你快快来挑战我吧';

        $('#share-weibo').attr('href', weibo);
        $('#share-qq').attr('href', qq);
        $('.ds-thread textarea').val(duoshuo);
        document.title = title;
    }


    $(function () {
    	var level = score.getLevel();
    	screen.create(level);
    });

    $(document).on('screen/success', function () {
        var level;
        $('#success-pop').show();
    	level = score.addLevel();
        $('#success-pop-level').html(level);
        screen.create(level);
        window.setTimeout(function () {
            $('#success-pop').hide();
        }, 2000);
    }).on('screen/click', function () {
    	score.addClick();
    }).on('score/hightLevel', function (e, level, click) {
        $('#success-pop').hide();
        $('#hightLevel-pop').show();
        updateShare(level, click);
    });

    $pops.on(click, function (e) {
        $(this).hide();
        e.preventDefault();
    });
    $('#restart-game').on(click, function (e) {
        score.reset();
        screen.create(1);
        e.preventDefault();
    });
    $('#pop-restart-game').on(click, function (e) {
        $('#restart-game-pop').show();
        e.preventDefault();
    });

    $('#restart-level').on(click, function (e) {
        screen.create(score.resetLevel());
        e.preventDefault();
    });
    $('#pop-restart-level').on(click, function (e) {
        $('#restart-level-pop').show();
        e.preventDefault();
    });

    $('#pop-intro').on(click, function (e) {
        $('#intro-pop').show();
        e.preventDefault();
    });
    $('.js-share-btn').on(click, function (e) {
        e.stopPropagation();
    });
    $('#share').on(click, function (e) {
        $('#share-pop').show();
        e.preventDefault();
    });
    $('#hight-share').on(click, function (e) {
        $('#share-pop').show();
        e.preventDefault();
        e.stopPropagation();
    });
    $('#share-weixin').on(click, function (e) {
        $('#share-pop').hide();
        $('#hightLevel-pop').hide();
        $('#weixin-shade').show();
        e.preventDefault();
        e.stopPropagation();
    });
    $('#weixin-shade').on(click, function (e) {
        $('#weixin-shade').hide();
        e.preventDefault();
    });
});
