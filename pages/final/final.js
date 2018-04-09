var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo: {},//用户信息
      openid: null,//openid
      resources: app.globalData.url,//资源路径
      orderinformation: {},//订单信息
      yhjuanview:false,
      orderslist:[],//订单商品状态
      yhjuans:[],//优惠券
  },

  onLoad: function (options) {
    //调用应用实例的方法获取全局数据
    app.getUserInfo( (userInfo, openid)=> {
      //更新数据
      this.setData({
        userInfo: userInfo,
        openid: openid
      })
      if (!openid) {
        this.selectComponent("#Toast").showToast("获取信息失败，请刷新后重试");
        return false;
      }
    })
    wx.request({
      // 获取订单信息
      url: url + '/order!findorer.action?oid=' + options.oid,
      success:  (res)=> {
        this.setData({
          orderinformation: res.data.object,
          orderslist: res.data.objs,
          yhjuans: res.data.objs2,
        });
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }
    })
  },
  // 更改优惠券
  changeyhjuanview: function (e) {
     this.setData({
       yhjuanview: (!this.data.yhjuanview)
     })
  },
  // 更新优惠券
  updateyhjuan:function(e){
    var id = e.currentTarget.id;
    wx.request({
      url: url + '/order!updateyhjuan.action?oid=' + this.data.orderinformation.oid+'&yid='+id,
      success:  (res)=> {
        this.setData({
          orderinformation: res.data,
          yhjuanview: !this.data.yhjuanview
        });
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }
    })
  },
  //更新备注
  updatebeizhu: function (event){
    var tex = event.detail.value;
    wx.showLoading({
      title: '加载中....',
      mask: true,
    })
    wx.request({
      url: url + '/order!updatebeizhu.action?oid=' + this.data.orderinformation.oid + '&beizhu=' + tex,
      success: function (res) {
        wx.hideLoading();
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }
    })
  },
   //提交备注
  beizhuSubmit: function (event) {
    var tex = event.detail.value;
    wx.showLoading({
      title: '加载中....',
      mask: true,
    })
    wx.request({
      url: url + '/order!updatebeizhu.action?oid=' + this.data.orderinformation.oid + '&beizhu=' + tex,
      success: function (res) {
        wx.hideLoading();
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }
    })
  },
  //支付
  zhifu: function (event) {
    if (this.data.orderinformation.province == null){
      this.selectComponent("#Toast").showToast("请选择收货地址");
    }else{
      wx.request({
        url: url + '/order!findorer.action?oid=' + this.data.orderinformation.oid,
        success:  (res)=> {
          this.setData({
            orderinformation: res.data.object,
            orderslist: res.data.objs,
            yhjuans: res.data.objs2,
          });
          if (res.data.res1 =="不足"){
            this.selectComponent("#Toast").showToast("你所购买的商品已售完，请重新下单");
          }else{
            wx.navigateTo({
              url: '../zhifu/zhifu?oid=' + this.data.orderinformation.oid
            })
          }
        },
        fail: function (res) {
          console.log('submit fail');
        },
        complete: function (res) {
          console.log('submit complete');
        }
      })
    }
  }, 
})