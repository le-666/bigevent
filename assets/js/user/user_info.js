$(function () {

    var form = layui.form;

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称必须在1~6个字符之间！'
            }
        }
    })

    // 初始化用户的基本信息
    initUserInfo();

    // 初始化用户的基本信息
    function initUserInfo() {

        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！');
                }
                // console.log(res);
                // 调用 form.val() 方法为表单赋值
                // var form = layui.form;
                form.val('formUserInfo', res.data);
            }
        });
    }

    // 重置表单的数据
    $('#btnReset').on('click', function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault();

        initUserInfo();

    })

    // 发起请求更新用户的信息
    // 监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault();

        // 发起 ajax 数据请求
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新用户信息失败！');
                }

                layui.layer.msg('更新用户信息成功！');
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getuserInfo();
            }
        })

    })
})
