'use strict';

function game(renderer) {

    var camera = new THREE.PerspectiveCamera(75, RESOLUTION_X/RESOLUTION_Y, 0.001, 1000);
    camera.position.z = 5;

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;

    var scene = new THREE.Scene();
    scene.background = new THREE.Color().setHSL(0, 0, 0);

    var composer = new THREE.EffectComposer(renderer);
    composer.addPass(new THREE.RenderPass(scene, camera));
    composer.addPass(new THREE.UnrealBloomPass(undefined, 1, .01, .8));

    var sun = new THREE.DirectionalLight(0xFFFFFF, 0.5);
    sun.position.set(-1, 1, 1);
    scene.add(sun);

    scene.add(createStars(1000, 500));

    var geometry = new THREE.IcosahedronGeometry(2, 7);
    var planet = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: 0xFFFFFF}));

    deformTerrain(planet);

    scene.add(planet);
    
    function update(dt) {
        controls.update();
    }
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

function deformTerrain(planet, amplitude=0.05, frequency=0.2, octaves=16, persistence=0.6) {
    var noise = new SimplexNoise();

    var vertices = planet.geometry.vertices;

    for (let vertex of vertices) {

        let _amplitude = amplitude;
        let _frequency = frequency;

        let offset = 0;
        for (let i=0; i<octaves; i++){
            offset += _amplitude * noise.noise3D(_frequency * vertex.x, _frequency * vertex.y, _frequency * vertex.z);
            _amplitude *= persistence;
            _frequency *= 2.0;
        }

        if (offset > 0)
            vertex.add(new THREE.Vector3(vertex.x * offset, vertex.y * offset, vertex.z * offset));
    }

    planet.geometry.computeVertexNormals();
}

function createStars(n, r) {
    var stars = new THREE.Geometry();
    for (let i=0; i<n; i++) {

        // Random Position (Spherical Coordinates)
        var phi = 2 * Math.random() * Math.PI;
        var theta = Math.acos(2 * Math.random() - 1);

        stars.vertices.push(new THREE.Vector3(
            r * Math.sin(theta) * Math.cos(phi),
            r * Math.sin(theta) * Math.sin(phi),
            r * Math.cos(theta)
        ));
    }

    return new THREE.Points(stars, new THREE.PointsMaterial({size: 1, color: 0xFFFFFF, sizeAttenuation: false}));
}