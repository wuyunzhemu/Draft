// miniprogram/pages/shopping/shopping.js
const db = wx.cloud.database();
const item = db.collection('shopping');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:{},
    items:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.showLoading({
      title: '正在加载',
    })
    item.where({
      _id: options.id,
    }).get({
      success: itemRes => {
        let str = ''
        for(let i =0;i<itemRes.data[0].items.length;i++){
          str += itemRes.data[0].items[i].title + 'x' + itemRes.data[0].items[i].count+'  '
        }
        that.setData({
          items:str,
          goods:itemRes.data[0]
        })
        wx.hideLoading()
      }
    })
  },

  back:function(){
    wx.navigateBack({
      delta:1
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