// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifyList:[
      "美容护理", "化妆彩妆", "男士护理", "香水香氛", "营养保健", "功效分类", "品牌导航"
    ],
    currentTab:"0",
    classifyitem: [
      { classifyname: ["洁面", "去角质", "面膜", "爽肤水", "乳液", "日霜", "晚霜"]}
    ],
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
   console.log("下拉刷新")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  // 切换
  navbarTap:function(e){
    
    this.setData({
      currentTab: e.currentTarget.id
    })
  }
})