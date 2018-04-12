var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
var network = require("../../libs/network.js")
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
    network.GET('/order!findwuliu.action?orderid=' + options.id + '&key=' + options.key,
      (res) => {
        this.setData({
          order: res.data.object,
          logistics: res.data.objs,
        });
      }, (res) => {
        console.log(res);
      })
  },

})