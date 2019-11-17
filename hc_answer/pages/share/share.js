var _echarts = require("../../ec-canvas/echarts"), echarts = _interopRequireWildcard(_echarts);

function _interopRequireWildcard(a) {
    if (a && a.__esModule) return a;
    var t = {};
    if (null != a) for (var e in a) Object.prototype.hasOwnProperty.call(a, e) && (t[e] = a[e]);
    return t.default = a, t;
}

var a, b, app = getApp(), option = {
    color: [ "#ffffff", "#ffffff" ],
    radar: {
        splitNumber: 4,
        shape: "circle",
        color: "#ffffff",
        splitArea: {
            areaStyle: {
                opacity: 0
            }
        },
        radius: 90
    },
    series: [ {
        areaStyle: {
            color: "#fff",
            opacity: .8
        },
        lineStyle: {
            width: 0
        },
        type: "radar",
        symbol: "none",
        data: [ {
            value: []
        } ]
    } ]
};

function initChart(e, t, o) {
    var i = echarts.init(e, null, {
        width: t,
        height: o
    }), r = app.globalData.user_id;
    return app.util.request({
        url: "entry/wxapp/Share",
        method: "post",
        dataType: "json",
        data: {
            user_id: r
        },
        success: function(t) {
            a = t.data.data.cator, b = t.data.data.indicator, option.series[0].data[0].value = a, 
            option.radar.indicator = b, e.setChart(i), i.setOption(option);
        }
    }), i;
}

Page({
    data: {
        ec: {
            onInit: initChart
        }
    },
    onLoad: function() {
        var a = app.globalData.appname;
        "" != a.fontcolor && "" !== a.maincolor && wx.setNavigationBarColor({
            frontColor: a.fontcolor,
            backgroundColor: a.maincolor
        }), wx.setNavigationBarTitle({
            title: a.title
        }), this.setData({
            answerimg: a.answerimg
        }), wx.authorize({
            scope: "scope.writePhotosAlbum",
            success: function(a) {}
        }), this.Shareimg();
    },
    download: function() {
        var a = this.data.imag;
        wx.downloadFile({
            url: a,
            success: function(a) {
                wx.saveImageToPhotosAlbum({
                    filePath: a.tempFilePath,
                    success: function(a) {
                        wx.showToast({
                            title: "已保存",
                            icon: "success"
                        });
                    }
                });
            }
        });
    },
    Shareimg: function() {
        var a = app.globalData.user_id, t = this;
        wx.showLoading({
            title: "生成分享图片..."
        }), app.util.request({
            url: "entry/wxapp/Shareimg",
            method: "post",
            dataType: "json",
            data: {
                user_id: a
            },
            success: function(a) {
                wx.hideLoading(), t.setData({
                    imag: a.data.data
                });
            }
        });
    },
    jumpdan: function() {
        wx.redirectTo({
            url: "../../pages/passLevel/passLevel"
        });
    },
    onShareAppMessage: function(a) {
        var t = app.globalData.user_id, e = app.globalData.title;
        console.log(app.globalData.title), wx.showShareMenu({
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
                console.log(a), wx.getShareInfo({
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
                console.log(a), wx.showModal({
                    title: "分享奖励",
                    content: "金币奖励+" + a.data.data,
                    showCancel: !1
                });
            }
        });
    },
    onReady: function() {
        var a = app.globalData.mylevel;
        this.setData({
            mylevel: a
        });
    }
});