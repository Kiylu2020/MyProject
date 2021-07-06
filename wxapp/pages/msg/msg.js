// pages/msg/msg.js
var common = require('../../utils/common.js')

var isEnd = false
var currentPage = 1
var List = new Array()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false,
    loadMoreText:'加载更多',
    newsList:List,
  },

  /**
 * 自定义函数--跳转新页面浏览新闻内容
 */
  goToDetail: function (e) {
    // 获取新闻id
    let id = e.currentTarget.dataset.id

    // 跳转新页面
    common.goToDetail(id)
  },

  /**
   * 自定义函数--获取指定页面的新闻数据
   */
  getNewsListByPage: function (page) {
    var that = this
    // 向服务器发请求
    wx.request({
      url: "https://www.ecustwxapp.com/news_ECUST_list/",
      method: 'POST',
      data:{
        "page":currentPage
      },
      success:function(res){
        console.log(res.data)
        // 获取新闻总数
        let total = res.data.total

        // 追加更多新闻
        let list = res.data.list
        let templist = res.data.list;
        for( let i=0;i<5;i++){
          if(templist[i]!=null){
            List.push(templist[i]);
          }
        }
        // 更新新闻数据和新闻总数
        that.setData({
          total:total,
          newsList:List,
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
 * 自定义函数--加载更多新闻
 */
  loadMore: function () {
    // 如果新闻尚未全部加载完毕，并且按钮不在加载状态中
    if(!isEnd&&!this.data.loading){
      // 让按钮出现加载动画
      this.setData({
        loading:true
      })

      // 加载时长
      setTimeout(()=>{
        // 加载当前页面的新闻数据
        this.getNewsListByPage(currentPage)

        // 停止按钮加载动画
        this.setData({
          loading:false
        })

      },1000)
    }
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取第一页新闻
    this.setData({
      currentPage: 1,
      newsList: List,
    })
    this.getNewsListByPage(1)
    console.log(List)
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