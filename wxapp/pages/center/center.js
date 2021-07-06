// pages/center/center.js
var common = require('../../utils/common.js')

Page({
  data: {
    userinfo_:[],

    // 用户等级获取
    user_level:"Lv1",

    // 就读高中
    user_school:"贵阳一中",

    // 文理科
    user_subject:"理科",
    
    floorList:[
      {
        name:"我的收藏",
        img_Url:'https://yanxuan.nosdn.127.net/c5bdf85aa4184c71d9b21bb8f4259241.png',
        open_type: "navigate",
        navigator_Url: "/pages/logs/logs"
      },
      {
        name:"常见问题",
        img_Url:'https://yanxuan.nosdn.127.net/33a0621184a1964d588c6dbdaa513b0f.png',
        open_type: "navigate",
        navigator_Url: "/pages/logs/logs"
      },
      {
        name:"客服中心",
        img_Url:'https://yanxuan.nosdn.127.net/7b49c9765eee95a839ac6251805534a8.png',
        open_type: "navigate",
        navigator_Url: "/pages/logs/logs"
      },
      {
        name:"经验交流",
        img_Url:'https://yanxuan.nosdn.127.net/778dcd2df2993c6a35fccbd8b0e5fb9d.png',
        open_type: "navigate",
        navigator_Url: "/pages/community/community"
      },
      {
        name:"公告发布",
        img_Url:'https://yanxuan.nosdn.127.net/d940785a573f8d06e88b1d0651b2de61.png',
        open_type: "navigate",
        navigator_Url: "/pages/logs/logs"
      }
    ],

    // 设置（路径）
    user_modify_url:"/pages/center/modify/modify",

    // 省市字符串替换
  },


  onShow(){
    // userinfo在login.js文件中提到
    const userinfo1=wx.getStorageSync('userinfo');
    this.setData({
          userinfo_:userinfo1
    })
  },

  // 检测用户是否完成登录以便显示相应界面
  onLoad(){
    var that = this;
    var app = getApp();
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo
 
              if (app.userInfoReadyCallback) {
                app.userInfoReadyCallback(res)
              }
            }
          })

          // 上传用户信息至服务器
    let province = this.data.userinfo_.userInfo.province
    let name = this.data.userinfo_.userInfo.nickName
    let url = this.data.userinfo_.userInfo.avatarUrl

    // 存入数据，并返回用户的ID（自定义）
    wx.request({
      url: 'https://www.ecustwxapp.com/user_upload/',
      data: {
        'province': province,
        'name': name,
        'url': url,

      },
      header: {'content-type':'application/json'},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (res)=>{
        let userid = res.data.userid
        console.log(userid)
        wx.setStorageSync('userid', userid)
      },
      fail: ()=>{},
      complete: ()=>{}
    });

        }else{
          // 未授权，跳转到授权页面
          wx.reLaunch({
            url: '/pages/login/login',
          })
        }
      },
      fail: ()=>{
        wx.reLaunch({
          url: '/pages/login/login',
        })
      },
    })

    const userinfo1=wx.getStorageSync('userinfo');
    this.setData({
      userinfo_:userinfo1
    })
    
    common.get_user_idlevel()
    this.changelevel()
  },


  /* 等级更改函数 */
  changelevel:function(e) {
    var that = this
    let lev = wx.getStorageSync('userlevel')
    console.log(lev)
    let level = "Lv"+lev
    console.log(level)
    if(lev!=null){
      that.setData({
        user_level: level,
      })
    }
  },

    /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // onReady: function() {
  //   // 判断是否登录
  //   var userinfo = wx.getStorageSync('userinfo')
  //   if(userinfo==""||userinfo==null){
  //     wx.navigateTo({
  //       url: '/pages/login/login',
  //     })
  //   }else{
  //     console.log("已登录")
  //   }




  //   var that = this;
  //   var app = getApp();
  //   // 获取用户信息
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.userInfo']) {
          
  //         wx.getUserInfo({
  //           success: res => {
  //             app.globalData.userInfo = res.userInfo
 
  //             if (app.userInfoReadyCallback) {
  //               app.userInfoReadyCallback(res)
  //             }
  //           }
  //         })

  //         // 上传用户信息至服务器
  //   let province = this.data.userinfo_.userInfo.province
  //   let name = this.data.userinfo_.userInfo.nickName
  //   let url = this.data.userinfo_.userInfo.avatarUrl

  //   // 存入数据，并返回用户的ID（自定义）
  //   wx.request({
  //     url: 'https://www.ecustwxapp.com/user_upload/',
  //     data: {
  //       'province': province,
  //       'name': name,
  //       'url': url,

  //     },
  //     header: {'content-type':'application/json'},
  //     method: 'POST',
  //     dataType: 'json',
  //     responseType: 'text',
  //     success: (res)=>{
  //       let userid = res.data.userid
  //       console.log(userid)
  //       wx.setStorageSync('userid', userid)
  //     },
  //     fail: ()=>{},
  //     complete: ()=>{}
  //   });

  //       }else{
  //         // 未授权，跳转到授权页面
  //         wx.reLaunch({
  //           url: '/pages/login/login',
  //         })
  //       }
  //     },
  //     fail: ()=>{
  //       wx.reLaunch({
  //         url: '/pages/login/login',
  //       })
  //     },
  //   })

  //   const userinfo1=wx.getStorageSync('userinfo');
  //   this.setData({
  //     userinfo_:userinfo1
  //   })
    
  //   common.get_user_idlevel()
  //   this.changelevel()



  // },
})