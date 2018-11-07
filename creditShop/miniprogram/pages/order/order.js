// miniprogram/pages/order/order.js
const db = wx.cloud.database();
const sp = db.collection('shopping');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[],
    items:[]
  },


  intoDetail(e){
    wx.navigateTo({
      url: '../shopping/shopping?id='+e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = options.openid;
    let that = this;
    sp.where({
      user: user
    }).get({
      success: res => {
        let arr= res.data.reverse();
        let str = []
        for(let i=0;i<arr.length;i++){
          str[i] = '';
          for(let j=0;j<arr[i].items.length;j++){
            str[i]+=' '+arr[i].items[j].title+' x '+arr[i].items[j].count+' \n\n ';
          }
        }
        that.setData({
          orders:arr,
          items:str
        })
        console.log(that.data.orders);
        console.log(that.data.items);
      }
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