'use strict';

function game(renderer) {

    var camera = new THREE.OrthographicCamera(0, RESOLUTION_X, RESOLUTION_Y, 0, 0, 1000);
    camera.position.z = 100;

    var scene = new THREE.Scene();
    scene.background = new THREE.Color().setHSL(0, 0, 0);

    var composer = new THREE.EffectComposer(renderer);
    composer.addPass(new THREE.RenderPass(scene, camera));
    composer.addPass(new THREE.UnrealBloomPass(undefined, 1, .01, .8));

    swarmInit(renderer, scene, parseInt(getUrlParameter('N') || 96));
    
    function update(dt) { swarmUpdate(); }
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
