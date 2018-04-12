// 删减大概三十行  by xixi
var WxParse = require('../../wxParse/wxParse.js')
var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
var network = require("../../libs/network.js")
Page({
  data: {
    openid: '',//openid
    swiperImages: [],//商品轮播图
    product: {},//商品信息
    specificationList: [],//规格
    resources: app.globalData.url,//资源路径
    widgets: true,//控制下单窗体是否显示
    quantity: 1,//选择商品数量
    specificationId: null,//商品规格id
    repertory: '',//商品库存
    repertoryMax: 100,//商品库存最大值
    team: {},//用户信息
    srollHeight:"1000px",//滚动高度
    isAddCart:"0",//是否为加入购物车
    isApprove: false
  },
  onLoad: function (options) {
    //获取用户信息
    app.getUserInfo( (userInfo, openid)=> {
      network.GET('/team!findteam1.action?openid=' + openid,
        (res) => {
          this.setData({
            team: res.data,
          });
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
    //请求商品数据
    network.GET('/product1!d1.action?product1.id=' + options.id + '&appid=' + appid,
      (res) => {
        var article = res.data.object.xiangqing;
        WxParse.wxParse('article', 'html', article, this, 5);
        this.setData({
          swiperImages: res.data.objs,
          product: res.data.object,
          guiges: res.data.objs2,
          repertory: res.data.objs2[0].kucun,
        });
        for (var i = 0; i < res.data.objs2.length; ++i) {
          if (res.data.objs2[i].kucun > 0) {
            this.setData({
              repertoryMax: res.data.objs2[i].kucun,
              specificationId: res.data.objs2[i].id,
              currentTab: res.data.objs2[i].id,
            });
            break;
          }
        }
      }, (res) => {
        console.log(res);
      })
  },
  /**
   * 生命周期函数--监听页面显示
   * 顺便获取页面高度
   */
  onShow: function () {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          srollHeight: res.windowHeight - 40,
        });
      }
    })
  },
  // 下单显示弹窗
  onChangeShowState: function (options) {
    //根据data-type 判断是加入购物车还是立即购买
    if (this.data.team.shstatus == '待审核'){
      this.selectComponent("#Toast").showToast("你资料还在审核中暂时无法购买")
    } else if (this.data.team.shstatus == '审核未通过'){
      this.selectComponent("#Toast").showToast("很抱歉，你的资料没有审核通过，暂时无法购买，请重新上传或者联系客服")
    } else if (this.data.team.shstatus =='审核通过'){
      this.setData({
        widgets: (!this.data.widgets),
        isAddCart: options.target.dataset.type
      })
    }
  },
  // 选择规格
  rudioChoose: function (options) {
    //设置当前样式
    this.setData({
      specificationId: options.currentTarget.dataset.id,
      repertory: options.currentTarget.dataset.repertory,
      repertoryMax: options.currentTarget.dataset.repertory,
      'currentTab': options.currentTarget.dataset.id,//选中id
      quantity: 1,
    });
  },
  //增加数量
  addNum: function (options) {
    this.setData({
      quantity: this.data.quantity + 1
    })
  },
  //减少数量
  subNum: function (options) {
    this.setData({
      quantity: this.data.quantity - 1
    })
  },
  //加入购物车
  addcart: function () {
    if (!this.data.openid) {
      this.selectComponent("#Toast").showToast("获取信息失败，请刷新后重试")
      return false;
    }
    if (this.data.repertory=='0'){
      this.setData({
        widgets: (!this.data.widgets),
      });
      this.selectComponent("#Toast").showToast("已售空");
    }else{
      network.GET('/cart!add1.action?appid=' + appid + '&openid=' + this.data.openid + '&cart.pid=' + this.data.product.p1id + '&num=' + this.data.quantity + '&guige.id=' + this.data.specificationId,
        (res) => {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          this.setData({
            widgets: (!this.data.widgets),
          })
        }, (res) => {
          console.log(res);
        })
    }
  },
  //立即购买
  addorder: function () {
    if (this.data.repertory == '0') {
      this.setData({
        widgets: (!this.data.widgets),
      });
      this.selectComponent("#Toast").showToast("已售空");
    } else {
      network.GET('/order!add1.action?appid=' + appid + '&openid=' + this.data.openid + '&product1.id=' + this.data.product.p1id + '&num=' + this.data.quantity + '&guige.id=' + this.data.specificationId,
        (res) => {
          this.setData({
            widgets: (!this.data.widgets),
          })
          if (res.data.res2 == '要税') {
            //身份认证
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
    }
    
  },

  //前往首页
  gohome: function () {
    wx.switchTab({
      url: '../index/index'
    });
  },
  //前往购物车
  gocart: function () {
    wx.switchTab({
      url: '../cart/cart'
    });
  },
  // 转发
  onShareAppMessage: function (res) {
    var pages = getCurrentPages();
   var currentPage = pages[pages.length - 1];
   var options = currentPage.options;
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: this.data.product.title,
      path: 'pages/product/product?id=' + options.id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})