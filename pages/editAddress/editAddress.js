
var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
var title = app.globalData.title
var network = require("../../libs/network.js")
//上一个页面
Page({
  data: {
    region: ['请选择地址', '', ''],//picker提示字
    address: {},//存地址
    modalHidden: true,//模态框显示与隐藏
    province: '',//省
    city: '',//市
    qu: '',//区
    appid: appid,//appid
    openid: ''//openid
  },
  onLoad: function (options) {
    //获取地址
    network.GET('/dizhi!update.action?id=' + options.id,
      (res) => {
        this.setData({
          address: res.data,
          province: res.data.province,
          city: res.data.city,
          qu: res.data.qu,
          region: [res.data.province, res.data.city, res.data.qu]
        })
      }, (res) => {
        console.log(res);
      })
    //更新数据
    this.setData({
      openid: options.openid,
    })
  },
  //picker切换
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value,
      province: e.detail.value[0],
      city: e.detail.value[1],
      qu: e.detail.value[2],
    })
  },
  formBindsubmit: function (e) {
    var name = e.detail.value.name;
    var phone = e.detail.value.phone;
    var province = e.detail.value.province;
    var city = e.detail.value.city;
    var qu = e.detail.value.qu;
    var address = e.detail.value.address;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (name == '') {
      this.selectComponent("#Toast").showToast("请填写姓名")
      return false;
    }
    if (phone == '') {
      this.selectComponent("#Toast").showToast("请输入手机号码")
      return false;
    }
    if (!myreg.test(phone)) {
      this.selectComponent("#Toast").showToast("手机号码有误")
      return false;
    }
    if (this.data.province == '' || this.data.city == '' || this.data.qu == '') {
      this.selectComponent("#Toast").showToast("请选择省市区")
      return false;
    }
    if (address == '') {
      this.selectComponent("#Toast").showToast("请填写详细地址")
      return false;
    }
    wx.showLoading({
      title: '加载中....',
      mask: true,
    })
    var formData = e.detail.value;
    network.POST('/dizhi!updatedizhi.action', formData,
      (res) => {
        prevPage.setData({
          addresslist: res.data
        })
        wx.hideLoading();
        wx.navigateBack({})
      }, (res) => {
        console.log(res);
      });
  },
})
