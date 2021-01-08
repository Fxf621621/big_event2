// // 1，后台页面，首页页面，头像，字体图标，还有iframe区域，css样式都设置好，然后开始写获取js
// // 先引入jquery，baseApi，index.js文件



// 调用函数getUserInfo 获取用户的基本信息
//渲染用户的头像，定义renderAvatar函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //  这个有请求头，headers就是请求头配置对象
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {
            console.log(res.data);
            if (res.status !== 0) return layer.msg("获取用户信息失败！")

            // 如果成功的话，就调用 renderAvatat 渲染用户的头像
            renderAvatat(res.data)
        }
    })
}

var layer = layui.layer
    // 获取用户基本信息，然后渲染头像
function renderAvatat(user) {
    //1,获取用户的名称
    // 如果用户输入名字啦，那就拿到用户名，或者拿到账号名
    var name = user.nickname || user.username
        //2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //3,按需渲染用户的头像 user_pic 用户的头像 ，可以进行打印查看
    if (user.user_pic !== null) {
        //3.1 渲染头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //3.2 渲染文本头像，账号的第一个字符
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatat').html(first).show()
    }
}

$(function() {
    // // 第一步，先获取用户的基本信息
    // 获取用户的基本信息
    getUserInfo()

    // 实现退出登录的功能，先给退出添加类名
    $('#btnLogout').on('click', function() {
        // 弹出一个提示框，提示用户是否退出
        layer.confirm('退出?', { icon: 3, title: '提示' }, function(index) {
            //do something
            //1，退出清空本地储存中的token
            localStorage.removeItem('token')
                //2,重新跳转到登录页面
            location.href = '/login.html'
                //3,关闭confirm  提示弹出框 close
            layer.close(index);
        });
    })

})