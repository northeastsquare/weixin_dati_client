var app = getApp();

Page({
    data: {},
    onLoad: function(t) {
        var a = app.globalData.appname;
        "" != a.fontcolor && "" !== a.maincolor && wx.setNavigationBarColor({
            frontColor: a.fontcolor,
            backgroundColor: a.maincolor
        }), wx.setNavigationBarTitle({
            title: a.title
        }), this.setData({
            answerimg: a.answerimg,
            appname: a
        });
    },
    getgoods: function() {
        var a = this, t = app.globalData.user_id;
        app.util.request({
            url: "entry/wxapp/Selfprop",
            method: "post",
            dataType: "json",
            data: {
                user_id: t
            },
            success: function(t) {
                console.log(t), a.setData({
                    goods: t.data.data
                });
            }
        });
    },
    close: function() {
        this.setData({
            getM: !1
        });
    },
    close1: function() {
        this.setData({
            getGoods: !1
        });
    },
    getdetail: function(t) {
        var a = t.currentTarget.dataset.id, o = this.data.goods;
        for (var e in o) if (o[e].id == a) var s = o[e];
        this.setData({
            getM: !0,
            goodsdetail: s
        });
    },
    pay: function() {},
    use: function(t) {
        var a = t.currentTarget.dataset.id, o = t.currentTarget.dataset.type;
        console.log(o);
        var e = this.data.goodsdetail;
        e.num--;
        var s = e.num - 1;
        console.log(o);
        var n = this, i = app.globalData.user_id;
        app.util.request({
            url: "entry/wxapp/Useprop",
            method: "post",
            dataType: "json",
            data: {
                user_id: i,
                pid: a
            },
            success: function(t) {
                n.getgoods(), n.setData({
                    goodsdetail: e,
                    getAllGoods: t.data.data
                }), -1 == s && n.setData({
                    getM: !1
                }), 3 == o || 4 == o ? wx.showToast({
                    title: "金币+" + e.jb
                }) : wx.showToast({
                    title: "使用成功",
                    duration: 1e3
                }), 1 != o && 2 != o || n.setData({
                    getGoods: !0
                });
            }
        });
    },
    onShow: function() {
        this.getgoods();
    },
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        var a = app.globalData.title;
        return t.from, console.log(t.target), {
            desc: a.title,
            imageUrl: a.img,
            path: "/hc_answer/pages/index/index"
        };
    }
});