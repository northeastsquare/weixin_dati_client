var app = getApp();

function countdown(a) {
    var t = a.data.Oftenuse;
    for (var e in t) if (null != t[e].synum) {
        var s = t[e].synum || [], n = new Date().getTime() / 1e3, i = s - (n = parseInt(n)) || [], r = dateformat(i);
        i <= 0 && (t[e].alltime = ""), t[e].alltime = r;
    }
    a.setData({
        Oftenuse: t
    }), setTimeout(function() {
        i -= 1, countdown(a);
    }, 1e3);
}

function dateformat(a) {
    var t = Math.floor(a), e = Math.floor(t / 60);
    e < 10 && (e = "0" + e);
    var s = Math.floor(t % 60);
    return s < 10 && (s = "0" + s), e + ":" + s;
}

Page({
    data: {
        answer: !1,
        disabled: !1,
        getdanmoney: !0,
        loop: !1
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
            appname: t,
            dan_idss: a.dan_idss,
            share2: a.share2
        });
        var e = app.globalData.screenHeight, s = app.globalData.screenWidth;
        this.setData({
            screenHeight: e,
            screenWidth: s
        });
    },
    array: function() {},
    onShow: function() {
        this.Sys(), this.array(), this.getmyLevel(), this.Selfdan(), this.Oftenuse(), this.Currentsj();
    },
    Sys: function() {
        var n = this;
        app.util.request({
            url: "entry/wxapp/Sys",
            method: "post",
            dataType: "json",
            success: function(a) {
                var t = JSON.parse(a.data.data.active), e = JSON.parse(a.data.data.answer), s = JSON.parse(a.data.data.basic);
                null != s.rankbgm ? (n.audioCtx = wx.createAudioContext("myAudios"), n.audioCtx.setSrc(s.rankbgm)) : (n.audioCtx = wx.createAudioContext("myAudios"), 
                n.audioCtx.setSrc(s.indexbgm)), n.audioCtx.play(), n.setData({
                    active: t,
                    pic: e
                });
            }
        });
    },
    Currentsj: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Currentsj",
            method: "post",
            dataType: "json",
            success: function(a) {
                var t = a.data.data;
                e.setData({
                    season: t
                });
            }
        });
    },
    saveFormId: function(a) {
        "the formId is a mock one" != a.detail.formId && (this.data.formId = a.detail.formId);
    },
    getBtn: function(a) {
        wx.setStorageSync("getdanmoney", 0), this.saveFormId(a), this.setData({
            getdanmoney: !0
        });
        var t = this.data.formId;
        console.log(t);
        var e = app.globalData.user_id;
        app.util.request({
            url: "entry/wxapp/getformid",
            method: "post",
            dataType: "json",
            data: {
                user_id: e,
                formid: t
            },
            success: function(a) {}
        });
    },
    Selfdan: function() {
        var a = app.globalData.user_id, n = this, i = wx.getStorageSync("getdanmoney");
        app.util.request({
            url: "entry/wxapp/Selfdan",
            method: "post",
            dataType: "json",
            data: {
                user_id: a
            },
            success: function(a) {
                for (var t = a.data.data, e = 244 * (t.length - 2), s = 0; s < t.length; s++) n.data.dan_idss == t[s].dan_id && 1 == t[s].status && 1 == i && (n.setData({
                    getdanmoney: !1
                }), n.Getreward());
                n.setData({
                    array: t,
                    scrolltop: e
                });
            }
        });
    },
    Getreward: function(a) {
        var t = app.globalData.user_id, e = this;
        app.util.request({
            url: "entry/wxapp/Richactive",
            method: "post",
            dataType: "json",
            data: {
                user_id: t
            },
            success: function(a) {
                e.setData({
                    result: a.data.data
                });
            }
        });
    },
    match: function(a) {
        var t = this.data.dan_idss, e = a.currentTarget.dataset.id, s = a.currentTarget.dataset.needcoin;
        if (this.data.mylevel.gold - s < 0) wx.showToast({
            title: "金币不足"
        }); else {
            wx.navigateTo({
                url: "answer/answer?dan_id=" + e + "&dan_idss=" + t
            });
            this.audioCtx.pause();
        }
    },
    Oftenuse: function() {
        var a = app.globalData.user_id, e = this;
        app.util.request({
            url: "entry/wxapp/Oftenuse",
            method: "post",
            dataType: "json",
            data: {
                user_id: a
            },
            success: function(a) {
                var t = a.data.data;
                e.setData({
                    Oftenuse: t
                }), countdown(e);
            }
        });
    },
    buy: function() {
        wx.redirectTo({
            url: "../pages/market/market"
        });
        this.audioCtx.pause();
    },
    getmyLevel: function() {
        var a = app.globalData.user_id, t = this;
        app.util.request({
            url: "entry/wxapp/GetLevel",
            method: "post",
            dataType: "json",
            data: {
                user_id: a
            },
            success: function(a) {
                app.globalData.mylevel = a.data.data, t.setData({
                    mylevel: a.data.data
                });
            }
        });
    },
    getM: function(a) {
        var t = a.currentTarget.dataset, e = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        (this.animation = e).translateY(300).scale(0).step(), this.setData({
            animationData: e.export()
        }), this.setData({
            getM: !0,
            detail: t
        }), setTimeout(function() {
            e.translateY(0).scale(1).step(), this.setData({
                animationData: e,
                getM: !0
            });
        }.bind(this), 10);
    },
    dan: function() {
        wx.navigateTo({
            url: "dan/dan"
        });
        this.audioCtx.pause();
    },
    close: function() {
        this.setData({
            getM: !1
        });
    },
    use: function(a) {
        var t = a.currentTarget.dataset.id, e = this.data.detail;
        e.num--, 0 == e.num && this.setData({
            disabled: !0
        });
        e.num;
        var s = this, n = app.globalData.user_id;
        app.util.request({
            url: "entry/wxapp/Useprop",
            method: "post",
            dataType: "json",
            data: {
                user_id: n,
                pid: t
            },
            success: function(a) {
                s.Oftenuse(), wx.showToast({
                    title: a.data.message
                }), s.setData({
                    detail: e
                });
            }
        });
    },
    onShareAppMessage: function(a) {
        var t = app.globalData.title;
        return a.from, {
            title: t.title,
            imageUrl: t.img,
            path: "/hc_answer/pages/register/register"
        };
    }
});