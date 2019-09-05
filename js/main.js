'use strict';

const CANVAS = $('canvas')[0];
const RESOLUTION_X = 1920;
const RESOLUTION_Y = 1080;

var renderer = new THREE.WebGLRenderer({canvas: CANVAS});

/*  RUN GAME ON LOAD  */
$(() => {
    $(window).trigger('resize');
    game(renderer);
});

/*      RESIZE LOGIC      */
$(window).resize(() => {
    // Get Dimensions of 'game' div
    let width = Math.floor($('.game').width());
    let height = Math.floor($('.game').height());

    // Update Canvas Size
    CANVAS.width = width;
    CANVAS.height = height;

    // Update Renderer Size
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
});

/*     FULLSCREEN LOGIC     */
const GAME_WINDOW_SCALE_FACTOR = $(".game").css('--scale-factor');
const BACKGROUND_COLOR = $("body").css('--background-color');

$('#fullscreen').click(function () {
    if (getFullScreenElement()) closeFullscreen();
    else openFullscreen($('main')[0]);
});

setFullScreenHandler(() => {
    if (getFullScreenElement()) {
        $('#fullscreen').text('fullscreen_exit');
        $(".game").css('--scale-factor', 1);
        $("body").css('--background-color', '#000');
    }
    else {
        $('#fullscreen').text('fullscreen');
        $(".game").css('--scale-factor', GAME_WINDOW_SCALE_FACTOR);
        $("body").css('--background-color', BACKGROUND_COLOR);
    }

    $(window).trigger('resize');
});
