const float RESOLUTION_X = 1920.0;
const float RESOLUTION_Y = 1080.0;

const float MAX_SPEED = 5.0;
const float MAX_ACCEL = 2.0;

const float SEPARATION_FACTOR = 0.5;
const float SEPARATION_THRESHOLD = 30.0;

const float COHESION_FACTOR = 0.3;
const float COHESION_THRESHOLD = 50.0;

const float ALIGNMENT_FACTOR = 0.02;
const float ALIGNMENT_THRESHOLD = 40.0;

const float CENTER_FACTOR = 0.02;

void main() {
    vec4 boid = texture2D(swarm, gl_FragCoord.xy / resolution.xy);

    vec2 pos = boid.xy;
    vec2 vel = boid.zw;

    vec2 cohesion_target = vec2(0, 0);
    vec2 separation_target = vec2(0, 0);
    vec2 alignment_target = vec2(0, 0);

    for (float y=0.0; y<resolution.y; y++) {
        for (float x=0.0; x<resolution.x; x++) {
            vec4 other = texture2D(swarm, vec2(x, y) / resolution.xy);
            vec2 o_pos = other.xy;
            vec2 o_vel = other.zw;

            if (pos != o_pos) {
                vec2 diff = o_pos - pos;
                float dist = length(diff);
                vec2 diff_norm = diff / dist;

                if (dist < COHESION_THRESHOLD) cohesion_target += diff_norm;            // Cohesion
                if (dist < SEPARATION_THRESHOLD) separation_target -= diff_norm;        // Separation
                if (dist < ALIGNMENT_THRESHOLD) alignment_target += normalize(o_vel);   // Alignment
            }
        }
    }

    // Compute Target Direction
    if (length(separation_target) > 1.0) separation_target = normalize(separation_target);
    if (length(cohesion_target) > 1.0) cohesion_target = normalize(cohesion_target);
    if (length(alignment_target) > 1.0) alignment_target = normalize(alignment_target);

    vec2 center_target = normalize(vec2(RESOLUTION_X/2.0, RESOLUTION_Y/2.0) - pos);

    vec2 target = SEPARATION_FACTOR * separation_target + 
                  COHESION_FACTOR * cohesion_target +
                  ALIGNMENT_FACTOR * alignment_target +
                  CENTER_FACTOR * center_target;

    // Update Velocity & Position
    if (length(target) > MAX_ACCEL) target = normalize(target) * MAX_ACCEL;
    vec2 vel_new = vel + target;
    if (length(vel_new) > MAX_SPEED) vel_new = normalize(vel_new) * MAX_SPEED;
    vec2 pos_new = pos + vel_new;

    // Boundary Wrap (X & Y)
    if (pos_new.x > RESOLUTION_X) pos_new.x -= RESOLUTION_X;
    else if (pos_new.x < 0.0) pos_new.x += RESOLUTION_X;
    if (pos_new.y > RESOLUTION_Y) pos_new.y -= RESOLUTION_Y;
    else if (pos_new.y < 0.0) pos_new.y += RESOLUTION_Y;

    // Update Swarm
    gl_FragColor = vec4(pos_new, vel_new);
}