$('#fullscreen').click(function () {
    if (document.fullscreenElement) closeFullscreen();
    else openFullscreen(document.documentElement);
});
document.documentElement.onfullscreenchange = function() {
    if (document.fullscreenElement)
        $('#fullscreen').text('fullscreen_exit');
    else
        $('#fullscreen').text('fullscreen');
}