// pages/cart/cart.js
 let db = wx.cloud.database();
 let user = db.collection('user');
 let sp = db.collection('shopping');
let app= getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasList: false,
    carts: [],
    totalPrice: 0,
    selectAllStatus: false
  },

  pay:function(){
    let that = this;
    let marks = app.globalData.userInfo.marks;
    let price = this.data.totalPrice;
    let openid = app.globalData.userInfo.openid;
    let carts = this.data.carts;
    if(this.data.totalPrice===0){
      wx.showToast({
        title: '您还没有添加物品~',
        icon:'none'
      })
      return ;
    }
    else if(marks < price){
      wx.showToast({
        title: '您的积分不足~',
        icon:'none'
      })
    }
    else if(app.globalData.hasLog===false){
      wx.showToast({
        title: '请先登陆~',
        icon:'none',
        success:res=>{
          wx.switchTab({
            url: '../../pages/mine/mine',
          })
        }
      })
    }
    else{
      wx.showModal({
        title: '提示',
        content: '确认提交吗',
        success(res) {
          if (res.confirm) {
            wx.showLoading({
              title: '正在提交',
            })
            marks -= price;
            user.where({
              _openid:openid
            }).get({
              success:userRes=>{
                let userId = userRes.data[0]._id;
                user.doc(userId).update({
                  data: {
                    marks: marks
                  },
                  success: res => {
                    app.globalData.userInfo.marks = marks;
                    let items = [];
                    let buy = {};
                    for(let i =0; i<carts.length;i++){
                      if(carts[i].selected === true){
                        items.push(carts[i])
                        carts.splice(i,1)
                        i--;
                      }
                    }
                    that.setData({
                      carts:carts
                    })
                    app.globalData.carts = that.data.carts
                    that.setBadge();
                    buy.user=userId;
                    buy.items = items
                    let key = that.random()
                    buy.key = key;
                    buy.price = '-'+price;
                    buy.user = openid;
                    buy.Time = that.getTime();
                    buy.status = '未兑换';
                    buy.title='积分兑换';
                    sp.add({
                      data:buy,
                      success:spres=>{
                        console.log(spres);
                        wx.hideLoading()
                        wx.navigateTo({
                          url: '../shopping/shopping?id='+spres._id,
                        })
                      }
                    })

                  }
                })
              }
            })         
          } else if (res.cancel) {
            return
          }
        }
      
      })
      return
    }
    return
  },


  getTime(){
      let date = new Date();
      let seperator1 = "-";//年月日分隔符
      let seperator2 = ":";//时分秒分隔符
      let month = date.getMonth() + 1; //月份是0~11，要加1为当前月
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
      return currentdate;
  },

  onShow: function () {
    this.setData({
      carts:app.globalData.carts
    })
    if(this.data.carts.length>0){
      this.setData({
        hasList:true,
        selectAllStatus:true
      })
    }
    else{
      this.setData({
        hasList: false,
    })
    }
    this.getTotalPrice();
  },

  
  random:function(){
    return (Math.random()*10000000).toFixed(0)
  },

  setBadge(){
    wx.showTabBarRedDot({
      index: 1
    })
    wx.setTabBarBadge({
      index: 1,
      text: '' + app.globalData.carts.length
    })

    if (app.globalData.carts.length === 0) {
      wx.hideTabBarRedDot({
        index: 1,
      })
      wx.removeTabBarBadge({
        index: 1,
      })
    }

  },

  getTotalPrice: function () {
    let carts = this.data.carts;
    let total = 0;
    // for(let i = 0;i<carts.length;i++){
    //   if(carts[i].selected){
    //     total+=carts[i].num*carts[i].price;
    //   }
    // }
    carts.forEach((item, index) => {
      if (item.selected) {
        total += item.price * item.count;
      }
    })
    app.globalData.carts = this.data.carts
    this.setBadge();
    this.setData({
      totalPrice: total
    })

  },

  selectedList: function (e) {
    let index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts[index].selected = !carts[index].selected;
    let selectedcount = 0;
    for (let cart of carts) {
      if (cart.selected == true) {
        selectedcount++;
      }
    }
    let isAllSelected = false;
    if (selectedcount == carts.length) {
      isAllSelected = true
    }
    this.setData({
      carts,
      selectAllStatus: isAllSelected
    })
    this.getTotalPrice();
  },

  deleteList: function (e) {
    let index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts = carts.filter((cart, i) => {
      return index != i;
    })
    this.setData({
      carts
    })

    if (!carts.length) {
      this.setData({
        hasList: false
      })
    }
    this.getTotalPrice();
  },


  selectAll: function () {
    let carts = this.data.carts
    let selectAllStatus = this.data.selectAllStatus
    selectAllStatus = !selectAllStatus
    carts.forEach((item, index) => {
      item.selected = selectAllStatus
    })
    this.setData({
      carts,
      selectAllStatus
    })
    this.getTotalPrice()
  },

  addCount: function (e) {
    console.log('addCount');
    let carts = this.data.carts;
    let index = e.currentTarget.dataset.index;
    carts[index].count++;
    this.setData({
      carts
    })
    this.getTotalPrice()
  },

  minusCount: function (e) {
    let carts = this.data.carts;
    let index = e.currentTarget.dataset.index;
    carts[index].count--;
    if (carts[index].count <= 0) {
      carts[index].count = 1;
    }
    this.setData({
      carts:carts
    })
    this.getTotalPrice()
  },


})
