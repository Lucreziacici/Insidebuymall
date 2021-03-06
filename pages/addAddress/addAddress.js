var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
var title = app.globalData.title
  //上一个页面
Page({
  data: {
    region: ['请选择地址', '', ''],//picker用
    isShowToast: false,//控制toast显示状态
    province: '',//省
    city: '',//市
    qu: '',//区 TODO 这个名字以后一定要改！！！
    appid: appid,//appid
    openid:null,//openid
    tip:'',//贴士
    telNumber:'',//手机号
    userName:'',//用户名
    detailInfo:'',//详细地址
  },
  onLoad: function (options) {
    //调用应用实例的方法获取全局数据（获取openid）
    app.getUserInfo( (userInfo, openid) =>{
      //更新数据
      this.setData({
        userInfo: userInfo,
        openid: openid
      });
    })
   
  },
  //picker选择方法
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value,
      province: e.detail.value[0],
      city: e.detail.value[1],
      qu: e.detail.value[2],

    })
  },
  //提交地址
  formBindsubmit: function (e) {
    var that = this;
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
    if (this.data.province == '' || this.data.city == '' || this.data.qu == '') {
      this.showToast("请选择省市区", this)
      return false;
    }
    if (address == '') {
      this.showToast("请填写详细地址", this)
      return false;
    }
    var formData = e.detail.value;
    if (!formData.openid) {
      this.showToast("提交信息失败，请刷新后重试", this)
      return false;
    }
    wx.showLoading({
      title: '加载中....',
      mask: true,
    })
    var formData = e.detail.value;  
    wx.request({
      url: url + '/dizhi!add.action',
      data: formData,
      success:  (res)=> {
        prevPage.setData({
          addresslist: res.data
        })
        wx.hideLoading();
        wx.navigateBack({})
      }
    })
  },
  //显示提示框
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
