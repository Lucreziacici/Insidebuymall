//获取应用实例
var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
var network = require("../../libs/network.js")
Page({
  data: {
    resources: app.globalData.url,//资源路径
    appid: '',//appid
    userInfo: {},//用户微信信息
    openid: null,//用户openid
    admin: {},//管理信息
    team: {},//用户信息
    list:[
      {
        name:"地址管理",
        link:"../addressList/addressList"
      },
      {
        name: "优惠劵管理",
        link: "../yhjuan/yhjuan"
      },
      {
        name: "我的资料",
        link: "../memberInformation/memberInformation"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //调用应用实例的方法获取全局数据
    app.getUserInfo((userInfo, openid) => {
      //更新数据
      this.setData({
        userInfo: userInfo,
        openid: openid
      })
      //获取用户信息
      network.GET('/team!findteam1.action?openid=' + openid,
        (res) => {
          this.setData({
            team: res.data,
          })
        }, (res) => {
          console.log(res);
        })
    })
    //获取管理员信息
    network.GET('/team!getadmin.action?appid=' + appid,
      (res) => {
        this.setData({
          admin: res.data
        });
      }, (res) => {
        console.log(res);
      })
  },
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.admin.kfphone, //此号码并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '个人中心',
      path: 'pages/team/team',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }


})