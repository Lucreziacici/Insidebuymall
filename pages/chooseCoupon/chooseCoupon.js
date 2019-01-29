// pages/chooseCoupon/chooseCoupon.js
//获取应用实例
var app = getApp()
var url = app.globalData.url
var resourceurl = app.globalData.resourceurl
var appid = app.globalData.appid
var network = require("../../libs/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: "", //userid
    order_no: "",//订单号
    choose_coupon:"",//选择的优惠券id
    available_list: [], //可用
    un_available_list: [], //不可用
    resourceurl: resourceurl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    this.setData({
      order_no: options.order_no,
      choose_coupon: options.coupon_id
    })
    app.getUserInfo((userInfo, open_id) => {
      //更新数据
      this.setData({
        userid: open_id,
      });
      if (!this.data.userid) {
        this.selectComponent("#Toast").showToast("信息读取失败，请刷新后重试");
      }
    })
    this.getAvailableCouponList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    
  },
  getAvailableCouponList: function() {
    network.GETJSON("Order/AvailableCouponList", {
      order_no: this.data.order_no
    }, (res) => {
      if (res.data.res_status_code == '0') {
        var available_list = res.data.res_content.available_list;
        var un_available_list = res.data.res_content.un_available_list;
        for (var i = 0; i < available_list.length; i++) {
          available_list[i].starttime = network.getFormatDate(new Date(available_list[i].due_from.replace("T", " ").replace("-", "/").replace("-", "/")).getTime());
          available_list[i].endtime = network.getFormatDate(new Date(available_list[i].due_to.replace("T", " ").replace("-", "/").replace("-", "/")).getTime());

        }
        for (var i = 0; i < un_available_list.length; i++) {
          un_available_list[i].starttime = network.getFormatDate(new Date(un_available_list[i].due_from.replace("T", " ").replace("-", "/").replace("-", "/")).getTime());
          un_available_list[i].endtime = network.getFormatDate(new Date(un_available_list[i].due_to.replace("T", " ").replace("-", "/").replace("-", "/")).getTime());

        }
        this.setData({
          available_list: available_list,
          un_available_list: un_available_list
        })
      } else {
        this.selectComponent("#Toast").showToast(res.data.res_message);
      }
    }, (res) => {
      console.log(res)
    }, this.data.userid)

  },
  choose: function(e) {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];//上局页面
    network.POST("Order/UpdateOrderCoupon", {
      order_no: this.data.order_no,
      id: e.currentTarget.dataset.id
    }, (res) => {
      if (res.data.res_status_code == '0') {
        this.setData({
          choose_coupon:e.currentTarget.dataset.id
        })
        prevPage.getOrderDetail();
        wx.navigateBack({})
      } else {
        this.selectComponent("#Toast").showToast(res.data.res_message);
      }
    }, (res) => {
      console.log(res)
    }, this.data.userid)
  }


})