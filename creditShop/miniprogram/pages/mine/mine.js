// miniprogram/pages/mine/mine.js
let app = getApp();
const db = wx.cloud.database()
const user = db.collection('user')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasLog:false,
    userInfo:{},
    hasSet:false
  },

  Login:function(){
    wx.getSetting({
    success: res => {
      if (res.authSetting['scope.userInfo']) {
        this.setData({
          hasSet:true
        })
        }
      if (this.data.hasSet == true) {
        wx.showLoading({
          title: '正在登陆',
        })
        wx.cloud.callFunction({
          name: 'login',
          success: res => {
            user.where({
              _openid: res.result.openid
            }).get().then(userRes => {
              if (userRes.data.length === 0) {
                wx.navigateTo({
                  url: '../signUp/signUp',
                })
              }
              else {
                this.setData({
                  hasLog: true,
                  userInfo: userRes.data[0]
                })
                app.globalData.userInfo = this.data.userInfo;
                app.globalData.hasLog = true;
              }
              wx.hideLoading();
            })
          }
        })
      }
      else {
        wx.navigateTo({
          url: '../Login/Login',
        })
      }
      }
    })  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success:res=>{
        if (res.authSetting['scope.userInfo']) {
          this.data.hasSet = true;

        }
        else{
          return;
        }
      }
    })


  },

  seekOrders:function(){
    let that = this;
    if (that.data.hasLog === false) {
      wx.showToast({
        title: '请先登陆~',
        icon:'none'
      })
      return
    }
    else {
      wx.navigateTo({
        url: '../order/order?' + that.data.userInfo.openid,
      })
    }
  },

  logOut:function(){
    wx.showModal({
      title: '退出',
      content: '确认退出吗',
      success:res=>{
        if(res.confirm){
          this.setData({
            hasLog: false,
            userInfo: {}
          })
          app.globalData.hasLog = false;
          app.globalData.userInfo = {}
        }
        else{
          return;
        }
      }
    })
    
  },

  seekCredits(){
    let that = this;
    if(that.data.hasLog===false)
    {
      wx.showToast({
        title: '请先登陆~',
        icon:'none'
      })
      return
    }
    else{
      wx.navigateTo({
        url: '../credits/credits?'+that.data.userInfo.openid,
      })
    }
  },

  Immanager(){
    wx.navigateTo({
      url: '../manager/manager',
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
    this.setData({
      hasLog: app.globalData.hasLog,
      userInfo: app.globalData.userInfo,
      hasSet:app.globalData.hasSet
    })
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