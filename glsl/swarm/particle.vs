#define PI 3.14159265359

uniform sampler2D swarm;

varying vec3 vColor;

float atan2(float y, float x) {
    return mix(PI/2.0 - atan(x,y), atan(y,x), float(abs(x) > abs(y)));
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {

    vec4 boid = texture2D(swarm, uv);
    vec2 pos = boid.xy;
    vec2 dir = boid.zw;

    float hue = 0.5 + atan2(dir.y, dir.x) / (2.0 * PI);
    vColor = hsv2rgb(vec3(hue, .6, .9));

    gl_PointSize = 8.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 0.0, 1.0);
}
