// miniprogram/pages/mine/mine.js
let app = getApp();
const db = wx.cloud.database()
const user = db.collection('user')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SignUp:false,
    hadSign:false,
    hasLog:false,
    userInfo:{}
  },

  Login:function(){
   wx.navigateTo({
     url: '../Login/Login',
   })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.hasLog)
    this.setData({
      hasLog : app.globalData.hasLog,
      userInfo : app.globalData.userInfo
    })

    wx.getSetting({
      success: res=>{
        if(res.authSetting['scope.userInfo']){
          //云函数查找
          if(res==null){
            
          }
        }
        else{
          // this.Login()
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