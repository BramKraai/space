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

    var ambient = new THREE.AmbientLight(0x010101);
    scene.add(ambient);

    scene.add(createStars(1000, 500));
    
    var geometry = icosphere(7);
    var planet = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: 0xFFFFFF}));

    deformTerrain(planet);

    scene.add(planet);

    // scene.add(new THREE.LineSegments(new THREE.WireframeGeometry(geometry), new THREE.LineBasicMaterial({color: 0xFFFFFF})));

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

function deformTerrain(planet, amplitude=0.01, frequency=1, octaves=32, persistence=0.6) {
    var noise = new SimplexNoise();

    var vertices = planet.geometry.attributes.position.array;

    for (let i=0; i<vertices.length; i+=3) {

        let _amplitude = amplitude, _frequency = frequency, offset = 0;

        for (let j=0; j<octaves; j++){
            offset += _amplitude * noise.noise3D(_frequency * vertices[i], _frequency * vertices[i+1], _frequency * vertices[i+2]);
            _amplitude *= persistence;
            _frequency *= 2.0;
        }

        offset = Math.max(offset, 0);

        vertices[i+0] += vertices[i+0] * offset;
        vertices[i+1] += vertices[i+1] * offset;
        vertices[i+2] += vertices[i+2] * offset;
    }

    planet.geometry.computeVertexNormals();

    planet.geometry.attributes.position.needsUpdate = true;
    planet.geometry.attributes.normal.needsUpdate = true;
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

function grid(size=10, gridColor = 0x444444) {
    let grid = new THREE.Object3D();

    grid.add(new THREE.GridHelper(size, 10, gridColor));
    grid.add(new THREE.GridHelper(size, 10, gridColor).rotateX(Math.PI/2));
    grid.add(new THREE.GridHelper(size, 10, gridColor).rotateZ(Math.PI/2));
    grid.add(new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), size/2, 0xFF0000));
    grid.add(new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(), size/2, 0x00FF00));
    grid.add(new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(), size/2, 0x0000FF));

    return grid;
}