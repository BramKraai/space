'use strict';

function icosphere(subdivisions) {

    var t = (1 + Math.sqrt(5)) / 2;

    var vertices = [
        - 1, t, 0, 1, t, 0, - 1, - t, 0, 1, - t, 0,
        0, - 1, t, 0, 1, t, 0, - 1, - t, 0, 1, - t,
        t, 0, - 1, t, 0, 1, - t, 0, - 1, - t, 0, 1
    ];

    var faces = [
        0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11,
        1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8,
        3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9,
        4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1
    ];

    for (let i=0; i<vertices.length; i+=3) {
        let r = Math.sqrt(vertices[i]**2 + vertices[i+1]**2 + vertices[i+2]**2);
        vertices[i] /= r; vertices[i+1] /= r; vertices[i+2] /= r;
    }

    for (let s=0; s<subdivisions; s++) {

        let _faces = []
        let splits = {};

        let index = vertices.length/3;

        for (let f=0; f<faces.length; f+=3) {

            let ti = [faces[f], faces[f+1], faces[f+2]];
            
            for (let edge of [[ti[0], ti[1]], [ti[1], ti[2]], [ti[2], ti[0]]]){

                if ([edge[0], edge[1]].sort() in splits) {
                    ti.push(splits[[edge[0], edge[1]].sort()]);
                } else {

                    let x = (vertices[edge[0]*3  ] + vertices[edge[1]*3  ]) / 2,
                        y = (vertices[edge[0]*3+1] + vertices[edge[1]*3+1]) / 2,
                        z = (vertices[edge[0]*3+2] + vertices[edge[1]*3+2]) / 2;
    
                    let r = Math.sqrt(x**2 + y**2 + z**2);
                    vertices.push(x/r, y/r, z/r);
    
                    ti.push(index);
                    splits[[edge[0], edge[1]].sort()] = index;
    
                    index++;
                }
            }

            _faces.push(
                ti[3], ti[4], ti[5],
                ti[0], ti[3], ti[5],
                ti[1], ti[4], ti[3],
                ti[2], ti[5], ti[4],
            );
        }

        faces = _faces;
    }

    var geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
    geometry.addAttribute('normal', new THREE.BufferAttribute(new Float32Array(vertices), 3));
    geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(faces), 1));
    return geometry;
}