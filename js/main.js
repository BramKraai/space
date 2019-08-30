'use strict'

$('#fullscreen').click(function () {
    if (document.fullscreenElement) closeFullscreen();
    else openFullscreen($('main')[0]);
});

document.documentElement.onfullscreenchange = function() {
    if (document.fullscreenElement) {
        $('#fullscreen').text('fullscreen_exit');
        $(".game").css('--scale-factor', 1);
    }
    else {
        $('#fullscreen').text('fullscreen');
        $(".game").css('--scale-factor', 0.8);
    }
}