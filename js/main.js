'use strict';

const GAME_WINDOW_SCALE_FACTOR = $(".game").css('--scale-factor');
const BACKGROUND_COLOR = $("body").css('--background-color');


$('#fullscreen').click(function () {
    if (document.fullscreenElement) closeFullscreen();
    else openFullscreen($('main')[0]);
});

document.documentElement.onfullscreenchange = function() {
    if (document.fullscreenElement) {
        $('#fullscreen').text('fullscreen_exit');
        $(".game").css('--scale-factor', 1);
        $("body").css('--background-color', '#000');
    }
    else {
        $('#fullscreen').text('fullscreen');
        $(".game").css('--scale-factor', GAME_WINDOW_SCALE_FACTOR);
        $("body").css('--background-color', BACKGROUND_COLOR);
    }
}