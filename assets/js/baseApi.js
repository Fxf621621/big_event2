$(function() {

    // 立即执行函数
    $.ajaxPrefilter(function(options) {

        // 统一设置默认接口，后面拼接上对应的 url 地址就可以
        options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
        // options.url = 'http://ajax.frontend.itheima.net' + options.url;
        // options.url = 'http://www.liulongbin.top:3007' + options.url

        // 统一为有权限的接口，设置 headers 请求头
        // -1  就是找不到返回值，不等于-1，就是找到了返回值
        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }

        // 全局统一挂载complete 回调函数
        options.complete = function(res) {
            // console.log(res);
            // console.log('执行了 complete 回调：')
            // console.log(res)
            // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
            if (res.responseJSON.status === 1 && res.responseJSON.message == '身份认证失败！') {
                // 1. 强制清空 token
                localStorage.removeItem('token')
                    // 2. 强制跳转到登录页面
                location.href = '/login.html'
            }
        }
    })
})