//app.js
App({
  onLaunch: function() {
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
      
     
    }else{
      //调用登录接口
      wx.login({
        success: function (e) {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              wx.request({
                url: that.globalData.url + '/team!getuserinfo.action',
                // data: e.detail.value,
               
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                  code: e.code,
                  imgUrl: res.userInfo.avatarUrl,
                  nickname: res.userInfo.nickName,
                  appid: that.globalData.appid,
                  appsecret: that.globalData.secret,
                  
                },
                method: 'POST', 
                success: function (res) {
                  console.log('team.openid:' + res.data.openid);
                  that.globalData.openid = res.data.openid
                  typeof cb == "function" && cb(that.globalData.userInfo, res.data.openid)
                  
                },
                fail: function (res) {
                  console.log('submit fail');
                },
                complete: function (res) {
                  console.log('submit complete');
                }
              })
            },
            fail: function (res) {//用户拒绝获取头像和昵称就执行这个方法获取openid
              wx.request({
                url: that.globalData.url + '/team!getuserinfo1.action',
                // data: e.detail.value,

                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                  code: e.code,
                  appid: that.globalData.appid,
                  appsecret: that.globalData.secret,
                },
                method: 'POST',
                success: function (res) {
                  console.log('team.openid:' + res.data.openid);
                  that.globalData.openid = res.data.openid
                  typeof cb == "function" && cb(that.globalData.userInfo, res.data.openid)
                },
                fail: function (res) {
                  console.log('submit fail1');
                },
                complete: function (res) {
                  console.log('submit complete1');
                }
              })
            },
            complete: function (res) {
              console.log('submit complete111221');
            }
          })

        }
      })
    }
  },
  globalData: {
    url:'https://fx.comeyang.com',
    appid: 'wx56cdb2dddcd85394',//appid需自己提供，此处的appid我随机编写  
    secret:'37951450999e53b003be17fb540179e0',//secret需自己提供，此处的secret我随机编写 
    partner: '1488718912',//商户号
    partnerkey: 'LnFqv5I4LFGSDq3QjsNgUuI8x7jvs2Fo',//支付密钥
    title:'ZIGGIE内购商城',
    userInfo:null,
    openid:null,
  }
})
  