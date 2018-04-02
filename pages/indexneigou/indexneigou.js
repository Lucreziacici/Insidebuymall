//index.js
//获取应用实例
var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
var title = app.globalData.title
Page({
  data: {
    url1: app.globalData.url,
    src1: null,
    moban: null,//首页模板
    motto: 'Hello ',
    img: null,
    userInfo: {},
    openid: '',
    banners: [],
    products: [],
    tuijians: [],//精品推荐的内容
    navbar: [],
    currentTab: 0,
    admin:{},

  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //响应点击导航栏
  navbarTap: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    that.setData({
      currentTab: e.currentTarget.dataset.idx,
      products: [],
    })

    wx.request({
      url: url + '/foodchain!huoqu.action?appid=' + appid + '&onemenu.id=' + id,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {

        that.setData({
          products: res.data.objs2
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
  onLoad: function () {
    console.log('onLoad')

    var that = this
    //调用应用实例的方法获取全局数据

    wx.setNavigationBarTitle({ title: title })

    wx.request({
      url: url + '/foodchain!tohomepage.action?appid=' + appid,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log('res。date' + res.data.objs[0].img);

        that.setData({
          banners: res.data.objs,
          products: res.data.objs2,
          tuijians: res.data.objs3,
          navbar: res.data.objs4,
          admin: res.data.object
        });
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }

    })

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo, openid) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        openid: openid
      })
    })

  },
  gourl: function (e){
    wx.navigateTo({
      url: '../product/product?id=76' 
    })
  }
})
