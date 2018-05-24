//plugin para fazer slider
//http://kenwheeler.github.io/slick/
$(function () {
	$(".slider").slick(
		{
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });
});