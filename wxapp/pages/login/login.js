// pages/login/login.js
// pages/login/login.js
Page({
  data: {
    canIUse:wx.canIUse('button.open-type,getUserInfo')
  },
  loginGetUserInfo:function(e){
    // console.log(e);
    const UserInfo = e.detail;
    wx.setStorageSync('userinfo',UserInfo);
    wx.navigateBack({
      delta: 1,
    });
    // 若已经过授权则不再显示登陆界面
    wx.getSetting({ 
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.reLaunch({ url: '../center/center' });
        }
      }
     });
   
  },

    /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
     let data = wx.getStorageSync('userinfo')
     let province = data.userInfo.province
     let name = data.userInfo.nickName
     let url = data.userInfo.avartarUrl
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
  },
})