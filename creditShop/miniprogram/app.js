//app.js
wx.cloud.init({
  env: 'fy-e77ad0'
})
const db = wx.cloud.database()
const user = db.collection('user')
App({
  globalData:({
    carts:[],
    hasLog:false,
    userInfo:{},
    hasSet:false
  }),
  onLaunch: function () {
    let that = this
    wx.showLoading({
      title: '正在登陆',
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          that.globalData.hasSet = true;          //云函数查找
          wx.cloud.callFunction({
            name: 'login',
            success: res => {
              user.where({
                _openid: res.result.openid
              }).get().then(userRes => {
                if (userRes.data.length === 0) {
                  wx.hideLoading();
                  return;
                }
                else {
                  that.globalData.hasLog = true,
                  that.globalData.userInfo= userRes.data[0]
                  wx.hideLoading();
                }
              })

            }
          })
        }
        else{
          return;
        }
      }
      
    })
    return;
  }
})
