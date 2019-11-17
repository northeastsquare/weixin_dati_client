var _echarts = require("../../../ec-canvas/echarts"), echarts = _interopRequireWildcard(_echarts);

function _interopRequireWildcard(a) {
    if (a && a.__esModule) return a;
    var t = {};
    if (null != a) for (var e in a) Object.prototype.hasOwnProperty.call(a, e) && (t[e] = a[e]);
    return t.default = a, t;
}

var a, b, UserId, mydetail, app = getApp();

Page({
    data: {
        ec: {
            onInit: initChart
        }
    },
    onLoad: function(a) {
        this.Sys();
        var t = a.user_id;
        UserId = a.user_id, this.getDetail(t);
    },
    getDetail: function(a) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Lookshare",
            method: "post",
            dataType: "json",
            data: {
                user_id: a
            },
            success: function(a) {
                option.series[0].data[0].value = a.data.data.cator, option.radar.indicator = a.data.data.indicator, 
                t.setData({
                    mydetail: a.data.data.bottom,
                    user: a.data.data.user
                });
            }
        });
    },
    Sys: function() {
        var s = this;
        app.util.request({
            url: "entry/wxapp/Sys",
            method: "post",
            dataType: "json",
            success: function(a) {
                var t = JSON.parse(a.data.data.ques).times, e = JSON.parse(a.data.data.answer), o = JSON.parse(a.data.data.basic);
                wx.setNavigationBarTitle({
                    title: o.title
                }), "" != o.fontcolor && "" !== o.maincolor && wx.setNavigationBarColor({
                    frontColor: o.fontcolor,
                    backgroundColor: o.maincolor
                }), app.globalData.pic = e, s.setData({
                    times: 100 * t,
                    seconds: t,
                    allseconds: t,
                    appname: o,
                    successpic: e.success,
                    draw: e.draw,
                    pic: e,
                    answerimg: o.answerimg
                });
            }
        });
    },
    myshare: function() {
        wx.redirectTo({
            url: "../detail/detail"
        });
    },
    onShareAppMessage: function(a) {
        var t = UserId, e = app.globalData.title;
        return a.from, console.log(a.target), {
            title: e.title,
            imageUrl: e.img,
            path: "/hc_answer/pages/share/sharedetail/sharedetail?user_id=" + t
        };
    },
    index: function() {
        wx.redirectTo({
            url: "../../index/index"
        });
    },
    getUserInfo: function(t) {
        var e = this;
        wx.getSetting({
            success: function(a) {
                a.authSetting["scope.userInfo"] ? wx.checkSession({
                    success: function(a) {
                        console.log("未过期"), e.register();
                    },
                    fail: function(a) {
                        console.log("已过期"), e.login(t);
                    }
                }) : wx.showModal({
                    title: "提示",
                    content: "获取用户信息失败,需要授权才能继续使用！",
                    showCancel: !1,
                    confirmText: "授权",
                    success: function(a) {
                        a.confirm && wx.openSetting({
                            success: function(a) {
                                a.authSetting["scope.userInfo"] ? wx.showToast({
                                    title: "授权成功"
                                }) : wx.showToast({
                                    title: "未授权..."
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    login: function(e) {
        var o = this;
        app.globalData.userInfo ? "function" == typeof cb && cb(app.globalData.userInfo) : wx.login({
            success: function(a) {
                var t = e.detail;
                (app.globalData.userInfo = t).act = "autologin", t.code = a.code, app.util.request({
                    url: "entry/wxapp/getopenid",
                    method: "post",
                    dataType: "json",
                    data: t,
                    success: function(a) {
                        0 == a.data.errno && (t.session_key = a.data.data.session_key, t.openid = a.data.data.openid, 
                        app.globalData.userInfo = t, wx.setStorageSync("user", e), "function" == typeof cb && cb(app.globalData.userInfo), 
                        o.register(function(a) {}));
                    }
                });
            },
            fail: function(a) {
                console.log("获取失败");
            }
        });
    },
    register: function(i) {
        var t = this;
        wx.getStorage({
            key: "user",
            success: function(a) {
                var t = a.data.detail, e = t.session_key, o = t.encryptedData, s = t.iv;
                app.util.request({
                    url: "entry/wxapp/getuserinfo",
                    method: "post",
                    dataType: "json",
                    data: {
                        session_key: e,
                        encryptedData: o,
                        iv: s
                    },
                    success: function(a) {
                        app.globalData.user_id = a.data.data, "function" == typeof i && i(a.data.data), 
                        wx.reLaunch({
                            url: "../detail/detail"
                        });
                    }
                });
            },
            fail: function(a) {
                t.setData({});
            }
        });
    }
});

var option = {
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
    var s = echarts.init(e, null, {
        width: t,
        height: o
    }), i = UserId;
    return app.util.request({
        url: "entry/wxapp/Lookshare",
        method: "post",
        dataType: "json",
        data: {
            user_id: i
        },
        success: function(t) {
            a = t.data.data.cator, b = t.data.data.indicator, e.setChart(s), s.setOption(option);
        }
    }), s;
}