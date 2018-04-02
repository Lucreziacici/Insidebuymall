// 删减40行 做成公共类 by xixi
var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
Page({
  data: {
    isShowToast: false,//提示框是否显示
    tip: '',//提示框内容
    radio1: true,//单选框
    openid: '',//openid
  },
  /**
   * 生命周期函数--监听页面加
   */
  onLoad: function (options) {
    this.setData({
      openid: options.openid,
    })
  },
  radioChange: function (e) {
    this.setData({
      radio1: !this.data.radio1
    })
  },
  formBindsubmit: function (e) {
    var name = e.detail.value.name;
    var bumen = e.detail.value.bumen;
    var name1 = e.detail.value.name1;
    var phone = e.detail.value.phone;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (name == '') {
      this.showToast("请填写姓名", this)
      return false;
    }
    if (phone == '') {
      this.showToast("请输入手机号码", this)
      return false;
    }
    if (!myreg.test(phone)) {
      this.showToast("手机号码有误", this)
      return false;
    }
    if (bumen == '') {
      this.showToast("请填写所在部门", this)
      return false;
    }
    if (name1 == '') {
      this.showToast("请填写主管姓名", this)
      return false;
    }
    if (!(this.data.radio1)) {
      this.showToast("请阅读协议", this)
      return false;
    }
    wx.showLoading({
      title: '加载中....',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    wx.request({
      url: url + '/team!zhuce.action',
      data: {
        bumen: bumen,
        name: name,
        name1: name1,
        phone: phone,
        openid: this.data.openid,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        wx.switchTab({
          url: '../index/index'
        })
        wx.hideLoading();
      }
    })
  },
  showToast: function (text, that) {
    that.setData({
      tip: text,
      isShowToast: !that.data.isShowToast
    })
    setTimeout(function () {
      that.setData({
        isShowToast: !that.data.isShowToast
      });
    }, 1500);
  },
})