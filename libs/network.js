/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */
function GET(url, success, fail) {

  console.log("------start---_get----");
  wx.request({
    url: "https://fx.comeyang.com/"+url,
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      success(res);
    },
    fail: function (res) {
      fail(res);
    }
  });

  console.log("----end-----_get----");
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
  console.log("----end-----_get----");
}

/**
* url 请求地址
* success 成功的回调
* fail 失败的回调
*/
function _post_json(url, data, success, fail) {
  console.log("----_post--start-------");
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

  console.log("----end----_post-----");
}
module.exports = {
  GET: GET,
  POST: POST,
  _post_json: _post_json
}