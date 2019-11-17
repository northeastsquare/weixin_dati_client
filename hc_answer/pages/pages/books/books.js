var app = getApp();

Page({
    data: {},
    onLoad: function(t) {
        var a = app.globalData.appname;
        console.log(a), wx.setNavigationBarTitle({
            title: a.title
        }), this.setData({
            answerimg: a.answerimg,
            appname: a
        }), "" != a.fontcolor && "" !== a.maincolor && wx.setNavigationBarColor({
            frontColor: a.fontcolor,
            backgroundColor: a.maincolor
        });
    },
    close: function() {
        this.setData({
            getM: !1,
            success: !1
        });
    },
    getBooks: function() {
        var t = app.globalData.user_id, a = this;
        app.util.request({
            url: "entry/wxapp/Knowledge",
            method: "post",
            dataType: "json",
            data: {
                user_id: t
            },
            success: function(t) {
                a.setData({
                    getBooks: t.data.data
                });
            }
        });
    },
    upLevel: function(t) {
        var a = app.globalData.user_id, e = t.currentTarget.dataset.id, s = this.data.usebook;
        if (parseInt(s.have) - parseInt(s.need) < 0) this.setData({
            fail: 1,
            success: !0
        }); else {
            var o = this;
            app.util.request({
                url: "entry/wxapp/Upgrade",
                method: "post",
                dataType: "json",
                data: {
                    user_id: a,
                    tid: e
                },
                success: function(t) {
                    o.getBooks(), wx.showToast({
                        title: t.data.message
                    }), s.level++, o.setData({
                        usebook: s,
                        success: !0,
                        fail: 0
                    });
                },
                fail: function(t) {
                    "知识书不足" == t.data.message ? o.setData({
                        fail: 1,
                        success: !0
                    }) : o.setData({
                        fail: 2,
                        success: !0
                    });
                }
            });
        }
    },
    buy: function() {
        wx.redirectTo({
            url: "../market/market"
        });
    },
    onShow: function() {
        this.getBooks();
    },
    onHide: function() {},
    show: function(t) {
        var a = t.currentTarget.dataset, e = parseInt(a.score) - parseInt(a.plus);
        parseInt(a.maxlevel) - parseInt(a.level) == 0 ? wx.showToast({
            title: "已达最高等级"
        }) : (null == a.have && (a.have = 0), this.setData({
            usebook: a,
            getexper: e,
            getM: !0
        }));
    },
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