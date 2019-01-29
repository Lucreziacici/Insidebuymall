var network = require("../../libs/network.js")
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
  
    pop_list: {
      type: Array,
      value: []
    },
    total_coupon:{
      type:Object,
      value:{}
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    show:true,
  },
  ready: function () { console.log(this.data) },
  /**
   * 组件的方法列表
   */
  methods: {
    close:function(){
      this.setData({
        show:false
      })
    }
  }
})