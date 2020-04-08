var out = 0;
var showModal = '';
$(document).ready(function(){
  
  var windowWidth = $(window).width();
  
  initCooldown();
  
  if ( windowWidth > 767 ) {
    // Модалка для камбекера
    $(document).mouseleave(function(e) {
      if ( !out && (e.pageY - $(window).scrollTop()) <= 1 ) {
        showModal = setTimeout(function(){
          $('#modal_comeback').modal('show');
          out = 1;
        },500);
      }
    });
    
    $(document).mouseenter(function() {
      if ( !out ) {
        clearTimeout(showModal);
      }
    });
  } else {
    setTimeout(function(){
      if ( !out ) {
        $('#modal_comeback').modal('show');
        out = 1;
      }
    },30000);
  }

  function initCooldown() {
  // инициализация счетчиков обратного отсчета
    $('.cooldown').each(function(i,e){
      var seconds = $(e).find('.cooldown-seconds');
      var count = $(this).data('cooldown');
      var idInterval = setInterval(function(){
        count--;
        if(count == 0)
        {
          clearInterval(idInterval);
          $(e).closest('.cooldown-container').fadeOut('fast');
        }
        seconds.text(count);
      }, 1000);
    });
  }

    
	
	/*
		Slide to block. Add class "go-to-block" to link or button and data-attribute with target class or id
		Example: <a href="#" class="go-to-block" data-target=".slide-1">Slide</a>
	*/
	
	$(".go-to-block").click(function(e) {
        e.preventDefault();
		var target = $(this).data('target');
		
	    $('html, body').animate({
	        scrollTop: $(target).offset().top - 30
	    }, 400);
	});
    
    
    
    
});

if ($(window).width() < 768) {
    $(window).on('load', function () {

        $('.speakers .s-block').each(function (index) {
            $(this).appendTo('.speakers .slider .carousel-inner');
            $('.speakers .carousel-indicators').append('<li data-target="#speakers" data-slide-to="'+index+'"></li>');
        });
        $('.speakers .carousel-indicators li:first-of-type').addClass('active');
        $('.speakers .slider .carousel-inner .s-block').wrap('<div class="carousel-item"></div>');

        $('.speakers .carousel-item:first-of-type').addClass('active');
        $('.speakers .carousel').carousel();
    });
}

$(window).on('load', function(){
   if ( $(this).width() > 767 ) {
        setHeight('.speakers', '.s-block');
    } 
});


function setHeight (parent, block) {

    $(parent).each(function(){
        
        var height = 0,
            blockk = $(this).find(block);
        
        blockk.each(function(){
            
            var blockHeight = $(this).outerHeight();
            
           if(height < blockHeight) {
                height = blockHeight;
            } 
            
        });
        
        blockk.css({height: height});
        
        
    });
}

$('.pre-send').click( function() {
    var button = $(this);
    button.prop('disabled', true);
    button.addClass('disabled');
    
    var form = $(this).closest('form');
    var redirect = form.find('input[name="redirect"]').val();
    var thanks = form.find('input[name="thanks_modal"]').val();
    
    if ( form.valid() ) {
      form.css('opacity','.8');
      
      var email = form.find('input[name="email"]').val();
      
      // var actUrl = 'https://test.leadgrab.ru/postback/handler?clickid='+utm_content+'&email='+email;
      var actUrl = 'https://test.leadgrab.ru/postback/handler?&email='+email;

      $.ajax({
        url: actUrl,
        type: 'get',
        dataType: 'html',
        success: function(data) {
          form.submit();
        },
        error: function() {
        }
      });
    } else {
      button.prop('disabled', false);
      button.removeClass('disabled');
    }
  });
  