var user_ids, optiondata, addpeople, app = getApp(), allpeople = 0;

Page({
    data: {
        numday: 2,
        loop: !1,
        Notice: !0,
        formId: "",
        getHead: !0,
        getdanreward: !0,
        getdanmoney: !0,
        apples: !0,
        showlogos: !0,
        season: !0,
        showindex: !0,
        Public: 0,
        Publics: 0
    },
    onLoad: function(a) {
        var t = app.globalData.screenHeight;
        optiondata = a, this.setData({
            screenHeight: t
        }), this.Indexmodule();
    },
    Indexmodule: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Indexmodule",
            method: "post",
            dataType: "json",
            success: function(a) {
                t.setData({
                    left: a.data.data.left,
                    right: a.data.data.right
                });
            }
        });
    },
    xiangqig: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../education/education?id=" + t
        });
    },
    getmyLevel: function(a) {
        var t = a, e = this;
        app.util.request({
            url: "entry/wxapp/GetLevel",
            method: "post",
            dataType: "json",
            data: {
                user_id: t
            },
            success: function(a) {
                app.globalData.mylevel = a.data.data, 0 == a.data.data.sover ? e.setData({
                    showlogos: !1,
                    showlogo: !0,
                    showindex: !0
                }) : e.setData({
                    showlogos: !0,
                    showlogo: !0,
                    showindex: !1
                }), e.setData({
                    mylevel: a.data.data,
                    sign: a.data.data.sign
                });
            }
        });
    },
    Ranklist: function(t) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Season",
            method: "post",
            dataType: "json",
            data: {
                user_id: t,
                type: "rank"
            },
            success: function(a) {
                e.setData({
                    dan: a.data.data.list,
                    user_id: t,
                    danname: a.data.data.name
                });
            }
        });
    },
    getM: function(a) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Signprop",
            method: "post",
            dataType: "json",
            data: {
                user_id: a
            },
            success: function(a) {
                t.setData({
                    Signprop: a.data.data
                });
            }
        });
    },
    onShow: function() {
        this.Sys(), this.home(), this.setData({
            getHead: !0,
            getdanreward: !0,
            getdanmoney: !0,
            apples: !0,
            showlogos: !0
        }), allpeople = 0;
    },
    closeT: function() {
        this.setData({
            changlle: 1
        });
    },
    saveFormId: function(a) {
        "the formId is a mock one" != a.detail.formId && (this.data.formId = a.detail.formId);
    },
    getBtn: function(a) {
        this.saveFormId(a);
        var t, e = this.data.formId, s = this.data.Signprop;
        for (var o in s) "今天" == s[o].show && (t = parseInt(o) + 1);
        var i = app.globalData.user_id, n = this;
        app.util.request({
            url: "entry/wxapp/Getprop",
            method: "post",
            dataType: "json",
            data: {
                user_id: i,
                day: t,
                formid: e
            },
            success: function(a) {
                wx.showModal({
                    content: "领取成功",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm && n.setData({
                            Notice: !1
                        });
                    }
                }), n.setData({
                    sign: 1
                });
            }
        });
    },
    Notice: function() {
        this.setData({
            Notice: !0
        });
    },
    rankings: function() {
        this.audioCtx.pause(), wx.navigateTo({
            url: "../pages/rankings/rankings"
        });
    },
    market: function() {
        this.audioCtx.pause(), wx.navigateTo({
            url: "../pages/market/market"
        });
    },
    goods: function() {
        this.audioCtx.pause(), wx.navigateTo({
            url: "../pages/goods/goods"
        });
    },
    books: function() {
        wx.navigateTo({
            url: "../pages/books/books"
        });
    },
    passLevel: function() {
        this.audioCtx.pause(), wx.navigateTo({
            url: "../passLevel/passLevel"
        });
    },
    changlle: function(a) {
        var t = this.data.active.dan_id, e = this.data.active.condition;
        this.saveFormId(a);
        this.data.formId;
        var s = app.globalData.user_id, o = this;
        (app.util.request({
            url: "entry/wxapp/Activetx",
            method: "post",
            dataType: "json",
            data: {
                user_id: s
            },
            success: function(a) {}
        }), o.setData({
            changlle: 1
        }), "" != o.data.mylevel.moneycode) ? ((o = this).audioCtx.pause(), wx.navigateTo({
            url: "../passLevel/passLevel?dan_idss=" + t
        })) : ((o = this).audioCtx.pause(), wx.navigateTo({
            url: "../upphotos/upphotos?dan_idss=" + t + "&condition=" + e
        }));
    },
    getreward: function() {
        this.setData({
            apples: !1,
            showlogos: !0,
            getHead: !1,
            showindex: !0
        });
        var a = app.globalData.user_id, t = this;
        app.util.request({
            url: "entry/wxapp/Season",
            method: "post",
            dataType: "json",
            data: {
                user_id: a,
                type: "border"
            },
            success: function(a) {
                t.setData({
                    border: a.data.data.border,
                    name: a.data.data.name
                }), t.Getreward("border");
            }
        });
    },
    getHead: function() {
        this.setData({
            getHead: !0,
            getdanreward: !1
        });
        var a = app.globalData.user_id, t = this;
        app.util.request({
            url: "entry/wxapp/Season",
            method: "post",
            dataType: "json",
            data: {
                user_id: a,
                type: "prop"
            },
            success: function(a) {
                t.setData({
                    reward: a.data.data.reward,
                    rewardnum: a.data.data.rewardnum,
                    thumb: a.data.data.thumb
                }), t.Getreward("prop");
            }
        });
    },
    getdanreward: function() {
        this.setData({
            getHead: !0,
            getdanreward: !0,
            getdanmoney: !1
        });
        var a = app.globalData.user_id, t = this;
        app.util.request({
            url: "entry/wxapp/Season",
            method: "post",
            dataType: "json",
            data: {
                user_id: a,
                type: "money"
            },
            success: function(a) {
                t.setData({
                    result: a.data.data,
                    resStatus: a.data.data.status
                }), t.Getreward("money");
            }
        });
    },
    Getreward: function(a) {
        var t = app.globalData.user_id, e = this;
        app.util.request({
            url: "entry/wxapp/Getreward",
            method: "post",
            dataType: "json",
            data: {
                user_id: t,
                type: a
            },
            success: function(a) {
                e.setData({});
            }
        });
    },
    getdanmoney: function() {
        this.setData({
            apples: !0,
            getseason: !1,
            season: !1
        });
        var a = app.globalData.user_id, t = this;
        app.util.request({
            url: "entry/wxapp/Season",
            method: "post",
            dataType: "json",
            data: {
                user_id: a
            },
            success: function(a) {
                t.setData({
                    newname: a.data.data.name,
                    starttime: a.data.data.starttime,
                    endtime: a.data.data.endtime
                });
            }
        });
    },
    getindex: function() {
        this.setData({
            season: !0,
            showlogo: !0,
            showindex: !1
        });
    },
    jump: function(a) {
        var t = a.currentTarget.dataset.link, e = a.currentTarget.dataset.appid, s = a.currentTarget.dataset.path, o = a.currentTarget.dataset.url, i = this.data.active.dan_id, n = this.data.pic.share2, d = this;
        if (null == e) if ("../passLevel/shareanswer/shareanswer" == t) {
            var r = app.globalData.user_id;
            app.util.request({
                url: "entry/wxapp/Friendspk",
                method: "post",
                dataType: "json",
                data: {
                    user_id: r
                },
                success: function(a) {
                    d.audioCtx.pause(), wx.navigateTo({
                        url: t + "?battleid=" + a.data.data
                    });
                }
            });
        } else "h5" == t ? (d.audioCtx.pause(), wx.navigateTo({
            url: "../singleh5/singleh5?url=" + o
        })) : "../passLevel/passLevel" == t ? (d.audioCtx.pause(), wx.navigateTo({
            url: t + "?dan_idss=" + i + "&share2=" + n
        })) : (d.audioCtx.pause(), wx.navigateTo({
            url: t
        })); else wx.navigateToMiniProgram({
            appId: e,
            path: s,
            success: function(a) {}
        });
    },
    share: function() {
        this.audioCtx.pause(), wx.navigateTo({
            url: "../share/share"
        });
    },
    share1: function() {
        var a = this.data.active.condition, t = this.data.active.dan_id;
        this.audioCtx.pause(), wx.navigateTo({
            url: "../upphotos/upphotos?condition=" + a + "&dan_idss=" + t
        });
    },
    home: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/home",
            method: "POST",
            success: function(a) {
                0 == a.data.data.stake && wx.checkSession({
                    success: function(a) {
                        console.log("未过期", a), e.register(function(a) {
                            var t = a;
                            e.getM(t), e.getmyLevel(t), e.Ranklist(t);
                        });
                    },
                    fail: function(a) {
                        console.log("已过期"), wx.navigateTo({
                            url: "../register/register"
                        });
                    }
                }), e.setData({
                    stake: a.data.data.stake,
                    shenhe: a.data.data.shenhe
                });
            }
        });
    },
    register: function(i) {
        wx.getStorage({
            key: "user",
            success: function(a) {
                var t = a.data.detail, e = t.session_key, s = t.encryptedData, o = t.iv;
                null != a.data.detail.session_key ? app.util.request({
                    url: "entry/wxapp/getuserinfo",
                    method: "post",
                    dataType: "json",
                    data: {
                        session_key: e,
                        iv: o,
                        encryptedData: s
                    },
                    success: function(a) {
                        app.globalData.user_id = a.data.data, "function" == typeof i && i(a.data.data);
                    }
                }) : wx.navigateTo({
                    url: "../register/register"
                });
            },
            fail: function(a) {
                wx.navigateTo({
                    url: "../register/register"
                });
            }
        });
    },
    Sys: function() {
        var p = this;
        app.util.request({
            url: "entry/wxapp/Sys",
            method: "post",
            dataType: "json",
            success: function(a) {
                var t = JSON.parse(a.data.data.ques).times, e = JSON.parse(a.data.data.answer), s = JSON.parse(a.data.data.forward), o = JSON.parse(a.data.data.basic);
                "" != (app.globalData.appname = o).fontcolor && "" !== o.maincolor && wx.setNavigationBarColor({
                    frontColor: o.fontcolor,
                    backgroundColor: o.maincolor
                }), wx.setNavigationBarTitle({
                    title: o.title
                });
                var i = JSON.parse(a.data.data.notice);
                1 == i.switch ? p.setData({
                    switchs: !1
                }) : p.setData({
                    switchs: !0
                });
                var n = JSON.parse(a.data.data.ques), d = JSON.parse(a.data.data.basic).contact, r = JSON.parse(a.data.data.active);
                app.globalData.mp3 = n, p.audioCtx = wx.createAudioContext("myAudio"), p.audioCtx.setSrc(o.indexbgm), 
                p.audioCtx.play(), p.getenemy = function() {
                    var a = r.people;
                    allpeople += parseInt(a / 30), p.setData({
                        people: allpeople
                    }), a <= allpeople && (clearInterval(addpeople), p.setData({
                        people: a
                    }));
                }, addpeople = setInterval(p.getenemy, 10), app.globalData.pic = e, app.globalData.title = s, 
                p.setData({
                    times: 100 * t,
                    title: s,
                    seconds: t,
                    allseconds: t,
                    successpic: e.success,
                    draw: e.draw,
                    pic: e,
                    notice: i,
                    mp3: n,
                    contenttitle: d,
                    appname: o,
                    loginimg: o.loginimg,
                    answerimg: o.answerimg,
                    active: r
                });
            }
        });
    },
    onShareAppMessage: function(a) {
        var t = this.data.title;
        return a.from, {
            title: t.title,
            imageUrl: t.img,
            path: "/hc_answer/pages/index/index"
        };
    },
    showseason: function() {
        this.setData({
            changlle: 0
        });
    },
    Publicclose: function() {
        var a = this.data.Public;
        a = 0 == a ? 1 : 0, this.setData({
            Public: a
        });
    }
});