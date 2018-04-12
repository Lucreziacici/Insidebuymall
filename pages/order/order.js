var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
var network = require("../../libs/network.js")
Page({

  data: {
    url1: app.globalData.url,
    order: {},
    modalHidden: true,
    oid: '',
    modalHidden: true,
    leixing: null,
    isShowToast: false,
    tip: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo, openid) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        openid: openid
      })
    })
    network.GET('/order!order.action?oid=' + options.oid,
      (res) => {
        that.setData({
          order: res.data,
        });
      }, (res) => {
        console.log(res);
      })
  },

  deleteorder: function (e) {
    var that = this;
    network.GET('/order!deleteorder.action?oid=' + that.data.oid,
      (res) => {
        wx.hideLoading();
        that.setData({

          modalHidden: true,
        })
        wx.redirectTo({
          url: '../myorder/myorder',
        })
      }, (res) => {
        console.log(res);
      })
    // wx.request({
    //   url: url + '/order!deleteorder.action?oid=' + that.data.oid,
    //   method: 'get',
    //   header: { 'Content-Type': 'application/json' },
    //   success: function (res) {
    //     console.log('res：' + res.data);
    //     wx.hideLoading();
    //     that.setData({

    //       modalHidden: true,
    //     })
    //     wx.redirectTo({
    //       url: '../myorder/myorder',
    //     })
    //   },
    // })
  },
  queren: function (e) {
    console.log(e)
    var that = this;
    var oid = e.currentTarget.dataset.id;
    var leixing = e.currentTarget.dataset.class;

    that.setData({
      oid: oid,
      leixing: leixing
    })
    if (that.data.leixing == "删除") {
      this.modalTap("确认删除吗？");
    }
    if (that.data.leixing == "退款") {
      this.modalTap("确认退款吗？");
    }
    if (that.data.leixing == "发货") {
      this.modalTap("是否确认收货？");
    }
    if (that.data.leixing == "发货3") {
      this.modalTap("是否确认收货？");
    }
    if (that.data.leixing == '物流') {
      if (e.currentTarget.dataset.type == '1') {
        wx.navigateTo({
          url: '../logistics/logistics?id=' + oid + '&key=0',

        })
      } else {
        wx.navigateTo({
          url: '../logistics/logistics?id=' + oid + '&key=1',

        })
      }


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
    var that = this;
    if (that.data.leixing == "删除") {
      that.deleteorder();
    }
    if (that.data.leixing == "退款") {
      that.tuikuan();
    }
    if (that.data.leixing == "发货") {
      that.querenfahuo();
    }
    if (that.data.leixing == "发货3") {
      that.querenfahuo1();
    }
  },
  cancel_one: function (e) {
    console.log(e);

    this.setData({
      modalHidden: true,
    });
  },
  querenfahuo: function (e) {
    var that = this;
    network.GET('/order!querenfahuo0.action?oid=' + that.data.oid,
      (res) => {
        wx.hideLoading();
        that.setData({
          order: res.data,

          modalHidden: true,
        })
      }, (res) => {
        console.log(res);
      })
    // wx.request({
    //   url: url + '/order!querenfahuo0.action?oid=' + that.data.oid,
    //   method: 'get',
    //   header: { 'Content-Type': 'application/json' },
    //   success: function (res) {
    //     console.log('res：' + res.data);
    //     wx.hideLoading();
    //     that.setData({
    //       order: res.data,

    //       modalHidden: true,
    //     })
    //   },
    // })
  },
  querenfahuo1: function (e) {
    var that = this;
    network.GET('/order!querenfahuo11.action?order3id=' + that.data.oid,
      (res) => {
        wx.hideLoading();
        that.setData({
          order: res.data,
          modalHidden: true,
        })
      }, (res) => {
        console.log(res);
      })
    // wx.request({
    //   url: url + '/order!querenfahuo11.action?order3id=' + that.data.oid,
    //   method: 'get',
    //   header: { 'Content-Type': 'application/json' },
    //   success: function (res) {
    //     console.log('res：' + res.data);
    //     wx.hideLoading();
    //     that.setData({
    //       order: res.data,
    //       modalHidden: true,
    //     })
    //   },
    // })
  },
  fukuan: function (e) {
    var that = this;
    console.log('oid:' + e.currentTarget.id);
    network.POST('/order!fukuan1.action?oid=' + e.currentTarget.id, {},
      (res) => {
        wx.hideLoading();
        console.log(res.data)
        wx.redirectTo({
          url: '../final/final?oid=' + res.data
        })
      }, (res) => {
        console.log(res);
      })
    // wx.request({
    //   url: url + '/order!fukuan1.action?oid=' + e.currentTarget.id,
    //   method: 'POST',
    //   header: { 'Content-Type': "application/x-www-form-urlencoded" },
    //   success: function (res) {
    //     console.log('res：' + res.data);
    //     wx.hideLoading();
    //     wx.redirectTo({
    //       url: '../final/final?oid=' + res.data
    //     })
    //   },
    // })
  },
  tuikuan: function (e) {
    var that = this;
    network.GET('/order!tuikuan1.action?oid=' + that.data.oid,
      (res) => {
        wx.hideLoading();
        that.setData({
          order: res.data,
          modalHidden: true,
        });
        that.selectComponent("#Toast").showToast("您已提交退款申请~耐心等待审核");
      }, (res) => {
        console.log(res);
      })
    // wx.request({
    //   url: url + '/order!tuikuan1.action?oid=' + that.data.oid,
    //   method: 'get',
    //   header: { 'Content-Type': 'application/json' },
    //   success: function (res) {
    //     console.log('res：' + res.data);
    //     wx.hideLoading();
    //     that.setData({
    //       order: res.data,
    //       modalHidden: true,
    //     });
    //     that.selectComponent("#Toast").showToast("您已提交退款申请~耐心等待审核");
    //   },
    // })
  },


})