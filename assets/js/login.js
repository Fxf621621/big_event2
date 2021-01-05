$(function() {
    // 自定义效验规则
    //1从layui中 获取form对象：
    var form = layui.form
    var layer = layui.layer
    console.log(form);

    // 给去注册和去登录注册点击事件
    $('#link_reg').on('click', function() {
        // console.log('点击了！');
        $('.login-box').hide()
        $('.reg-box').show();
    })
    $('#link_login').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show()
    })



    //2,通过form.verify()函数；来定义规则
    form.verify({
        // 自定义一个pwd规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 验证两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (value !== pwd) return "两次密码不一致！"
        }
    });

    //为注册按钮绑定点击事件，监听扁担提交事件
    $('#form_reg').on('submit', function(e) {
        // 阻止表单的默认提交
        e.prevenDefault()
        console.log('点击了注册');
        // 发起post请求，需要携带数据
        var data = {
            username: $('#form_reg[name=username]').val(),
            password: $('#form_reg[name=password]').val()
        }

        // 发起ajax请求
        $.POST('/api/reguser', data, function(res) {
            if (res.status !== 0) return layer.msg(res.message)

            layer.msg("注册成功，请登录！")
                // 模拟人的点击行为跳转登录页面
            $('#link_login').click();
        })
    })

    //发起登录的Ajax请求
    // 为表单添加form——login的id
    // 监听提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg("登录失败！")
                layer.msg("登陆成功！");
                // 将得到的token字符串，保存到localStorage中
                localStorage.setItem("token", res.token)
                    // 跳转到index.html首页
                location.href = "/index.html"
            }
        })
    })
})