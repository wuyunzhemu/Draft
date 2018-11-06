let app = getApp();

Page({
  data:{
    category:[{
      name:'文具',
      id:'wenju'
    },
    {
      name:'箱包',
      id:'xiangbao'
    },{
      name:'体育',
      id:'tiyu'
    },
    {
      name:'财大定制',
      id:'jxufe'
    },
    {
      name:'优惠券',
      id:'youhuiquan'
    }],
    curIndex:0,
    toView: 'wenju',
    isScroll:true,
    pageHeight:0,
    detail:[{
      cate:'文具',
      id:'wenju',
      detail:[{
        thumb:'../../images/pen.jpg',
        name:'中性笔',
        price:'10',
        select:false
      },{
          thumb: '../../images/notebook.jpg',
          name: '笔记本',
          price: '20',
          select: false
      },
      {
        thumb: '../../images/draftbook.jpg',
        name: '草稿本',
        price: '10',
        select: false
      }
      ]
    },{
      cate: '箱包',
      id:'xiangbao',
        detail: [{
          thumb: '../../images/caseBox.jpg',
          name: '行李箱',
          price: '1000',
          select: false
        },
        {
          thumb: '../../images/bag.jpg',
          name: '双肩包',
          price: '800',
          select: false
        }]
    },
    {
      cate: '体育',
      id: 'tiyu',
      detail: [{
        thumb: '../../images/yumaoball.jpg',
        name: '羽毛球一打',
        price: '400',
        select: false
      },
      {
        thumb: '../../images/pingpong.jpg',
        name: '乒乓球6个',
        price: '150',
        select: false
      },
      {
          thumb: '../../images/bsktb.jpg',
          name: '篮球',
          price: '1000',
          select: false
      },
      {
        thumb: '../../images/ftb.jpg',
        name: '足球',
        price: '1000',
        select: false
      }]
    },
      {
        cate: '财大定制',
        id: 'jxufe',
        detail: [{
          thumb: '../../images/Tsht.jpg',
          name: 'T恤',
          price: '1000',
          select: false
        },
        {
          thumb: '../../images/kwc.jpg',
          name: '养生保温杯',
          price: '500',
          select: false
        },
        {
          thumb: '../../images/mkc.jpg',
          name: '马克杯',
          price: '500',
          select: false
        },
        {
          thumb: '../../images/keyLock.jpg',
          name: '钥匙扣',
          price: '50',
          select: false
        }]
      },
      {
        cate: '优惠券',
        id: 'youhuiquan',
        detail: [{
          thumb: '../../images/st.jpg',
          name: '食堂10元兑换券',
          price: '100',
          select: false
        },
        {
          thumb: '../../images/st.jpg',
          name: '超市10元消费券',
          price: '100',
          select: false
        }]
      },
    
    ]
  },

  onLoad:function(){
    wx.getSystemInfo({
      success: (res) => {
        let pageHeight = res.windowHeight
        this.setData({
          pageHeight
        })
      }
    });
    
  },
  switchTab: function (e) {
    this.setData({
      curIndex: e.currentTarget.dataset.index,
      toView: e.target.dataset.id,
    })
  },
  
  
  setCur:function(e){

    this.setData({
      curIndex: Math.floor(e.detail.scrollTop / (this.data.pageHeight-60))
    })
  },

  addToCarts:function(e){
    let item = e.currentTarget.dataset.item
    for(let i =0; i<app.globalData.carts.length;i++)
    {
      if(app.globalData.carts[i].title===item.name)
      {
        wx.showToast({
          title: '该物品已存在购物车中！',
          icon:'none'
        })
        return
      }
    }
      app.globalData.carts.push({
        thumb:item.thumb,
        title:item.name,
        price:item.price,
        count:1,
        selected:true
      }),
    wx.showTabBarRedDot({
      index:1
    })
    wx.setTabBarBadge({
      index:1,
      text:''+app.globalData.carts.length
    })

  }
})