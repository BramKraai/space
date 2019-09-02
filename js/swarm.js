'use strict';

var swarm_gpu, swarm_buffer, swarm_variable, swarm_uniforms;

function swarmInit(renderer, scene, N) {

    const MAX_SPEED = 10.0;

    swarm_gpu = new GPUComputationRenderer(N, N, renderer);

    loadShader('./glsl/swarm/compute.fs', (compute_shader) => {

        // Init Position Buffer
        swarm_buffer = new Float32Array(N*N*4);
        for (let i=0; i<N*N*4; i+=4) {
            let direction = Math.random() * 2 * Math.PI;
            let speed = Math.random() * MAX_SPEED;

            swarm_buffer[i+0] = Math.random() * RESOLUTION_X;   // X Position
            swarm_buffer[i+1] = Math.random() * RESOLUTION_Y;   // Y Position

            swarm_buffer[i+2] = speed * Math.cos(direction);    // X Velocity
            swarm_buffer[i+3] = speed * Math.sin(direction);    // Y Velocity
        }
        swarm_buffer = new THREE.DataTexture(swarm_buffer, N, N, THREE.RGBAFormat, THREE.FloatType);
        swarm_buffer.needsUpdate = true;
        
        swarm_variable = swarm_gpu.addVariable('swarm', compute_shader, swarm_buffer);

        swarm_gpu.setVariableDependencies(swarm_variable, [swarm_variable]);

        let gpu_error = swarm_gpu.init();
        if (gpu_error !== null) console.log(gpu_error);

        loadMaterial('./glsl/swarm/particle.vs', './glsl/swarm/particle.fs', (material) => {

            let position = new Float32Array(N*N*3);
    
            // Calculate UV Coordinates
            var uv = new Float32Array(N*N*2); var p=0;
            for (var j=0; j<N; j++) { for (var i=0; i<N; i++) {
                uv[p++] = i / (N-1);
                uv[p++] = j / (N-1);
            }}
    
            let geometry = new THREE.BufferGeometry();
            geometry.addAttribute('position', new THREE.BufferAttribute(position, 3));
            geometry.addAttribute('uv', new THREE.BufferAttribute(uv, 2));

            swarm_uniforms = {
                "swarm": { value: swarm_gpu.getCurrentRenderTarget(swarm_variable).texture }
            }

            material.uniforms = swarm_uniforms;
            scene.add(new THREE.Points(geometry, material));
        });
    });
};


function swarmUpdate() {
    if (swarm_gpu && swarm_uniforms) {
        swarm_gpu.compute();
        swarm_uniforms["swarm"].value = swarm_gpu.getCurrentRenderTarget(swarm_variable).texture;
    }
};