// pages/ans/bbs/bbs_detail/bbs_detail.js
// pages/bbs_detail/bbs_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userlevel: 1,// 判断该用户是否可以进行评论

    idGetted : "0",// 传进来的ID

    windowHeight: 0,//记录界面高度

    containerHeight: 0,//记录未固定整体滚动界面的高度

    containerBottomHeight: 0,//记录未固定整体滚动界面距离底部高度

    keyboardHeight: 0,//键盘高度

    isIphone: false,//是否为苹果手机，因苹果手机效果与Android有冲突，所以需要特殊处理

    nickname: "ECUST",
    icon_url: "https://www.ecustwxapp.com/media/img/login_logo.png",


    ans: [],  //回答内容列表
    question: "", //问题内容（默认为空）
  },

  /*
    评论上传函数
  */
  clickComments: function(e) {
    var that = this;
    let pinglun = e.detail.value.input_Content;
    let ques_id = this.data.idGetted;
    let user_nickname = this.data.nickname
    let icon_url = this.data.icon_url
    console.log(ques_id)
    if(pinglun!=""){
      wx.request({
        url: 'https://www.ecustwxapp.com/bbs_question_ans/',
        data: {
          "pinglun": pinglun,
          "nickname": user_nickname,
          "icon_url": icon_url,
          "ques_id": ques_id
        },
        header: {'content-type':'application/json'},
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: (result)=>{
          console.log("上传成功！")
          wx.navigateTo({
            url: '/pages/ans/bbs/bbs_detail/bbs_detail/',
          })
          // 上传成功则下弹框提示成功并返回
        },
        fail: ()=>{},
        complete: ()=>{}
      })
    }else{
      // 输入为空时不提交
      console.log("输入为空")
    }
  },

  /*
  *   获取评论列表函数
  */
  get_detail_List:function(e){
    var that = this;
    let id = this.data.idGetted
    wx.request({
      url: 'https://www.ecustwxapp.com/bbs_question_detail/',
      header: {'content-type':'application/json'},
      data:{
        'id':id
      },
      method: 'POST',
      dataType:'json',
      success: (res)=>{
        console.log("接收成功！")

        console.log(res.data)
        // 获取问题内容
        let question = res.data.question
        console.log(question)
        // 追加更多
        let list = res.data.list
        // 更新数据
        that.setData({
          question:question,
          ans:list,
        })
    
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户信息
    var userinfo = wx.getStorageSync('userinfo')
    var name = userinfo.userInfo.nickName
    var icon_url = userinfo.userInfo.avatarUrl
    var level = wx.getStorageSync('userlevel')
    this.setData({
      nickname: name,
      icon_url: icon_url,
      userlevel:level,
    })
    //在加载时确定问题的ID
    var that = this
    let id = options.id
    console.log("传参问题id：",id)
    that.setData({
      idGetted:id
    })

    //获取屏幕高度以及设备信息（是否为苹果手机）
    //与悬浮窗相关
    wx.getSystemInfo({
    success: function(res) {
    that.data.windowHeight = res.windowHeight

    that.data.isIphone = res.model.indexOf("iphone") >= 0 || res.model.indexOf("iPhone") >= 0
  }
    });

    // 获取各个老师的回答\
    this.get_detail_List()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this

    setTimeout(() => {
    //界面初始化渲染需要初始化获取整体界面的高度以及距离信息
    
    that.refreshContainerHeight()
    
    }, 800);
  },

 /*
 * 刷新整体界面高度、距离等信息，如列表有上划加载数据，需要在数据加载过后调用此方法进行高度以及间距的刷新
 */
  refreshContainerHeight: function() {
    var that = this
    
    var query = wx.createSelectorQuery();
    
    query.select('.container').boundingClientRect()
    
    query.exec((res) => {
    //container为整体界面的class的样式名称
    
    that.data.containerHeight = res[0].height;
    
    that.data.containerBottomHeight = res[0].bottom
    
    })
    
    },
  

    /**

* 界面滚动监听

*/

onPageScroll: function(e) {
  var that = this
  
  // 界面滚动刷新整体界面高度以及间距
  
  that.refreshContainerHeight()
  
  },

  /**

* 评论框焦点获取监听

*/

inputCommentsFocus: function(e) {
  var that = this
  
  if (!that.data.isIphone) {
  var keyboardHeight = e.detail.height
  
  var windowHeight = that.data.windowHeight
  
  var containerHeight = that.data.containerHeight
  
  var containerBottomHeight = that.data.containerBottomHeight
  
  //整体内容高度大于屏幕高度，才动态计算输入框移动的位置；
  
  if (containerHeight > windowHeight) {
  if ((containerBottomHeight - windowHeight) > keyboardHeight) {
  //距离底部高度与屏幕高度的差值大于键盘高度，则评论布局上移键盘高度；
  
  that.setData({
  keyboardHeight: e.detail.height
  
  })
  
  } else {
  //距离底部高度与屏幕高度的差值小于键盘高度，则评论布局上移距离底部高度与屏幕高度的差值；
  
  var newHeight = containerBottomHeight - windowHeight
  
  that.setData({
  keyboardHeight: newHeight
  
  })
  
  }
  
  } else {
  that.setData({
  keyboardHeight: 0
  
  })
  
  }
  
  } else {
  that.setData({
  keyboardHeight: 0
  
  })
  
  }
  
  },

  /**

* 评论框焦点失去监听

*/

inputCommentsBlur: function(e) {
  var that = this
  
  that.setData({
  keyboardHeight: 0
  
  })
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.get_detail_List()
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