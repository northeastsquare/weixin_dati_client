var app = getApp();

Page({
    data: {},
    onLoad: function(a) {},
    onReady: function() {
        var a = app.globalData.appname;
        wx.setNavigationBarTitle({
            title: a.title
        }), "" != a.fontcolor && "" !== a.maincolor && wx.setNavigationBarColor({
            frontColor: a.fontcolor,
            backgroundColor: a.maincolor
        }), this.setData({
            answerimg: a.answerimg,
            appname: a
        }), this.Ranklist();
    },
    Ranklist: function() {
        var t = app.globalData.user_id, n = this;
        app.util.request({
            url: "entry/wxapp/Ranklist",
            method: "post",
            dataType: "json",
            data: {
                type: "last"
            },
            success: function(a) {
                n.setData({
                    dan: a.data.data,
                    user_id: t
                });
            }
        });
    },
    onShow: function() {},
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        var t = app.globalData.title;
        return a.from, console.log(a.target), {
            title: t.title,
            imageUrl: t.img,
            path: "/hc_answer/pages/index/index"
        };
    }
});