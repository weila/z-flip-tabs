jQuery.fn.zFlipTabs = function(){
    $(document).ready(function(){
        //延时展示导航栏
        $('.navTab').each(function(index){
          $(this).css({'transition-delay':((index*0.2)+'s')});
        });

        $('.tabs>*').each(function(index){
          $(this).css({'transition-delay':((index*0.05)+'s')});
        });
        $('.minimize').removeClass('minimize');//初始状态为最小化，移除最小化将tab菜单显示出来
    });

    //tab点击显示内容
    $(this).click(function(){
        var $eq=$(this).index()-1;//疑问：为什么需要减掉1？
        var $copyTabs=$(this).clone();
        var $active=$('.tabs').eq($eq);
        var className = $(this).attr("class");
        $copyTabs.addClass("flipOpen");
        $copyTabs.removeClass(className);//消除原有元素css对clone元素的影响；
        $('.content').prepend($copyTabs);
        $(this).css("opacity","0");
        //设置延时将复制的副本消失
        setTimeout(function(){
            $copyTabs.addClass('bgFadeOut');
        },500);

        $copyTabs.css({
            top:$(this).offset().top - $(window).scrollTop(), //让翻转位从元素位置开始
            left:$(this).offset().left - $(window).scrollLeft(), //让翻转位从元素位置开始
            width: $active.width(),
            height: $active.height(),
            }).show().animate({
            top: '0',
            left: '0',
            width:'100%',
            height:'100%',
        },600);

  setTimeout(function(){

    //Show menu
    //$('nav.main').removeClass('navInactive');
    $('nav.main').addClass('navNotActive');

    //Activate tab on menu
    $('nav.main>.navTab').removeClass('active');
    $('nav.main>.navTab').eq($eq).addClass('active');

  },1200);

            //700ms after click
            //显示tab里面的内容
          setTimeout(function(){
            //Animate corresponding section content to life
            $('.content>section').removeClass('active');
            $('.content> :target').addClass('active');
          },600);
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
        setTimeout(function(){
            $('.tabs').css("opacity","1");
        },500);
    });
}

$('.navTab').click(function(e){
    var $eq=$(this).index();
    var $ripple=$("<div/>");
    $ripple.addClass('ripple');
    $ripple.css({left:e.clientX,top:e.clientY});
    $(this).append($ripple);
    setTimeout(function(){
    $ripple.remove();
    },1000);
    var $megaRipple=$("<div/>");
    $megaRipple.addClass('ripple');
    $megaRipple.addClass('mega');
    $megaRipple.css({
                  left:e.clientX,
                  top:e.clientY,
                  background:$(this).css('border-color')
                  });
    $('.content').append($megaRipple);
    setTimeout(function(){
    $megaRipple.animate({opacity:0},1000);
    setTimeout(function(){
      $megaRipple.remove();
    },1000);
    },500);
    $('nav.main').find('.active').removeClass('active');
    $(this).addClass('active');
    $('.content>section').removeClass('active');
    $('.content>section').eq($eq).addClass('active');
});