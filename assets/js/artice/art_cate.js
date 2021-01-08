// 1,先定义html结构，然后在最底部引入模板引擎js，art-template
//2,定义模板结构


$(function() {
    var layer = layui.layer
    var form = layui.form
        //3，发起请求获取数据
    initArtCateList()

    function initArtCateList() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status !== 0) return layer.msg("获取分类列表失败！")
                    // 获取成功，调用模板引擎，把res，赋值给模板引擎的id
                var htmlStr = template('tpl-table', res)
                    // 使用jquery的html方法，把数据渲染到页面，给tbody
                $('tbody').html(htmlStr)
            }
        });
    }

    //  给,添加类别，添加id属性
    //  给按钮注册点击事件，通过 layer.open()弹出层
    // indexAdd是为了，让弹出层不显示
    var indexAdd = null
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            // content，在html页面中定义好弹出框的form表单结构，定义id名赋值
            content: $('#dialog-add').html()
        })
    })

    //实现添加文章类别的功能
    // 利用事件委托,委托给body，为弹出框表单form-add，绑定submit提交事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
            // 发起post请求
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            // 携带的参数，就是当前表单的所有数据，serialize
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg("新增文章失败！")

                initArtCateList()
                layer.msg("新增文章成功！")

                //根据索引，关闭对应的弹出层
                layer.close(indexAdd)

            }
        });
    })

    //通过代理的形式，为btn-enit按钮点击绑定点击事件：
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function() {
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })

        // 给编辑添加自定义属性，data-id：{{$value.Id}}
        // 根据id的值，获取文章分类的数据，填充到表格
        var id = $(this).attr('data-id')

        $.ajax({
            type: "GET",
            url: "/my/article/cates/" + id,
            success: function(res) {
                // 快速为表单赋值，类似模板引擎，id名，res.data里面的数据
                form.val('form-edit', res.data)
            }
        });
    })

    // 通过代理的形式，为修改分类的表单绑定submit事件：
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg("修改文章失败！")

                layer.msg("修改文章成功！")
                    // 调用函数，渲染页面
                initArtCateList();
                // 隐藏弹出框
                layer.close(indexEdit)
            }
        });
    })

    // 通过模板引擎，已经渲染给了tbody，所以委托给tbody
    // 通过代理的形式，为删除按钮绑定点击事件：
    $('tbody').on('click', '.btn-delete', function() {

        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                type: "GET",
                url: "/my/article/deletecate/" + id,
                success: function(res) {
                    if (res.status !== 0) return layer.msg("删除分类失败！")
                    layer.msg("删除分类成功！")
                    initArtCateList()
                    layer.close(index)
                }
            });
        })

    })

})