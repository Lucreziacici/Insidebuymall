//获取应用实例
var app = getApp()
var url = app.globalData.url
var appid = app.globalData.appid
var title = app.globalData.title
var opid = ""
Page({
  data: {
    resources: app.globalData.url,//资源路径
    // tip:'',//好像没有用到过，后期没问题删掉
    addresslist: [],//地址列表
    userInfo: {},//用户信息
    openid: null,//用户id
    oid: '',//订单id，数据从上个组件传来
    onmsg: false,//判断是否为下订单时选择地址，数据从上个组件传来
    modalHidden: true,//控制模态框显示/隐藏
    addressId: 0,//地址id
    isShowToast: false,
  },


  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    var that = this
    if (options.oid) {
      this.setData({
        oid: options.oid,
        onmsg: options.onmsg
      });
    }
    wx.showLoading({
      title: '加载中....',
      mask: true
    })
    app.getUserInfo( (userInfo, openid)=> {
      //更新数据
      this.setData({
        userInfo: userInfo,
        openid: openid
      });
      if (!openid) {
        this.showToast("获取身份失败，请刷新后重试", this)
        return false;
      }
      this.getAddressList();
    });
    wx.hideLoading();
  },
  //获取地址列表
  getAddressList:function(){
    wx.request({
      url: url + '/dizhi!findall.action?openid=' + this.data.openid + '&appid=' + appid,
      method: 'get',
      success: (res) => {
        this.setData({
          addresslist: res.data,
        });
      }
    })
  },
  //切换默认地址
  radioChange: function (e) {
    wx.showLoading({
      title: '加载中....',
      mask: true,
    })
    var id = e.detail.value;
    wx.request({
      url: url + '/dizhi!updatamoren.action?openid=' + this.data.openid + '&appid=' + appid + '&id=' + e.detail.value,
      method: 'get',
      success:  (res)=> {
        if (res ="[]"){
          this.getAddressList();
        }
        wx.hideLoading();
      }
    })
  },
  //下单时选择地址 todo  暂时没看懂，看到下单这里再改，暂时只改函数名
  chooseAddress: function (e) {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];//上局页面
    var id = e.currentTarget.id;
    wx.request({
      url: url + '/order!updatedizhi.action?oid=' + this.data.oid + '&did=' + id,
      method: 'get',
      success: function (res) {
        console.log(res.data);
        prevPage.setData({
          order: res.data.object,
          order1s: res.data.objs,
        })
        wx.navigateBack({})
      }
    })
  },
  //弹出确认框  
  modalShow: function (e) {
    var id = e.currentTarget.id;
    this.setData({
      modalHidden: false,
      addressId: id
    })
  },
  //删除地址
  deleteAddress: function (e) {
    var id = e.currentTarget.dataset.id;
    this.setData({
      modalHidden: true,
    });
    wx.request({
      url: url + '/dizhi!delete.action?openid=' + this.data.openid + '&appid=' + appid + '&id=' + id,
      method: 'get',
      success:  (res)=> {
        this.setData({
          addresslist: res.data,
        });
      }
    })
  },
  //取消删除隐藏模态框
  modalHidden: function (e) {
    this.setData({
      modalHidden: true,
    });
  },
  //获取微信地址授权，如果拒绝授权，就跳转
  addAddress:function(e){
    if (wx.chooseAddress) {
      wx.chooseAddress({
        success:  (res)=> {
          wx.showLoading({
            title: '加载中....',
            mask: true,
          })
          var addressdata={};
          addressdata.address = res.detailInfo;
          addressdata.appid = appid;
          addressdata.city = res.cityName;
          addressdata.name = res.userName;
          addressdata.openid = this.data.openid;
          addressdata.phone = res.telNumber;
          addressdata.province = res.provinceName;
          addressdata.qu = res.countyName;
          wx.request({
            url: url + '/dizhi!add.action',
            data: addressdata,
            success: (res) => {
              this.setData({
                addresslist: res.data
              })
              wx.hideLoading();
            }
          })
        },
        fail:  (err)=> {
          wx.navigateTo({
            url: '/pages/addAddress/addAddress?openid=' + this.data.openid
          })
        }
      })
    } else {
      console.log('当前微信版本不支持chooseAddress');
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  }
})