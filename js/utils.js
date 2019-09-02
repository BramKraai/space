function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
    }
}

function getFullScreenElement() {
    return document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
}

function setFullScreenHandler(onFullScreenChange) {
    if (document.onfullscreenchange === null)
        document.onfullscreenchange = onFullScreenChange;
    else if (document.onmsfullscreenchange === null)
        document.onmsfullscreenchange = onFullScreenChange;
    else if (document.onmozfullscreenchange === null)
        document.onmozfullscreenchange = onFullScreenChange;
    else if (document.onwebkitfullscreenchange === null)
        document.onwebkitfullscreenchange = onFullScreenChange;
}

function loadShader(url, callback) {
    new THREE.FileLoader(THREE.DefaultLoadingManager).load(url, callback);
}

function loadShaders(vertex_url, fragment_url, callback) {
    loadShader(vertex_url, (vertex) => {
        loadShader(fragment_url, (fragment) => {
            callback(vertex, fragment)
        });
    });
}

function loadMaterial(vertex_url, fragment_url, callback) {
    loadShaders(vertex_url, fragment_url, (vertex, fragment) => {
        callback(new THREE.ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment
        }));
    });
}