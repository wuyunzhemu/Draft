// miniprogram/pages/manager/manager.js
const db = wx.cloud.database();
const mng = db.collection('manager');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    pwd:''
  },

  getUserName(e){
    this.setData({
      userName:e.detail
    })
  },
  getPwd(e){
    this.setData({
      pwd:e.detail
    })
  },

  checkLogin(){
    let userName=this.data.userName;
    let pwd = this.data.pwd;
    let that = this;
    mng.where({
      userName:userName,
      pwd:pwd
    }).get({
      success:res=>{
        console.log(res)
        if(res.data.length===0){
          wx.showToast({
            title: '用户名或密码不正确~',
            icon:'none'
          })
        }
        else{
          wx.navigateTo({
            url: '../changeUser/changeUser',
          })
        }
      }
    })
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