//  现460行
var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
Page({

  data: {
    currentTab:0,
    userInfo: {},
    openid: null,
    url1: app.globalData.url,
    orders: {},
    oid:'',
    modalHidden: true,
    leixing:null,
    status:"",
    isShowToast: false,
  },
  onLoad: function (){
    var that = this

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo, openid) {
      if (!openid) {
        that.showToast("获取信息失败，请刷新后重试", that)
        return false;
      }
      //更新数据
      that.setData({
        userInfo: userInfo,
        openid: openid
      })
      
      wx.request({
        url: url + '/order!myorder.action?appid=' + appid + '&openid=' + openid,
        method: 'get',
        header: { 'Content-Type': '' },
        success: function (res) {
          console.log('res：' + res.data);
          that.setData({
            orders: res.data,
          });
        },
        fail: function (res) {
          console.log('submit fail');
        },
        complete: function (res) {
          console.log('submit complete');
        }
      })
    })

  },
  onShow: function () {
    console.log('刷新');
    var that = this;
    var currentTab = that.data.currentTab;
    console.log('刷新' + currentTab);
    that.setData({
      orders: {},
    })
    wx.showLoading({
      title: '加载中....',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    if (currentTab==0){
      that.onLoad();
    }
    if (currentTab == 1) {
      wx.request({
        url: url + '/order!myorder1.action?appid=' + appid + '&openid=' + that.data.openid,
        method: 'get',
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          console.log('res：' + res.data);
          wx.hideLoading();
          that.setData({
            orders: res.data,
          });
        },
    })
    }
    if (currentTab == 2) {
      wx.request({
        url: url + '/order!myorder2.action',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          appid: appid,
          openid: that.data.openid,
          fhstatus: "待发货",
        },
        method: 'POST',
        success: function (res) {
          console.log('res：' + res.data);
          wx.hideLoading();
          that.setData({
            orders: res.data,
          });
        }
      })
    }
    if (currentTab == 3) {
      wx.request({
        url: url + '/order!myorder2.action',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          appid: appid,
          openid: that.data.openid,
          fhstatus: "已发货",
        },
        method: 'POST',
        success: function (res) {
          console.log('res：' + res.data);
          wx.hideLoading();
          that.setData({
            orders: res.data,
          });
        }
      })
    }
    if (currentTab == 4) {
      wx.request({
        url: url + '/order!myorder2.action',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          appid: appid,
          openid: that.data.openid,
          fhstatus: "已完成",
        },
        method: 'POST',
        success: function (res) {
          console.log('res：' + res.data);
          wx.hideLoading();
          that.setData({
            orders: res.data,
          });
        }
      })
    }
    if (currentTab == 5) {
      wx.request({
        url: url + '/order!tkorder.action?appid=' + appid + '&openid=' + that.data.openid,
        method: 'get',
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          console.log('res：' + res.data);
          wx.hideLoading();
          that.setData({
            orders: res.data,
          });
        },
      })
    }
    wx.hideLoading();
  },
  allorder:function(e){
    console.log(' e.target.dataset.current:' + e.target.dataset.current);
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
      wx.showLoading({
        title: '加载中....',
        mask: true,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) {},
      })
      wx.request({
        url: url + '/order!myorder.action?appid=' + appid + '&openid=' + that.data.openid,
        method: 'get',
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          console.log('res：' + res.data);
          wx.hideLoading();
          that.setData({
            orders: res.data,
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
  myorder1: function (e) {
    console.log(' e.target.dataset.current:' + e.target.dataset.current);
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        orders:{},
      })
    }
    wx.showLoading({
      title: '加载中....',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) {},
    })
    wx.request({
      url: url + '/order!myorder1.action?appid=' + appid + '&openid=' + that.data.openid,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log('res：' + res.data);
        wx.hideLoading();
        that.setData({
          orders: res.data,
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
  myorder2: function (e) {
    console.log(' e.target.key:' + e.target.dataset.key);
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        orders: {},
      })
    }
    wx.showLoading({
      title: '加载中....',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    wx.request({
      url: url + '/order!myorder2.action',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        appid: appid,
        openid: that.data.openid,
        fhstatus: e.target.dataset.key,
      },
      method: 'POST',
      success: function (res) {
        console.log('res：' + res.data);
        wx.hideLoading();
        that.setData({
          orders: res.data,
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
  myorder3: function (e) {
    console.log(' e.target.key:' + e.target.dataset.key);
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        orders: {},
      })
    }
    wx.showLoading({
      title: '加载中....',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    wx.request({
      url: url + '/order!tkorder.action?appid=' + appid + '&openid=' + that.data.openid ,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log('res：' + res.data);
        wx.hideLoading();
        that.setData({
          orders: res.data,
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
  deleteorder: function (e) {
    var that = this;
    
    wx.request({
      url: url + '/order!deleteorder.action?oid=' + that.data.oid,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log('res：' + res.data);
        wx.hideLoading();
        that.setData({
          orders: res.data,         
          modalHidden: true,         
        })
      },
    })
    },
  queren: function (e) {
    var that = this;
    var oid = e.currentTarget.dataset.id;
    var leixing = e.currentTarget.dataset.class;
    
    that.setData({
      oid: oid,
      leixing: leixing
    })
    if (that.data.leixing == "删除") {
      this.modalTap("确认删除吗？");
    }
    if (that.data.leixing == "退款") {
      this.modalTap("确认退款吗？");
    }
    if (that.data.leixing == "发货") {
      this.modalTap("是否确认发货？");
    }
    if (that.data.leixing == "发货3") {
      this.modalTap("是否确认发货？");
    }
    
  },
  //弹出确认框  
  modalTap: function (tex) {
    this.setData({
      modalHidden: false,
      tip:tex
    })
  },
  confirm_one: function (e) {
    var that = this;
    if (that.data.leixing=="删除"){
      that.deleteorder();
    }
    if (that.data.leixing == "退款"){
      that.tuikuan();
    }
    if (that.data.leixing == "发货") {
      that.querenfahuo();
    }
    if (that.data.leixing == "发货3") {
      that.querenfahuo1();
    }
  },
  cancel_one: function (e) {
    console.log(e);

    this.setData({
      modalHidden: true,
    });
  },
  querenfahuo: function (e){
    var that = this;
    
    wx.request({
      url: url + '/order!querenfahuo.action?oid=' + that.data.oid,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log('res：' + res.data);
        wx.hideLoading();
        that.setData({
          orders: res.data,
          currentTab: 3,
          modalHidden: true,      
        })
      },
    })
  },
  querenfahuo1: function (e){
    var that = this;
   
    wx.request({
      url: url + '/order!querenfahuo1.action?order3id=' + that.data.oid,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log('res：' + res.data);
        wx.hideLoading();
        that.setData({
          orders: res.data,
          currentTab: 3,
          modalHidden: true,      
        })
      },
    })
  }, 
  fukuan: function (e) {
    var that = this;
    console.log('oid:' + e.currentTarget.id);
    wx.request({
      url: url + '/order!fukuan1.action?oid=' + e.currentTarget.id,
      method: 'POST',
      header: { 'Content-Type': "application/x-www-form-urlencoded" },
      success: function (res) {
        console.log('res：' + res.data);
        
        wx.navigateTo({
          url: '../final/final?oid=' + res.data
        })
      },
    })
  },
  tuikuan: function (e) {
    var that = this;
   
    wx.request({
      url: url + '/order!tuikuan.action?oid=' + that.data.oid,
      method: 'get',
      header: {'Content-Type': 'application/json'},
      success: function (res) {
        console.log('res：' + res.data);
        wx.hideLoading();
        that.setData({
          orders: res.data,
          currentTab: 5,
          modalHidden: true,      
        })
      },
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
  //点击弹出  
  plus: function () {
    if (this.data.isPopping) {
      //缩回动画  
      this.takeback();
      this.setData({
        isPopping: false,
        isShowModal: false
      })
    } else if (!this.data.isPopping) {
      //弹出动画  
      this.popp();
      this.setData({
        isPopping: true,
        isShowModal: true
      })
    }
  },
  input: function () {
    wx.switchTab({
      url: '../team/team'
    })
  },
  transpond: function () {
    wx.switchTab({
      url: '../index/index'
    })
  },
  collect: function () {
    wx.switchTab({
      url: '../cart/cart'
    })
  },

  //弹出动画  
  popp: function () {
    //plus顺时针旋转  
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(360).step();
    animationcollect.translate(-50, -70).rotateZ(360).opacity(1).step();
    animationTranspond.translate(-100, 0).rotateZ(360).opacity(1).step();
    animationInput.translate(-50, 70).rotateZ(360).opacity(1).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
    })
  },
  //收回动画  
  takeback: function () {
    //plus逆时针旋转  
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(0).step();
    animationcollect.translate(0, 0).rotateZ(0).opacity(0).step();
    animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();
    animationInput.translate(0, 0).rotateZ(0).opacity(0).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
    })
  },


  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '我的订单',
      path: 'pages/myorder/myorder',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})