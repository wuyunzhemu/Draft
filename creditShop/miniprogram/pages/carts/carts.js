// pages/cart/cart.js

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
    if(this.data.carts.length===0){
      wx.showToast({
        title: '您还没有添加物品~',
        icon:'none'
      })
      return ;
    }
    else{
      wx.showModal({
        title: '提示',
        content: '确认提交吗',
        success(res) {
          if (res.confirm) {
            return;
          } else if (res.cancel) {
            return
          }
        }
      
      })
      return
    }
    return
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
    if (carts[index].num <= 0) {
      carts[index].num = 1;
    }
    this.setData({
      carts
    })
    this.getTotalPrice()
  },

  toPay: function (e) {
    let price = e.currentTarget.dataset.price;
    console.log('支付' + price + '元')
  }
})
