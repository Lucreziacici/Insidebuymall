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
    onemenuid:null,
    keyword: null,
    isShowModal: false,//弹层弹出
  },
  onLoad:function(options){
    console.log('id:' + options.id);
    var that = this;
    wx.request({
      url: url + '/product1!allfenlei1.action?appid=' + appid + '&onemenu.id=' + options.id,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function(res){
        console.log('res.date' + res.data);
        list = res.data
        that.setData({
          product1s:res.data.objs2,
          onemenus: res.data.objs,
          onemenuid: options.id,
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
      url: url + '/product1!allfenlei1.action?appid=' + appid + '&page=' + page + '&onemenu.id=' + that.data.onemenuid,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
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
          wx.hideLoading()
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
    wx.redirectTo({
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