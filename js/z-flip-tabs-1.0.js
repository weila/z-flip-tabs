jQuery.fn.zFlipTabs = function(){
    $(document).ready(function(){
        //延时展示导航栏
        $('.navTab').each(function(index){
          $(this).css({'transition-delay':((index*0.1)+'s')});
        });

        $('.tabs>*').each(function(index){
          $(this).css({'transition-delay':((index*0.05)+'s')});
        });
        $('.minimize').removeClass('minimize');//初始状态为最小化，移除最小化将tab菜单显示出来
        var navTabQty = $('.navTab').length;
        var navTabWidth = Math.floor((100/navTabQty)*100)/100;//先乘以100向下取整，再除以100使得导航的宽度向下保留两位小数，不进行四舍五入；
        $('.navTab').css({width: navTabWidth + "%"});
    });

    //tab点击显示内容
    $(this).click(function(){
        var $eq=$(this).index();
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
    $('.close').css('display','block');
  },800);

            //700ms after click
            //显示tab里面的内容
          setTimeout(function(){
            //Animate corresponding section content to life
            $('.content>section').removeClass('active');
            $('.content> :target').addClass('active');
          },700);
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
        $('.close').css('display','none');
        $('.flipOpen').addClass('inactive');
        setTimeout(function(){
            $('.flipOpen').remove();
        },600);
        setTimeout(function(){
            $('.tabs').css("opacity","1");
        },300);
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