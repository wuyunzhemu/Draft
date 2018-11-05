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
    if(this.data.hasSet)
    {
      wx.navigateTo({
        url: '../signUp/signUp',
      })
    }
    else{
      wx.navigateTo({
        url: '../Login/Login',
      })
    }
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
    })
    

    wx.getSetting({
      success: res=>{
        if(res.authSetting['scope.userInfo']){
          this.data.hasSet=true;          //云函数查找
          wx.cloud.callFunction({
            name:'login',
            success:res=>{
              user.where({
                _openid:res.result.openid
                }).get().then(userRes=>{
                  if(userRes.data.length===0){
                    return;
                  }
                  else{
                    this.setData({
                      hasLog:true,
                      userInfo:userRes.data[0]
                    })
                    app.globalData.userInfo = this.data.userInfo;
                    app.globalData.hasLog = true;
                  }
                })
              wx.hideLoading();
            }
          })
        }
      }
    })

  },

  findUser:function(){

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
      userInfo: app.globalData.userInfo
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