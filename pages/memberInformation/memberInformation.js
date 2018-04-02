// 删减150行 by xixi
var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
Page({
  data: {
    isShowToast: false,//控制提示框
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
    wx.request({
      url: url + '/team!findteam1.action?openid=' + options.openid,
      success: (res) => {
        this.setData({
          team: res.data,
        });
      },
      fail: (res) => {
        console.log('submit fail');
      },
      complete: (res) => {
        console.log('submit complete');
      }
    })
  },
  //提交表单
  formBindsubmit: function (e) {
    var name = e.detail.value.name;
    var bumen = e.detail.value.bumen;
    var name1 = e.detail.value.name1;
    var phone = e.detail.value.phone;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var shen = e.detail.value.shen;
    var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
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
    if (shen == '') {
      this.showToast("身份号不能为空", this)
      return false;
    }
    if (!pattern.test(shen)) {
      this.showToast("身份号格式有误", this)
      return false;
    }
    wx.showLoading({
      title: '加载中....',
      mask: true,
    })
    var formData = e.detail.value;
    wx.request({
      url: url + '/team!uodateteam.action',
      data: {
        bumen: bumen,
        name: name,
        name1: name1,
        phone: phone,
        openid: this.data.openid,
        shen: shen,
      },
      success:  (res)=> {
        wx.navigateTo({
          url: '../index/index'
        })
        wx.hideLoading();
        wx.navigateBack({})
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