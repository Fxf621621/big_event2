$(function() {
    var form = layui.form
    var layer = layui.layer
        // 判断昵称
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "昵称长度必须在 1 ~ 6 个字符之间！"
            }
        }
    })

    // 获取用户的基本信息
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) return layer.msg("获取用户基本信息失败！")
                console.log(res);
                // 给表单指定lay-filter="formUserInfo"  form.val()快速赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    //重置表单行为，在重新获取用户信息：
    $('#btnReset').on('click', function(e) {
        // 阻止表单默认跳转
        e.preventDefault();
        // 重新调用函数
        initUserInfo();
    })


    //发起请求更新用户信息
    //监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
            // 发起 ajax 数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                    //window.parent 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })

})