// pages/sign/sign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pd: 0,
    postnum: 0,
  },

  // 提交函数
  formsubmit:function(e){
    var that = this
    var formdata = e.detail.value
    wx.request({
      url: 'https://www.ecustwxapp.com/inserttest/',
      data: formdata,
      header: {'content-type':'application/json'},
      method: 'POST',
      success: (result)=>{
        console.log(result.data)
        let pd = result.data.pd
        let postnum = result.data.postnum
        console.log(pd)
        that.setData({
          pd: pd,
          postnum: postnum,
        })
      },
    });

  },

  isNavigator:function(e){
    let pd = this.data.pd
    console.log(pd)
    if(pd){
      wx.navigateTo({
        url: '/pages/sign/finish/finish',
      })
    }
    else{console.log("还可以提交")}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})