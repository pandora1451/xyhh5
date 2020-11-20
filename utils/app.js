import {
    root
} from "./const";
import {BASE_URL} from "./const"
import router from '../src/router';
import jquery from "jquery"
const $ = jquery
const app = {}
app.toMyJson = function (param) {
    return {
        data: JSON.stringify(param)
    }
};
app.doAjax = function (interFace, type, param, succCallBack) {
    console.log('接口:' + interFace);
    console.log('类型:' + type);
    console.log('输入:' + JSON.stringify(param));
    console.log('函数:' + succCallBack);
    $.ajax({
        url: interFace,
        dataType: 'jsonp',
        type: type,
        data: param,
        //timeout: root.timeout,
        beforeSend: function (request) {
            // app.loader.show();
        },
        success: function (data, status, response) {
            succCallBack(data, status, response);
        },
        complete: function () {
            // app.loader.hide();
        },
        error: function (xhr, type, errorThrown) {
            console.log(xhr, type, errorThrown);
            console.log('通讯错误，请重试。');
            alert('网络忙，请稍后再试');
        }
    });

}
/*
 * 获取url参数
 * */
app.parseUrlQuery = function (url) {
    var query = {};
    var urlToParse = url || window.location.href;
    var i;
    var params;
    var param;
    var length;
    if (typeof urlToParse === 'string' && urlToParse.length) {
        urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
        params = urlToParse.split('&').filter(function (paramsPart) {
            return paramsPart !== '';
        });
        length = params.length;

        for (i = 0; i < length; i += 1) {
            param = params[i].replace(/#\S+/g, '').split('=');
            query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
        }
    }
    return query;
}
/*
 *检查token
 * */
app.checkToken = function () {
    if (app.storage.get('key')) {
        console.log('有')
        return app.storage.get('key');
    } else {
        console.log('没有')
        return false;
    }
};

/*
 *    本地存储
 */
app.storage = {
    set: function (key, jsonObj) {
        localStorage.setItem(key, JSON.stringify(jsonObj));
    },
    get: function (key) {
        var strObj = localStorage.getItem(key);
        console.log('get', strObj)
        return JSON.parse(strObj);
    },
    remove: function (key) {
        localStorage.removeItem(key);
    },
    removeAll: function () {
        localStorage.clear();
    }
}
// app.storage.setParams = function (key, jsonObj) {
//     localStorage.setItem(key, JSON.stringify(jsonObj));
// }
// app.storage.get = function () {
//     var strObj = localStorage.getItem(key);
//     console.log('get',strObj)
//     return JSON.parse(strObj);
// }
// app.storage.remove = function () {
//     localStorage.removeItem(key);
// }
// app.storage.removeAll = function () {
//     localStorage.clear();
// }
//用户-分享
app.loadShare = function (url, type, obj1) {
    var user_data = {
        url: url
    }

    var succCallBack = function (data, status, response) {
        console.log(data);
        if (data.code == '200') {
            var local = window.location.href;
            var shareUrl = local.split('?')[0];
            if (app.checkToken()) {
                var userData = app.storage.get('userData');
                var imgUrl = userData.wechatUrl != '/0' ? userData.wechatUrl : HOST_URL + '/img/qlz1.png';
                if (app.storage.get('dragId')) {
                    var dragNum = 11081000 + parseInt(app.storage.get('dragId'));
                } else {
                    var dragNum = '';
                }
            } else {
                var imgUrl = HOST_URL + '/img/qlz1.png';
            }
            if (type == 'qhb') {
                var shareData = {
                    url: $(obj1).html(),
                    title: $('.share-name').html(),
                    desc: '金额：' + $('.share-name').data('price') + '元',
                    img: $('.share-img').html(),
                    img_title: '',
                    from: '传传'
                }
            } else if (type == 'qhb-suc') {
                var shareData = {
                    url: $(obj1).html(),
                    title: ' 亲，快来抢 ! 我已经抢到' + $('.share-name').data('red') + '元',
                    desc: '活动：' + $('.share-name').html() + '\x0a金额：' + $('.share-name').data('price'),
                    img: $('.share-img').html(),
                    img_title: '',
                    from: '传传'
                }
            } else if (type == 'qhb-list') {
                var shareData = {
                    url: url,
                    title: '红包多多 恭喜发财',
                    desc: '自己抢  朋友帮忙抢  大家一起抢！',
                    img: HOST_URL + '/img/qhb.png',
                    img_title: '',
                    from: '传传'
                }
            } else if (type == 'qlz') {
                var shareData = {
                    url: $(obj1).html(),
                    title: '好友送您了一注双色球',
                    desc: $('#share-msg').html(),
                    img: imgUrl,
                    img_title: '',
                    from: '传传'
                }
                //app.storage.set('qlzShare',shareData);
            } else if (type == 'qlz-suc') {
                //var shareData=app.storage.get('qlzShare');
            } else if (type == 'myk') {
                //@@@@@
                var shareData = {
                    url: $(obj1).html(),
                    title: $('.share-name').html(),
                    desc: $('.share-name').data('prize') + '\x0a金额：' + $('.share-name').data('price') + '元',
                    img: $('.share-img').html(),
                    img_title: '',
                    from: '传传'
                }
                app.storage.set('mykShare', shareData);
            } else if (type == 'myk-opened') {
                var shareData = {
                    url: $(obj1).html(),
                    title: '中奖啦！第' + $('.share-name').data('period') + '期:' + $('.share-name').html(),
                    desc: '奖品：' + $('.share-name').data('prize') + '\x0a金额：' + $('.share-name').data('price') + '元',
                    img: $('.share-img').html(),
                    img_title: '',
                    from: '传传'
                }
                //app.storage.set('mykShare',shareData);
            } else if (type == 'myk-suc') {
                var mykShare = app.storage.get('mykShare');
                var shareData = {
                    url: $('#share-url').html(),
                    title: '中奖啦！恭喜中奖',
                    desc: '奖品：' + $('.share-name').data('prize') + '\x0a金额：' + $('.share-name').data('price') + '元',
                    img: mykShare.img,
                    img_title: '',
                    from: '传传'
                }
            } else if (type == 'myk-list') {
                var mykListShareUrl = obj1 ? HOST_URL + '/myk.html?orgId=' + obj1 : HOST_URL + '/myk.html';
                var shareData = {
                    url: mykListShareUrl,
                    title: '无数奖品免费抽-这就是满员开',
                    desc: '分享越多 抽奖码越多 中奖概率越大！',
                    img: HOST_URL + '/img/myk_rule.png',
                    img_title: '',
                    from: '传传'
                }
            } else {
                var shareData = {
                    url: url,
                    title: '传传',
                    desc: '传传，千万好礼，等你来拿！',
                    img: shareUrl + 'img/icon.png',
                    img_title: '',
                    from: '传传'
                }
            }
            console.log(shareData);
            var data = data.data.data;
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.appid, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.noncestr, // 必填，生成签名的随机串
                signature: data.signature, // 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.error(function (res) {
                console.log(res);
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });
            wx.ready(function () {
                //微信朋友圈
                wx.onMenuShareTimeline({
                    title: shareData.title, // 分享标题
                    link: shareData.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: shareData.img, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                //微信
                wx.onMenuShareAppMessage({
                    title: shareData.title, // 分享标题
                    desc: shareData.desc, // 分享描述
                    link: shareData.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: shareData.img, // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        console.log('ok');
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        console.log('fail');
                        // 用户取消分享后执行的回调函数
                    }
                });
                //QQ
                wx.onMenuShareQQ({
                    title: shareData.title, // 分享标题
                    desc: shareData.desc, // 分享描述
                    link: shareData.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: shareData.img, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                //Qzone
                wx.onMenuShareQZone({
                    title: shareData.title, // 分享标题
                    desc: shareData.desc, // 分享描述
                    link: shareData.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: shareData.img, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                //微博
                wx.onMenuShareWeibo({
                    title: shareData.title, // 分享标题
                    desc: shareData.desc, // 分享描述
                    link: shareData.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: shareData.img, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
            });
        } else {
            //alert(data.message);
        }
    };

    return app.doAjax(root.interFace.getWechatSign, 'post', user_data, succCallBack);
}
//用户-微信授权
app.loadWechat = function (code, type, id, orgId) {
    console.log('loadWechat')
    var param = {
        weixin_code: code
    }

    var succCallBack = function (data, status, response) {
        if (data.code == 200) {
            console.log('调通',data)
            app.storage.set('userData', data.data);
            app.storage.set('token', data.data.token);
            if (type == 'qhb') {
                console.log('qhb')
            } else if (type == 'user') {
                // this.hasToken = true
                console.log('user')
                window.location.href = BASE_URL+'/Regist';
            } else if (type == 'shop') {
               console.log('shop')
               window.location.href = BASE_URL+'/ShopLogin';
            }else{
							console.log('都不是')
						}
        } else {
            alert(data.message);
        }
    }
    return app.doAjax(root.interFace.getWechatCode, 'post', app.toMyJson(param), succCallBack)
};
//用户-获取消息状态
app.loadUserMsgStatus = function (token, type) {
    var user_data = {
        token: token
    }

    var succCallBack = function (data, status, response) {
        console.log(data);
        if (data.code == '200') {
            var msg = data.data.customer;
            if (msg.sysFlag == 1 || msg.userFlag == 1) {
                if (type == 'user') {
                    $('.user .wrap .info li .go-msg b').show();
                    $('.user .wrap .info li .go-msg').attr('href', 'msg.html?sys=' + msg.sysFlag + '&user=' + msg.userFlag);
                } else {
                    $('.menus .go-msg').show();
                    $('.menus .go-msg a').attr('href', 'msg.html?sys=' + msg.sysFlag + '&user=' + msg.userFlag);
                }
            }
        } else if (data.code == 1000) {
            if (type == 'user' || type == 'qlz') {
                app.storage.removeAll();
                alert('您的授权信息已过期，请重新授权~');
                var url = window.location.href;
                window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfe3a1c89699c3e36&redirect_uri=' + url + '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
            }
        } else {
            //alert(data.message);
        }
    };
    return app.doAjax(root.interFace.getUserFullInfo, 'post', app.toMyJson(user_data), succCallBack)
}
export {
    app
}