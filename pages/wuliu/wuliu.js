var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url1: app.globalData.url,
    order: {},
    kuaidis:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('id:' + options.id);
    console.log('key:' + options.key);
    var that =this
    wx.request({
      url: url + '/order!findwuliu.action?orderid=' + options.id + '&key='+options.key,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log('res：' + res.data.objs);
        that.setData({
          order: res.data.object,
          kuaidis: res.data.objs,
         
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