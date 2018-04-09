// SuspendedNavigation.js
Component({
  options:{
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowModal:false

  },

  /**
   * 组件的方法列表
   */
  methods: {

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
    goclassification:function(){
      wx.switchTab({
        url: '../classification/classification'
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
      var animGoclassification = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      animationPlus.rotateZ(360).step();
      animationcollect.translate(-50, -70).rotateZ(360).opacity(1).step();
      animationTranspond.translate(-90, 28).rotateZ(360).opacity(1).step();
      animGoclassification.translate(-90, -28).rotateZ(360).opacity(1).step();
      animationInput.translate(-50, 70).rotateZ(360).opacity(1).step();
      this.setData({
        animPlus: animationPlus.export(),
        animCollect: animationcollect.export(),
        animTranspond: animationTranspond.export(),
        animInput: animationInput.export(),
        animGoclassification: animGoclassification.export()
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
      var animGoclassification=wx.createAnimation({
        duration:500,
        timingFunction:'ease-out'
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
      animGoclassification.translate(0, 0).rotateZ(0).opacity(0).step();
      this.setData({
        animPlus: animationPlus.export(),
        animCollect: animationcollect.export(),
        animTranspond: animationTranspond.export(),
        animInput: animationInput.export(),
        animGoclassification: animGoclassification.export(),
      })
    },
  }
})
