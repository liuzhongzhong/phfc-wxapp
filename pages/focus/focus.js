import $ from '../../common/common.js';
const app = getApp()
// pages/list/list.js

Page({

  /**
   * 页面的初始数据
   */
  data: {

    search_input: '',
    user_id: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user_id: options.user_id,
    });
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
      'index.php?m=smapp&c=login&a=focushouse',
      {
        search_input: this.data.search_input,
        user_id: this.data.user_id,
      },
      function (res) {
        if (res.data.status == 1) {
          // 查找成功
          that.setData({
            houseList: res.data.houseList
          });

        } else if (res.data.status == 1) {
          // 查找成功,数据为空
          wx.showToast({
            title: '暂无关注房源',
            icon: 'none',
            duration: 2000
          })
        } else if (res.data.status == 0) {
          // 查找失败
          wx.showToast({
            title: '暂无关注房源',
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