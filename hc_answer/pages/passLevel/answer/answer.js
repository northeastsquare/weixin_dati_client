var _data;

function _defineProperty(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var dan, getEnemyans, varName, replystatus, hou, haha, houhou, timesec, app = getApp(), mysum = 0, enemysum = 0, reply = !1, ansnumber = 0;

function randomSort(a, t) {
    return .5 < Math.random() ? -1 : 1;
}

Page({
    data: (_data = {
        matching: !1,
        matched: !1,
        loop: !1,
        question: [],
        click: !1
    }, _defineProperty(_data, "matched", !0), _defineProperty(_data, "loop", !0), _defineProperty(_data, "answerShow", !0), 
    _defineProperty(_data, "score", {
        myscore: {
            myscore: "0",
            myrate: "10"
        },
        enemy: {
            enemy: "0",
            enemyrate: "10"
        }
    }), _defineProperty(_data, "seconds", 10), _data),
    onLoad: function(a) {
        enemysum = ansnumber = mysum = 0;
        var t = app.globalData.appname, e = app.globalData.mp3;
        wx.setNavigationBarTitle({
            title: t.title
        }), "" != t.fontcolor && "" !== t.maincolor && wx.setNavigationBarColor({
            frontColor: t.fontcolor,
            backgroundColor: t.maincolor
        }), this.setData({
            answerimg: t.answerimg,
            dan_idss: a.dan_idss,
            dan_id: a.dan_id,
            appname: t,
            mp3: e
        });
        var n = app.globalData.mylevel;
        console.log(n);
        var s = this.data.seconds, r = app.globalData.screenHeight, i = app.globalData.screenWidth;
        this.setData({
            screenHeight: r,
            screenWidth: i,
            seconds: s,
            mylevel: n,
            mysum: 0,
            enemysum: 0,
            Allshow: !0,
            showprogress: !1
        }), this.matching(a.dan_id);
    },
    onShow: function() {
        this.Sys(), wx.getNetworkType({
            success: function(a) {
                a.networkType;
            }
        }), wx.onNetworkStatusChange(function(a) {
            "none" == a.networkType && (clearInterval(dan), clearInterval(getEnemyans), clearInterval(varName), 
            clearTimeout(hou), clearTimeout(haha), wx.showModal({
                title: "当前无网络",
                content: "请先确认网络链接没问题",
                showCancel: !1,
                success: function(a) {
                    if (a.confirm) {
                        wx.navigateBack({
                            delta: 1
                        });
                        this.audioCtx.pause();
                    }
                }
            }));
        });
    },
    passlevel: function() {
        wx.navigateBack({
            delta: 1
        });
        this.audioCtx.pause();
    },
    matching: function(a) {
        var i = this;
        i.getenemy = function() {
            var r = app.globalData.user_id;
            app.util.request({
                url: "entry/wxapp/Matching",
                method: "post",
                dataType: "json",
                data: {
                    user_id: r,
                    dan: a
                },
                success: function(a) {
                    clearInterval(dan);
                    var t = a.data.data.user;
                    for (var e in t) if (t[e].uid == r) var n = t[e]; else var s = t[e];
                    i.moveLeft(), i.moveRight(), i.vs(), i.setData({
                        myself: n,
                        enemy: s,
                        matched: !1,
                        matching: !0,
                        user_id: r,
                        rid: a.data.data.rid
                    }), i.Getques(a.data.data.rid);
                },
                fail: function(a) {}
            });
        }, dan = setInterval(i.getenemy, 1e3);
    },
    Sys: function() {
        var r = this;
        app.util.request({
            url: "entry/wxapp/Sys",
            method: "post",
            dataType: "json",
            success: function(a) {
                var t = JSON.parse(a.data.data.ques).times, e = JSON.parse(a.data.data.answer), n = JSON.parse(a.data.data.ques), s = JSON.parse(a.data.data.basic);
                r.setData({
                    times: 100 * t,
                    seconds: t,
                    allseconds: t,
                    successpic: e.success,
                    draw: e.draw,
                    mp3: n,
                    allansnum: n.quesnum,
                    basic: s
                });
            }
        });
    },
    moveLeft: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        setTimeout(function() {
            a.translateX(140).translateY(190).step(), this.setData({
                animationData: a.export()
            });
        }.bind(this), 100);
    },
    Getques: function(a) {
        clearInterval(getEnemyans);
        var u = app.globalData.user_id, d = this;
        d.data.ans = void 0, d.setData({
            click: !1
        }), d.data.hh = void 0;
        var l = app.globalData.screenWidth;
        app.util.request({
            url: "entry/wxapp/Getques",
            method: "post",
            dataType: "json",
            data: {
                rid: a,
                user_id: u,
                ansnumber: ansnumber
            },
            success: function(a) {
                if (null == a.data.data.status) {
                    var t = a.data.data;
                    console.log("未排序", a.data.data), t.ans.sort(randomSort), console.log("排序", t), setTimeout(function() {
                        d.setData({
                            ans: a.data.data,
                            matched: !0,
                            answerShow: !1,
                            seconds: d.data.allseconds
                        }), d.left(), d.right(), d.down();
                    }, 2e3), setTimeout(function() {
                        d.clear(), d.opacity(), d.scale(), d.Lprogress(), d.Rprogress();
                    }, 3500), hou = setTimeout(function() {
                        d.getenemys(a.data.data), d.drawCircle(d.data.seconds);
                    }, 4e3);
                } else {
                    var e, n, s, r, i, o;
                    clearInterval(dan), clearInterval(getEnemyans), clearInterval(varName), clearTimeout(hou), 
                    clearTimeout(haha), d.delRprogress(), d.delLprogress(), u == a.data.data.userid_one ? (n = parseInt(a.data.data.userone_score), 
                    e = parseInt(a.data.data.usertwo_score)) : u == a.data.data.userid_two && (n = parseInt(a.data.data.usertwo_score), 
                    e = parseInt(a.data.data.userone_score)), n + e != 0 ? (s = n / (n + e), r = e / (n + e)) : s = r = .5, 
                    s < .3 && .7 < r ? (i = parseInt(.3 * l), o = parseInt(.7 * l)) : r < .3 && .7 < s ? (i = parseInt(.7 * l), 
                    o = parseInt(.3 * l)) : .5 == s && .5 == r ? (i = parseInt(.5 * l), o = parseInt(.5 * l)) : (i = parseInt(l * s), 
                    o = parseInt(l * r)), d.Selfdan(), d.picopacity(), d.audioCtx.pause();
                    var c = a.data.data;
                    d.setData({
                        scoreone: n,
                        scoretwo: e,
                        leftw: i,
                        add: c,
                        rightw: o,
                        Allshow: !1,
                        showprogress: !0
                    }), setTimeout(function() {
                        d.leftscore(i), d.rightscore(o);
                    }, 200);
                }
            }
        });
    },
    Selfdan: function() {
        var a = app.globalData.user_id, n = this;
        app.util.request({
            url: "entry/wxapp/Selfdan",
            method: "post",
            dataType: "json",
            data: {
                user_id: a
            },
            success: function(a) {
                for (var t = a.data.data, e = 0; e < t.length; e++) n.data.dan_idss == t[e].dan_id && 1 == t[e].status && n.data.dan_id == n.data.dan_idss && wx.setStorageSync("getdanmoney", 1);
            }
        });
    },
    Putanswer: function(a, t) {
        var n = this, e = app.globalData.user_id, s = n.data.ans.qid, r = n.data.rid;
        app.util.request({
            url: "entry/wxapp/Putanswer",
            method: "post",
            dataType: "json",
            data: {
                user_id: e,
                rid: r,
                qid: s,
                ans: a,
                min: t
            },
            success: function(a) {
                var t = n.data.enemyans, e = a.data.data;
                n.showstatus(e, t), mysum = a.data.data.score, n.setData({
                    mysum: mysum,
                    hh: a.data.data
                });
            }
        });
    },
    getenemys: function(a) {
        clearInterval(getEnemyans);
        var s = this, r = a.qid;
        s.data.enemyans = void 0, s.reloadans = function() {
            var a = app.globalData.user_id, t = s.data.rid, n = s.data.seconds, e = s.data.allseconds - s.data.seconds;
            app.util.request({
                url: "entry/wxapp/Reloadans",
                method: "post",
                dataType: "json",
                data: {
                    user_id: a,
                    rid: t,
                    qid: r,
                    min: e
                },
                success: function(a) {
                    if (0 == n || 1 == a.data.data.status) {
                        var t = s.data.hh;
                        if (0 == a.data.data.status) var e = void 0; else {
                            e = a.data.data;
                            enemysum = e.score;
                        }
                        s.showstatus(t, e), s.setData({
                            enemyans: a.data.data,
                            enemysum: enemysum
                        });
                    }
                }
            });
        }, getEnemyans = setInterval(s.reloadans, 500);
    },
    showstatus: function(a, t) {
        var e, n, s = this.data.rid, r = this.data.ans;
        console.log("两人答题结果", a, t);
        var i = this, o = (s = i.data.rid, i.data.seconds), c = this.data.allseconds;
        if (null != t && null != a) {
            for (var u in clearInterval(getEnemyans), clearInterval(varName), r.ans) r.ans[u].key == t.answer && (e = u);
            for (var u in r.ans) r.ans[u].key == r.right && (n = u);
            console.log("对手答题", e), r.ans[e].right = 1, r.ans[e].rstatus = "0", r.ans[n].rstatus = "1", 
            i.setData({
                ans: r
            }), o = c, reply = !0, haha = setTimeout(function() {
                ansnumber += 1, console.log(ansnumber), i.Lscale(), i.Lopacity(), i.Getques(s), 
                i.audioCtx.pause(), clearTimeout(timesec), clearTimeout(haha);
            }, 1e3);
        }
        if (0 == o) {
            if (null != a && null == t) {
                for (var u in clearInterval(getEnemyans), clearInterval(varName), r.ans) r.ans[u].key == r.right && (n = u);
                r.ans[n].rstatus = "1", reply = !0, i.setData({
                    ans: r
                }), haha = setTimeout(function() {
                    ansnumber += 1, i.Lscale(), i.Lopacity(), i.Getques(s), i.audioCtx.pause(), clearTimeout(timesec), 
                    clearTimeout(haha);
                }, 1e3);
            }
            if (null == a && null != t) {
                for (var u in clearInterval(getEnemyans), clearInterval(varName), r.ans) r.ans[u].key == t.answer && (e = u);
                for (var u in r.ans) r.ans[u].key == r.right && (n = u);
                console.log(e), r.ans[e].right = 1, r.ans[e].rstatus = "0", r.ans[n].rstatus = "1", 
                reply = !0, i.setData({
                    ans: r
                }), haha = setTimeout(function() {
                    ansnumber += 1, i.Lscale(), i.Lopacity(), i.Getques(s), i.audioCtx.pause(), clearTimeout(timesec), 
                    clearTimeout(haha);
                }, 1e3);
            }
            if (null == a && null == t) {
                for (var u in clearInterval(varName), clearInterval(getEnemyans), r.ans) r.ans[u].key == r.right && (n = u);
                r.ans[n].rstatus = "1", reply = !0, i.setData({
                    ans: r
                }), haha = setTimeout(function() {
                    ansnumber += 1, i.Lscale(), i.Lopacity(), i.Getques(s), i.audioCtx.pause(), clearTimeout(timesec), 
                    clearTimeout(haha);
                }, 1e3);
            }
        }
    },
    click: function(a) {
        var t = this, e = t.data.mp3, n = (a.currentTarget.dataset.status, a.currentTarget.dataset.index), s = a.currentTarget.dataset.key, r = t.data.allseconds - t.data.seconds, i = t.data.ans;
        1 == i.ans[n].status ? (t.audioCtx = wx.createAudioContext("myAudio"), t.audioCtx.setSrc(e.rightmp3)) : (t.audioCtx = wx.createAudioContext("myAudio"), 
        t.audioCtx.setSrc(e.errormp3)), t.audioCtx.play(), 0 < t.data.seconds && (t.Putanswer(s, r), 
        i.ans[n].left = 1, i.ans[n].rstatus = "0", t.setData({
            ans: i,
            click: !0
        }));
    },
    moveRight: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        setTimeout(function() {
            a.translateX(-140).translateY(-190).step(), this.setData({
                animationData1: a.export()
            });
        }.bind(this), 600);
    },
    vs: function() {
        var a = this.data.screenHeight, t = this.data.screenWidth, e = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 300,
            timingFunction: "linear"
        });
        setTimeout(function() {
            e.translateX(-t).translateY(a).step(), this.setData({
                animationData2: e.export()
            });
        }.bind(this), 100);
    },
    stop: function(a) {
        clearInterval(varName), this.drawCircle(that.data.times);
    },
    drawCircle: function(a) {
        var t = this, e = t.data.mp3, n = 1e3 * parseInt(a - 3);
        timesec = setTimeout(function() {
            t.audioCtx = wx.createAudioContext("myAudio"), t.audioCtx.setSrc(e.descbgm), t.audioCtx.play();
        }, n), clearInterval(varName), t.animation = function() {
            1 <= a ? (a--, t.setData({
                seconds: a
            })) : (clearInterval(varName), t.audioCtx.pause(), clearTimeout(timesec), t.setData({
                seconds: 0
            }));
        }, varName = setInterval(t.animation, 1e3);
    },
    onReady: function() {
        var a = wx.createCanvasContext("canvasCircle");
        a.setLineWidth(10), a.setStrokeStyle("#fff"), a.beginPath(), a.arc(35, 35, 29, 0, 2 * Math.PI, !1), 
        a.stroke(), a.draw();
    },
    leftscore: function(a) {
        console.log("leftW"), console.log(a);
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.translateX(a).step(), this.setData({
            leftscore: t.export()
        });
    },
    rightscore: function(a) {
        console.log("rightw"), console.log(a);
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        t.translateX(-a).step(), this.setData({
            rightscore: t.export()
        });
    },
    left: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.translateX(125).step(), this.setData({
            left: a.export()
        });
    },
    right: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.translateX(-125).step(), this.setData({
            right: a.export()
        });
    },
    down: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.translateY(75).opacity(1).step(), this.setData({
            down: a.export()
        });
        var t = this.data.mp3;
        parseInt(t.quesnum) - ansnumber == 1 && this.lastque();
    },
    clear: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "step-start"
        });
        a.translateY(-75).opacity(0).step(), this.setData({
            down: a.export()
        });
    },
    Lprogress: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.translateX(100).step(), this.setData({
            Lprogress: a.export()
        });
    },
    delLprogress: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.translateX(-100).step(), this.setData({
            Lprogress: a.export()
        });
    },
    delRprogress: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.translateX(100).step(), this.setData({
            Rprogress: a.export()
        });
    },
    Rprogress: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.translateX(-100).step(), this.setData({
            Rprogress: a.export()
        });
    },
    opacity: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.opacity(1).step(), this.setData({
            opacity: a.export()
        });
    },
    picopacity: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.opacity(1).step(), this.setData({
            picopacity: a.export()
        });
    },
    Lopacity: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.opacity(0).step(), this.setData({
            opacity: a.export()
        });
    },
    scale: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.scale(1, 1).step(), this.setData({
            scale: a.export()
        });
    },
    lastque: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.scale(1, 1).step(), this.setData({
            lastque: a.export()
        });
    },
    Lscale: function() {
        var a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 400,
            timingFunction: "linear"
        });
        a.scale(0, 0).step(), this.setData({
            scale: a.export()
        });
    },
    onUnload: function() {
        console.log("返回上一级页面"), clearInterval(dan), clearInterval(getEnemyans), clearInterval(varName), 
        clearTimeout(hou), clearTimeout(haha), clearTimeout(timesec), this.audioCtx && this.audioCtx.pause();
    },
    onShareAppMessage: function(a) {
        var t = app.globalData.user_id, e = app.globalData.title;
        wx.showShareMenu({
            withShareTicket: !0,
            success: function(a) {}
        });
        var n = this;
        return {
            title: e.title,
            imageUrl: e.img,
            path: "/hc_answer/pages/share/sharedetail/sharedetail?user_id=" + t,
            withShareTicket: !0,
            success: function(a) {
                wx.getShareInfo({
                    shareTicket: a.shareTickets[0],
                    success: function(a) {
                        n.Forward(a);
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