/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */

function GET(url, success, fail) {

  wx.request({
    url: "https://fx.comeyang.com/"+url,
    header: {
      'Content-Type': 'application/json',
    },
    success: function (res) {
      success(res);
    },
    fail: function (res) {
      fail(res);
    }
  });

}

/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */
function POST(url, data, success, fail) {
  wx.request({
    url: "https://fx.comeyang.com/" + url,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data:data,
    success: function (res) {
      success(res);
    },
    fail: function (res) {
      fail(res);
    }
  });
}

/**
* url 请求地址
* success 成功的回调
* fail 失败的回调
*/
function _post_json(url, data, success, fail) {
  wx.request({
    url: "https://fx.comeyang.com/" + url,
    header: {
      'content-type': 'application/json',
    },
    method: 'POST',
    data: data,
    success: function (res) {
      success(res);
    },
    fail: function (res) {
      fail(res);
    }
  });
}

function IsuserInfo(success, fail){
  wx.getStorage({
    key: 'userinfo_time',
    success: (res)=> {
      var timestamp=Date.parse(new Date());
      if(res.data){
        if (res.data < timestamp) {
          wx.removeStorage({
            key: 'userinfo',
            success: function (res) {
              wx.navigateTo({
                url: '../accredit/accredit'
              })
            }
          })
        }
      } 
    },
    fail:function(res){
      wx.getStorage({
        key: 'userinfo',
        success: function (res) {
          console.log(res)
        },
        fail: function (res) {
          console.log(res);
          wx.navigateTo({
            url: '../accredit/accredit'
          })
        }
      })
    }
  })
 
}
module.exports = {
  GET: GET,
  POST: POST,
  _post_json: _post_json,
  IsuserInfo: IsuserInfo
}