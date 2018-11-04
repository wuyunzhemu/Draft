const db = wx.cloud.database()
const user = db.collection('user')
let app = getApp();
// miniprogram/pages/signUp/signUp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showDmtrList:false,
    userInfo:{
      marks:500,
      openid:'',
      roomNum:'',
      roomerName:'',
      roomerPhone:'',
      school:'',
      area:'',
      dmtry:'',
    },
    areaList:{
      province_list:{
        110000:'江西财经大学'
      },
      city_list:{
        110100:'蛟桥园',
        110200:"麦庐园"
      },
      county_list:{
        110101:'蛟南1栋',
        110102: "蛟南2栋",
        110103: "蛟南3栋",
        110104: "蛟南4栋",
        110105: "蛟南5栋",
        110106: "蛟南6栋",
        110107: "蛟北7栋",
        110108: "蛟北8栋",
        110109: "蛟北9栋",
        110110: "蛟北10栋",
        110111: "蛟北11栋",
        110112: "蛟北12栋",
        110113: "蛟北13栋",
        110114: "蛟北14栋",
        110115: "蛟北15栋",
        110116: "蛟北16栋",
        110117: "蛟北17栋",
        110118: "蛟北18栋",
        110119: "蛟北19栋",
        110120: "蛟北20栋",
        110121: "蛟北21栋",
        110122: "蛟北22栋",
        110201: "麦北1栋",
        110202: "麦北2栋",
        110203: "麦北3栋",
        110204: "麦北4栋",
        110205: "麦北5栋",
        110206: "麦北6栋",
        110207: "宁庐A栋",
        110208: "宁庐B栋",
        110209: "静庐A栋",
        110210: "静庐B栋",
        110211: "静庐C栋",
        110212: "静庐D栋",
        110213: "静庐E栋",
        110214: "祥庐A栋",
        110215: "祥庐B栋",
        110216: "和庐A栋",
        110217: "和庐B栋",
        110218: "和庐C栋",
      }
    },
  },

  showList(){
    this.setData({
      showDmtrList:!this.data.showDmtrList
    })
  },

  selectRoom(e){
    console.log(e);
    this.setData({
      'userInfo.school':e.detail.detail.province,
      'userInfo.area':e.detail.detail.city,
      'userInfo.dmtry':e.detail.detail.county
    })

    this.showList();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(JSON.stringify(options) != "{}"){
      let userJson = JSON.parse(options.userInfo);
      this.setData({
        userInfo: userJson
      })
    }
    else{
      wx.getUserInfo({
        success:res=>{
          this.data.userInfo.wxInfo = res.userInfo;
        }
      })
      
    }
    wx.cloud.callFunction({
      name:'login',
      success:res=>{
          this.data.userInfo.openid =res.result.openid
      }
    })
  },

  changeRoomNum(e){
    this.data.userInfo.roomNum = e.detail
  },

  changeRoomerName(e) {
    this.data.userInfo.roomerName = e.detail
  },

  changeRoomerPhone(e) {
    this.data.userInfo.roomerPhone = e.detail
  },

  checkInfo(){
    let user = this.data.userInfo
    for(let i in user){
      if(user[i]===""){
        return false
      }
    }
    return true;
  },

  sendInfo(){
    let userInfo = this.data.userInfo;
    if(this.checkInfo()){
      user.add({
        data:userInfo,
        success:res=>{ 
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              success: (res) => {
                app.globalData.userInfo = userInfo;
                app.globalData.hasLog = true;
                wx.switchTab({
                  url: '../../pages/mine/mine',
                })
              }
            })        
         }
      })
    }
    else{
      wx.showToast({
        title: '页面信息未正确填写！',
        icon: 'none'
      })
      return
    }
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