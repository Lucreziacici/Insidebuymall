//  现460行
var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
var network = require("../../libs/network.js")
Page({

  data: {
    currentTab: 0,
    userInfo: {},
    openid: null,
    url1: app.globalData.url,
    orders: {},
    oid: '',
    modalHidden: true,
    leixing: null,
    status: "",
  },
  onLoad: function () {
    //调用应用实例的方法获取全局数据
    app.getUserInfo((userInfo, openid) => {
      if (!openid) {
        this.selectComponent("#Toast").showToast("获取信息失败，请刷新后重试");
        return false;
      }
      //更新数据
      this.setData({
        userInfo: userInfo,
        openid: openid
      })
      network.GET('/order!myorder.action?appid=' + appid + '&openid=' + openid,
        (res) => {
          this.setData({
            orders: res.data,
          });
        }, (res) => {
          console.log(res);
        })
    })

  },
  onShow: function () {
    var currentTab = this.data.currentTab;
    this.setData({
      orders: {},
    })
    wx.showLoading({
      title: '加载中....',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    if (currentTab == 0) {
      this.onLoad();
    }
    if (currentTab == 1) {
      network.GET('/order!myorder1.action?appid=' + appid + '&openid=' + this.data.openid,
        (res) => {
          wx.hideLoading();
          this.setData({
            orders: res.data,
          });
        }, (res) => {
          console.log(res);
        })
    }
    if (currentTab == 2) {
      var getdata = {};
      getdata.appid = appid;
      getdata.openid = this.data.openid;
      getdata.fhstatus = "待发货";
      network.POST('/order!myorder2.action', getdata,
        (res) => {
          wx.hideLoading();
          this.setData({
            orders: res.data,
          });
        }, (res) => {
          console.log(res);
        })
    }
    if (currentTab == 3) {
      var getdata = {};
      getdata.appid = appid;
      getdata.openid = this.data.openid;
      getdata.fhstatus = "已发货";
      network.POST('/order!myorder2.action', getdata,
        (res) => {
          wx.hideLoading();
          this.setData({
            orders: res.data,
          });
        }, (res) => {
          console.log(res);
        })
    }
    if (currentTab == 4) {
      var getdata = {};
      getdata.appid = appid;
      getdata.openid = this.data.openid;
      getdata.fhstatus = "已完成";
      network.POST('/order!myorder2.action', getdata,
        (res) => {
          wx.hideLoading();
          this.setData({
            orders: res.data,
          });
        }, (res) => {
          console.log(res);
        })
    }
    if (currentTab == 5) {
      network.GET('/order!tkorder.action?appid=' + appid + '&openid=' + this.data.openid,
        (res) => {
          wx.hideLoading();
          this.setData({
            orders: res.data,
          });
        }, (res) => {
          console.log(res);
        })
    }
    wx.hideLoading();
  },
  allorder: function (e) {
    console.log(' e.target.dataset.current:' + e.target.dataset.current);
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
    wx.showLoading({
      title: '加载中....',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    network.GET('/order!myorder.action?appid=' + appid + '&openid=' + this.data.openid,
      (res) => {
        wx.hideLoading();
        this.setData({
          orders: res.data,
        });
      }, (res) => {
        console.log(res);
      })
  },
  myorder1: function (e) {
    console.log(' e.target.dataset.current:' + e.target.dataset.current);
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current,
        orders: {},
      })
    }
    wx.showLoading({
      title: '加载中....',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    network.GET('/order!myorder1.action?appid=' + appid + '&openid=' + this.data.openid,
      (res) => {
        wx.hideLoading();
        this.setData({
          orders: res.data,
        });
      }, (res) => {
        console.log(res);
      })
  },
  myorder2: function (e) {
    console.log('1111 e.target.key:' + e.target.dataset.key);
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current,
        orders: {},
      })
    }
    wx.showLoading({
      title: '加载中....',
      mask: true,
    })
    var getdata = {};
    getdata.appid = appid;
    getdata.openid = this.data.openid;
    getdata.fhstatus = e.target.dataset.key;
    network.POST('/order!myorder2.action', getdata,
      (res) => {
        wx.hideLoading();
        this.setData({
          orders: res.data,
        });
      }, (res) => {
        console.log(res);
      })
  },
  myorder3: function (e) {
    console.log(' e.target.key:' + e.target.dataset.key);
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current,
        orders: {},
      })
    }
    wx.showLoading({
      title: '加载中....',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    network.GET('/order!tkorder.action?appid=' + appid + '&openid=' + this.data.openid,
      (res) => {
        wx.hideLoading();
        this.setData({
          orders: res.data,
        });
      }, (res) => {
        console.log(res);
      })
  },
  deleteorder: function (e) {
    network.GET('/order!deleteorder.action?oid=' + this.data.oid,
      (res) => {
        wx.hideLoading();
        this.setData({
          orders: res.data,
          modalHidden: true,
        });
      }, (res) => {
        console.log(res);
      })
  },
  queren: function (e) {
    var oid = e.currentTarget.dataset.id;
    var leixing = e.currentTarget.dataset.class;

    this.setData({
      oid: oid,
      leixing: leixing
    })
    if (this.data.leixing == "删除") {
      this.modalTap("确认删除吗？");
    }
    if (this.data.leixing == "退款") {
      this.modalTap("确认退款吗？");
    }
    if (this.data.leixing == "发货") {
      this.modalTap("是否确认收货？");
    }
    if (this.data.leixing == "发货3") {
      this.modalTap("是否确认收货？");
    }

  },
  //弹出确认框  
  modalTap: function (tex) {
    this.setData({
      modalHidden: false,
      tip: tex
    })
  },
  confirm_one: function (e) {
    if (this.data.leixing == "删除") {
      this.deleteorder();
    }
    if (this.data.leixing == "退款") {
      this.tuikuan();
    }
    if (this.data.leixing == "发货") {
      this.querenfahuo();
    }
    if (this.data.leixing == "发货3") {
      this.querenfahuo1();
    }
  },
  cancel_one: function (e) {
    this.setData({
      modalHidden: true,
    });
  },
  querenfahuo: function (e) {
    network.GET('/order!querenfahuo.action?oid=' + this.data.oid,
      (res) => {
        wx.hideLoading();
        this.setData({
          orders: res.data,
          currentTab: 3,
          modalHidden: true,
        });
      }, (res) => {
        console.log(res);
      })
  },
  querenfahuo1: function (e) {
    network.GET('/order!querenfahuo1.action?order3id=' + this.data.oid,
      (res) => {
        wx.hideLoading();
        this.setData({
          orders: res.data,
          currentTab: 3,
          modalHidden: true,
        });
      }, (res) => {
        console.log(res);
      })
  },
  fukuan: function (e) {
    network.POST('/order!fukuan1.action?oid=' + e.currentTarget.id, {},
      (res) => {
        wx.navigateTo({
          url: '../final/final?oid=' + res.data
        })
      }, (res) => {
        console.log(res);
      })
  },
  tuikuan: function (e) {
    network.GET('/order!tuikuan.action?oid=' + this.data.oid,
      (res) => {
        wx.hideLoading();
        this.setData({
          orders: res.data,
          currentTab: 5,
          modalHidden: true,
        })
      }, (res) => {
        console.log(res);
      })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '我的订单',
      path: 'pages/myorder/myorder',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})