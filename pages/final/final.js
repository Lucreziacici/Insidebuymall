var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo: {},
      openid: null,
      url1: app.globalData.url,
      order: {},
      yhjuanview:false,
      order1s:[],
      yhjuans:[],
  },

  onLoad: function (options) {
   
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo, openid) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        openid: openid
      })
      if (!openid) {
        that.showToast("获取信息失败，请刷新后重试", that)
        return false;
      }
    })
    wx.request({
      url: url + '/order!findorer.action?oid=' + options.oid,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log('res：' + res.data.objs2);
        that.setData({
          order: res.data.object,
          order1s: res.data.objs,
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
  changeyhjuanview: function (e) {
     var that = this;
     that.setData({
       yhjuanview: (!that.data.yhjuanview)
     })
  },
  updateyhjuan:function(e){
    var that = this;
    var id = e.currentTarget.id;
    wx.request({
      url: url + '/order!updateyhjuan.action?oid='+that.data.order.oid+'&yid='+id,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log('res:' + res.data);
        that.setData({
          order: res.data,
          yhjuanview: !that.data.yhjuanview
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
  updatebeizhu: function (event){
    var that = this;
    var tex = event.detail.value;
  
    wx.showLoading({
      title: '加载中....',
      mask: true,
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
    wx.request({
      url: url + '/order!updatebeizhu.action?oid=' + that.data.order.oid + '&beizhu=' + tex,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log('res:' + res.data);
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
  beizhuSubmit: function (event) {
    var tex = event.detail.value;
    wx.showLoading({
      title: '加载中....',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    wx.request({
      url: url + '/order!updatebeizhu.action?oid=' + that.data.order.oid + '&beizhu=' + tex,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log('res:' + res.data);
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
  zhifu: function (event) {
    var that = this;
    if (this.data.order.province == null){
      
      that.showToast("请选择收货地址", that)
    }else{
      wx.request({
        url: url + '/order!findorer.action?oid='  + that.data.order.oid,
        method: 'get',
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          
          that.setData({
            order: res.data.object,
            order1s: res.data.objs,
            yhjuans: res.data.objs2,
          });
          if (res.data.res1 =="不足"){
            that.showToast("你所购买的商品已售完，请重新下单", that)
          }else{
            wx.navigateTo({
              url: '../zhifu/zhifu?oid=' + that.data.order.oid
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