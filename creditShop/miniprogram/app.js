//app.js
wx.cloud.init({
  env: 'fy-e77ad0'
})
App({
  globalData:({
    carts:[],
    hasLog:false,
    userInfo:{}
  }),
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
  }
})
