function game(renderer, camera) {

    const scene = new THREE.Scene();
    scene.background = new THREE.Color().setHSL(0, 0, 0);



    var animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }; animate();

}
