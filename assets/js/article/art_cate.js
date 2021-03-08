$(function () {

    var layer = layui.layer
    var form = layui.form
    initArtCateList();

    // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取文章分类的列表失败！');
                }
                // console.log(res);
                var htmlStr = template('tpl-table', res);

                $('tbody').html(htmlStr);
            }
        });
    }

    // 为添加类别按钮绑定点击事件
    var indexAdd = null;
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '260px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })

    // 通过代理的形式，为 form-add 表单绑定 submit 事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('添加文章分类失败！');
                }

                initArtCateList();
                layer.msg('新增分类成功！')
                // 根据索引，关闭对应的弹出层
                layer.close(indexAdd);
            }
        });
    })

    // 通过 代理 的形式，为 btn-edit 按钮绑定点击事件
    var indexEdit = null;
    $('tbody').on('click', '.btn-edit', function () {
        // console.log('aaa');
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '260px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });

        var id = $(this).attr('data-id');
        // 发起请求获取对应分类的数据
        $.ajax({
            type: "GET",
            url: "/my/article/cates/" + id,
            success: function (res) {
                // console.log(res);
                form.val('form-edit', res.data);
            }
        })
    })

    // 通过代理的形式，为修改分类的表单绑定 submit 事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新分类信息失败！');
                }

                initArtCateList();
                layui.layer.msg('更新分类信息成功！');

                // 根据索引，关闭对应的弹出层
                layer.close(indexEdit);
            }
        });
    })

    // 通过代理的形式，为 btn-delete 删除按钮绑定点击事件
    $('body').on('click', '.btn-delete', function () {
        // console.log('aaa');
        var id = $(this).attr('data-id');
        // console.log(id);
        // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something

            $.ajax({
                type: "GET",
                url: "/my/article/deletecate/" + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('删除文章分类失败！');
                    }

                    layui.layer.msg('删除文章分类成功！');
                    layer.close(index);
                    initArtCateList();
                }
            });

        });
    })
})