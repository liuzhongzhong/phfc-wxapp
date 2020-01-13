//app.js
import $ from 'common/common.js';
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //session 未过期，并且在本生命周期一直有效
        if (wx.getStorageSync('sessionKey')) {
          //如果缓存中存在sessionKey，查看是否后台中存在
          $.post(
            'index.php?m=smapp&c=login&a=checkSession',
            {
              sessionKey: wx.getStorageSync('sessionKey')
            },
            function (res) {
              if (res.data.status == 1) {

              } else {
                wx.login({
                  success: res => {
                    if (res.code) {
                      // 发送 res.code 到后台换取 openId, sessionKey, unionId
                      $.post(
                        'index.php?m=smapp&c=login&a=index',
                        {
                          code: res.code,
                        },
                        function (res) {
                          wx.setStorageSync('sessionKey', res.data);
                        }
                      )
                    } else {
                    }

                  }
                })
              }
            }
          )
        } else {
          wx.login({
            success: res => {
              if (res.code) {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                $.post(
                  'index.php?m=smapp&c=login&a=index',
                  {
                    code: res.code,
                  },
                  function (res) {
                    wx.setStorageSync('sessionKey', res.data);
                  }
                )
              } else {
              }
            }
          })
        }
      },
      fail: function () {
        //登录态过期

        wx.login({
          success: res => {
            if (res.code) {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              $.post(
                'index.php?m=smapp&c=login&a=index',
                {
                  code: res.code,
                },
                function (res) {
                  wx.setStorageSync('sessionKey', res.data);
                }
              )
            } else {
            }
          }
        })
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})