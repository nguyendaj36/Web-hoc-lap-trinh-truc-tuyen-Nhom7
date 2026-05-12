jQuery(document).ready(function($) {
    $('html').on( 'click', function(){
        $('.site-header .form-section .example').slideUp();
    });

    $('.site-header .form-section').on( 'click', function(event) {
        event.stopPropagation();
    });

    $('#search-btn').on( 'click', function(){
        $('.site-header .form-section .example').slideToggle();
        return false;
    })

    $('.btn-form-close').on( 'click', function(){
        $('.site-header .form-section .example').slideToggle();
        return false;
    })


    //accessibility menu for edge
    $("#site-navigation ul li a").on( 'focus', function(){
       $(this).parents("li").addClass("focus");
   }).on( 'blur', function(){
       $(this).parents("li").removeClass("focus");
   });

   $(".secondary-navigation ul li a").on( 'focus', function(){
       $(this).parents("li").addClass("focus");
   }).on( 'blur', function(){
       $(this).parents("li").removeClass("focus");
   });
});
