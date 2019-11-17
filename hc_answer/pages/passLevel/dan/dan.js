var app = getApp();

Page({
    data: {
        title: [ "文化程度", "奖励", "头像框" ]
    },
    onLoad: function(a) {
        var t = app.globalData.appname;
        "" != t.fontcolor && "" !== t.maincolor && wx.setNavigationBarColor({
            frontColor: t.fontcolor,
            backgroundColor: t.maincolor
        }), wx.setNavigationBarTitle({
            title: t.title
        }), this.setData({
            answerimg: t.answerimg,
            appname: t
        });
    },
    Danlist: function() {
        app.globalData.user_id;
        var t = this;
        app.util.request({
            url: "entry/wxapp/Danlist",
            method: "post",
            dataType: "json",
            success: function(a) {
                t.setData({
                    dan: a.data.data
                });
            }
        });
    },
    onShow: function() {
        this.Danlist();
    },
    onHide: function() {},
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