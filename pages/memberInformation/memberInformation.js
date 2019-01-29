// 删减150行 by xixi
var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
var network = require("../../libs/network.js")
Page({
  data: {
    tip: '',//提示框文字
    openid: '',//用户openid
    phone: '',//手机号
    team: {},//用户身份
    real_name:"",
    idcard:"",
    department:"",
    company:"",
    manager:"",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    array: ['老板', '采购', '店长'],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getUserInfo((userInfo, open_id) => {
      //更新数据
      this.setData({
        userid: open_id,
      });
      if (!this.data.userid) {
        this.selectComponent("#Toast").showToast("信息读取失败，请刷新后重试");
      }
      this.CustomerInfo();
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  updatename: function (e) {
    this.setData({
      real_name: e.detail.value
    })
  },
  updateidcard: function (e) {
    this.setData({
      idcard: e.detail.value
    })
  },
  updatenum: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  updatebumen: function (e) {
    this.setData({
      department: e.detail.value
    })
  },
  updatecompany: function (e) {
    this.setData({
      company: e.detail.value
    })
  },
  updatename1: function (e) {
    this.setData({
      manager: e.detail.value
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.errMsg == 'getUserInfo:ok') {
      var timestamp = Date.parse(new Date());
      var expiration = timestamp + 1000 * 60 * 60 * 24 * 5;//记住时间五天后过期
      wx.setStorage({
        key: 'userinfo_time',
        data: expiration,
      })
      var data = {};
      data.nick_name = e.detail.userInfo.nickName;
      data.avatarUrl = e.detail.userInfo.avatarUrl
      data.gender = e.detail.userInfo.gender
      data.province = e.detail.userInfo.province
      data.city = e.detail.userInfo.city
      network.POST("Customer/SaveCustomerWxConfig", data, (res) => {
        console.log(res)
        if (res.data.res_status_code == '0') {
          app.globalData.userInfo = res.data.res_content
          wx.setStorage({
            key: 'userinfo',
            data: res.data.res_content,
            success: (res) => {
              this.formBindsubmit();
            },
            fail: function (res) {
              console.log(res);
            }
          })
        } else {
          this.selectComponent("#Toast").showToast(res.data.res_message);
        }
      }, (res) => {
        console.log(res)
      })

    } else {
      wx.showToast({
        icon: 'none',
        title: '请允许授权',
      })
    }

  },
  //获取用户信息
  CustomerInfo:function(){
    network.GET('Customer/CustomerInfo',
      (res) => {
        console.log(res)
        if (res.data.res_status_code == '0') {
          this.setData({
            team: res.data.res_content,
            cust_shop_type: res.data.res_content.cust_shop_type,
            real_name: res.data.res_content.real_name,
            phone: res.data.res_content.phone,
            idcard: res.data.res_content.id_card,
            manager: res.data.res_content.manager,
            department: res.data.res_content.department,
            company: res.data.res_content.company,
          });
        } else {
          this.selectComponent("#Toast").showToast(res.data.res_message);
        }
      }, (res) => {
        console.log(res);
      }, this.data.userid)
  },
  //提交表单
  formBindsubmit: function (e) {
    var real_name = this.data.real_name;//姓名
    var department = this.data.department;//部门
    var manager = this.data.manager;//主管姓名
    var phone = this.data.phone;//手机号
    var company = this.data.company;//公司
    var idcard = this.data.idcard;//身份证
    // var cust_shop_name = e.detail.value.shopname;//店铺名称
    // var cust_shopkeeper_id = e.detail.value.managerid;//掌柜id
    // var cust_public_name = e.detail.value.officialname;//公众号名称
    // var cust_position = this.data.array[this.data.index];//职务
    // if (this.data.index) {
    //   var cust_position = this.data.array[this.data.index];//职务
    // } else {
    //   var cust_position = this.data.team.cust_position;//职务
    // }
    // var cust_remark = e.detail.value.remark;//备注
    // var cust_shop_address = e.detail.value.shopaddress;//地址
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (this.data.real_name == '') {
      this.selectComponent("#Toast").showToast("请填写姓名");
      return false;
    }
    if (this.data.phone == '') {
      this.selectComponent("#Toast").showToast("请输入手机号码");
      return false;
    }
    if (!myreg.test(this.data.phone)) {
      this.selectComponent("#Toast").showToast("手机号码有误");
      return false;
    }
    if (!this.data.department) {
      this.selectComponent("#Toast").showToast("请填写所在部门");
      return false;
    }
    if (!this.data.manager) {
      this.selectComponent("#Toast").showToast("请填写主管姓名");
      return false;
    }
    if (!company) {
      this.selectComponent("#Toast").showToast("请填写公司名称");
      return false;
    }
    // if (!cust_shop_name && this.data.cust_shop_type) {
    //   this.selectComponent("#Toast").showToast("请填写店铺名称");
    //   return false;
    // }
    // if (!cust_shopkeeper_id && this.data.cust_shop_type == 'Taobao') {
    //   this.selectComponent("#Toast").showToast("请填写掌柜ID");
    //   return false;
    // }
    // if (!cust_public_name && this.data.cust_shop_type == 'WX') {
    //   this.selectComponent("#Toast").showToast("请填写公众号名称");
    //   return false;
    // }
    // if (!cust_position && this.data.cust_shop_type) {
    //   this.selectComponent("#Toast").showToast("请填写职位");
    //   return false;
    // }
    // if (e.detail.value.id_card == ''&& !this.data.cust_shop_type) {
    //   this.selectComponent("#Toast").showToast("身份号不能为空")
    //   return false;
    // }
    // if (!pattern.test(e.detail.value.id_card) && !this.data.cust_shop_type) {
    //   this.selectComponent("#Toast").showToast("身份号格式有误")
    //   return false;
    // }
    wx.showLoading({
      title: '加载中....',
      mask: true,
    })
    // var formData = e.detail.value;
    // console.log(formData)
    // formData.phone = e.detail.value.phone
    var zhuce = {};
    if (real_name) zhuce.real_name = real_name;
    else zhuce.real_name = ''
    zhuce.phone = phone;
    if (manager) zhuce.manager = manager;
    else zhuce.manager = ''
    if (department) zhuce.department = department;
    else zhuce.department = ''
    if (company) zhuce.company = company;
    else zhuce.company = ''
    if (idcard) zhuce.id_card = idcard;
    else zhuce.id_card = ''
    // if (cust_shop_name) zhuce.cust_shop_name = cust_shop_name;
    // else zhuce.cust_shop_name = ''
    // if (cust_shopkeeper_id) zhuce.cust_shopkeeper_id = cust_shopkeeper_id;
    // else zhuce.cust_shopkeeper_id = ''
    // if (cust_public_name) zhuce.cust_public_name = cust_public_name;
    // else zhuce.cust_public_name = ''
    // if (cust_position) zhuce.cust_position = cust_position;
    // else zhuce.cust_position = '';
    // if (cust_shop_address) zhuce.cust_shop_address = cust_shop_address;
    // else zhuce.cust_shop_address = ''
    // if (cust_remark) zhuce.cust_remark = cust_remark;
    // else zhuce.cust_remark = ''
    // if (this.data.cust_shop_type) zhuce.cust_shop_type = this.data.cust_shop_type;
    // else zhuce.cust_shop_type = ''
    network.POST('Customer/ReviseCustomer', zhuce,
      (res) => {
        console.log(res)
        if (res.data.res_status_code == '0') {
          app.globalData.userInfo = res.data.res_content;
          wx.setStorage({
            key: 'userinfo',
            data: res.data.res_content,
          })
          
          wx.navigateBack({})
        } else {
          this.selectComponent("#Toast").showToast(res.data.res_message)
        }
        wx.hideLoading();
      }, (res) => {
        console.log(res);
      })
  },
})