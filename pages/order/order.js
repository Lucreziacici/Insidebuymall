var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid

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
    wx.request({
      url: url + '/order!order.action?oid=' + options.oid,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log('res：' + res.data.objs2);
        that.setData({
          order: res.data,
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

  deleteorder: function (e) {
    var that = this;

    wx.request({
      url: url + '/order!deleteorder.action?oid=' + that.data.oid,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log('res：' + res.data);
        wx.hideLoading();
        that.setData({

          modalHidden: true,
        })
        wx.redirectTo({
          url: '../myorder/myorder',
        })
      },
    })
  },
  queren: function (e) {
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
      this.modalTap("是否确认发货？");
    }
    if (that.data.leixing == "发货3") {
      this.modalTap("是否确认发货？");
    }
    if (that.data.leixing == '物流') {
      wx.navigateTo({
        url: '../wuliu/wuliu?id=' + oid + '&key=0',

      })

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

    wx.request({
      url: url + '/order!querenfahuo0.action?oid=' + that.data.oid,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log('res：' + res.data);
        wx.hideLoading();
        that.setData({
          order: res.data,

          modalHidden: true,
        })
      },
    })
  },
  querenfahuo1: function (e) {
    var that = this;

    wx.request({
      url: url + '/order!querenfahuo11.action?order3id=' + that.data.oid,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log('res：' + res.data);
        wx.hideLoading();
        that.setData({
          order: res.data,
          modalHidden: true,
        })
      },
    })
  },
  fukuan: function (e) {
    var that = this;
    console.log('oid:' + e.currentTarget.id);
    wx.request({
      url: url + '/order!fukuan1.action?oid=' + e.currentTarget.id,
      method: 'POST',
      header: { 'Content-Type': "application/x-www-form-urlencoded" },
      success: function (res) {
        console.log('res：' + res.data);
        wx.hideLoading();
        wx.redirectTo({
          url: '../final/final?oid=' + res.data
        })
      },
    })
  },
  tuikuan: function (e) {
    var that = this;
    wx.request({
      url: url + '/order!tuikuan1.action?oid=' + that.data.oid,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log('res：' + res.data);
        wx.hideLoading();
        that.setData({
          order: res.data,
          modalHidden: true,
        });
        that.selectComponent("#Toast").showToast("您已提交退款申请~耐心等待审核");
      },
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


})