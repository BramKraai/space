'use strict';

const CANVAS = $('canvas')[0];

var renderer = new THREE.WebGLRenderer({canvas: CANVAS});
var camera = new THREE.PerspectiveCamera(60, 1, 0.01, 1000);


/*  RUN GAME ON LOAD  */
$(() => {
    $(window).trigger('resize');

    game(renderer, camera);
});


/*      RESIZE LOGIC      */

$(window).resize(() => {
    let width = Math.floor($('.game').width());
    let height = Math.floor($('.game').height());

    CANVAS.width = width;
    CANVAS.height = height;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    console.log(width, height);
});

/*     FULLSCREEN LOGIC     */
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

    $(window).trigger('resize');
}