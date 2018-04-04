// 删减40行 做成公共类 by xixi
// 删减20行 toast 抽象by xixi 18/4/3
var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
Page({
  data: {
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
      this.selectComponent("#Toast").showToast("请填写姓名");
      return false;
    }
    if (phone == '') {
      this.selectComponent("#Toast").showToast("请输入手机号码");
      return false;
    }
    if (!myreg.test(phone)) {
      this.selectComponent("#Toast").showToast("手机号码有误");
      return false;
    }
    if (bumen == '') {
      this.selectComponent("#Toast").showToast("请填写所在部门");
      return false;
    }
    if (name1 == '') {
      this.selectComponent("#Toast").showToast("请填写主管姓名");
      return false;
    }
    if (!(this.data.radio1)) {
      this.selectComponent("#Toast").showToast("请阅读协议");
      return false;
    }
    wx.showLoading({
      title: '加载中....',
      mask: true
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
})