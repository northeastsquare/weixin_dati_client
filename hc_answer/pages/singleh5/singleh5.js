var app = getApp();

Page({
    data: {},
    onLoad: function(o) {
        var n = app.globalData.appname;
        "" != n.fontcolor && "" !== n.maincolor && wx.setNavigationBarColor({
            frontColor: n.fontcolor,
            backgroundColor: n.maincolor
        }), this.setData({
            url: o.url
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