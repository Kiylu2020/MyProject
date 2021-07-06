// pages/ans/bbs/bbs_title/bbs_title.js
var isEnd = false
var currentPage = 1
var list = [0,1]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // bbs点赞数
    dianzan: 0,
    //bbs 的标题文字
    //动态变量的声明
    questionList: [],
    //用户权限
    right : 1,
    //用户地点
    location :"上海市",
    //管理员权限
    admin_right :256,
    //权限列表,待定
    right_list : [128,256],
    //这里需要处理成远程的
    imageSrc : ["../bbs_image/长方形.png","../bbs_image/bbs_title.png"],
    // 加载文字
    loadMoreText:'加载更多',
    // 显示问题的排序方式（时间1、热度2、（未开发））
    showWay: 1,
    // 点赞图标url
    dianzan_url0:'/icon/like_.png',
    // dianzan_url1:'/icon/like.png',
    index:0,
  },


/*获取bbs的标题数据
 *@time   = 2020.5.17
 *@author = mercer
 *@version= .1
 */

  // 点击发表问题检测是否处于登陆状态
  LoginorNot:function(e){
    var userinfo = wx.getStorageSync('userinfo')
    if(userinfo==""||userinfo==null){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else{
      console.log("已登录")
      wx.navigateTo({
        url: '/pages/ans/bbs/bbs_question/bbs_question',
      })
    }
  },
  // 点赞函数
  dianzan: function (e) {
    var that = this;
    // 点击切换图表样式
    // 判断当前状态为取消点赞还是点赞
    let a = that.data.dianzan_url0
    this.setData({
      index: a,
    })

    // 判断是否点赞判断上传数据库的点赞
    if(a=='/icon/like.png'){
      this.setData({
        dianzan: 0,
      })
    }else{
      this.setData({
        dianzan: 1,
      })
    }

    // 将结果传入后台
    let id = e.currentTarget.dataset.id
    let dianzan = this.data.dianzan
    // console.log(id)
    wx.request({
      url: "https://www.ecustwxapp.com/bbs_question_dianzan/",
      method: 'POST',
      data:{
        "dianzan":dianzan,
        "id":id,
      },
      success:function(res){
        /* 传参成功后接收返回的icon下标值，点赞为1，取消点赞为0 */
        let index = res.data.index
        // console.log(index)
        if(index == 1){
          that.setData({
            dianzan_url0:'/icon/like.png'
          })
        }else{
          that.setData({
            dianzan_url0:'/icon/like_.png'
          })
        }
      }
    })
  },

    /**
   * 自定义函数--跳转新页面浏览新闻内容
   */
  goToDetail: function (e) {
    var userinfo = wx.getStorageSync('userinfo')
    if(userinfo==""||userinfo==null){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else{
      console.log("已登录")
      // wx.navigateTo({
      //   url: '/pages/ans/bbs/bbs_detail/bbs_detail?id='+id,
      // })
    }
    // 获取问题id
    let id = e.currentTarget.dataset.id
    console.log(id)
    // 跳转新页面
    wx.navigateTo({
      url: '/pages/ans/bbs/bbs_detail/bbs_detail?id='+id,
    })
  },

  /**
   * 自定义函数--获取指定页面的数据
   */
  getQuestionListByPage: function (page) {
    var that = this

    let way = this.data.showWay
    let loct = this.data.location
    // 向服务器发请求
    wx.request({
      url: "https://www.ecustwxapp.com/bbs_question_title/",
      method: 'POST',
      data:{
        "location":loct,
        "page":currentPage,
        "showWay":way,
      },
      success:function(res){
        
        console.log(res.data)
        // 获取新闻总数
        let total = res.data.total

        // 追加更多新闻
        let list = that.data.questionList.concat(res.data.list)

        // 更新新闻数据和新闻总数
        that.setData({
          total:total,
          questionList:list,
        })

        // 如果已经显示全部新闻
        if(list.length==total){
          isEnd = true
          that.setData({
            loadMoreText:'已无更多'
          })
        }
        else{
          // 翻下一页
          currentPage++
        }
        
      }
    })
    


  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var location = wx.getStorageSync('bbs_location')
    let level = wx.getStorageSync('userlevel')
    this.setData({
      location:location,
      right: level
    })
    this.getQuestionListByPage(1)
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
    wx.switchTab({
      url: '/pages/index/index',
    })
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
    // 如果问题尚未全部加载完毕，并且按钮不在加载状态中
    console.log("caocoacoacoo")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})