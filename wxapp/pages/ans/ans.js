// pages/ans/ans.js

var app = getApp()
Page({
  data: {
    region: ['北京市','天津市','上海市','重庆市','黑龙江省','吉林省','辽宁省','河北省','河南省','山东省','山西省','安徽省','江西省','江苏省','浙江省','福建省','台湾省','广东省','湖南省','湖北省','海南省','云南省','贵州省','四川省','青海省','甘肃省','陕西省','内蒙古自治区','新疆维吾尔自治区','广西壮族自治区','宁夏回族自治区','西藏自治区','香港特别行政区','澳门特别行政区'],//使用普通选择器
    index : 0,
  },
  
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    });
    console.log ("index的值为",this.data.index);
  },
  submitLocation:function(e){
    let location = this.data.region[this.data.index]
    wx.setStorage({
      key:"bbs_location",
      data:location
    })
  },

  //确定按钮点击事件
  modalBindaconfirm:function(){
      console.log (this.data.region[this.data.index])
      this.submitLocation()
      wx.navigateTo({
        url: "/pages/ans/bbs/bbs_title/bbs_title",
      })
  },
  //取消按钮点击事件
  // --------------------------------------这里可能需要处理一下---------------------------------------------
  modalBindcancel:function(){
    wx.switchTab({
      url: "/pages/center/center",
    })
  },
})

