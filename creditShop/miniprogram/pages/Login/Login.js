
// miniprogram/pages/Login/Login.js

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  bindGetUserInfo:function(e){
    let that = this;
    if(e.detail.userInfo){
  
      let user =JSON.stringify(e.detail.userInfo)

      wx.showModal({
        content: "授权成功，第一次登陆请先完善个人信息",
        showCancel: false,
        confirmText: '知道了',
        success: function (res) {
          wx.redirectTo({
            url: '../signUp/signUp?userInfo='+user,
          })
        }
      })
    }
    else{
      wx.showModal({
        content: "您已拒绝授权",
        showCancel: false,
        confirmText: '知道了',
        success: function (res) {
          that.setData({
            showModal2: false
          });
        }
      })
    }
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