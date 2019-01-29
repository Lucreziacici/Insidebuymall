//获取应用实例
var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
var title = app.globalData.title
var network = require("../../libs/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url1:app.globalData.url,
    currentTab: 0,
    wsyyhj:null,
    ysyyhj:null,
    ygqyhj: null,
    heigjt:0,
    status:"00",
    page_index: "1", //当前页
    page_size: "6", //每页记录数
    couponList:[],
    
  },
  swichNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current,
        status: e.target.dataset.status,
        page_index:'1',
        couponList:[]
      })
      this.getMyCouponList()
    }

  },
  
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    
  },
  onShow:function(){
    this.getMyCouponList()
  },
  getMyCouponList:function(){
    var data={
      page_index: this.data.page_index,
      page_size: this.data.page_size,
      status: this.data.status
    }
    network.GETJSON("Coupon/MyCouponList",data, (res) => {
      if (res.data.res_status_code == '0') {
        var data = res.data.res_content.data_list;
        if(this.data.page_index=='1'){
          var coupon = [];
        }else{
          var coupon = this.data.couponList;
        }
        for (var i = 0; i < data.length;i++){
          data[i].starttime = network.getFormatDate(new Date(data[i].due_from.replace("T", " ").replace("-", "/").replace("-", "/")).getTime()) ;
          data[i].endtime = network.getFormatDate(new Date(data[i].due_to.replace("T", " ").replace("-", "/").replace("-", "/")).getTime());
          coupon.push(data[i])
        }
        this.setData({
          couponList: coupon
        })
      }else{
        this.selectComponent("#Toast").showToast(res.data.res_message);
      }
    }, (res) => {
      console.log(res)
    }, this.data.userid)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var page_index = parseInt(this.data.page_index) + 1
    this.setData({
      page_index: page_index
    })
    this.getMyCouponList();
  },
 
  
})