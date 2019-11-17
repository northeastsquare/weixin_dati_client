var WxParse = require("../../../wxParse/wxParse.js"), app = getApp();

Page({
    data: {},
    onLoad: function(a) {
        var n = app.globalData.appname;
        wx.setNavigationBarTitle({
            title: n.title
        });
        var t = a.id, e = this;
        app.util.request({
            url: "entry/wxapp/wenzhang",
            method: "POST",
            data: {
                id: t
            },
            success: function(a) {
                var n = a.data.data.content;
                WxParse.wxParse("article", "html", n, e, 5);
            },
            fail: function(a) {
                console.log("失败");
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});