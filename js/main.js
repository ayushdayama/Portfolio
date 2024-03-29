; (function () {

	'use strict';

	var isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};


	var fullHeight = function () {

		if (!isMobile.any()) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function () {
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax
	var parallax = function () {
		$(window).stellar();
	};

	var contentWayPoint = function () {
		var i = 0;
		$('.animate-box').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('animated-fast')) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function () {

					$('body .animate-box.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							var effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						}, k * 100, 'easeInOutExpo');
					});

				}, 50);

			}

		}, { offset: '85%' });
	};



	var goToTop = function () {

		$('.js-gotop').on('click', function (event) {

			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');

			return false;
		});

		$(window).scroll(function () {

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});

	};

	var pieChart = function () {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#FF9000',
			trackColor: "#f5f5f5",
			size: 160,
			animate: 1000
		});
	};

	var skillsWayPoint = function () {
		if ($('#fh5co-skills').length > 0) {
			$('#fh5co-skills').waypoint(function (direction) {

				if (direction === 'down' && !$(this.element).hasClass('animated')) {
					setTimeout(pieChart, 400);
					$(this.element).addClass('animated');
				}
			}, { offset: '90%' });
		}

	};


	// Loading page
	var loaderPage = function () {
		$(".fh5co-loader").fadeOut("slow");
	};


	$(function () {
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		// pieChart();
		skillsWayPoint();
	});
}());

function copyToClipboard(sectionName) {
	var sectionURL = "";
	if (sectionName == "aboutMe") {
		sectionURL = "#fh5co-about";
	} else if (sectionName == "resume") {
		sectionURL = "#fh5co-resume";
	} else if (sectionName == "certAndAch") {
		sectionURL = "#fh5co-features";
	} else if (sectionName == "skills") {
		sectionURL = "#fh5co-skills";
	} else if (sectionName == "fmw") {
		sectionURL = "#fh5co-blog";
	} else if (sectionName == "hireMe") {
		sectionURL = "#fh5co-started";
	} else if (sectionName == "contact") {
		sectionURL = "#fh5co-consult";
	}

	var copyText = "https://ayushdayama.github.io/Portfolio" + sectionURL;
	var tooltipMessage = "Link copied to clipboard!";

	if (navigator.clipboard) {
		navigator.clipboard.writeText(copyText)
			.then(function () {
				/* clipboard successfully set */
				console.log(tooltipMessage);
			}, function () {
				/* clipboard write failed */
				document.execCommand('copy');
				console.log(tooltipMessage);
			});
	} else {
		/* fallback for older browsers */
		var textArea = document.createElement("textarea");
		textArea.value = copyText;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand('copy');
		console.log(tooltipMessage);
		document.body.removeChild(textArea);
	}
}