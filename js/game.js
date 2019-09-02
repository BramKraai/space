'use strict';

function game(renderer, camera) {

    /*      CREATE SCENE      */
    var scene = new THREE.Scene();
    scene.background = new THREE.Color().setHSL(0, 0, 0);

    swarmInit(renderer, scene, 64);

    /*    CREATE COMPOSER     */
    var composer = new THREE.EffectComposer(renderer);
    composer.addPass(new THREE.RenderPass(scene, camera));
    composer.addPass(new THREE.UnrealBloomPass(undefined, .2, .1, .5));

    function update(dt) {
        swarmUpdate();
    }

    function render() {
        composer.render(scene, camera);
    }

    /*      START ANIMATION     */
    var clock = new THREE.Clock();
    var animate = () => {
        requestAnimationFrame(animate);
        update(clock.getDelta());
        render()
    };
    animate();
}
