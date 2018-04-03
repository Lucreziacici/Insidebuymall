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
    keyword:'',
    isPopping: false,//是否已经弹出  
    animPlus: {},//旋转动画  
    animCollect: {},//item位移,透明度  
    animTranspond: {},//item位移,透明度  
    animInput: {},//item位移,透明度
    isShowModal: false,//弹层弹出
    isApprove:false,//是否审核通过
  },
  onLoad:function(options){
    var that = this;
    wx.request({
      url: url + '/product1!allproduct11.action?appid=' + appid,
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function(res){
        console.log('res.date' + res.data);
        list = res.data
        that.setData({
          product1s:res.data.objs2,
          onemenus: res.data.objs,
        });
        if (res.data.objs2.length < 10)  {
          that.setData({
            dibu:true
          });
        }
        console.log(that.data.product1s)
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }
    });

  },
  /**
* 生命周期函数--监听页面显示
*/
  onShow: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo, openid) {
      //更新数据
      if (!openid) {
        that.showToast("获取信息失败，请刷新后重试", that)
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
      url: url + '/product1!allajproduct11.action?appid=' + appid + '&page=' + page,
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
   keywordSubmit: function (event){ 
    var that = this;  
    console.log('event.detail：' + event.detail.value);
    wx.redirectTo({ 
      url: '../allsearch/allsearch?keyword=' + event.detail.value,
    })
   },
   keywordInput: function (event){
     var key = event.detail.value  
   this.setData({
     keyword: key
   })
   },
   suosuo: function (event){
     wx.redirectTo({
       url: '../allsearch/allsearch?keyword=' + this.data.keyword,
     })
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
   closeModal:function(res){
     this.setData({
       fenlei:false
     })

   },
   onShareAppMessage: function (res) {
     if (res.from === 'button') {
       // 来自页面内转发按钮
       console.log(res.target)
     }
     return {
       title: '商品列表',
       path: 'pages/allproducts/allproducts',
       success: function (res) {
         // 转发成功
       },
       fail: function (res) {
         // 转发失败
       }
     }
   }

})