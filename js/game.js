'use strict';

function game(renderer, camera) {

    /*      CREATE SCENE      */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color().setHSL(0, 0, 0);

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );

    cube.scale.setScalar(100);
    cube.position.set(RESOLUTION_X/2, RESOLUTION_Y/2, 0);

    scene.add( cube );

    function update(dt) {
        cube.rotateX(dt);
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
