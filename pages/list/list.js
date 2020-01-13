import $ from '../../common/common.js';
const app = getApp()
// pages/list/list.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chioceArea: 0,
    chiocePrice: 0,
    chioceType: 0,
    chioceOther: 0,
    scrollTop: 0,
    scrollIntoView: 0,
    activeDistrictParentIndex: -1,
    activeDistrictChildrenIndex: -1,
    priceLow: '',
    priceHigh: '',
    search_input: '',
    districtList: [
      {
        district_name: '片区',
        district_children_list: [
          { district_name: '不限', id: 0 },
          { district_name: '滨湖', id: 1 },
          { district_name: '梁溪', id: 2 },
          { district_name: '新吴', id: 3 },
          { district_name: '惠山', id: 4 },
          { district_name: '锡山', id: 5 },
          { district_name: '江阴', id: 6 },
          { district_name: '宜兴', id: 7 }],
      },
      {
        district_name: '地铁',
        district_children_list: [
          { district_name: '不限', },
          { district_name: '1号线', id: 1 },
          { district_name: '2号线', id: 2 }
        ],
      }
    ],

    priceList: [
      {
        title: '价格区间',
        span: [
          {
            name: '40万以下',
            status: 0,
            id: 1
          },
          {
            name: '40-60万',
            status: 0,
            id: 2
          },
          {
            name: '60-80万',
            status: 0,
            id: 3
          },
          {
            name: '80-100万',
            status: 0,
            id: 4
          },
          {
            name: '100-150万',
            status: 0,
            id: 5
          },
          {
            name: '150-200万',
            status: 0,
            id: 6
          },
          {
            name: '200万以上',
            status: 0,
            id: 7
          },
        ]
      }
    ],

    typeList: [
      {
        title: '房型选择',
        span: [
          {
            name: '一室',
            status: 0,
            id: 1
          },
          {
            name: '二室',
            status: 0,
            id: 2
          },
          {
            name: '三室',
            status: 0,
            id: 3
          },
          {
            name: '四室',
            status: 0,
            id: 4
          },
          {
            name: '五室',
            status: 0,
            id: 5
          },
          {
            name: '五室以上',
            status: 0,
            id: 6
          },
        ]
      }
    ],

    otherList: [
      {
        title: '建筑面积',
        span: [
          {
            name: '50以下',
            status: 0,
            id: 1
          },
          {
            name: '50-70',
            status: 0,
            id: 2
          },
          {
            name: '70-90',
            status: 0,
            id: 3
          },
          {
            name: '90-120',
            status: 0,
            id: 4
          },
          {
            name: '120-150',
            status: 0,
            id: 5
          },
          {
            name: '150-200',
            status: 0,
            id: 6
          },
          {
            name: '200-300',
            status: 0,
            id: 7
          },
          {
            name: '300以上',
            status: 0,
            id: 8
          },
        ]
      },
      {
        title: '朝向',
        span: [
          {
            name: '朝东',
            status: 0,
            id: 1
          },
          {
            name: '朝南',
            status: 0,
            id: 2
          },
          {
            name: '朝西',
            status: 0,
            id: 3
          },
          {
            name: '朝北',
            status: 0,
            id: 4
          },
          {
            name: '南北',
            status: 0,
            id: 5
          },
        ]
      },
      {
        title: '标签',
        span: [
          {
            name: '随时看',
            status: 0,
            id: 1
          },
          {
            name: '近地铁',
            status: 0,
            id: 2
          },
          {
            name: '新上房',
            status: 0,
            id: 3
          },
          {
            name: '满五年',
            status: 0,
            id: 4
          },
        ]
      },
      {
        title: '楼层',
        span: [
          {
            name: '低楼层',
            status: 0,
            id: 1
          },
          {
            name: '中楼层',
            status: 0,
            id: 2
          },
          {
            name: '高楼层',
            status: 0,
            id: 3
          },
        ]
      },
      {
        title: '用途',
        span: [
          {
            name: '普通住宅',
            status: 0,
            id: 1
          },
          {
            name: '商住两用',
            status: 0,
            id: 2
          },
          {
            name: '写字楼',
            status: 0,
            id: 3
          },
          {
            name: '其它',
            status: 0,
            id: 4
          },
        ]
      },
    ],

    area_id: 0,
    area_type: 0, // 0片区 1 地铁
    priceFather_id: 0,
    priceSon_id: 0,
    otherFather_id: 0,
    otherSon_id: 0,
    areaSon_id: 0,
    chaoSon_id: 0,
    floorSon_id: 0,
    useSon_id: 0,

    areaTypeResault_id: 0,
    priceResault_id: 0,
    areaResault_id: 0,
    chaoResault_id: 0,
    floorResault_id: 0,
    useResault_id: 0,
    house_type: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      house_type: options.type,
    });
    if (options.input_value) {
      this.setData({
        search_input: options.input_value,
      });
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
    var that = this;
    $.post(
      'index.php?m=smapp&c=list&a=listhouse',
      {
        priceLow: this.data.priceLow,
        priceHigh: this.data.priceHigh,
        districtList: JSON.stringify(this.data.districtList),
        priceSon_id: this.data.priceSon_id,
        typeList: JSON.stringify(this.data.typeList),
        otherList: JSON.stringify(this.data.otherList),

        area_id: this.data.area_id,
        area_type: this.data.area_type,
        priceResault_id: this.data.priceResault_id,
        areaResault_id: this.data.areaResault_id,
        chaoResault_id: this.data.chaoResault_id,
        floorResault_id: this.data.floorResault_id,
        useResault_id: this.data.useResault_id,
        search_input: this.data.search_input,
        house_type: this.data.house_type,
      },
      function (res) {
        if (res.data.status == 1) {
          // 查找成功
          console.log(res.data);
          that.setData({
            houseList: res.data.houseList
          });

        } else if (res.data.status == 1) {
          // 查找成功,数据为空
          wx.showToast({
            title: '暂无此类型房源',
            icon: 'none',
            duration: 2000
          })
        } else if (res.data.status == 0) {
          // 查找失败
          wx.showToast({
            title: '暂无此类型房源',
            icon: 'none',
            duration: 2000
          })
        }

      }
    )
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onShow();
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

  },

  //条件选择
  choiceItem: function (e) {
    switch (e.currentTarget.dataset.item) {
      case "1":
        if (this.data.chioceArea) {
          this.setData({
            chioceArea: 0,
            chiocePrice: 0,
            chioceType: 0,
            chioceOther: 0,
          });
        }
        else {
          this.setData({
            chioceArea: 1,
            chiocePrice: 0,
            chioceType: 0,
            chioceOther: 0,
          });
        }
        break;
      case "2":
        if (this.data.chiocePrice) {
          this.setData({
            chioceArea: 0,
            chiocePrice: 0,
            chioceType: 0,
            chioceOther: 0,
          });
        }
        else {
          this.setData({
            chioceArea: 0,
            chiocePrice: 1,
            chioceType: 0,
            chioceOther: 0,
          });
        }
        break;
      case "3":
        if (this.data.chioceType) {
          this.setData({
            chioceArea: 0,
            chiocePrice: 0,
            chioceType: 0,
            chioceOther: 0,
          });
        }
        else {
          this.setData({
            chioceArea: 0,
            chiocePrice: 0,
            chioceType: 1,
            chioceOther: 0,
          });
        }
        break;
      case "4":
        if (this.data.chioceOther) {
          this.setData({
            chioceArea: 0,
            chiocePrice: 0,
            chioceType: 0,
            chioceOther: 0,
          });
        }
        else {
          this.setData({
            chioceArea: 0,
            chiocePrice: 0,
            chioceType: 0,
            chioceOther: 1,
          });
        }
        break;
    }
  },

  hideAllChioce: function () {
    this.setData({
      chioceArea: 0,
      chiocePrice: 0,
      chioceType: 0,
      chioceOther: 0,
    });
  },

  selectDistrictParent: function (e) {
    this.setData({
      activeDistrictParentIndex: e.currentTarget.dataset.index,
      activeDistrictName: this.data.districtList[e.currentTarget.dataset.index].district_name,
      activeDistrictChildrenIndex: 0,
      scrollTop: 0,
      scrollIntoView: 0
    })
  },

  selectDistrictChildren: function (e) {

    var index = e.currentTarget.dataset.index;
    var parentIndex = this.data.activeDistrictParentIndex == -1 ? 0 : this.data.activeDistrictParentIndex;
    if (index == 0) {
      this.setData({
        activeDistrictName: this.data.districtList[parentIndex].district_name
      })
    } else {
      this.setData({
        activeDistrictName: this.data.districtList[parentIndex].district_children_list[index].district_name
      })
    }

    this.setData({
      chioceArea: 0,
      activeDistrictChildrenIndex: index,
      productList: [],
      pageIndex: 1,
      loadOver: 0,
      isLoading: 1,
      area_id: this.data.districtList[parentIndex].district_children_list[index].id,
      area_type: parentIndex,
    })
    this.onShow();
  },

  bindOtherChoiceSpan: function (e) {
    var father = e.currentTarget.dataset.father;
    var son = e.currentTarget.dataset.son;
    var otherList = this.data.otherList;

    if (father == 2) {
      // 标签
      otherList[father].span[son].status = !otherList[father].span[son].status;
      this.setData({
        otherList: otherList
      })
    } else if (father == 1) {
      // 面积
      if (son != this.data.chaoSon_id) {
        otherList[father].span[son].status = 1;
        otherList[father].span[this.data.chaoSon_id].status = 0;
        this.setData({
          otherList: otherList,
          chaoSon_id: son,
          chaoResault_id: otherList[father].span[son].id
        })
      } else {
        otherList[father].span[this.data.chaoSon_id].status = (otherList[father].span[this.data.chaoSon_id].status == 0) ? 1 : 0;

        if (otherList[father].span[this.data.chaoSon_id].status == 0) {
          this.setData({
            otherList: otherList,
            chaoResault_id: 0
          })
        } else {
          this.setData({
            otherList: otherList,
            chaoResault_id: otherList[father].span[son].id
          })
        }

      }
    } else if (father == 0) {
      // 朝向
      if (son != this.data.areaSon_id) {
        otherList[father].span[son].status = 1;
        otherList[father].span[this.data.areaSon_id].status = 0;
        this.setData({
          otherList: otherList,
          areaSon_id: son,
          areaResault_id: otherList[father].span[son].id
        })
      } else {
        otherList[father].span[this.data.areaSon_id].status = (otherList[father].span[this.data.areaSon_id].status == 0) ? 1 : 0;
        if (otherList[father].span[this.data.areaSon_id].status == 0) {
          this.setData({
            otherList: otherList,
            areaResault_id: 0
          })
        } else {
          this.setData({
            otherList: otherList,
            areaResault_id: otherList[father].span[son].id
          })
        }

      }
    } else if (father == 3) {
      // 楼层
      if (son != this.data.floorSon_id) {
        otherList[father].span[son].status = 1;
        otherList[father].span[this.data.floorSon_id].status = 0;
        this.setData({
          otherList: otherList,
          floorSon_id: son,
          floorResault_id: otherList[father].span[son].id
        })
      } else {
        otherList[father].span[this.data.floorSon_id].status = (otherList[father].span[this.data.floorSon_id].status == 0) ? 1 : 0;

        if (otherList[father].span[this.data.floorSon_id].status == 0) {
          this.setData({
            otherList: otherList,
            floorResault_id: 0
          })
        } else {
          this.setData({
            otherList: otherList,
            floorResault_id: otherList[father].span[son].id
          })
        }

      }
    } else if (father == 4) {
      // 楼层
      if (son != this.data.useSon_id) {
        otherList[father].span[son].status = 1;
        otherList[father].span[this.data.useSon_id].status = 0;

        this.setData({
          otherList: otherList,
          useSon_id: son,
          useResault_id: otherList[father].span[son].id
        })
      } else {
        otherList[father].span[this.data.useSon_id].status = (otherList[father].span[this.data.useSon_id].status == 0) ? 1 : 0;

        if (otherList[father].span[this.data.useSon_id].status == 0) {
          this.setData({
            otherList: otherList,
            useResault_id: 0
          })
        } else {
          this.setData({
            otherList: otherList,
            useResault_id: otherList[father].span[son].id
          })
        }

      }
    }


  },

  bindTypeChoiceSpan: function (e) {
    var father = e.currentTarget.dataset.father;
    var son = e.currentTarget.dataset.son;
    var typeList = this.data.typeList;

    typeList[father].span[son].status = !typeList[father].span[son].status;
    this.setData({
      typeList: typeList
    })
  },

  bindPriceChoiceSpan: function (e) {
    var father = e.currentTarget.dataset.father;
    var son = e.currentTarget.dataset.son;
    var priceList = this.data.priceList;
    if (son != this.data.priceSon_id) {
      priceList[father].span[son].status = 1;
      priceList[this.data.priceFather_id].span[this.data.priceSon_id].status = 0;
      this.setData({
        priceList: priceList,
        priceFather_id: father,
        priceSon_id: son,
        priceResault_id: priceList[father].span[son].id

      })
    } else {
      priceList[this.data.priceFather_id].span[this.data.priceSon_id].status = (priceList[this.data.priceFather_id].span[this.data.priceSon_id].status == 0) ? 1 : 0;
      this.setData({
        priceList: priceList,
        priceResault_id: priceList[father].span[son].id
      })
    }
  },

  bindKeyInputLow: function (e) {
    this.setData({
      priceLow: e.detail.value
    })
  },

  bindKeyInputHigh: function (e) {
    this.setData({
      priceHigh: e.detail.value
    })
  },

  priceSureButton: function (e) {
    this.setData({
      chioceArea: 0,
      chiocePrice: 0,
      chioceType: 0,
      chioceOther: 0,
    });
    this.onShow();
  },

  priceNoButton: function (e) {
    var priceLow = '';
    var priceHigh = '';
    var priceList = [
      {
        title: '价格区间',
        span: [
          {
            name: '40万以下',
            status: 0,
            id: 1
          },
          {
            name: '40-60万',
            status: 0,
            id: 2
          },
          {
            name: '60-80万',
            status: 0,
            id: 3
          },
          {
            name: '80-100万',
            status: 0,
            id: 4
          },
          {
            name: '100-150万',
            status: 0,
            id: 5
          },
          {
            name: '150-200万',
            status: 0,
            id: 6
          },
          {
            name: '200万以上',
            status: 0,
            id: 7
          },
        ]
      }
    ];

    this.setData({
      priceLow: priceLow,
      priceHigh: priceHigh,
      priceList: priceList,
      priceResault_id: 0,
    });

    // 请求列表
    this.setData({
      chioceArea: 0,
      chiocePrice: 0,
      chioceType: 0,
      chioceOther: 0,
    });
    this.onShow();
  },

  typeSureButton: function (e) {
    this.setData({
      chioceArea: 0,
      chiocePrice: 0,
      chioceType: 0,
      chioceOther: 0,
    });
    this.onShow();
  },

  typeNoButton: function (e) {
    var typeList = [
      {
        title: '房型选择',
        span: [
          {
            name: '一室',
            status: 0,
            id: 1
          },
          {
            name: '二室',
            status: 0,
            id: 2
          },
          {
            name: '三室',
            status: 0,
            id: 3
          },
          {
            name: '四室',
            status: 0,
            id: 4
          },
          {
            name: '五室',
            status: 0,
            id: 5
          },
          {
            name: '五室以上',
            status: 0,
            id: 6
          },
        ]
      }
    ];
    this.setData({
      typeList: typeList,
    });
    this.setData({
      chioceArea: 0,
      chiocePrice: 0,
      chioceType: 0,
      chioceOther: 0,
    });
    this.onShow();
  },

  otherSureButton: function (e) {
    this.setData({
      chioceArea: 0,
      chiocePrice: 0,
      chioceType: 0,
      chioceOther: 0,
    });
    this.onShow();
  },

  otherNoButton: function (e) {
    var otherList = [
      {
        title: '建筑面积',
        span: [
          {
            name: '50以下',
            status: 0,
            id: 1
          },
          {
            name: '50-70',
            status: 0,
            id: 2
          },
          {
            name: '70-90',
            status: 0,
            id: 3
          },
          {
            name: '90-120',
            status: 0,
            id: 4
          },
          {
            name: '120-150',
            status: 0,
            id: 5
          },
          {
            name: '150-200',
            status: 0,
            id: 6
          },
          {
            name: '200-300',
            status: 0,
            id: 7
          },
          {
            name: '300以上',
            status: 0,
            id: 8
          },
        ]
      },
      {
        title: '朝向',
        span: [
          {
            name: '朝东',
            status: 0,
            id: 1
          },
          {
            name: '朝南',
            status: 0,
            id: 2
          },
          {
            name: '朝西',
            status: 0,
            id: 3
          },
          {
            name: '朝北',
            status: 0,
            id: 4
          },
          {
            name: '南北',
            status: 0,
            id: 5
          },
        ]
      },
      {
        title: '标签',
        span: [
          {
            name: '满五年',
            status: 0,
            id: 1
          },
          {
            name: '满两年',
            status: 0,
            id: 2
          },
          {
            name: '近地铁',
            status: 0,
            id: 3
          },
          {
            name: '新上',
            status: 0,
            id: 4
          },
          {
            name: '随时看房',
            status: 0,
            id: 5
          },
          {
            name: '不看地下室',
            status: 0,
            id: 6
          },
          {
            name: '不看车位',
            status: 0,
            id: 7
          },
        ]
      },
      {
        title: '楼层',
        span: [
          {
            name: '低楼层',
            status: 0,
            id: 1
          },
          {
            name: '中楼层',
            status: 0,
            id: 2
          },
          {
            name: '高楼层',
            status: 0,
            id: 3
          },
        ]
      },
      {
        title: '用途',
        span: [
          {
            name: '普通住宅',
            status: 0,
            id: 1
          },
          {
            name: '别墅',
            status: 0,
            id: 2
          },
          {
            name: '四合院',
            status: 0,
            id: 3
          },
          {
            name: '其它',
            status: 0,
            id: 4
          },
        ]
      },
    ];
    this.setData({
      otherList: otherList,
    });
    this.setData({
      chioceArea: 0,
      chiocePrice: 0,
      chioceType: 0,
      chioceOther: 0,
      areaSon_id: 0,
      chaoSon_id: 0,
      floorSon_id: 0,
      useSon_id: 0,

      areaResault_id: 0,
      chaoResault_id: 0,
      floorResault_id: 0,
      useResault_id: 0,
    });
    this.onShow();
  },

  bindKeyInput: function (e) {
    this.setData({
      search_input: e.detail.value
    })
  },
  searchButton: function (e) {
    if (this.data.search_input) {
      this.onShow();
    } else {
      wx.showToast({
        title: '请输入关键字',
        icon: 'none',
        duration: 2000
      })
    }

  },
  houseDetail: function (e) {
    var house_id = e.currentTarget.dataset.house_id;
    wx.navigateTo({
      url: '../detail/detail?house_id=' + house_id,
    })
  }
})