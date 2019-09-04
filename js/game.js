'use strict';

function game(renderer, camera) {

    /*      CREATE SCENE      */
    var scene = new THREE.Scene();
    scene.background = new THREE.Color().setHSL(0, 0, 0);

    swarmInit(renderer, scene, parseInt(getUrlParameter('N') || 96));

    function update(dt) {
        swarmUpdate();
    }

    function render() {
        renderer.render(scene, camera);
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
