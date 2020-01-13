// pages/detail/detail.js
import $ from '../../common/common.js';
var amapFile = require('../../libs/amap-wx.js');
const app = getApp()
var markersData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseInfo: {},
    recommendInfo: {},
    currentSwiper: 1,
    sumSwiper: 0,
    isHide: 1,
    house_id: 0,
    image_url: '',
    isFoucs: 0,
    foucsCount: 0,
    src: '',
    isCode:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.scene) {
      this.setData({
        house_id: decodeURIComponent(options.scene),
        isCode : 1,
      });
    }else {
      this.setData({
        house_id: options.house_id,
      });
    }

    if (wx.getStorageSync('sessionKey')) {
      //如果缓存中存在sessionKey，查看是否后台中存在
      $.post(
        'index.php?m=smapp&c=login&a=updateUserViewTimes',
        {
          sessionKey: wx.getStorageSync('sessionKey'),
        },
        function (res) {
        
        }
      )
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
    var houseInfo = {};
    $.post(
      'index.php?m=smapp&c=detail&a=gethouseinfo',
      {
        house_id: this.data.house_id,
        sessionKey: wx.getStorageSync('sessionKey'),
      },
      function (res) {
        console.log(res);
        if (res.data.status == 1) {
          // 查找成功
          houseInfo = res.data.houseInfo;
          that.setData({
            houseInfo: res.data.houseInfo,
            recommendInfo: res.data.recommendHouseList,
            sumSwiper: res.data.houseInfo.images.length,
            isFoucs: res.data.isFoucs,
            foucsCount: res.data.foucsCount,
          });

          var myAmapFun = new amapFile.AMapWX({ key: "b6aa6ebf8c10449101e8332d481beb62" });
          myAmapFun.getStaticmap({
            zoom: 12,
            size: 335 + "*" + 130,
            scale: 2,
            location: houseInfo.latitude + ',' + houseInfo.longitude,
            labels: houseInfo.community + ",2,0,32,0xFFFFFF,0xff7e00:" + houseInfo.latitude + "," + houseInfo.longitude,
            success: function (data) {
              that.setData({
                src: data.url
              })
            },
            fail: function (info) {
              wx.showModal({ title: info.errMsg })
            }
          })

        } else if (res.data.status == 1) {
          // 查找成功,数据为空
        } else if (res.data.status == 0) {
          // 查找失败
        }

      }
    )

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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: this.data.houseInfo.name,
      path: '/pages/detail/detail?house_id=' + this.data.houseInfo.house_id,
      imageUrl: this.data.houseInfo.image_urls[0],
    }
  },

  /**
   * 大图滑动切换图片数字
   */
  changeSwiper: function (e) {
    var currentSwiper = e.detail.current;
    this.setData({
      currentSwiper: currentSwiper + 1,
    });
  },

  bindPreviewImage: function (e) {
    var current = e.currentTarget.dataset.url;
    var urls = this.data.houseInfo.image_urls;
    wx.previewImage({
      current: current,
      urls: urls,
    })
  },

  bindWantButton: function (e) {
    wx.makePhoneCall({
      phoneNumber: this.data.houseInfo.userphone //仅为示例，并非真实的电话号码
    })
  },

  hideAllChioce: function (e) {
    this.setData({
      isHide: 1,
    });
  },

  bindShow: function (e) {
    // 获取图片地址
    var that = this;
    $.post(
      'index.php?m=smapp&c=detail&a=getHouseImage',
      { house_id: this.data.house_id },
      function (res) {
        if (res.data.status == 1) {
          // 查找成功
          console.log(res.data.image_url);
          that.setData({
            image_url: res.data.image_url,
          });
        } else if (res.data.status == 1) {
          // 查找成功,数据为空
          wx.showToast({
            title: '网络繁忙，稍后再试',
            icon: 'none',
            duration: 2000
          })
        } else if (res.data.status == 0) {
          // 查找失败
          wx.showToast({
            title: '网络繁忙，稍后再试',
            icon: 'none',
            duration: 2000
          })
        }

      }
    )
    this.setData({
      isHide: 0,
    });
  },

  saveImage: function (e) {
    wx.downloadFile({
      url: this.data.image_url,
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
        })
      }
    })
  },

  moreInfo: function (e) {
    wx.navigateTo({
      url: '../info/info?house_id=' + this.data.house_id,
    })
  },

  moreDetail: function (e) {
    wx.navigateTo({
      url: '../basic/basic?house_id=' + this.data.house_id,
    })
  },

  shoucang: function (e) {
    var that = this;
    if (wx.getStorageSync('sessionKey')) {
      //如果缓存中存在sessionKey，查看是否后台中存在
      $.post(
        'index.php?m=smapp&c=Detail&a=foucsHouse',
        {
          sessionKey: wx.getStorageSync('sessionKey'),
          house_id: this.data.house_id,
          isFoucs: this.data.isFoucs,
        },
        function (res) {
          if (res.data.status == 1) {
            that.setData({
              isFoucs: res.data.isFoucs,
            });
            if (res.data.isFoucs == 0) {
              wx.showToast({
                title: '取消成功',
                icon: 'none',
                duration: 2000
              })
            }
          } else {
            wx.showToast({
              title: '网络繁忙，稍后再试',
              icon: 'none',
              duration: 2000
            })
          }
        }
      )
    }
  },
  bindAddress: function (e) {
    wx.openLocation({
      latitude: parseFloat(this.data.houseInfo.longitude),
      longitude: parseFloat(this.data.houseInfo.latitude),
      scale: 12
    })
  },

  bindShou: function(e) {
    wx.switchTab({
      url: '/pages/home/home'
    })
  }
})