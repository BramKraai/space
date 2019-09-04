uniform sampler2D swarm;

varying vec3 vColor;

void main() {

    vec2 dir = normalize(texture2D(swarm, uv).zw);
    vColor = vec3(0.5 + 0.5 * dir.x, 0.5 + 0.5 * dir.y, 0.5);

    vec2 pos = texture2D(swarm, uv).xy;

    gl_PointSize = 10.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 0.0, 1.0);
}