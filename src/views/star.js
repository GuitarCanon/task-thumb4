// 星星页面渲染
module.exports = function (templateParams) {
    var _cssList = ['vendor'];
    var webAssetsHelp = require('./webAssetsHelp.js')(templateParams, _cssList);
    var _html = "{% extends './layout.html' %}" +
        "{% block title %}My Page{% endblock %}" +
        "{% block styles %}" +
        webAssetsHelp.styles +
        "{% endblock %}" +
        "{% block content %}{% include '../widget/star.html' %}{% endblock %}" + // 引入星星组件
        "{% block script %}" +
        webAssetsHelp.scripts +
        "{% endblock %}";
    return _html;

}