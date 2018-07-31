// 点赞页面渲染
module.exports = function (templateParams) {
    var _cssList = ['vendor'];
    var webAssetsHelp = require('./webAssetsHelp.js')(templateParams, _cssList);
    var _html = "{% extends './layout.html' %}" +
        "{% block title %}My Page{% endblock %}" +
        "{% block styles %}" +
        webAssetsHelp.styles +
        "{% endblock %}" +
        "{% block content %}{% include '../widget/index.html' %}{% endblock %}" + // 引入点赞组件
        "{% block script %}" +
        //webAssetsHelp.scripts+
        '<script>' +
        '(function(){' +
        'var scriptsshow=[' + webAssetsHelp.scriptsshow + '];' +
        'var flag = false;' +
        'for(let i=0;i<scriptsshow.length;i++){' +
        'let a=scriptsshow[i];' +
        'if (localStorage.getItem(a)){' +
        '$("<scr"+"ipt>"+localStorage.getItem(a)+"</scr"+"ipt>").attr({type:"text/javascript",id:i}).appendTo($("head").remove("#"+i));' +
        '}' + //end of if 
        // 'else{$.getScript({url:a,success:function(data){localStorage.setItem(a,data)}});' + 
        'else{' +
        'localStorage.clear(); flag = true;' +
        'for(let q=0;q<scriptsshow.length;q++){' + 
        'let b = scriptsshow[q];' +
        'axios.get(b).' + 
        'then(function(data){localStorage.setItem(b, data.data);})' + // end of aixos
        '}break' + // end of for  如果没有break又会跑到父级for循环里重复执行
        '}' + // end of else
        '}' + // end of for
        'if(flag){' + 
        'LazyLoad.js(scriptsshow,function(){});' +
        '}' + // end of if flag
        '})()' +  //end of function
        '</script>'
        "{% endblock %}";
    return _html;

}