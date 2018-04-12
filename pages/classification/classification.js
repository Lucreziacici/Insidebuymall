// pages/classification/classification.js
var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
var network = require("../../libs/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resources: app.globalData.url,//资源路径
    classification:[],//分类列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    network.GET('/product1!allproduct11.action?appid=' + appid,
      (res) => {
        this.setData({
          classification: res.data.objs,
        });
      }, (res) => {
        console.log(res);
      })
  },
})