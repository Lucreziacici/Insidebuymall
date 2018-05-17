// pages/commodityList/commodityLists.js
var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
var title = app.globalData.title
var network = require("../../libs/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resource: app.globalData.url,
    keyword: "请输入关键词",
    srollHeight:"",
    isShowModal:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    network.GET('/product1!allproduct11.action?appid=' + appid,
      (res) => {
       console.log(res)
        this.setData({
          product1s: res.data.objs2,
          onemenus: res.data.objs,
        });
        if (res.data.objs2.length < 10) {
          this.setData({
            dibu: true
          });
        }
      }, (res) => {
        console.log(res);
      })
  },
  onShow:function(options){
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          srollHeight: res.windowHeight,
        });
      }
    });
  },
  //前往搜索
  gosearch: function (options) {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  //加载更多
  loadMore:function(e){
    console.log("123")
  },
  //打开抽屉导航
  openNavigation:function(){
    this.setData({
      isShowModal: true
    })
  },
  //关闭抽屉导航
  closeModal:function(){
    this.setData({
      isShowModal:false
    })
  }
})