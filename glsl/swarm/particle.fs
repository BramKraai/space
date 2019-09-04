varying vec3 vColor;

void main() {

    vec2 diff = gl_PointCoord - vec2(0.5, 0.5);

    float dist_sq = diff.x * diff.x + diff.y * diff.y;

    if (dist_sq > 0.25) discard;

    gl_FragColor = vec4(vColor, 1.0);
}
