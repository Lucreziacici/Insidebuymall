// pages/orderList/orderList.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resource: app.globalData.url,//资源路径
    orderList:[],//订单列表
    activedTab:0,//tab激活状态
    tabList:['全部订单','待付款','待发货','已发货','已完成','退款'],

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
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)

        this.setData({
          srollHeight: res.windowHeight - 51,
        });
      }
    });
    
  },
  // 切换tab
  switchTab:function(option){
    console.log(option)
    this.setData({
      activedTab: option.target.dataset.id
    })
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
  // 加载更多
  loadMore:function(){
   console.log("111")
  },
  // 删除订单
  deleteOrder: function () {
    console.log("删除订单")
  },
  // 支付订单
  payOrder: function () {
    console.log("支付订单")
  },
  //查看物流 
  checkLogistics: function () {
    console.log("查看物流")
  },
  // 退款
  refundOrder: function () {
    console.log("退款")
  },
  //确认收货
  confirmOrder: function () {
    console.log("确认收货")
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})