//index.js
//获取应用实例
var app = getApp();
console.log(app)
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
    isApprove:false

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
      url: url + '/foodchain!huoqu1.action?appid=' + appid + '&onemenu.id=' + id,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res)
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
      url: url + '/foodchain!tohomepageneigou.action?appid=' + appid,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res)

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
  },
  gourl: function (e){
    
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  // 前往搜索页，带个参数
  gosearch:function(e){
    wx.navigateTo({
      url: "/pages/allsearch/allsearch?type=1",
    })
  },

  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    var that=this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo, openid) {
      //更新数据
      if (!openid) {
        that.selectComponent("#Toast").showToast("获取信息失败，请刷新后重试")
        return false;
      }
      that.setData({
        userInfo: userInfo,
        openid: openid
      })
    
      wx.request({
        url: url + '/team!findteam1.action?openid=' + openid,
        method: 'get',
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          if (res.data.shstatus =='审核通过'){
            that.setData({
              isApprove:true
            });

          }
          if (res.data.shstatus==null){
            wx.redirectTo({
              url: '../login/login?openid='+openid,
            })
          }
        },
        fail: function (res) {
          console.log('submit fail');
        },
        complete: function (res) {
          console.log('submit complete');
        }
      })
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'ZIGGIEPrivateSale',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
