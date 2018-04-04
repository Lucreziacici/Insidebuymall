var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
var secret = app.globalData.secret
var partner = app.globalData.partner
var partnerkey = app.globalData.partnerkey

Page({
  data: {
    timeStamp: '',
    nonceStr: '',
    package1: '',
    paySign: '',
    userInfo: {},
    openid: null,
    oid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.getUserInfo(function (userInfo, openid) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        openid: openid
      })
      if (!that.data.openid) {
        that.selectComponent("#Toast").showToast("信息读取失败，请刷新后重试");
        return false;
      }
      wx.request({
        url: url + '/order!zhifu1.action?oid=' + options.oid + '&appid=' + appid + '&openid=' + that.data.openid + '&secret=' + secret + '&partner=' + partner + '&partnerkey=' + partnerkey,
        method: 'get',
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          console.log('预支付回掉：' + res.data);
          that.setData({
            timeStamp: res.data.res3,
            nonceStr: res.data.res4,
            package1: res.data.res1,
            paySign: res.data.res2,
            oid: res.data.res5
          });
          //发起支付
          wx.requestPayment({
            'timeStamp': that.data.timeStamp,
            'nonceStr': that.data.nonceStr,
            'package': that.data.package1,
            'signType': 'MD5',
            'paySign': that.data.paySign,
            'success': function (res) {
              console.log("支付成功");
              wx.redirectTo({
                url: '../myorder/myorder'
              })
            },
            fail: function (res) {
              console.log("res:" + res);
            },
            complete: function () {
            }

          })

        },
        fail: function (res) {
          console.log('submit fail');
        },
        complete: function (res) {
          console.log('submit complete');
        }
      })
    })
    
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})