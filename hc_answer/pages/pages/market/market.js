var app = getApp();

Page({
    data: {},
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
        }), this.getallgoods();
    },
    getallgoods: function() {
        var a = app.globalData.user_id, t = this;
        app.util.request({
            url: "entry/wxapp/Shop",
            method: "post",
            dataType: "json",
            data: {
                user_id: a
            },
            success: function(a) {
                t.setData({
                    bottom: a.data.data.bottom,
                    sales: a.data.data.new,
                    goods: a.data.data.goods
                });
            }
        });
    },
    close: function() {
        this.setData({
            getM: !1
        });
    },
    buy: function(a) {
        var t = a.currentTarget.dataset.index;
        if (-1 == t) e = this.data.sales; else var e = this.data.goods[t];
        this.setData({
            getM: !0,
            goodsDetail: e
        });
    },
    paybtn: function(a) {
        var t = app.globalData.user_id, e = a.currentTarget.dataset.id, o = this;
        app.util.request({
            url: "entry/wxapp/Pay",
            method: "post",
            dataType: "json",
            data: {
                user_id: t,
                pid: e
            },
            success: function(a) {
                o.pay(a.data.data);
            }
        });
    },
    pay: function(a) {
        var t = this;
        wx.requestPayment({
            timeStamp: "" + a.timeStamp,
            nonceStr: a.nonceStr,
            package: a.package,
            signType: "MD5",
            paySign: a.sign,
            success: function(a) {
                wx.showToast({
                    title: "支付成功"
                }), t.setData({
                    getM: !1
                });
            },
            fail: function(a) {
                wx.showToast({
                    title: "支付失败"
                });
            }
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        var t = app.globalData.user_id, e = app.globalData.title;
        wx.showShareMenu({
            withShareTicket: !0,
            success: function(a) {}
        });
        var o = this;
        return {
            title: e.title,
            imageUrl: e.img,
            path: "/hc_answer/pages/share/sharedetail/sharedetail?user_id=" + t,
            withShareTicket: !0,
            success: function(a) {
                wx.getShareInfo({
                    shareTicket: a.shareTickets[0],
                    success: function(a) {
                        o.Forward(a);
                    }
                });
            },
            fail: function() {
                wx.showToast({
                    title: "分享失败"
                });
            }
        };
    },
    Forward: function(a) {
        var t = app.globalData.user_id;
        app.util.request({
            url: "entry/wxapp/Forward",
            method: "post",
            dataType: "json",
            data: {
                user_id: t,
                encryptedData: a.encryptedData,
                iv: a.iv
            },
            success: function(a) {
                wx.showModal({
                    title: "分享奖励",
                    content: "金币奖励+" + a.data.data,
                    showCancel: !1
                });
            }
        });
    }
});