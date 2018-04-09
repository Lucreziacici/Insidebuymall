//获取应用实例
var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
var title = app.globalData.title
var list =null;
Page({
  data: {
    url1: app.globalData.url,
    fenlei: false,
    logs: [],
    product1s:[],
    onemenus:[],
    page:1,
    dibu: false,
    keyword:null,
    isApprove: false,//是否审核通过
  },
  /**
* 生命周期函数--监听页面显示
*/
  onShow: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo( (userInfo, openid)=> {
      //更新数据
      if (!openid) {
        this.selectComponent("#Toast").showToast("获取信息失败，请刷新后重试");
        return false;
      }
      that.setData({
        userInfo: userInfo,
        openid: openid
      })

      wx.request({
        url: url + '/team!findteam1.action?openid=' + openid,
        method: 'get',
        header: { 'Content-Type': 'application/json' },
        success: function (res) {
          if (res.data.shstatus == '审核通过') {
            that.setData({
              isApprove: true
            });

          }
          if (res.data.shstatus == null) {
            wx.redirectTo({
              url: '../login/login?openid=' + openid,
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
    })
  },
  onLoad:function(options){
    console.log(options)
    var that = this;
    if(options.type=='1'){
      this.setData({
        focus:true,
      })
    }
    wx.request({
      url: url + '/product1!allsearch1.action',
      header: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      data: {
        appid: appid,
        keyword: options.keyword
      },
      success: function(res){
        console.log('res.data' + res.data.objs2.length );
        list = res.data
        that.setData({
          product1s:res.data.objs2,
          onemenus: res.data.objs,
          keyword: options.keyword,
        });
        if (res.data.objs2.length < 10) {
          that.setData({
            dibu:true
          });
        }
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }
    }) 
  },
   onChangeShowState: function () {
    var that = this;
    that.setData({
      fenlei: !that.data.fenlei
    })
  },
   tagChoose: function (options) {
    var that = this
    var id = options.currentTarget.dataset.id;
    console.log(id)
    //设置当前样式
    that.setData({
      'currentTab': id
    })
  } ,
   onReachBottom: function(){
     
    var that = this;
    if (!(that.data.dibu)){
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    var Lsit=[];
    var page = that.data.page+1;
    console.log('page:' + page);
    wx.request({
      url: url + '/product1!allsearch1.action',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        appid: appid,
        page: page,
        keyword: that.data.keyword
      },
      method: 'POST',
      success: function (res) {
        console.log('res.data' + res.data);
        var lastLsit = that.data.product1s
        var curList = [];
        console.log('res.data.length' + res.data.length);
        if (res.data.length > 0){
          var List = [];
          curList = res.data;
          List = lastLsit.concat(curList)
          wx.hideLoading()
        } 
        if (res.data.length<10){
          that.setData({
            dibu: true
          });
         }
        that.setData({
          page: that.data.page + 1,
          product1s: List,
        });
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
  keywordSubmit: function (event) {
    var that = this;
    console.log('event.detail：' + event.detail.value);
    wx.navigateTo({
      url: '../allsearch/allsearch?keyword=' + event.detail.value,
    })
  },
  keywordInput: function (event) {
    var key = event.detail.value
    this.setData({
      keyword: key
    })
  },
  suosuo: function (event) {
    wx.redirectTo({
      url: '../allsearch/allsearch?keyword=' + this.data.keyword,
    })
  },
  closeModal: function (res) {
    this.setData({
      fenlei: false
    })

  },
})