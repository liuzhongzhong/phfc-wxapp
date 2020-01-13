// pages/info/info.js
import $ from '../../common/common.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var house_id = options.house_id;
    var that = this;
    $.post(
      'index.php?m=smapp&c=detail&a=gethouseinfo',
      { house_id: house_id },
      function (res) {
        if (res.data.status == 1) {
          // 查找成功
          that.setData({
            houseInfo: res.data.houseInfo,
            recommendInfo: res.data.recommendHouseList,
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

  }
})