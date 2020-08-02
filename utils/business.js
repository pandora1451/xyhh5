//用户-微信授权
app.loadWechat= (function () {
    return function (code,type,id,orgId) {
        var param = {
            weixin_code:code
        }

        var succCallBack = function (data, status, response) {
            if(data.code==200){
                app.storage.set('userData',data.data);
                app.storage.set('key',data.data.token);
                if(type=='qhb'){
                    var imgUrl=data.data.wechatUrl!='/0'?data.data.wechatUrl:'img/w3.png';
                    $('.menus .user-pic').attr('src',imgUrl);
                    var shareUrl=window.location.href;
                    app.loadShare(shareUrl,'qhb-list');
                    var PageSize=10;
                    var current=0;
                    // dropload
                    $('.act-wrap').dropload({
                        scrollArea : window,
                        domDown : {
                            domClass: 'dropload-down',
                            // 滑动到底部显示内容
                            domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
                            // 内容加载过程中显示内容
                            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                            // 没有更多内容-显示提示
                            domNoData  : '<div class="dropload-noData">已经到底部了</div>'
                        },
                        loadDownFn : function(me){
                            current++;
                            app.loadRed(PageSize,current,data.data.token,me);
                        }
                    });
                }else if(type=='qhb_details'){
                    var imgUrl=data.data.wechatUrl!='/0'?data.data.wechatUrl:'img/w3.png';
                    $('.menus .user-pic').attr('src',imgUrl);
                    //app.popup.openPopup('.popup-grade');
                    app.loadRedDetails(id,data.data.token,'reload');
                }else if(type=='myk'){
                    var imgUrl=data.data.wechatUrl!='/0'?data.data.wechatUrl:'img/w3.png';
                    $('.menus .user-pic').attr('src',imgUrl);
                    var shareUrl=window.location.href;
                    app.loadShare(shareUrl,'myk-list');

                    app.loadBanner(orgId);

                    var PageSize=10;
                    var current=0;
                    // dropload
                    $('.act-wrap').dropload({
                        scrollArea : window,
                        domDown : {
                            domClass: 'dropload-down',
                            // 滑动到底部显示内容
                            domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
                            // 内容加载过程中显示内容
                            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                            // 没有更多内容-显示提示
                            domNoData  : '<div class="dropload-noData">已经到底部了</div>'
                        },
                        loadDownFn : function(me){
                            current++;
                            app.loadMyk(PageSize,current,data.data.token,me);
                        }
                    });
                }else if(type=='myk_details'){
                    var imgUrl=data.data.wechatUrl!='/0'?data.data.wechatUrl:'img/w3.png';
                    $('.menus .user-pic').attr('src',imgUrl);
                    //app.popup.openPopup('.popup-grade');
                    app.loadMykDetails(id,data.data.token,'reload');
                }else if(type=='qlz'){
                    var imgUrl=data.data.wechatUrl!='/0'?data.data.wechatUrl:'img/w3.png';
                    $('.menus .user-pic').attr('src',imgUrl);
                    var token=data.data.token;
                    app.loadUserPriviInit(token);
                    var query = app.parseUrlQuery();
                    if(query['id']){
                        app.loadDragonBallstatus(query['id']);
                    }else{
                        app.loadWechatSubscribe(token,'qlz-launch');
                    }
                }else if(type=='user'){
                    var imgUrl=data.data.wechatUrl!='/0'?data.data.wechatUrl:'img/w3.png';
                    $('.thumb>img').attr('src',imgUrl);
                    $('.person>.nick>span').html(data.data.wechatName);
                }else{
                    var imgUrl=data.data.wechatUrl!='/0'?data.data.wechatUrl:'img/w3.png';
                    $('.thumb>img').attr('src',imgUrl);
                }
            }else{
                alert(data.message);
            }
        }

        return app.doAjax(root.interFace.getWechatCode, 'post', app.toMyJson(param), succCallBack)
    }
})();