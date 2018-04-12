var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
var network = require("../../libs/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo: {},//用户信息
      openid: null,//openid
      resources: app.globalData.url,//资源路径
      orderinformation: {},//订单信息
      yhjuanview:false,
      orderslist:[],//订单商品状态
      yhjuans:[],//优惠券
  },

  onLoad: function (options) {
    //调用应用实例的方法获取全局数据
    app.getUserInfo( (userInfo, openid)=> {
      //更新数据
      this.setData({
        userInfo: userInfo,
        openid: openid
      })
      if (!openid) {
        this.selectComponent("#Toast").showToast("获取信息失败，请刷新后重试");
        return false;
      }
    })
    network.GET('/order!findorer.action?oid=' + options.oid,
      (res) => {
        console.log(res.data)
        this.setData({
          orderinformation: res.data.object,
          orderslist: res.data.objs,
          yhjuans: res.data.objs2,
        });
      }, (res) => {
        console.log(res);
      })
  },
  // 更改优惠券
  changeyhjuanview: function (e) {
     this.setData({
       yhjuanview: (!this.data.yhjuanview)
     })
  },
  // 更新优惠券
  updateyhjuan:function(e){
    var id = e.currentTarget.id;
    network.GET('/order!updateyhjuan.action?oid=' + this.data.orderinformation.oid + '&yid=' + id,
      (res) => {
        this.setData({
          orderinformation: res.data,
          yhjuanview: !this.data.yhjuanview
        });
      }, (res) => {
        console.log(res);
      })
  
  },
  //更新备注
  updatebeizhu: function (event){
    var tex = event.detail.value;
    wx.showLoading({
      title: '加载中....',
      mask: true,
    })
    network.GET('/order!updatebeizhu.action?oid=' + this.data.orderinformation.oid + '&beizhu=' + tex,
      (res) => {
        wx.hideLoading();
      }, (res) => {
        console.log(res);
      })
   
  },
   //提交备注
  beizhuSubmit: function (event) {
    var tex = event.detail.value;
    wx.showLoading({
      title: '加载中....',
      mask: true,
    })
    network.GET('/order!updatebeizhu.action?oid=' + this.data.orderinformation.oid + '&beizhu=' + tex,
      (res) => {
        wx.hideLoading();
      }, (res) => {
        console.log(res);
      })
  
  },
  //支付
  zhifu: function (event) {
    if (this.data.orderinformation.province == null){
      this.selectComponent("#Toast").showToast("请选择收货地址");
    }else{
      network.GET('/order!findorer.action?oid=' + this.data.orderinformation.oid,
        (res) => {
          this.setData({
            orderinformation: res.data.object,
            orderslist: res.data.objs,
            yhjuans: res.data.objs2,
          });
          if (res.data.res1 == "不足") {
            this.selectComponent("#Toast").showToast("你所购买的商品已售完，请重新下单");
          } else {
            wx.navigateTo({
              url: '../zhifu/zhifu?oid=' + this.data.orderinformation.oid
            })
          }
        }, (res) => {
          console.log(res);
        })
     
    }
  }, 
})