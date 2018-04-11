// pages/orderList/orderList.js
var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid;
import Watch from '../../libs/watch';
let watch;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},//用户信息
    openid: null,//openid
    resource: app.globalData.url,//资源路径
    orderList:[],//订单列表
    activedTab:0,//tab激活状态
    tabList:['全部订单','待付款','待发货','已发货','已完成','退款'],//tab值



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      activedTab:options.id
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo( (userInfo, openid)=> {
      if (!openid) {
        this.selectComponent("#Toast").showToast("获取信息失败，请刷新后重试");
        return false;
      }
      //更新数据
      this.setData({
        userInfo: userInfo,
        openid: openid
      })
      let baseurl="";
      wx.showLoading({
        title: '加载中....',
        mask: true,
      })
      if (options.id=='0'){
        //获取订单信息
        wx.request({
          url: url + '/order!myorder.action?appid=' + appid + '&openid=' + openid,
          success: (res) => {
            wx.hideLoading();
            this.setData({
              orderList: res.data,
            });
          },
          fail: function (res) {
            console.log('submit fail');
          },
          complete: function (res) {
            console.log('submit complete');
          }
        })
      }else if(options.id=='1'){
        wx.request({
          url: url + '/order!myorder1.action?appid=' + appid + '&openid=' + openid,
          success: (res) => {
            wx.hideLoading();
            this.setData({
              orderList: res.data,
            });
          },
        })
      } else if (options.id == '2') {
        wx.request({
          url: url + '/order!myorder2.action',
          data: {
            appid: appid,
            openid: openid,
            fhstatus: "待发货",
          },
          success: (res) => {
            wx.hideLoading();
            this.setData({
              orderList: res.data,
            });
          },
        })
      } else if (options.id == '3') {
        wx.request({
          url: url + '/order!myorder2.action',
          data: {
            appid: appid,
            openid: openid,
            fhstatus: "已发货",
          },
          success: (res) => {
            wx.hideLoading();
            this.setData({
              orderList: res.data,
            });
          },
        })
      } else if (options.id == '4') {
        wx.request({
          url: url + '/order!myorder2.action',
          data: {
            appid: appid,
            openid: openid,
            fhstatus: "已完成",
          },
          success: (res) => {
            wx.hideLoading();
            this.setData({
              orderList: res.data,
            });
          },
        })
      } else if (options.id == '5') {
        wx.request({
          url: url + '/order!tkorder.action?appid=' + appid + '&openid=' + openid,
          success: (res) => {
            wx.hideLoading();
            this.setData({
              orderList: res.data,
            });
          },
        })
      }
    })
  },
  watch: {
    activedTab: function (val, oldVal) {
      console.log("我变了", val, oldVal);
      console.log(typeof(val),typeof(oldVal));
      if(val!==oldVal){
        if (val== '0') {
          //获取订单信息
          wx.request({
            url: url + '/order!myorder.action?appid=' + appid + '&openid=' + this.data.openid,
            success: (res) => {
              this.setData({
                orderList: res.data,
              });
            },
            fail: function (res) {
              console.log('submit fail');
            },
            complete: function (res) {
              console.log('submit complete');
            }
          })
        } else if (val == '1') {
          wx.request({
            url: url + '/order!myorder1.action?appid=' + appid + '&openid=' + this.data.openid,
            success: (res) => {
              wx.hideLoading();
              this.setData({
                orderList: res.data,
              });
            },
          })
        } else if (val == '2') {
          wx.request({
            url: url + '/order!myorder2.action',
            data: {
              appid: appid,
              openid: this.data.openid,
              fhstatus: "待发货",
            },
            success: (res) => {
              wx.hideLoading();
              this.setData({
                orderList: res.data,
              });
            },
          })
        } else if (val == '3') {
          wx.request({
            url: url + '/order!myorder2.action',
            data: {
              appid: appid,
              openid: this.data.openid,
              fhstatus: "已发货",
            },
            success: (res) => {
              wx.hideLoading();
              this.setData({
                orderList: res.data,
              });
            },
          })
        } else if (val == '4') {
          wx.request({
            url: url + '/order!myorder2.action',
            data: {
              appid: appid,
              openid: this.data.openid,
              fhstatus: "已完成",
            },
            success: (res) => {
              wx.hideLoading();
              this.setData({
                orderList: res.data,
              });
            },
          })
        } else if (val == '5') {
          wx.request({
            url: url + '/order!tkorder.action?appid=' + appid + '&openid=' + this.data.openid,
            success: (res) => {
              wx.hideLoading();
              this.setData({
                orderList: res.data,
              });
            },
          })
        }
      }
    },
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          srollHeight: res.windowHeight - 51,
        });
      }
    });
    
  },
  // 切换tab
  switchTab:function(option){
    watch = new Watch(this);
    watch.setData({
      activedTab: option.target.dataset.id.toString()
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  // 加载更多
  loadMore:function(){
   console.log("到底了")
  },
  // 删除订单
  deleteOrder: function () {
    console.log("删除订单")
  },
  // 支付订单
  payOrder: function () {
    console.log("支付订单")
  },
  //查看物流 
  checkLogistics: function () {
    console.log("查看物流")
  },
  // 退款
  refundOrder: function () {
    console.log("退款")
  },
  //确认收货
  confirmOrder: function () {
    console.log("确认收货")
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})