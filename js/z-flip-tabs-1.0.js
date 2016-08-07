$(document).ready(function(){
    //延时展示导航栏
    $('.navTab').each(function(index){
      $(this).css({'transition-delay':((index*0.4)+'s')});
    });

    $('.tabs>*').each(function(index){
      $(this).css({'transition-delay':((index*0.05)+'s')});
    });
    $('.minimize').removeClass('minimize');//初始状态为最小化，移除最小化将tab菜单显示出来
});
jQuery.fn.zFlipTabs = function(){
    //tab点击显示内容
    $(this).click(function(){
        var $eq=$(this).index()-1;//为什么需要减掉1？
        var $copyTabs=$(this).clone();
        var className = $(this).attr("class");
        $copyTabs.addClass("flipOpen");
        $copyTabs.removeClass(className);//消除原有元素css对clone元素的影响；
        $('.content').prepend($copyTabs);
        //设置延时将复制的副本消失
        setTimeout(function(){
            $copyTabs.addClass('bgFadeOut');
        },500);

        $copyTabs.css({
            top:$(this).offset().top - $(window).scrollTop(), //让翻转位从元素位置开始
            left:$(this).offset().left - $(window).scrollLeft(), //让翻转位从元素位置开始
            }).show().animate({
            top: '0',
            left: '0',
            width:'100%',
            height:'100%',
        },800);

  setTimeout(function(){

    //Show menu
    //$('nav.main').removeClass('navInactive');
    $('nav.main').addClass('navNotActive');

    //Activate tab on menu
    $('nav.main>.navTab').removeClass('active');
    $('nav.main>.navTab').eq($eq).addClass('active');
    document.querySelectorAll('nav.main>.tab.active')[0].scrollIntoView();

  },1000);

            //700ms after click
            //显示tab里面的内容
          setTimeout(function(){
            //Animate corresponding section content to life
            $('.content>section').removeClass('active');
            $('.content>section').eq($eq).addClass('active');
          },1000);
    });

    //“关闭”按钮功能
    $('.close').click(function(){
        //$('nav.main').addClass('navInactive');
        $('nav.main').removeClass('navNotActive');
        $('.content>section').removeClass('active');
        $('.flipOpen').addClass('bgFadeIn');
        var $eq=$('nav.main>.navTab').index($('nav.main>.active'));
        var $active=$('.tabs').eq($eq);
        $('.flipOpen').css({
            top: 0, //让翻转位于屏幕中央
            left: 0, //让翻转位于屏幕中央
            }).show().animate({
            top: $active.offset().top - $(window).scrollTop(),
            left: $active.offset().left - $(window).scrollLeft(),
            width: $active.width(),
            height: $active.height(),
        },600);
        $('.flipOpen').addClass('inactive');
        setTimeout(function(){
            $('.flipOpen').remove();
        },500);
    });
}