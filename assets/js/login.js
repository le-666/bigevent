$(function () {
    // 点击注册事件
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 点击登录事件
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 从layui 中获取from对象
    var form = layui.form;
    // 通过 form.verify()函数自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 验证密码是否一致
        repwd: function (value) {
            // value 是确认密码框中的内容
            // 获取密码框中的内容
            var pwd = $('.reg-box [name=password]').val();

            // 判断两次密码是否一致,如果不一致,则return一个提示消息即可
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 发起注册用户的post请求
    $('#form_reg').on('submit', function (e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        // 发起Ajax的POST请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }

        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message, { icon: 5 });
            }
            layui.layer.msg('注册成功，请登录！！', { icon: 6 });

            // 模拟人的点击行为
            $('#link_login').click();
        })
    })

    // 发起登录的ajax请求
    $('#form_login').on('submit', function (e) {
        // 阻止默认行为
        e.preventDefault();
        $.ajax({
            url: "/api/login",
            method: "POST",
            // 获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('登陆失败！', { icon: 5 });
                }
                layui.layer.msg('登录成功', { icon: 6 });
                // console.log(res.token);
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token);
                // 跳转到主页
                location.href = '/index.html';
            }
        });

    })
})

