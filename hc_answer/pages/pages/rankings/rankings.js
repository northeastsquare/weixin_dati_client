var app = getApp(), ctype = "frends";

Page({
    data: {
        status: 0
    },
    onLoad: function(t) {
        ctype = "frends";
        var a = app.globalData.appname;
        "" != a.fontcolor && "" !== a.maincolor && wx.setNavigationBarColor({
            frontColor: a.fontcolor,
            backgroundColor: a.maincolor
        }), wx.setNavigationBarTitle({
            title: a.title
        }), this.setData({
            answerimg: a.answerimg,
            worldtext: a.worldtext,
            appname: a
        });
    },
    Ranklist: function() {
        var a = app.globalData.user_id, e = this;
        app.util.request({
            url: "entry/wxapp/Ranklist",
            method: "post",
            dataType: "json",
            data: {
                user_id: a,
                type: ctype
            },
            success: function(t) {
                e.setData({
                    dan: t.data.data,
                    user_id: a
                });
            }
        });
    },
    click: function(t) {
        var a = t.currentTarget.dataset.index;
        ctype = 0 == a ? "frends" : "else", this.Ranklist(), this.setData({
            status: a
        });
    },
    lastseason: function() {
        wx.navigateTo({
            url: "../lastseason/lastseason"
        });
    },
    onShow: function() {
        this.Ranklist();
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        var a = app.globalData.title;
        return t.from, console.log(t.target), {
            title: a.title,
            imageUrl: a.img,
            path: "/hc_answer/pages/index/index"
        };
    }
});