/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

$(document).ready(function ($) {
	/*----------------------------------------------------*/
	/* FitText Settings
   ------------------------------------------------------ */

	setTimeout(function () {
		$('h1.responsive-headline').fitText(1, {
			minFontSize: '40px',
			maxFontSize: '90px',
		});
	}, 100);

	/*----------------------------------------------------*/
	/* Smooth Scrolling
   ------------------------------------------------------ */

	$('.smoothscroll').on('click', function (e) {
		e.preventDefault();

		var target = this.hash,
			$target = $(target);

		$('html, body')
			.stop()
			.animate(
				{
					scrollTop: $target.offset().top,
				},
				800,
				'swing',
				function () {
					window.location.hash = target;
				},
			);
	});

	/*----------------------------------------------------*/
	/* Highlight the current section in the navigation bar
   ------------------------------------------------------*/

	var sections = $('section');
	var navigation_links = $('#nav-wrap a');

	sections.waypoint({
		handler: function (event, direction) {
			var active_section;

			active_section = $(this);
			if (direction === 'up') active_section = active_section.prev();

			var active_link = $(
				'#nav-wrap a[href="#' + active_section.attr('id') + '"]',
			);

			navigation_links.parent().removeClass('current');
			active_link.parent().addClass('current');
		},
		offset: '35%',
	});

	/*----------------------------------------------------*/
	/*	Make sure that #header-background-image height is
   /* equal to the browser height.
   ------------------------------------------------------ */

	$('header').css({ height: $(window).height() });
	$(window).on('resize', function () {
		$('header').css({ height: $(window).height() });
		$('body').css({ width: $(window).width() });
	});

	/*----------------------------------------------------*/
	/*	Fade In/Out Primary Navigation
   ------------------------------------------------------*/

	$(window).on('scroll', function () {
		var h = $('header').height();
		var y = $(window).scrollTop();
		var nav = $('#nav-wrap');

		if (y > h * 0.2 && y < h && $(window).outerWidth() > 768) {
			nav.fadeOut('fast');
		} else {
			if (y < h * 0.2) {
				nav.removeClass('opaque').fadeIn('fast');
			} else {
				nav.addClass('opaque').fadeIn('fast');
			}
		}
	});

	/*----------------------------------------------------*/
	/*	Modal Popup
   ------------------------------------------------------*/

	$('.item-wrap a').magnificPopup({
		type: 'inline',
		fixedContentPos: false,
		removalDelay: 200,
		showCloseBtn: false,
		mainClass: 'mfp-fade',
	});

	$(document).on('click', '.popup-modal-dismiss', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});

	/*----------------------------------------------------*/
	/*	Flexslider
   /*----------------------------------------------------*/
	$('.flexslider').flexslider({
		namespace: 'flex-',
		controlsContainer: '.flex-container',
		animation: 'slide',
		controlNav: true,
		directionNav: false,
		smoothHeight: true,
		slideshowSpeed: 7000,
		animationSpeed: 600,
		randomize: false,
	});

	/*----------------------------------------------------*/
	/*	get location
   ------------------------------------------------------*/
	var dateObj = new Date();
	var month = dateObj.getUTCMonth() + 1; //months from 1-12
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();
	var newdate = year + '-' + month + '-' + day;

	var generalInfo = {
		date: newdate,
	};
	$.ajax({
		url: 'https://geolocation-db.com/json/',
		dataType: 'json',
		cache: false,
		success: function (res) {
			console.log(res);
			generalInfo.country = res.country_name;
			generalInfo.state = res.state;
			generalInfo.city = res.city;
			generalInfo.ip = res.IPv4;
		}.bind(this),
		error: function (xhr, status, err) {
			console.log(err);
		},
	});

	/*----------------------------------------------------*/
	/*	contact form
   ------------------------------------------------------*/

	$('form#contactForm button.submit').on('click', function () {
		var contactName = $('#contactForm #contactName').val();
		var contactEmail = $('#contactForm #contactEmail').val();
		var contactSubject = $('#contactForm #contactSubject').val();
		var contactMessage = $('#contactForm #contactMessage').val();

		var data = {
			contactName: contactName,
			contactEmail: contactEmail,
			contactSubject: contactSubject,
			contactMessage: contactMessage,
			...generalInfo,
		};

		console.log('generalInfo: ', data);
		apiPOST(data);
		$(this).text('Message Send');
		setTimeout(() => {
			$('form#contactForm button.submit').text('Submit');
		}, 1500);

		$('#image-loader').fadeOut('slow');
		return false;
	});
});

function apiPOST(data) {
	$('#image-loader').fadeIn('slow');
	$.ajax({
		url: `http://localhost:3001/api/post`,
		type: 'POST',
		cache: false,
		data: JSON.stringify(data),
		contentType: 'application/json; charset=utf-8',
		success: function (msg) {
			// Message was sent
			//$('#image-loader').fadeOut();
			// $('#message-warning').hide();
			// $('#contactForm').fadeOut();
			// $('#message-success').fadeIn();
		},
		error: function (jqxhr, textstatus, msg) {
			// There was an error
			// 	$('#image-loader').fadeOut();
			// 	$('#message-warning').html(msg);
			// 	$('#message-warning').fadeIn();
		},
	});
}

