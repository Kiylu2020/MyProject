// pages/index/zhuanye/zhuanye.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    FloorList: [
        {
          xueyuan:'化工学院',
          navigator_url:'/pages/logs/logs',
          zhuanye:[
            {name:'化学工程与工艺'},{name:'轻化工程'},{name:'油气储运工程'},{name:'资源环境科学与工程'},
            {name:'化学工程与工艺（“化工与工程管理”双学士学位复合型人才培养）'}
          ]
        },
        {
          xueyuan:'生物工程学院',
          navigator_url:'/pages/logs/logs',
          zhuanye:[
            {name:'生物工程'},{name:'生物科学'},{name:'生物技术'},{name:'食品科学与工程'},{name:'食品质量与安全'},
            {name:'生物工程（中外合作办学）'},{name:'工科试验班（生物医药）'},
            {name:'应用化学（“应用化学与生物科学”双学士学位复合型人才培养，详见化学与分子工程学院相关介绍）'}
          ]
        },
        {
          xueyuan:'化学与分子工程学院',
          navigator_url:'/pages/logs/logs',
          zhuanye:[
            {name:'应用化学'},{name:'化学'},{name:'材料化学'},{name:'精细化工'},
            {name:'应用化学（“应用化学与生物科学”双学士学位复合型人才培养）'}
          ]
        },
        {
          xueyuan:'药学院',
          navigator_url:'/pages/logs/logs',
          zhuanye:[
            {name:'药学'},{name:'制药工程'},{name:'药物制剂'},{name:'工科试验班（生物医药）'}
          ]
        },
        {
          xueyuan:'材料科学与工程学院',
          navigator_url:'/pages/logs/logs',
          zhuanye:[
            {name:'高分子材料与工程'},{name:'无机非金属材料工程'},{name:'复合材料与工程'},{name:'新能源材料与器件'},
            {name:'高分子材料与工程（中外合作办学）'}
          ]
        },
        {
          xueyuan:'信息科学与工程学院',
          navigator_url:'/pages/logs/logs',
          zhuanye:[
            {name:'工科试验班（智能与机器人）'},{name:'自动化'},{name:'电气工程及其自动化'},{name:'信息工程'},
            {name:'计算机科学与技术'},{name:'软件工程'},{name:'智能科学与技术'},
            {name:'计算机科学与技术（“计算机与金融学”双学士学位复合型人才培养）'}
          ]
        },
        {
          xueyuan:'机械与动力工程学院',
          navigator_url:'/pages/logs/logs',
          zhuanye:[
            {name:'过程装备与控制工程'},{name:'机械设计制造及其自动化'},{name:'材料成型及控制工程'},
            {name:'工科试验班（智能与机器人）'}
          ]
        },
        {
          xueyuan:'资源与环境工程学院',
          navigator_url:'/pages/logs/logs',
          zhuanye:[
            {name:'环境工程'},{name:'安全工程'},{name:'能源与动力工程'}
          ]
        },
        {
          xueyuan:'理学院',
          navigator_url:'/pages/logs/logs',
          zhuanye:[
            {name:'数学与应用数学'},{name:'信息与计算科学'},{name:'应用物理学'},{name:'光电信息科学与工程'}
          ]
        },
        {
          xueyuan:'商学院',
          navigator_url:'/pages/logs/logs',
          zhuanye:[
            {name:'信息管理与信息系统'},{name:'物流管理'},{name:'工程管理'},{name:'工商管理'},{name:'市场营销'},
            {name:'人力资源管理'},{name:'会计学'},{name:'财务管理'},{name:'经济学'},{name:'金融学'},
            {name:'国际经济与贸易'},{name:'计算机科学与技术（“计算机与金融学”双学士学位复合型人才培养，详见信息科学与工程学院相关介绍）'},
            {name:'化学工程与工艺（“化工与工程管理”双学士学位复合型人才培养，详见化工学院相关介绍）'}
          ]
        },
        {
          xueyuan:'社会与公共管理学院',
          navigator_url:'/pages/logs/logs',
          zhuanye:[
            {name:'社会工作'},{name:'社会学'},{name:'行政管理'},{name:'公共事业管理'},{name:'劳动与社会保障'}
          ]
        },
        {
          xueyuan:'艺术设计与传媒学院',
          navigator_url:'/pages/logs/logs',
          zhuanye:[
            {name:'工业设计'},{name:'风景园林'},{name:'视觉传达设计'},{name:'环境设计'},{name:'产品设计'},{name:'数字媒体艺术'}
          ]
        },
        {
          xueyuan:'外国语学院',
          navigator_url:'/pages/logs/logs',
          zhuanye:[
            {name:'英语'},{name:'日语'},{name:'德语'}
          ]
        },
        {
          xueyuan:'法学院',
          navigator_url:'/pages/logs/logs',
          zhuanye:[
            {name:'法学'}
          ]
        },
        {
          xueyuan:'中德工学院（中外合作专业）',
          navigator_url:'/pages/logs/logs',
          zhuanye:[
            {name:'化学工程与工艺（环境科学与工程）'},{name:'电气工程及其自动化（电子信息工程）'},{name:'化学工程与工艺'}
          ]
        },
        {
          xueyuan:'体育科学与工程学院',
          navigator_url:'/pages/logs/logs',
          zhuanye:[
            {name:'国际经济与贸易（高水平运动员）'}
          ]
        },
        {
          xueyuan:'国际卓越工程师学院',
          navigator_url:'/pages/logs/logs',
          zhuanye:[
            {name:'化工与制药类（国际卓越工程师班，须学法语，含应用化学、环境工程、高分子材料与工程、化学工程与工艺）'}
          ]
        }
    ]
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