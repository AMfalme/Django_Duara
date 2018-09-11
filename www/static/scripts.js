$(function(){
			
			$('#login').click( function(e){
				e.preventDefault();
				 console.log( $( this ).text() );
				$('#login').removeClass('active');
				$(this).addClass('active');
				$('.transform').addClass("login-active");
				$('.border-active').addClass('border-signup');
				
			});
			$('#signup').click( function(e){
				e.preventDefault();
				 console.log( $( this ).text() );
				$('#signup').removeClass('active');
				$(this).addClass('active');
				$('.border-active').removeClass('border-signup');
				$('.transform').removeClass('login-active');
				
			});
			$('.menu-hover').click(function(e){
					e.preventDefault();
					$('.dropdown').toggleClass('block');
				});
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
    owl.trigger('play.owl.autoplay',[1000])
})
$('.stop').on('click',function(){
    owl.trigger('stop.owl.autoplay')
});
			});