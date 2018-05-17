//app.js
var network = require("/libs/network.js")
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    var objuser;
    if (this.globalData.userInfo && this.globalData.openid) {
      typeof cb == "function" && cb(this.globalData.userInfo, this.globalData.openid)
    } else {
      //调用登录接口
      wx.login({
        success: function (e) {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              let formData = {};
              formData.code = e.code;
              formData.imgUrl = res.userInfo.avatarUrl;
              formData.nickname = res.userInfo.nickName;
              formData.appid = that.globalData.appid;
              formData.appsecret = that.globalData.secret;
              network.POST('/team!getuserinfo.action', formData,
                (res) => {
                  that.globalData.openid = res.data.openid
                  typeof cb == "function" && cb(that.globalData.userInfo, res.data.openid)
                }, (res) => {
                  console.log(res);
                })
            },
            fail: function (res) {//用户拒绝获取头像和昵称就执行这个方法获取openid
              var formData = {};
              formData.code = e.code;
              formData.appid = that.globalData.appid,
                formData.appsecret = that.globalData.secret,
                network.POST('/team!getuserinfo1.action', formData,
                  (res) => {
                    console.log(res)
                    that.globalData.openid = res.data.openid
                    typeof cb == "function" && cb(that.globalData.userInfo, res.data.openid)
                  }, (res) => {
                    console.log(res);
                  })
            },
            complete: function (res) {
              console.log('submit complete'); 
            }
          })

        }
      })
    }
  },
  globalData: {
    url: 'https://fx.comeyang.com',
    appid: 'wx56cdb2dddcd85394',//appid需自己提供，此处的appid我随机编写  
    secret: '37951450999e53b003be17fb540179e0',//secret需自己提供，此处的secret我随机编写 
    partner: '1488718912',//商户号
    partnerkey: 'LnFqv5I4LFGSDq3QjsNgUuI8x7jvs2Fo',//支付密钥
    title: 'ZIGGIE内购商城',
    userInfo: null,
    openid: null,
  }
})
