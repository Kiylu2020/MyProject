// 服务器域名地址
var baseUrl = 'https://www.ecustwxapp.com/'

// 获取新闻列表接口
var getNewsList = baseUrl+'news_ECUST_list/'

// 根据新闻id获取新闻内容接口
var getNewsById = baseUrl+'news_ECUST_detail/'

/*
* 自定义函数-跳转新闻正文页面
*/
function goToDetail(id){
  wx.navigateTo({
    url: '../msg/detail/detail?id='+id,
  })
}

/*  获取用户在数据库中的数据  */
function get_user_idlevel(e){
  let userid = wx.getStorageSync('userid')
  wx.request({
      url: 'https://www.ecustwxapp.com/user_level_get/',
      data: {
        'userid': userid
      },
      header: {'content-type':'application/json'},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (res)=>{
        let level = res.data.level
        console.log(level)
        wx.setStorageSync('userlevel', level)
      },
      fail: ()=>{},
      complete: ()=>{}
    })
}

module.exports = {
  getNewsList: getNewsList,
  getNewsById: getNewsById,
  goToDetail: goToDetail,
  get_user_idlevel:get_user_idlevel
}