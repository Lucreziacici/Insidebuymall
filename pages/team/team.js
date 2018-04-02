//获取应用实例
var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid


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
      wx.request({
        url: url + '/team!findteam1.action?openid=' + openid,
        method: 'get',
        success: (res) => {
          this.setData({
            team: res.data,
          })
        },
        fail: (res) => {
          console.log('submit fail');
        },
        complete: (res) => {
          console.log('submit complete');
        }
      })
    })
    //获取管理员信息
    wx.request({
      url: url + '/team!getadmin.action?appid=' + appid,
      method: 'get',
      success: (res) => {
        this.setData({
          admin: res.data
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

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