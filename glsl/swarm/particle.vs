uniform sampler2D swarm;

varying vec4 vColor;

void main() {

    vec2 dir = normalize(texture2D(swarm, uv).zw);
    vColor = vec4(0.5 + 0.5 * dir.x, 0.5 + 0.5 * dir.y, 0.5, 1);

    gl_PointSize = 8.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(texture2D(swarm, uv).xy, 0.0, 1.0);
}