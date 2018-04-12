// 删减150行 by xixi
var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
var network = require("../../libs/network.js")
Page({
  data: {
    tip: '',//提示框文字
    openid: '',//用户openid
    province: '',//省 应该没用到
    city: '',//市 应该没用到
    qu: '',//区 应该没用到
    phone: '',//手机号
    team: {},//用户身份
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      openid: options.openid,
    })
    network.GET('/team!findteam1.action?openid=' + options.openid,
      (res) => {
        this.setData({
          team: res.data,
        });
      }, (res) => {
        console.log(res);
      })
  },
  //提交表单
  formBindsubmit: function (e) {
    var name = e.detail.value.name;
    var bumen = e.detail.value.bumen;
    var name1 = e.detail.value.name1;
    var phone = e.detail.value.phone;
    var company = e.detail.value.company;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var shen = e.detail.value.shen;
    var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
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
      this.selectComponent("#Toast").showToast("请填写所在部门")
      return false;
    }
    if (name1 == '') {
      this.selectComponent("#Toast").showToast("请填写主管姓名")
      return false;
    }
    if (company == '') {
      this.selectComponent("#Toast").showToast("请填写公司名称");
      return false;
    }
    if (shen == '') {
      this.selectComponent("#Toast").showToast("身份号不能为空")
      return false;
    }
    if (!pattern.test(shen)) {
      this.selectComponent("#Toast").showToast("身份号格式有误")
      return false;
    }
    wx.showLoading({
      title: '加载中....',
      mask: true,
    })
    var formData = e.detail.value;
    formData.openid = this.data.openid;
    network.POST('/team!uodateteam.action', formData,
      (res) => {
        wx.navigateTo({
          url: '../index/index'
        })
        wx.hideLoading();
        wx.navigateBack({})
      }, (res) => {
        console.log(res);
      })
  },
})