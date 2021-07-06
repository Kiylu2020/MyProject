//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoUrl:'https://www.ecustwxapp.com/media/video/zhaoshengxuanchuan1.mp4',
    imgUrls: [
      'https://zsb.ecust.edu.cn/_upload/article/images/c3/35/989bc4a746f28cdaa9267d142f2a/89e5f173-b1f8-49fd-b913-ca877109bcf5.jpg',
      'https://zsb.ecust.edu.cn/_upload/article/images/47/8a/db4eb7d445f78c6c524b90662cd3/9f9b85ed-4814-432a-91cd-db584b7e4f16.jpg',
      'https://zsb.ecust.edu.cn/_upload/article/images/6d/c2/1a3e24134ca9bcf7759c6f527419/2584cc9a-2b06-48c1-861f-3ad0606e297a.jpg'
    ],
    swiper_autoplay : false,
    interval: 5000,
    duration: 1000,
    // 下面这个数据很关键，事关分类导航图像样式；
    catesList:[
      {
        name:"学校简介",
        img_url: "../../icon/xuexiaojianjie.png",
        image_width : 233,
        open_type: "navigate",
        navigator_url:"/pages/index/jianjie/jianjie"
      },
      {
        name:"校园风光",
        img_url: '../../icon/xiaoyuanfengguang.png',
        image_width : 233,
        open_type: "navigate",
        navigator_url:"/pages/index/fengguang/fengguang"
      },
      {
        name:"招生计划",
        img_url: '../../icon/zhaoshengjihua.png',
        image_width : 233,
        open_type: "navigate",
        navigator_url:"/pages/index/jihua/jihua"
      },
      {
        name: "院系专业",
        img_url: '../../icon/yuanxizhuanye.png',
        image_width : 233,
        open_type: "navigate",
        navigator_url:"/pages/index/zhuanye/zhuanye"
      },
      {
        name: "报考指南",
        img_url: '../../icon/baokaozhinan.png',
        image_width : 233,
        open_type: "navigate",
        navigator_url:"/pages/index/zhinan/zhinan"
      },
      {
        name: "新闻资讯",
        img_url: '../../icon/msg.png',
        image_width : 233,
        open_type: "navigate",
        navigator_url:"/pages/msg/msg"
      }
    ],
    // 滚动公告栏
    //初始化数据
    hideNotice: false,
    id: 1,
    notice: '下拉刷新公告',
  },
  // 宣传视屏播放结束时开始页面切换
  videoended:function(){
    this.setData({
      swiper_autoplay: true
    })
  },

  // 公告栏
  // 点击关闭公告
  switchNotice: function() {
    this.setData({
      hideNotice: true
    })
  }, 

  navitomsg:function(e){
    let id = this.data.id
    console.log(id)
    wx.navigateTo({
      url: '/pages/msg/detail/detail?id='+id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://www.ecustwxapp.com/index_notice_msg/',
      data:{},
      success:function(res){
        // 获取最新消息
        let id = res.data.id
        let rs = res.data.rs
        console.log(id)
        that.setData({
          id: id,
          notice: rs
        })
      }
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
  onPullDownRefresh: function (e) {
    var that = this
    wx.request({
      url: 'https://www.ecustwxapp.com/index_notice_msg',
      data:{},
      success:function(res){
        // 获取最新消息
        let id = res.data.id
        let rs = res.data.rs
        console.log(id)
        that.setData({
          id: id,
          notice: rs
        })
      }
    })
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

  },

  // 获取轮播图数据
  

})