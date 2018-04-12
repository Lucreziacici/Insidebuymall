// pages/orderDetail/orderDetail.js
var network = require("../../libs/network.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.selectComponent("#Toast").showToast("123")
  },
  // 删除订单
  deleteOrder: function () {
    this.selectComponent("#Toast").showToast("123")
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
  }
})