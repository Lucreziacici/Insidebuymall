//index.js
//获取应用实例
const app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
var title = app.globalData.title
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      { src: '../../images/swiper.jpg',
        link:"/pages/product/product"
      },
      {
        src: '../../images/swiper.jpg',
        link: "/pages/product/product"
      },
      {
        src: '../../images/swiper.jpg',
        link: "/pages/product/product"
      }
    ],
    navigation: [
      {
        src: "../../images/question-icon.png",
        title: "常见问题",
        link: "/pages/question/question"
      },
      {
        src: "../../images/new-icon.png",
        title: "新品推荐"
      },
      {
        src: "../../images/skin-care-icon.png",
        title: "护肤推荐"
      },
      {
        src: "../../images/beauty-icon.png",
        title: "美妆推荐"
      }
    ],
    special: [
      {
        link: "/pages/commodity/commodity",
        img: "../../images/new-product.png"
      },
      {
        link: "/pages/commodity/commodity",
        img: "../../images/new-product.png"
      },
      {
        link: "/pages/commodity/commodity",
        img: "../../images/new-product.png"
      },
      {
        link: "/pages/commodity/commodity",
        img: "../../images/new-product.png"
      },
      {
        link: "/pages/commodity/commodity",
        img: "../../images/new-product.png"
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular:true,
    toView: 'red',
    scrollTop: 100,
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(res)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  /**
* 生命周期函数--监听页面显示
*/
  onShow: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo, openid) {
      //更新数据

      that.setData({
        userInfo: userInfo,
        openid: openid
      })

      wx.request({
        url: url + '/team!findteam1.action?openid=' + openid,
        method: 'get',
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          if (res.data.shstatus == null) {
            wx.redirectTo({
              url: '../login/login?openid=' + openid,
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
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

})
