var dan, getEnemyans, varName, replystatus, hou, haha, houhou, battleid, start, Uid, app = getApp(), mysum = 0, enemysum = 0, reply = !1, sharestatus = !1, ansnumber = 0;

function randomSort(t, a) {
    return .5 < Math.random() ? -1 : 1;
}

Page({
    data: {
        matching: !0,
        matched: !0,
        question: [],
        click: !1,
        answerShow: !1,
        status: 0,
        showtime: !0,
        showmaster: !1,
        loginstatus: !0,
        fqs: 1,
        loop: !0,
        shareShowans: 0
    },
    onLoad: function(t) {
        console.log(t), enemysum = ansnumber = mysum = 0;
        var a = app.globalData.screenHeight, e = app.globalData.screenWidth;
        t.user_id;
        this.setData({
            screenHeight: a,
            screenWidth: e,
            mysum: 0,
            enemysum: 0,
            Allshow: !0,
            showprogress: !0,
            battleid: t.battleid,
            Lstatus: 0,
            statusshow: 0,
            options: t
        }), this.left(), this.right();
        var n = this;
        wx.checkSession({
            success: function(t) {
                n.setData({
                    loginstatus: !0
                }), n.register(function(t) {
                    console.log("未过期", t);
                });
            },
            fail: function(t) {
                console.log("已过期"), n.setData({
                    loginstatus: !1
                });
            }
        });
    },
    getmyLevel: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/GetLevel",
            method: "post",
            dataType: "json",
            data: {
                user_id: Uid
            },
            success: function(t) {
                app.globalData.mylevel = t.data.data, a.setData({
                    mylevel: t.data.data,
                    shareShowans: 1
                });
            }
        });
    },
    Friendsjoin: function(t, a) {
        app.util.request({
            url: "entry/wxapp/Friendsjoin",
            method: "post",
            dataType: "json",
            data: {
                user_id: a,
                rid: t.battleid
            },
            success: function(t) {}
        });
    },
    Startans: function() {
        var t = this.data.battleid;
        app.util.request({
            url: "entry/wxapp/Startans",
            method: "post",
            dataType: "json",
            data: {
                rid: t
            },
            success: function(t) {}
        });
    },
    Startstatus: function(a, e) {
        var n = this;
        n.startan = function() {
            app.util.request({
                url: "entry/wxapp/Startstatus",
                method: "post",
                dataType: "json",
                data: {
                    rid: a.battleid
                },
                success: function(t) {
                    2 == t.data.data && (clearInterval(start), n.Getques(a.battleid, e, ansnumber), 
                    n.setData({
                        showtime: !1
                    })), 3 == t.data.data && (clearInterval(start), wx.showModal({
                        title: "若其中一人离开房间",
                        content: "需请重新邀请好友，并通知好友进入游戏",
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.reLaunch({
                                url: "../../index/index"
                            });
                        }
                    }));
                }
            });
        }, start = setInterval(n.startan, 1e3);
    },
    saveFormId: function(t) {
        "the formId is a mock one" != t.detail.formId && (this.data.formId = t.detail.formId);
    },
    getBtn: function(t) {
        this.saveFormId(t);
        var a = this.data.formId, e = app.globalData.user_id;
        app.util.request({
            url: "entry/wxapp/getformid",
            method: "post",
            dataType: "json",
            data: {
                user_id: e,
                formid: a
            },
            success: function(t) {}
        });
    },
    matching: function(t, n) {
        var s = this;
        s.getenemy = function() {
            app.util.request({
                url: "entry/wxapp/Checkjoin",
                method: "post",
                dataType: "json",
                data: {
                    user_id: n,
                    rid: t.battleid
                },
                success: function(t) {
                    var a = t.data.data;
                    if ("" != a) {
                        for (var e in a) a[e].uid != n && (0 == e ? s.setData({
                            Lstatus: 1,
                            Rstatus: 0
                        }) : s.setData({
                            Lstatus: 0,
                            Rstatus: 1
                        }), s.setData({
                            enemy: a[e],
                            statusshow: 1,
                            showmaster: !0,
                            fq: a[e].fq,
                            fqs: 0
                        }));
                        clearInterval(dan);
                    }
                }
            });
        }, dan = setInterval(s.getenemy, 1e3);
    },
    index: function() {
        wx.showModal({
            title: "确定放弃吗？",
            content: "离开之后，好友就不能参与活动",
            success: function(t) {
                t.confirm && wx.reLaunch({
                    url: "../../index/index"
                });
            }
        });
    },
    goindex: function() {
        wx.reLaunch({
            url: "../../index/index"
        });
    },
    onShow: function() {
        this.Sys(), wx.getNetworkType({
            success: function(t) {
                t.networkType;
            }
        }), wx.onNetworkStatusChange(function(t) {
            "none" == t.networkType && (clearInterval(dan), clearInterval(getEnemyans), clearInterval(varName), 
            clearTimeout(hou), clearTimeout(haha), clearInterval(start), wx.showModal({
                title: "当前无网络",
                content: "请先确认网络链接没问题",
                showCancel: !1,
                success: function(t) {
                    t.confirm && wx.reLaunch({
                        url: "../../index/index"
                    });
                }
            }));
        });
    },
    Sys: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Sys",
            method: "post",
            dataType: "json",
            success: function(t) {
                var a = JSON.parse(t.data.data.ques).times, e = JSON.parse(t.data.data.ques).quesnum, n = JSON.parse(t.data.data.basic), s = JSON.parse(t.data.data.answer), r = JSON.parse(t.data.data.ques);
                wx.setNavigationBarTitle({
                    title: n.title
                }), "" != n.fontcolor && "" !== n.maincolor && wx.setNavigationBarColor({
                    frontColor: n.fontcolor,
                    backgroundColor: n.maincolor
                }), i.setData({
                    times: 100 * a,
                    seconds: a,
                    allseconds: a,
                    successpic: s.success,
                    appname: n,
                    draw: s.draw,
                    quesnum: e,
                    answerimg: n.answerimg,
                    mp3: r
                });
            }
        });
    },
    moveLeft: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.translateX(140).translateY(190).step(), this.setData({
            animationData: t.export()
        });
    },
    Getques: function(t, u, a) {
        console.log("请求问题", t, u, a), clearTimeout(haha), clearInterval(start);
        var l = this;
        clearInterval(getEnemyans), console.log("ansnumber"), console.log(a), l.data.ans = void 0, 
        l.setData({
            click: !1,
            showprogress: !1
        }), l.data.hh = void 0;
        var d = app.globalData.screenWidth;
        app.util.request({
            url: "entry/wxapp/Getques",
            method: "post",
            dataType: "json",
            data: {
                rid: t,
                user_id: u,
                ansnumber: a
            },
            success: function(t) {
                if (console.log("获取题目", t), null == t.data.data.status) {
                    var a = t.data.data;
                    a.ans.sort(randomSort), setTimeout(function() {
                        l.setData({
                            ans: a,
                            matched: !0,
                            answerShow: !1,
                            seconds: l.data.allseconds
                        }), l.down();
                    }, 2e3), setTimeout(function() {
                        l.clear(), l.opacity(), l.scale(), l.Lprogress(), l.Rprogress();
                    }, 3e3), hou = setTimeout(function() {
                        l.getenemys(t.data.data, u), l.drawCircle(l.data.seconds);
                    }, 4e3);
                } else {
                    var e, n, s, r, i, o;
                    clearInterval(getEnemyans), clearInterval(dan), clearInterval(varName), clearTimeout(hou), 
                    clearTimeout(haha), clearInterval(start), l.delRprogress(), l.delLprogress(), u == t.data.data.userid_one ? (n = parseInt(t.data.data.userone_score), 
                    e = parseInt(t.data.data.usertwo_score)) : u == t.data.data.userid_two && (n = parseInt(t.data.data.usertwo_score), 
                    e = parseInt(t.data.data.userone_score)), n + e != 0 ? (s = n / (n + e), r = e / (n + e)) : s = r = .5, 
                    s < .3 && .7 < r ? (i = parseInt(.3 * d), o = parseInt(.7 * d)) : r < .3 && .7 < s ? (i = parseInt(.7 * d), 
                    o = parseInt(.3 * d)) : .5 == s && .5 == r ? (i = parseInt(.5 * d), o = parseInt(.5 * d)) : (i = parseInt(d * s), 
                    o = parseInt(d * r)), l.picopacity();
                    var c = t.data.data;
                    l.setData({
                        scoreone: n,
                        add: c,
                        scoretwo: e,
                        leftw: i,
                        rightw: o,
                        showmaster: !0,
                        Allshow: !1,
                        showprogress: !0,
                        showtime: !1,
                        showT: !0
                    }), setTimeout(function() {
                        l.leftscore(i), l.rightscore(o);
                    }, 200);
                }
            }
        });
    },
    Putanswer: function(t, a) {
        var n = this, e = n.data.ans.qid, s = n.data.battleid;
        app.util.request({
            url: "entry/wxapp/Putanswer",
            method: "post",
            dataType: "json",
            data: {
                user_id: Uid,
                rid: s,
                qid: e,
                ans: t,
                min: a
            },
            success: function(t) {
                var a = n.data.enemyans, e = t.data.data;
                n.showstatus(e, a, Uid), mysum = t.data.data.score, n.setData({
                    mysum: mysum,
                    hh: t.data.data
                });
            }
        });
    },
    getenemys: function(t, s) {
        clearInterval(getEnemyans);
        var r = this, e = t.qid;
        r.data.enemyans = void 0, r.reloadans = function() {
            var t = r.data.battleid, n = r.data.seconds, a = r.data.allseconds - r.data.seconds;
            app.util.request({
                url: "entry/wxapp/Reloadans",
                method: "post",
                dataType: "json",
                data: {
                    user_id: s,
                    rid: t,
                    qid: e,
                    min: a
                },
                success: function(t) {
                    if (0 == n || 1 == t.data.data.status) {
                        var a = r.data.hh;
                        if (0 == t.data.data.status) var e = void 0; else {
                            e = t.data.data;
                            enemysum = e.score;
                        }
                        r.showstatus(a, e, s), r.setData({
                            enemyans: t.data.data,
                            enemysum: enemysum
                        });
                    }
                }
            });
        }, getEnemyans = setInterval(r.reloadans, 500);
    },
    showstatus: function(t, a, e) {
        var n, s, r = this.data.battleid, i = this.data.ans;
        console.log(i), console.log("两人答题结果", t, a);
        var o = this, c = o.data.seconds, u = this.data.allseconds;
        if (null != a && null != t) {
            for (var l in clearInterval(getEnemyans), clearInterval(varName), i.ans) i.ans[l].key == a.answer && (n = l);
            for (var l in i.ans) i.ans[l].key == i.right && (s = l);
            console.log("对手答题", n), i.ans[n].right = 1, i.ans[n].rstatus = "0", i.ans[s].rstatus = "1", 
            o.setData({
                ans: i
            }), c = u, reply = !0, haha = setTimeout(function() {
                console.log("下一题"), ansnumber += 1, o.Lscale(), o.Lopacity(), o.Getques(r, e, ansnumber), 
                clearTimeout(haha);
            }, 1e3);
        }
        if (0 == c) {
            if (null != t && null == a) {
                for (var l in clearInterval(getEnemyans), clearInterval(varName), i.ans) i.ans[l].key == i.right && (s = l);
                i.ans[s].rstatus = "1", reply = !0, o.setData({
                    ans: i
                }), haha = setTimeout(function() {
                    console.log("下一题"), ansnumber += 1, o.Lscale(), o.Lopacity(), o.Getques(r, e, ansnumber), 
                    clearTimeout(haha);
                }, 1e3);
            }
            if (null == t && null != a) {
                for (var l in clearInterval(getEnemyans), clearInterval(varName), i.ans) i.ans[l].key == a.answer && (n = l);
                for (var l in i.ans) i.ans[l].key == i.right && (s = l);
                console.log(n), i.ans[n].right = 1, i.ans[n].rstatus = "0", i.ans[s].rstatus = "1", 
                reply = !0, o.setData({
                    ans: i
                }), haha = setTimeout(function() {
                    console.log("下一题"), ansnumber += 1, o.Lscale(), o.Lopacity(), o.Getques(r, e, ansnumber), 
                    clearTimeout(haha);
                }, 1e3);
            }
            if (null == t && null == a) {
                for (var l in clearInterval(varName), clearInterval(getEnemyans), i.ans) i.ans[l].key == i.right && (s = l);
                i.ans[s].rstatus = "1", reply = !0, o.setData({
                    ans: i
                }), haha = setTimeout(function() {
                    console.log("下一题"), ansnumber += 1, o.Lscale(), o.Lopacity(), o.Getques(r, e, ansnumber), 
                    clearTimeout(haha);
                }, 1e3);
            }
        }
    },
    click: function(t) {
        var a = this, e = (t.currentTarget.dataset.status, t.currentTarget.dataset.index), n = t.currentTarget.dataset.key, s = a.data.allseconds - a.data.seconds, r = a.data.ans;
        1 == r.ans[e].status ? a.playVoice("rightmp3") : a.playVoice("errormp3"), 0 < a.data.seconds && (a.Putanswer(n, s), 
        r.ans[e].left = 1, r.ans[e].rstatus = "0", a.setData({
            ans: r,
            click: !0
        }));
    },
    moveRight: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.translateX(-140).translateY(-190).step(), this.setData({
            animationData1: t.export()
        });
    },
    vs: function() {
        var t = this.data.screenHeight, a = this.data.screenWidth, e = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 300,
            timingFunction: "linear"
        });
        e.translateX(-a).translateY(t).step(), this.setData({
            animationData2: e.export()
        });
    },
    stop: function(t) {
        clearInterval(varName), this.drawCircle(that.data.times);
    },
    drawCircle: function(t) {
        var a = this;
        clearInterval(varName), a.animation = function() {
            1 <= t ? (t--, a.setData({
                seconds: t
            })) : (clearInterval(varName), a.setData({
                seconds: 0
            }));
        }, varName = setInterval(a.animation, 1e3);
    },
    onReady: function() {
        var t = wx.createCanvasContext("canvasCircle");
        t.setLineWidth(10), t.setStrokeStyle("#fff"), t.beginPath(), t.arc(35, 35, 29, 0, 2 * Math.PI, !1), 
        t.stroke(), t.draw();
    },
    leftscore: function(t) {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.translateX(t).step(), this.setData({
            leftscore: a.export()
        });
    },
    rightscore: function(t) {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.translateX(-t).step(), this.setData({
            rightscore: a.export()
        });
    },
    left: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.translateX(125).step(), this.setData({
            left: t.export()
        });
    },
    right: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.translateX(-125).step(), this.setData({
            right: t.export()
        });
    },
    down: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.translateY(75).opacity(1).step(), this.setData({
            down: t.export()
        });
    },
    clear: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "step-start"
        });
        t.translateY(-75).opacity(0).step(), this.setData({
            down: t.export()
        });
    },
    Lprogress: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.translateX(100).step(), this.setData({
            Lprogress: t.export()
        });
    },
    delLprogress: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.translateX(-100).step(), this.setData({
            Lprogress: t.export()
        });
    },
    delRprogress: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.translateX(100).step(), this.setData({
            Rprogress: t.export()
        });
    },
    Rprogress: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.translateX(-100).step(), this.setData({
            Rprogress: t.export()
        });
    },
    opacity: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.opacity(1).step(), this.setData({
            opacity: t.export()
        });
    },
    picopacity: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.opacity(1).step(), this.setData({
            picopacity: t.export()
        });
    },
    Lopacity: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.opacity(0).step(), this.setData({
            opacity: t.export()
        });
    },
    scale: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.scale(1, 1).step(), this.setData({
            scale: t.export()
        });
    },
    Lscale: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.scale(0, 0).step(), this.setData({
            scale: t.export()
        });
    },
    onUnload: function() {
        clearInterval(dan), clearInterval(getEnemyans), clearInterval(varName), clearTimeout(hou), 
        clearTimeout(haha), this.Friendsquit(), clearInterval(start);
    },
    onHide: function() {},
    passLevel: function() {
        wx.reLaunch({
            url: "../../index/index"
        });
    },
    Friendsquit: function() {
        var t = this.data.battleid;
        app.util.request({
            url: "entry/wxapp/Friendsquit",
            method: "post",
            dataType: "json",
            data: {
                user_id: Uid,
                rid: t
            },
            success: function(t) {}
        });
    },
    playVoice: function(t) {
        var a = this.data.mp3;
        this.audioCtx = wx.createAudioContext("myAudio"), this.audioCtx.setSrc(a[t]), this.audioCtx.play();
    },
    onShareAppMessage: function(t) {
        var a = this.data.battleid, e = app.globalData.title;
        return {
            title: e.title,
            imageUrl: e.img,
            path: "/hc_answer/pages/passLevel/shareanswer/shareanswer?user_id=" + Uid + "&battleid=" + a,
            success: function(t) {
                sharestatus = !0, wx.showToast({
                    title: "分享成功"
                });
            },
            fail: function() {
                wx.showToast({
                    title: "分享失败"
                });
            }
        };
    },
    getUserInfo: function(a) {
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
    register: function(r) {
        var i = this;
        wx.getStorage({
            key: "user",
            success: function(t) {
                var a = t.data.detail, e = a.session_key, n = a.encryptedData, s = a.iv;
                app.util.request({
                    url: "entry/wxapp/getuserinfo",
                    method: "post",
                    dataType: "json",
                    data: {
                        session_key: e,
                        encryptedData: n,
                        iv: s
                    },
                    success: function(t) {
                        app.globalData.user_id = t.data.data, "function" == typeof r && r(t.data.data), 
                        Uid = t.data.data, null != i.data.options.user_id && i.Friendsjoin(i.data.options, Uid), 
                        i.matching(i.data.options, Uid), i.Startstatus(i.data.options, Uid), i.getmyLevel(Uid), 
                        i.setData({
                            loginstatus: !0
                        });
                    }
                });
            },
            fail: function(t) {
                i.setData({
                    loginstatus: !1
                });
            }
        });
    },
    login: function(e) {
        var n = this;
        app.globalData.userInfo ? "function" == typeof cb && cb(app.globalData.userInfo) : wx.login({
            success: function(t) {
                var a = e.detail;
                (app.globalData.userInfo = a).act = "autologin", a.code = t.code, app.util.request({
                    url: "entry/wxapp/getopenid",
                    method: "post",
                    dataType: "json",
                    data: a,
                    success: function(t) {
                        0 == t.data.errno && (a.session_key = t.data.data.session_key, a.openid = t.data.data.openid, 
                        app.globalData.userInfo = a, wx.setStorageSync("user", e), "function" == typeof cb && cb(app.globalData.userInfo), 
                        n.register());
                    }
                });
            },
            fail: function(t) {
                console.log("获取失败");
            }
        });
    }
});