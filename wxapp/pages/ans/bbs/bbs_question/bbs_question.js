// pages/ans/bbs/bbs_question/bbs_question.js
Page({
// 获取登录用户信息  ----var userinfo = wx.getStorageSync('userinfo')
//                 -----var name = userinfo.userInfo
  /**
   * 页面的初始数据
   */
  data: {
    shows: false,
    selectDatas: ['学习生活','学校管理','教学师资','招生政策','奖学金政策','其他问题'],
    indexs: 0,
    nickname: "ECUST",
    icon_url: "https://www.ecustwxapp.com/media/img/login_logo.png",
  },


  // 点击发表问题检测是否处于登陆状态
  LoginorNot:function(e){
    var userinfo = wx.getStorageSync('userinfo')
    if(userinfo==""||userinfo==null){
      wx.navigateTo({
        url: '/pages/center/center',
      })
    }else{
      wx.navigateTo({
        url: '../bbs_question/bbs_question',
      })
    }
  },


  // 点击显示下拉框
  selectTaps(){
    this.setData({
      shows: !this.data.shows,
    })
  },

  // 点击下拉列表--------下拉选择后更改data里的数据
  optionTaps(e){
    let Indexs = e.currentTarget.dataset.index;
    this.setData({
      indexs: Indexs,
      shows: !this.data.shows,
    });
  },

  // 表单上传，注意个人信息上传至后台
  formsubmit:function(e){
    var that = this;
    var icon_url = this.data.icon_url
    var formdata = e.detail.value
    var user_nickname = this.data.nickname;
    var indexs = this.data.indexs
    var question_sort = this.data.selectDatas[indexs]
    var location = wx.getStorageSync('bbs_location')
    console.log(location)
    // 上传后台数据到服务器
    wx.request({
      url: 'https://www.ecustwxapp.com/bbs_questions/',
      data: {
        formdata,
        "location": location,
        "nickname": user_nickname,
        "icon_url": icon_url,
        "questionSort": question_sort,
      },
      header: {'content-type':'application/json'},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        console.log("上传成功！")
        wx.navigateTo({
          url: '/pages/ans/bbs/bbs_title/bbs_title',
        })
        // 上传成功则下弹框提示成功并返回
      },
      fail: ()=>{},
      complete: ()=>{}
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = wx.getStorageSync('userinfo')
    var name = userinfo.userInfo.nickName
    var icon_url = userinfo.userInfo.avatarUrl
    console.log(icon_url)
    this.setData({
      nickname: name,
      icon_url: icon_url,
    })
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