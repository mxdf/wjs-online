///**
// * Created by qiutian on 2016/7/14.
// */
////命名空间
window.myjd = {};
//添加模块
//过渡动画结束以后执行
myjd.transitionEnd = function (dom,fn) {
    //判读是否存在DOM对象，且不为空
    if(!dom||typeof dom != "object") return false;
    //给DOM对象添加监听事件
    dom.addEventListener("transitionEnd", function () {
        fn && fn();
    });
    //兼容性处理
    dom.addEventListener("webkitTransitionEnd",function(){
        fn && fn();
    });
};
//封装轻触屏幕的事件
myjd.tap = function (dom,callback) {
    //判读是否存在DOM对象，且不为空
    if(!dom||typeof dom != "object") return false;
    var startTime = 0;
    var endTime =0 ;
    var distanceTime = 0
    var isMove = false;
    //添加事件监听者
    dom.addEventListener("touchstart", function (e) {
        startTime = Date.now();
    });
    dom.addEventListener("touchmove", function (e) {
        isMove = true;
    });
    dom.addEventListener("touchend", function (e) {
        endTime = Date.now();
        distanceTime = endTime - startTime;
        if(distanceTime < 150 && !isMove){
            callback && callback(e);
        }
        startTime = 0;
        endTime =0 ;
        distanceTime = 0
        isMove = false;
    });
};

