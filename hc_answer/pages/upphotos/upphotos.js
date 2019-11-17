var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
}, app = getApp();

Page({
    data: {
        showexample: !1,
        getdanmoney: !0
    },
    onLoad: function(o) {
        var e = app.globalData.appname;
        "" != e.fontcolor && "" !== e.maincolor && wx.setNavigationBarColor({
            frontColor: e.fontcolor,
            backgroundColor: e.maincolor
        }), wx.setNavigationBarTitle({
            title: e.title
        });
        var t = app.globalData.mylevel;
        "" != t.moneycode && this.setData({
            logo: t.moneycode,
            showexample: !0,
            condition: o.condition
        }), this.setData({
            condition: o.condition,
            appname: e,
            dan_idss: o.dan_idss
        });
    },
    chooseImg: function() {
        var e = this;
        wx.chooseImage({
            sourceType: [ "album", "camera" ],
            success: function(o) {
                console.log(o), e.setData({
                    logo: o.tempFilePaths,
                    showexample: !0
                });
            }
        });
    },
    delpic: function() {
        this.setData({
            logo: void 0,
            showexample: !1
        });
    },
    upImg: function() {
        var o = this.data.dan_idss, e = this.data.logo;
        if (console.log(void 0 === e ? "undefined" : _typeof(e)), wx.showToast({
            title: "上传中..."
        }), null == e) return wx.showToast({
            title: "请选择照片"
        }), !1;
        if ("string" == typeof e) return wx.redirectTo({
            url: "../passLevel/passLevel?dan_idss=" + o
        }), !1;
        var t = this;
        wx.uploadFile({
            url: app.util.url("entry/wxapp/Uploadimg"),
            filePath: e[0],
            name: "image",
            formData: {
                m: "hc_answer"
            },
            success: function(o) {
                wx.hideLoading(), console.log("上传图片", o);
                var e = o.data;
                e = JSON.parse(e), t.Uploadmoneycode(e.data);
            }
        });
    },
    Uploadmoneycode: function(o) {
        var e = app.globalData.user_id;
        app.util.request({
            url: "entry/wxapp/Uploadmoneycode",
            method: "post",
            dataType: "json",
            data: {
                user_id: e,
                moneycode: o
            },
            success: function(o) {
                console.log(o), wx.showToast({
                    title: o.data.message
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "../passLevel/passLevel"
                    });
                }, 2e3);
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});