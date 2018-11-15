$(function(){
			   /*-------------------------------------------------------------------------*
     *                   04. Smooth scroll to anchor                           *
     *-------------------------------------------------------------------------*/
      $('a.nav_scroll').on("click", function (e) {
          e.preventDefault();
          var anchor = $(this);
          $('html, body').stop().animate({

              scrollTop: $(anchor.attr('href')).offset().top - 100
          }, 1000);

      });
      	   /*-------------------------------------------------------------------------*
     * 03. This function helps in front end form data validation when a user clicks the signup button  *
     *-------------------------------------------------------------------------*/
      $("#signupform").validate(
      	
      	);
      	   /*-------------------------------------------------------------------------*
     *                   04. Pricing section tabbable area                          *
     *-------------------------------------------------------------------------*/
			$('.info').click(
				function(){
					target = $(this).attr('id');
					console.log(target);
					$('.target-info> .info-active').removeClass('info-active');
					$('.'+target).addClass('info-active');
					$('.info').removeClass('active');
					$(this).addClass('active');

				}
				);


      $('.menu-trigger').click(
        function(e){
          e.preventDefault();
          $(' .navigation').toggle('triggered');
        }
        );
      function refactor(){
        if ($(window).width() < 990) {
   
     $('.landing-section').removeClass('purple-theme');
     $('.landing-section').css({'padding': '80px'});
     $('.centered').css({
      'margin-bottom':'100px'
     });
        $('.navigation').css({'display':'none'});
    }
    if ($(window).width()> 990) {
       $('.landing-section').addClass('purple-theme');
     $('.landing-section').css({'padding': '0px'});
      $('.navigation').css({'display':'block'});
    }
  }
      $(window).resize(function() {
    /*If browser resized, check width again */
      refactor();

    
 });
      refactor();
				   /*-------------------------------------------------------------------------*
     *                  seerves no purpose as is expected to call the animate simplicity fxn                         *
     *-------------------------------------------------------------------------*/
			
			$('.identity-forms').click(
					function(e){
						e.stopPropagation();
					}
					);
				   /*-------------------------------------------------------------------------*
     *                   04.Helps to display or hide the form on clicking the signup button 
			*****************Is commented out since we need to direct the signup on click button to********************
			*****************horizon but will eventually be ported and handled as a solo django app*****************

     *
     *-------------------------------------------------------------------------*/
			// $('#signup').click( function(e){
			// 	e.stopPropagation();
			// 	e.preventDefault();
 		// 		$('.identity-forms').toggleClass('identity-active');
			// 	 console.log( $( this ).text() );
			// 	$('#signup').removeClass('active');
			// 	$(this).addClass('active');
			// 	$('.border-active').removeClass('border-signup');
			// 	$('.transform').removeClass('login-active');
			// $('.border-active').css('display','block');	
			// });
				   /*-------------------------------------------------------------------------*
     *                   was used to trigger the dropdown menu which have since been depricated         *
     *-------------------------------------------------------------------------*/
			$('.menu-hover').click(function(e){
					e.preventDefault();
					e.stopPropagation();
					$('#dropdown').toggle();
				});
				   /*-------------------------------------------------------------------------*
     *                  Helps in hiding any event triggered forms or div so as to clear the space for viewer or visitor*
     *-------------------------------------------------------------------------*/
			$("body").click(function(e) {
            
               $('#dropdown').hide();
               $('.identity-forms').removeClass('identity-active');
               $('.border-active').css('display','none');
               $('#login').removeClass('active');
$('#signup').removeClass('active');
            });

/*---------------------------------------------------------------------------------*


*			A function to loop through a series of words to indicate why developers should choose duara compute   *


*----------------------------------------------------*/

 function loopThrough(variable, delay, duration, left){
 	var $listItems = $(variable+ ' li'),
 	$currentItem = $listItems.first().addClass('active'),
 	$nextItem = $currentItem.next().addClass('next');
 	$currentItem.fadeIn(duration);
 	setInterval(function () {
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

loopThrough('.configure', 1000, 20,20)	
		
		});
		$(document).ready(function(){
				$(".owl-carousel").owlCarousel({
    items:4,
    loop:true,
    margin:10,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    pagination:false,
    navigation:true
});
$('.play').on('click',function(){
    owl.trigger('play.owl.autoplay',[1000]);
})
$('.stop').on('click',function(){
    owl.trigger('stop.owl.autoplay')
});
			});
