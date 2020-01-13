// pages/home/home.js
import $ from '../../common/common.js';
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseList: {},
    inputValue: '',
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
    var that = this;
    $.post(
      'index.php?m=smapp&c=home&a=recommendlist',
      {},
      function (res) {
        if (res.data.status == 1) {
          // 查找成功
          that.setData({
            houseList: res.data.houseList
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
  onShareAppMessage: function () {

  },

  ershou: function (e) {
    wx.navigateTo({
      url: '../list/list?type=2',
    })
  },
  xinfang: function (e) {
    wx.navigateTo({
      url: '../list/list?type=1',
    })
  },
  zufang: function (e) {
    wx.navigateTo({
      url: '../list/list?type=3',
    })
  },
  shangpu: function (e) {
    wx.navigateTo({
      url: '../list/list?type=4',
    })
  },
  houseDetail: function (e) {
    var house_id = e.currentTarget.dataset.house_id;
    wx.navigateTo({
      url: '../detail/detail?house_id=' + house_id,
    })
  },

  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  searchInput: function (e) {
    if (!this.data.inputValue) {
      wx.showToast({
        title: '请输入搜索关键字',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../list/list?type=0&input_value=' + this.data.inputValue,
      })
    }

  }
})