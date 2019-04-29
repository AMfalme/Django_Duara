 /*-------------------------------------------------------------------------*
     *                   On document ready                          *
     *-------------------------------------------------------------------------*/
$(function(){
   /*-------------------------------------------------------------------------*
     *                   01. Smooth scroll to anchor                           *
     *-------------------------------------------------------------------------*/
  function scrollView(){
    $('a.nav_scroll').on("click", function (e)
      {
        var anchor = $(this);
        $('html, body').stop().animate(
        {
          scrollTop: $(anchor.attr('href')).offset().top - 60
        }, 1000);
        // checks whether navbar-toggle is not collapsed
        if ($('.navbar-toggle').hasClass('collapsed') == false) {
          $('.navbar-toggle').click();
        }
        
      }
    );
  }
  $('.navbar-toggle.collapsed').click(
    function(){
      if (!$('.menu-scroll').hasClass('menu-fff')) {
        
        // .navbar-collapse.in {background-image: linear-gradient(to bottom left, #89389d 0%,#bb4d8f 100%);}
        $('.navbar-collapse').toggleClass('purple-fy');
        console.log('add purple');
      }
    }
    );
  scrollView();
      /*---------------------------------------------------------------------------------*
        *  
        02. A function to change the background color of the menu-nav on scroll past 100 from top 
            and vice versa
      *----------------------------------------------------*/
    $(window).scroll(
      function(e){
        if ($(this).scrollTop() > 100) {
          $('.menu-nav').addClass('menu-fff');
          $('.logo-img').attr('src','/static_files/images/logo.svg');
          $('.menu-scroll ul').addClass('menu-scroll-color');
          }
          else  {
            $('.menu-nav').removeClass('menu-fff');
            $('.logo-img').attr('src','/static_files/images/white logo.svg');
            $('.identity-forms').removeClass('identity-scroll');
            $('.menu-scroll ul').removeClass('menu-scroll-color');

          }
        });
    /*-------------------------------------------------------------------------*
      *                     02. Ensure landing section is responsive to screen size
                                for better user experience
      *
      *-------------------------------------------------------------------------*/
  function refactor(){
    if ($(window).width() < 990) {
      $('.landing-section').removeClass('purple-theme');
      $('.landing-section').css({'padding': '80px'});
      $('.centered').css({'margin-bottom':'100px'});
      $('.navigation').css({'display':'none'});
    } 
    if ($(window).width()> 990) {
      $('.landing-section').addClass('purple-theme');
      $('.landing-section').css({'padding': '0px'});
      $('.navigation').css({'display':'block'});
    }
  }
  /*If browser resized, call function refactor to check width again */
  $(window).resize(function() {
    refactor();
    }
  );
 /*check width on load page */
  refactor();
   /*-------------------------------------------------------------------------*
     *                   03. Pricing section tabbable area                          *
     *-------------------------------------------------------------------------*/
  $('.target').click(
    function(e){
      e.preventDefault();

      target = $(this).attr('id');
      $('.trigger-target> .info-active').removeClass('info-active');
      $('.'+target).addClass('info-active');
      $('.target').removeClass('active');
      $(this).addClass('active');
    }
  );



         /*-------------------------------------------------------------------------*
     *           Helps in hiding any event triggered forms or div (signup or login/since been depricated)
                 so as to clear the space for viewer or visitor*
     *-------------------------------------------------------------------------*/
  $("body").click(function(e) {
        
      $('#dropdown').hide();
      $('.identity-forms').removeClass('identity-active');
      $('.border-active').css('display','none');
      $('#login').removeClass('active');
      $('#signup').removeClass('active');
      });
  /*---------------------------------------------------------------------------------*


  *     A function to loop through a series of words to indicate why developers should choose duara compute   *
        Not used at the moment

  *----------------------------------------------------*/

   function loopThrough(variable, delay, duration, left){
      var $listItems = $(variable+ ' li'),
      $currentItem = $listItems.first().addClass('active'),
      $nextItem = $currentItem.next().addClass('next');
      $currentItem.fadeIn(duration);
      setInterval(
        function () {
            $currentItem.fadeOut({duration: duration,queue: false}).animate({marginLeft:10}).removeClass('active');
            $currentItem = $nextItem.removeClass('next').css({marginLeft:left}).fadeIn({duration: duration,queue: false}).animate({marginLeft:0}).addClass('active'); 
            $nextItem = $currentItem.next();
            if (!$nextItem.length) {
                $nextItem = $listItems.first();
            }
            $nextItem.addClass('next');
        }, delay);
    }
    loopThrough('#flashing-text', 2000, 200, -10);
    loopThrough('.configure', 1000, 20,20); 
  


  });
  // function closeMenu(){

  // }
    
    
   

     
				   

/*---------------------------------------------------------------------------------*


*     A function to change the background of the why choose us sections into a purple gradient and 
      change the image as well to a white svg for easy readability and visibility

// *----------------------------------------------------*/
// $('.clompute').hover(
//     function () {
//       // body...
//       $(this).addClass('hover');
//       if ($(this).hasClass('simple-value')){
//         $(this).find('img').attr('src', '../../static/images/simple.svg');
//       }
//       else if ($(this).hasClass('reliable-value')){
//          $(this).find('img').attr('src', '../../static/images/reliable.svg');
//       }

//       else if ($(this).hasClass('transparent-value')){
//          $(this).find('img').attr('src', '../../static/images/transparent.svg');
//       }

//       else if ($(this).hasClass('support-value')){
//          $(this).find('img').attr('src', '../../static/images/support.svg');
//       }
      
//     }, function(){
//       // body...
//       $(this).removeClass('hover');
//       if ($(this).hasClass('simple-value')){
//         $(this).find('img').attr('src', '../../static/images/simple colored.svg');
//       }
//       else if ($(this).hasClass('reliable-value')){
//          $(this).find('img').attr('src', '../../static/images/reliable colored.svg');
//       }

//       else if ($(this).hasClass('transparent-value')){
//          $(this).find('img').attr('src', '../../static/images/transparent colored.svg');
//       }

//       else if ($(this).hasClass('support-value')){
//          $(this).find('img').attr('src', '../../static/images/support colored.svg');
//       }
      
//     }
      
//       );

