// 删减40行 做成公共类 by xixi
// 删减20行 toast 抽象by xixi 18/4/3
var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
var network = require("../../libs/network.js")
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
    var company=e.detail.value.company;
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
    if (company==''){
      this.selectComponent("#Toast").showToast("请填写公司名称");
      return false;
    }
    if (!(this.data.radio1)) {
      this.selectComponent("#Toast").showToast("请阅读协议");
      return false;
    }
    wx.showLoading({
      title: '加载中....',
      mask: true
    });

    var zhuce={};
    zhuce.bumen = bumen;
    zhuce.name = name;
    zhuce.name1 = name1;
    zhuce.phone = phone;
    zhuce.company = company;
    zhuce.openid = this.data.openid;
    network.POST('/team!zhuce.action',zhuce,
       (res)=> {
        wx.switchTab({
          url: '../index/index'
        })
        wx.hideLoading();
      }, (res) => {
        console.log(res);
      })
  },
})