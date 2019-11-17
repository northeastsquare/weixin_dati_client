var app = getApp();

Page({
    data: {},
    onLoad: function() {
        this.home();
    },
    getUserInfo: function(a) {
        console.log("res1", a);
        var e = this;
        wx.getSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] ? e.login(a) : wx.showModal({
                    title: "提示",
                    content: "获取用户信息失败,需要授权才能继续使用！",
                    showCancel: !1,
                    confirmText: "授权",
                    success: function(t) {
                        t.confirm && wx.openSetting({
                            success: function(t) {
                                t.authSetting["scope.userInfo"] ? wx.showToast({
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
    onShow: function() {
        this.Sys();
    },
    register: function(s) {
        wx.getStorage({
            key: "user",
            success: function(t) {
                var a = t.data.detail, e = a.session_key, o = a.encryptedData, n = a.iv;
                app.util.request({
                    url: "entry/wxapp/getuserinfo",
                    method: "post",
                    dataType: "json",
                    data: {
                        session_key: e,
                        iv: n,
                        encryptedData: o
                    },
                    success: function(t) {
                        app.globalData.user_id = t.data.data, "function" == typeof s && s(t.data.data), 
                        wx.reLaunch({
                            url: "../index/index"
                        });
                    }
                });
            },
            fail: function(t) {
                console.log("本地缓存失效");
            }
        });
    },
    xiangqig: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../education/education?id=" + a
        });
    },
    Sys: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Sys",
            method: "post",
            dataType: "json",
            success: function(t) {
                var a = JSON.parse(t.data.data.basic);
                "" != (app.globalData.appname = a).fontcolor && "" !== a.maincolor && wx.setNavigationBarColor({
                    frontColor: a.fontcolor,
                    backgroundColor: a.maincolor
                }), wx.setNavigationBarTitle({
                    title: a.title
                }), e.setData({
                    appname: a
                });
            }
        });
    },
    home: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/home",
            method: "POST",
            success: function(t) {
                a.setData({
                    stake: t.data.data.stake,
                    shenhe: t.data.data.shenhe
                });
            }
        });
    },
    login: function(e) {
        var o = this;
        wx.login({
            success: function(t) {
                var a = e.detail;
                console.log("login", a), (app.globalData.userInfo = a).act = "autologin", a.code = t.code, 
                app.util.request({
                    url: "entry/wxapp/getopenid",
                    method: "post",
                    dataType: "json",
                    data: a,
                    success: function(t) {
                        console.log("res3", t), 0 == t.data.errno && (a.session_key = t.data.data.session_key, 
                        a.openid = t.data.data.openid, app.globalData.userInfo = a, wx.setStorageSync("user", e), 
                        "function" == typeof cb && cb(app.globalData.userInfo), o.register());
                    }
                });
            },
            fail: function(t) {
                console.log("获取失败");
            }
        });
    }
});