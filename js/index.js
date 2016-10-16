
$(function () {
    //轮播图
    banner();
    /*产品页签滑动*/
    productTab_1();
    productTab_2();
    /*初始化工具提示*/
    $('[data-toggle="tooltip"]').tooltip();
});

function banner(){
    var imgList = [
        {
            bgimg:"images/slide_01_2000x410.jpg",
            smimg:"images/slide_01_640x340.jpg"
        },
        {
            bgimg:"images/slide_02_2000x410.jpg",
            smimg:"images/slide_02_640x340.jpg"
        },
        {
            bgimg:"images/slide_03_2000x410.jpg",
            smimg:"images/slide_03_640x340.jpg"
        },
        {
            bgimg:"images/slide_04_2000x410.jpg",
            smimg:"images/slide_04_640x340.jpg"
        }
    ]

    function renderHtml(){
        var width = $(window).width();
        var isMobile = width<768?true:false;

        var pointStr = $("#point_template").html();
        var imgStr = $("#img_template").html();

        var pointFuc = _.template(pointStr);
        var imgFuc = _.template(imgStr);

        var pointHtml = pointFuc({model:imgList});
        var imgHtml = imgFuc({
            model:{
                list : imgList,
                isM : isMobile
            }
        })
        $(".carousel-indicators").html(pointHtml);
        $(".carousel-inner").html(imgHtml);
    }

    $(window).on("resize", function () {
        renderHtml();
    }).trigger("resize");

    /*移动端滑动切换效果*/
    var startX = 0;
    var moveX= 0;
    var distanceX =0;
    var isMove = false;

    $(".banner").on("touchstart", function (e) {
        startX = e.originalEvent.touches[0].clientX;
    });
    $(".banner").on("touchmove", function (e) {
        moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX-startX;
        isMove = true;
    });
    $(".banner").on("touchend", function (e) {
        if(Math.abs(distanceX)>50 && isMove){
            //上一张
            if(distanceX>50){
                $('.carousel').carousel('prev');
            }
            //下一张
            else{
                $('.carousel').carousel('next');
            }
        }
        //参数重置
        startX = 0;
        moveX= 0;
        distanceX =0;
        isMove = false;
    });




}
//产品标签页滑动效果1.0
function productTab_1(){
    var parent = $(".nav_tabs_parent");
    var child = parent.find(".nav_tabs");
    var lis = child.find("li");
    var width = 0;
    //获取所有li的宽度
    $.each(lis, function (index,dom) {
       width += $(dom).innerWidth();
    });
    //console.log(width);
    //设置ul盒子的宽度
    child.width(width);
    itcast.iScroll({
        swipeDom:parent.get(0),
        swipeType:'x',
        swipeDistance:50
    });

}
//产品标签页滑动效果2.0
function productTab_2(){
    var parent = $(".pro_nav_box");
    //console.log(parent);
    var ul= parent.find(".pro_nav_tabs");
    var lis = ul.find("li");
    console.log(lis.length);
    var width = 0;
    $.each(lis, function (index,dom) {
        width += $(dom).innerWidth();
    });
    console.log(width);
    //设置ul盒子的宽度
    ul.width(width);
    //设置滑动效果
    itcast.iScroll({
        swipeDom:parent.get(0),
        swipeType:'x',
        swipeDistance:50
    });
}
