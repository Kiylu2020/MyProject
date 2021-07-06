// pages/shenqingguanli/shenqingguanli.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 判断是否已提交过申请
    pd: 0,
    // 提示表单填写不规范
    popErrorMsg: "",
    // 单选框数据（学院）
    xy:"None",
    item_xy: [
      {name:"xueyuan", value:"化工学院"},
      {name:"xueyuan", value:"化学与分子工程学院"},
      {name:"xueyuan", value:"生物工程学院"},
      {name:"xueyuan", value:"药学院"},
      {name:"xueyuan", value:"材料科学与工程学院"},
      {name:"xueyuan", value:"信息科学与工程学院"},
      {name:"xueyuan", value:"机械与动力工程学院"},
      {name:"xueyuan", value:"资源与环境工程学院"},
      {name:"xueyuan", value:"商学院"},
      {name:"xueyuan", value:"社会与公共管理学院"},
      {name:"xueyuan", value:"理学院"},
      {name:"xueyuan", value:"艺术设计与传媒学院"},
      {name:"xueyuan", value:"外国语学院"},
      {name:"xueyuan", value:"法学院"},
      {name:"xueyuan", value:"体育科学与工程学院"},
      {name:"xueyuan", value:"马克思主义学院"},
      {name:"xueyuan", value:"中徳工学院"},
      {name:"xueyuan", value:"国际卓越工程师学院"},
    ],
    // 单选框的值（性别）
    sex:"None",
    item_gender: [
      {name:'男', value:'男'},
      {name:'女', value:'女'},
    ],
  },

  // 提交函数
  formsubmit:function(e){
    var that = this
    var formdata = e.detail.value
    // radio的值需要单独传送
    var xuey = this.data.xy
    var sex = this.data.sex
    if(!that.checkForm(formdata)||xuey=="None"||sex=="None"){
      console.log("填完");
      that.setData({
        popErrorMsg: "请填完所有信息以便审核！"
      });
      this.ohShitfadeOut(); 
    }else{
      wx.request({
      url: 'https://www.ecustwxapp.com/quanxianshenqing/',
      data: {
        formdata,
        "xueyuan": xuey,
        "sex": sex,
      },
      header: {'content-type':'application/json'},
      method: 'POST',
      success: (result)=>{
        console.log(result.data)
        let pd = result.data.pd
        console.log(pd)
        that.setData({
          pd: pd,
        })
        // 设置缓存变量值
        wx.setStorage({
          key:"shenqing",
          data:"1"
        })
      },
    });
    }

  },

  // 学院选择value值变化
  xyChange: function(e){
    var that = this;
    var xueyuan = e.detail.value
    that.setData({
      xy: xueyuan,
    })
  },

  // 性别选择value值变化
  sexChange: function(e){
    var that = this;
    var sex_ = e.detail.value
    that.setData({
      sex: sex_,
    })
  },

  // 检查表单是否填写完整
  checkForm:function(e){
    var form = e
    console.log(form)
    for(var item in form){
    if(!form[item]){
    return false
    }
    }
    return true;
    },

  // 定时器提示框3秒消失
  ohShitfadeOut() {
    var fadeOutTimeout = setTimeout(() => {
      this.setData({ popErrorMsg: '' });
      clearTimeout(fadeOutTimeout);
      }, 5000);
  },

  //  提交一次后跳转
  isNavigator: function(e){
    
      wx.navigateTo({
        url: '/pages/shenqingguanli/finish/finish',
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'shenqing',
      success (res) {
        console.log(res.data)
      }
    })
    try {
      var value = wx.getStorageSync('shenqing')
      if (value == 1) {
        // Do something with return value
        wx.navigateTo({
          url: '/pages/shenqingguanli/finish/finish',
        })
      }
    } catch (e) {
      // Do something when catch error
      console.log("出错")
    }
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
    wx.getStorage({
      key: 'shenqing',
      success (res) {
        console.log(res.data)
      }
    })
    try {
      var value = wx.getStorageSync('shenqing')
      if (value == 1) {
        // Do something with return value
        wx.navigateTo({
          url: '/pages/shenqingguanli/finish/finish',
        })
      }
    } catch (e) {
      // Do something when catch error
      console.log("出错")
    }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})