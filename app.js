App({
    onLaunch: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                t.globalData.brand = e.brand, t.globalData.screenWidth = e.windowWidth, t.globalData.screenHeight = e.windowHeight;
            }
        });
    },
    util: require("we7/resource/js/util.js"),
    globalData: {
        userInfo: null,
        device: {}
    },
    siteInfo: require("siteinfo.js")
});