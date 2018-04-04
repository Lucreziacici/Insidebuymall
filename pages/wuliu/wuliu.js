var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {},
    logistics:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: url + '/order!findwuliu.action?orderid=' + options.id + '&key='+options.key,
      success:  (res)=> {
        this.setData({
          order: res.data.object,
          logistics: res.data.objs,
        });
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }
    })
  },

})