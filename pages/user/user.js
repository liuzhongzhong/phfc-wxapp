// pages/user/user.js
import $ from '../../common/common.js';
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    focusCount: 0,
    watch_times: 0,
    view_times: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
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
      'index.php?m=smapp&c=login&a=getUserInfo',
      {
        sessionKey: wx.getStorageSync('sessionKey'),
      },
      function (res) {
        if (res.data.status == 1) {
          that.setData({
            userInfo: res.data.userInfo,
            focusCount: res.data.focusCount,
            watch_times: res.data.userInfo.watch_times,
            view_times: res.data.userInfo.view_times,

          });

        } else {
          wx.showToast({
            title: '网络繁忙，稍后再试',
            icon: 'none',
            duration: 2000
          })
        }
      }
    );
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

  getUserInfo: function (e) {
    if (e.detail.userInfo && this.data.hasUserInfo != true) {
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      var user = this.data.userInfo;
      this.uploadUserInfo();
    }
  },

  uploadUserInfo: function () {
    var that = this;
    var userInfo = this.data.userInfo;
    $.post(
      'index.php?m=smapp&c=login&a=saveUserInfo',
      {
        sessionKey: JSON.stringify(wx.getStorageSync('sessionKey')),
        userInfo: JSON.stringify(userInfo)
      },
      function (res) {
      }
    );
    that.onShow();
  },

  bindFocus: function () {
    wx.navigateTo({
      url: '../focus/focus?user_id=' + this.data.userInfo.user_id,
    })
  },

  bindKefu: function () {
    wx.showModal({
      title: '鹏辉房产24小时热线',
      content: '18262255777',
      cancelText: '稍后联系',
      confirmText: '立即拨打',
      confirmColor: '#ff7e00',
      cancelColor: '#333333',
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: '18262255777'
          })
        } else if (res.cancel) {

        }
      }
    })
  }
})