// =============================================================================
// Origin.js
// =============================================================================

//
// Collection of scripts used by the framework
//

// =============================================================================
// smoothScroll
// =============================================================================

$('a').click(function() {
	if (($('[name="' + $.attr(this, 'href').substr(1) + '"]') || []).length != 0) {
		$('html, body').animate({
		  scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top
		},500);
	} else {
		$('body').addClass("error");
		setTimeout(function () {
			$('body').removeClass("error");
		},500);
	}
	return false;
});

$(document).keypress(function(e) {
    var s = String.fromCharCode(e.which);
    if (s.match(/[a-zA-Z\.]/)) {
      if (($('[name="' + s + '"') || []).length != 0) {
        $('html, body').animate({
          scrollTop: $('[name="' + s + '"').offset().top
        }, 500);
      } else {
        $('body').addClass("error");
        setTimeout(function () {
          $('body').removeClass("error");
        },500);
      }
    }
});

// =============================================================================
// hidingNavbar
// =============================================================================

$(function(){
	var lastScrollTop = 0, delta = 50;
	var bottom = $(document).height() - $(window).height();
	$(window).scroll(function (event) {
	var scrollTop = $(this).scrollTop();

	if(Math.abs(lastScrollTop - scrollTop) <= delta)
	  return;

	if (scrollTop > lastScrollTop) {
	   // downscroll code
	  $('.navbar').addClass('navbar--hidden');
	} else {
	  // upscroll code
	  $('.navbar').removeClass('navbar--hidden');
	} 
	if (scrollTop > bottom - delta) {
	  // end of page code
	  $('.navbar').removeClass('navbar--hidden');
	}
	if (scrollTop <= 0) {
		// top of page code
		$('.navbar').removeClass('navbar--hidden');
	}
	lastScrollTop = scrollTop;
	});
});

// =============================================================================
// Show mobile navbar
// =============================================================================
$(function(){
	$(".navbar .navigation-open").removeClass("navigation-open");
	$(".nav__link--mobiletoggle").click(function () {
		$(".navbar .nav").toggleClass("navigation-open");
	});
});

// =============================================================================
// Remove navbar notification
// =============================================================================

$(function() {
	$('.nav__link').click(function() {
		$(this).next().hide(); // Careful, dependent on DOM structure
	});
});

// =============================================================================
// ScrollReveal settings
// =============================================================================

//window.sr = ScrollReveal({ reset: true, duration: 1000, mobile: false });
    //sr.reveal( '.animate' );
