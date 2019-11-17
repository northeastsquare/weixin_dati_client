var _echarts = require("../../../ec-canvas/echarts"), echarts = _interopRequireWildcard(_echarts);

function _interopRequireWildcard(a) {
    if (a && a.__esModule) return a;
    var t = {};
    if (null != a) for (var e in a) Object.prototype.hasOwnProperty.call(a, e) && (t[e] = a[e]);
    return t.default = a, t;
}

var a, b, mydetail, app = getApp(), option = {
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

function initChart(e, t, r) {
    var i = echarts.init(e, null, {
        width: t,
        height: r
    }), o = app.globalData.user_id;
    return app.util.request({
        url: "entry/wxapp/Lookshare",
        method: "post",
        dataType: "json",
        data: {
            user_id: o
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
        this.Sys();
        var a = app.globalData.user_id;
        this.getDetail(a);
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
                t.setData({
                    mydetail: a.data.data.bottom,
                    user: a.data.data.user
                });
            }
        });
    },
    Sys: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/Sys",
            method: "post",
            dataType: "json",
            success: function(a) {
                var t = JSON.parse(a.data.data.ques).times, e = JSON.parse(a.data.data.answer), r = JSON.parse(a.data.data.basic);
                wx.setNavigationBarTitle({
                    title: r.title
                }), "" != r.fontcolor && "" !== r.maincolor && wx.setNavigationBarColor({
                    frontColor: r.fontcolor,
                    backgroundColor: r.maincolor
                }), app.globalData.pic = e, console.log(e), i.setData({
                    times: 100 * t,
                    seconds: t,
                    appname: r,
                    allseconds: t,
                    successpic: e.success,
                    draw: e.draw,
                    pic: e,
                    answerimg: r.answerimg
                });
            }
        });
    },
    index: function() {
        wx.redirectTo({
            url: "../../index/index"
        });
    },
    myshare: function() {
        wx.redirectTo({
            url: "../detail/detail"
        });
    },
    onShareAppMessage: function(a) {
        var t = app.globalData.user_id, e = app.globalData.title;
        return a.from, console.log(a.target), {
            title: e.title,
            imageUrl: e.img,
            path: "/hc_answer/pages/share/sharedetail/sharedetail?user_id=" + t,
            success: function() {},
            fail: function() {}
        };
    }
});