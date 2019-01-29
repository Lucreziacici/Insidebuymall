// components/Toast/Toast.js
var app = getApp()
var resourceurl = app.globalData.resourceurl
var network = require("../../libs/network.js")
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    show_list: {
      type: Array,
      value: []
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    resource: app.globalData.url, //资源路径
    resourceurl: resourceurl
  },
  ready: function() {
    console.log(this.data)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    GetNewCoupon: function(e) {
      network.POST("Coupon/GetNewCoupon", {
        coupon_id: e.currentTarget.dataset.id
      }, (res) => {
        console.log(res.data.res_content)
        if (res.data.res_status_code == '0') {
          this.selectComponent("#Toast").showToast("领取成功~");
        } else {
          this.selectComponent("#Toast").showToast(res.data.res_message);
        }

      }, (res) => {
        console.log(res)
      })
    }
  }
})