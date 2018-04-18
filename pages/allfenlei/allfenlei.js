//获取应用实例
var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
var title = app.globalData.title
var list = null;
var network = require("../../libs/network.js")
Page({
  data: {
    url1: app.globalData.url,
    fenlei: false,
    logs: [],
    product1s: [],
    onemenus: [],
    page: 1,
    dibu: false,
    onemenuid: null,
    keyword: "输入关键字",
    isShowModal: false,//弹层弹出
  },
  onLoad: function (options) {
    network.GET('/product1!allfenlei1.action?appid=' + appid + '&onemenu.id=' + options.id,
      (res) => {
        list = res.data
        this.setData({
          product1s: res.data.objs2,
          onemenus: res.data.objs,
          onemenuid: options.id,
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
  /**
* 生命周期函数--监听页面显示
*/
  onShow: function () {
    //调用应用实例的方法获取全局数据
    app.getUserInfo((userInfo, openid) => {
      //更新数据
      
      if (!openid) {
        this.selectComponent("#Toast").showToast("获取信息失败，请刷新后重试");
        return false;
      }
      this.setData({
        userInfo: userInfo,
        openid: openid
      })
      network.GET('/team!findteam1.action?openid=' + openid,
        (res) => {
          if (res.data.shstatus == '审核通过') {
            this.setData({
              isApprove: true
            });

          }
          if (res.data.shstatus == null) {
            wx.redirectTo({
              url: '../login/login?openid=' + openid,
            })
          }
        }, (res) => {
          console.log(res);
        })
     
    })
  },
  onChangeShowState: function () {
    this.setData({
      fenlei: !this.data.fenlei
    })
  },
  tagChoose: function (options) {
    var id = options.currentTarget.dataset.id;
    //设置当前样式
    this.setData({
      'currentTab': id
    })
  },
  onReachBottom: function () {

    if (!(this.data.dibu)) {
      wx.showLoading({
        title: '加载中...',
        mask: true,
      })
      var Lsit = [];
      var page = this.data.page + 1;
      network.GET('/product1!allfenlei1.action?appid=' + appid + '&page=' + page + '&onemenu.id=' + this.data.onemenuid,
        (res) => {
          var lastLsit = this.data.product1s
          var curList = [];
          if (res.data.length > 0) {
            var List = [];
            curList = res.data;
            List = lastLsit.concat(curList)
            wx.hideLoading()
          }
          if (res.data.length < 10) {
            this.setData({
              dibu: true
            });
            wx.hideLoading()
          }
          this.setData({
            page: this.data.page + 1,
            product1s: List,
          });
        }, (res) => {
          console.log(res);
        })
      
    }
  },
  keywordSubmit: function (event) {
    wx.redirectTo({
      url: '../allsearch/allsearch?keyword=' + event.detail.value,
    })
  },
  keywordInput: function (event) {
    var key = event.detail.value
    this.setData({
      keyword: key
    })
  },
  suosuo: function (event) {
    wx.redirectTo({
      url: '../allsearch/allsearch?keyword=' + this.data.keyword,
    })
  },
  gosearch: function () {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  closeModal: function (res) {
    this.setData({
      fenlei: false
    })

  },

})