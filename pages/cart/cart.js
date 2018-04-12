var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
var network = require("../../libs/network.js")
Page({
  data: {
    resources: app.globalData.url,//资源路径
    checkAllStatus: true,//全选状态
    carts: [],//购物车
    allprice: 0.0,//合计
    openid: null,//用户openid
    appid: app.globalData.appid,//小程序appid
    modalHidden: true,//弹框
    modalStatus: true,//弹框
    cartid: null,//选中商品的id
    cartindex: null,//选中商品的index
    cartvalues: [],//选中商品数组
    isApprove: false,//是否通过审核
  },
  onLoad: function (options) {
    //获取用户信息
    app.getUserInfo((userInfo, openid) => {
      network.GET('/team!findteam1.action?openid=' + openid,
        (res) => {
          if (res.data.shstatus == '审核通过') {
            this.setData({
              isApprove: true
            });
          }
        }, (res) => {
          console.log(res);
        })
      //更新数据
      this.setData({
        openid: openid
      });
    });
  },
  onShow: function () {
    //调用应用实例的方法获取全局数据
    app.getUserInfo((userInfo, openid) => {
      //更新数据
      if (!openid) {
        this.selectComponent("#Toast").showToast("获取信息失败，请刷新后重试")
        return false;
      }
      this.setData({
        openid: openid
      })
      network.GET('/cart!findall1.action?openid=' + this.data.openid + '&appid=' + appid,
        (res) => {
          this.setData({
            carts: res.data.objs,
            allprice: res.data.allprice.toFixed(2),
            checkAllStatus: true,
          });
        }, (res) => {
          console.log(res);
        })
    })
  },
  //选择checkbox
  checkboxChange: function (e) {
    var carts = this.data.carts, values = e.detail.value;
    var price = 0;
    var xuanzhong = true;
    for (var i = 0; i < carts.length; ++i) {
      carts[i].checked = false;
      for (var j = 0; j < values.length; ++j) {
        if (carts[i].id == values[j]) {
          carts[i].checked = true;
          break
        }
      }
    }
    for (var i = 0; i < carts.length; i++) {
      if (this.data.carts[i].checked) {
        price = this.data.carts[i].allprice + price
      }
      if (!(this.data.carts[i].checked)) {
        xuanzhong = false;
      }
    }
    if (xuanzhong) {
      this.setData({
        checkAllStatus: true,
        carts: carts,
        allprice: price.toFixed(2)
      });
    } else {
      this.setData({
        checkAllStatus: false,
        carts: carts,
        allprice: price.toFixed(2)
      });
    }
  },
  //选择全选
  checkAll: function (e) {
    var checkAllStatus = !this.data.checkAllStatus
    var price = 0;
    if (checkAllStatus) {
      for (var i = 0; i < this.data.carts.length; i++) {
        this.data.carts[i].checked = true
        price = this.data.carts[i].allprice + price
      }

    } else {
      for (var i = 0; i < this.data.carts.length; i++) {
        this.data.carts[i].checked = false
      }

    }
    this.setData({
      carts: this.data.carts,
      allprice: price.toFixed(2),
      checkAllStatus: checkAllStatus
    });
  },
  //添加项
  addNum: function (options) {
    var id = options.currentTarget.id;
    var price = 0;
    network.GET('/cart!add2.action?cart.id=' + id,
      (res) => {
        for (var i = 0; i < this.data.carts.length; i++) {
          if (id == this.data.carts[i].id) {
            this.data.carts[i].num = res.data.num;
            this.data.carts[i].allprice = this.data.carts[i].price2 * res.data.num;
          }
          if (this.data.carts[i].checked) {
            price = this.data.carts[i].allprice + price
          }
        }
        this.setData({
          carts: this.data.carts,
          allprice: price.toFixed(2)
        });
      }, (res) => {
        console.log(res);
      })
  },
  //减少商品数量
  subNum: function (options) {
    var id = options.currentTarget.id;
    var price = 0;
    network.GET('/cart!add3.action?cart.id=' + id,
      (res) => {
        for (var i = 0; i < this.data.carts.length; i++) {
          if (id == this.data.carts[i].id) {
            this.data.carts[i].num = res.data.num
            this.data.carts[i].allprice = this.data.carts[i].price2 * res.data.num
          }
          if (this.data.carts[i].checked) {
            price = this.data.carts[i].allprice + price
          }
          if (this.data.carts[i].buzu == 1) {
            if (this.data.carts[i].kucun >= this.data.carts[i].num) {
              this.data.carts[i].buzu = 0
            }
          }
        }
        this.setData({
          carts: this.data.carts,
          allprice: price.toFixed(2)
        });
      }, (res) => {
        console.log(res);
      })
  },
  //提交订单
  formBindsubmit: function (e) {
    var opneid = e.detail.value.openid
    var appid = e.detail.value.appid
    this.setData({
      modalStatus: false,
      cartvalues: e.detail.value.cartvalues,
      opneid: e.detail.value.openid
    });
  },
  //弹出结算提示框
  confirmAccount: function (e) {
    this.setData({
      modalStatus: true,
    });
    var checked = false;
    var buzu = false;
    for (var i = 0; i < this.data.carts.length; i++) {
      if (this.data.carts[i].checked) {
        checked = true;
        if (this.data.carts[i].buzu == 1) {
          buzu = true;
        }
      }
    }
    if (buzu) {
      this.selectComponent("#Toast").showToast("您所购买的商品库存不足，请重新选择，或者减少购买数量")
      return false;
    }
    if (checked) {
      network.GET('/order!jiesuan1.action?openid=' + this.data.opneid + '&appid=' + this.data.appid + '&cartvalues=' + this.data.cartvalues,
        (res) => {
          if (res.data.res2 == '要税') {
            wx.navigateTo({
              url: '../sfzheng/sfzheng?oid=' + res.data.res1
            })
          } else {
            wx.navigateTo({
              url: '../final/final?oid=' + res.data.res1
            })
          }
        }, (res) => {
          console.log(res);
        })
    } else {
      wx.showModal({
        title: '提示',
        content: '请选择商品',
        showCancel: false,
        success: function (res) {
        }
      })
    }
  },
  //取消结算
  cancelAccount: function (e) {
    this.setData({
      modalStatus: true,
    });
  },
  //弹出确认删除框
  dialogDelete: function (e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    this.setData({
      cartid: id,
      cartindex: index
    })
    this.modalTap();
  },
  //弹出确认框  
  modalTap: function (e) {
    this.setData({
      modalHidden: false
    })
  },
  //确认删除
  confirmDelete: function (e) {
    this.setData({
      modalHidden: true,
    });
    var price = 0;
    network.GET('/cart!delete.action?cart.id=' + this.data.cartid,
      (res) => {
        this.data.carts.splice(this.data.cartindex, 1);
        for (var i = 0; i < this.data.carts.length; i++) {
          if (this.data.carts[i].checked) {
            price = this.data.carts[i].allprice + price
          }
        }
        this.setData({
          carts: this.data.carts,
          allprice: price.toFixed(2)
        });
      }, (res) => {
        console.log(res);
      })
  },
  //取消删除
  cancelDelete: function (e) {
    this.setData({
      modalHidden: true,
    });
  },
  //验证商品数
  most: function () {
    this.selectComponent("#Toast").showToast("商品数量已经达到库存量");
  },
  //不能再少啦
  least: function () {
    this.selectComponent("#Toast").showToast("不能再少啦");
  }
})