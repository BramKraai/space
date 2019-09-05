'use strict';

const CUBE_VERTICES = [
    -1, -1, -1,    1, -1, -1,    1,  1, -1,    -1,  1, -1,
    -1, -1,  1,    1, -1,  1,    1,  1,  1,    -1,  1,  1,
];
const CUBE_FACES = [
    2, 1, 0,    0, 3, 2,
    0, 4, 7,    7, 3, 0,
    0, 1, 5,    5, 4, 0,
    1, 2, 6,    6, 5, 1,
    2, 3, 7,    7, 6, 2,
    4, 5, 6,    6, 7, 4,
];


function game(renderer) {

    var camera = new THREE.PerspectiveCamera(75, RESOLUTION_X/RESOLUTION_Y, 0.001, 1000);
    camera.position.z = 100;

    var scene = new THREE.Scene();
    scene.background = new THREE.Color().setHSL(0, 0, 0);

    var composer = new THREE.EffectComposer(renderer);
    composer.addPass(new THREE.RenderPass(scene, camera));
    composer.addPass(new THREE.UnrealBloomPass(undefined, 1, .01, .8));

    var geometry = new THREE.PolyhedronBufferGeometry(CUBE_VERTICES, CUBE_FACES, 100, 4);
    var sphere = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: 0xFF00FF}));
    sphere.position.set(RESOLUTION_X/2, RESOLUTION_Y/2, 0);
    scene.add(sphere);
    
    function update(dt) { }
    function render() { composer.render(scene, camera); }

    /*      START ANIMATION     */
    var clock = new THREE.Clock();
    var animate = () => {
        requestAnimationFrame(animate);
        update(clock.getDelta());
        render()
    };
    animate();
}
