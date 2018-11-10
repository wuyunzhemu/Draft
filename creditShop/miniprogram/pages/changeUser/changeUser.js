// miniprogram/pages/changeUser/changeUser.js
import {Dialog} from '../../vant-weapp/dialog/dialog';
const db = wx.cloud.database();
const uzer = db.collection('user');
const mks = db.collection('credits')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList:[],
    hideAdd:true,
    hideMin:true,
    inputVaelu:0,
    mks
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    uzer.get({
      success: res => {
        // console.log(res);
        this.setData({
          userList: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */


  showAddMks(e){
    this.setData({
      hideAdd:!this.data.hideAdd,
      inputValue:0
    })
},

  showMinMks(e){
    this.setData({
      hideMin: !this.data.hideMin,
      inputValue: 0
    })
    
  },

  onbindinput(e){
    console.log(e)
    this.setData({
      inputValue:e.detail.value,
     
    })
  },

  add(e){
    if(this.data.inputValue==0){
      wx.showToast({
        title: '请输入数值~',
        icon:'none'
      })
      return;
    }
    wx.showLoading({
      title: '正在提交',
    })
    let index=e.currentTarget.dataset.index
    let user=e.currentTarget.dataset.item.id;
    let detail = '+'+this.data.inputValue
    let title = '垃圾兑换积分'
    let time = this.getTime();
    let marks = parseInt(e.currentTarget.dataset.item.marks) + parseInt(this.data.inputValue);
    let that = this;
    uzer.where({
      _openid:user
    }).get({
      success: userRes => {
        let userId = userRes.data[0]._id;
        uzer.doc(userId).update({
          data: {
            marks: marks
        },
        success:res=>{
          let item='userList['+index+'].marks'
         that.setData({
           [item]:marks
         })
         that.addToMks(user,time,title,detail);
         that.showAddMks();
         wx.hideLoading();
        }
      })
    }
  })
},


min(e){
  if (this.data.inputValue == 0) {
    wx.showToast({
      title: '请输入数值~',
      icon: 'none'
    })
    return;
  }
  wx.showLoading({
    title: '正在提交',
  })
  let index = e.currentTarget.dataset.index
  let user = e.currentTarget.dataset.item.id;
  let detail = '-' + this.data.inputValue
  let title = '管理员扣除积分'
  let time = this.getTime();
  let marks = parseInt(e.currentTarget.dataset.item.marks) - parseInt(this.data.inputValue);
  let that = this;
  uzer.where({
    _openid: user
  }).get({
    success: userRes => {
      let userId = userRes.data[0]._id;
      uzer.doc(userId).update({
        data: {
          marks: marks
        },
        success: res => {
          let item = 'userList[' + index + '].marks'
          that.setData({
            [item]: marks
          })
          that.addToMks(user, time, title, detail);
          that.showMinMks();
          wx.hideLoading();
        }
      })
    }
  })
},

  addToMks(id,time,title,price){
    mks.add({
      data: {
        user: id,
        time: time,
        title: title,
        detail: price
      },
    })
  },

  getTime() {
    let date = new Date();
    let seperator1 = "-";//年月日分隔符
    let seperator2 = ":";//时分秒分隔符
    let month = date.getMonth() + 1; //月份是0~11，要加1为当前月
    let strDate = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    if (hour >= 0 && hour <= 9) {
      hour = '0' + hour
    }
    if (min >= 0 && min <= 9) {
      min = '0' + min;
    }
    if (sec >= 0 && sec <= 9) {
      sec = '0' + sec
    }
    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + hour + seperator2 + min + seperator2 + sec;
    return currentdate;
  },

  toHome() {
    wx.switchTab({
      url: '../mine/mine',
    })
  },

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