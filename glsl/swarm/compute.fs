const float RESOLUTION_X = 1920.0;
const float RESOLUTION_Y = 1080.0;

const float MAX_SPEED = 5.0;
const float MAX_ACCEL = 10.0;

const float SEPARATION_FACTOR = 1.0;
const float SEPARATION_THRESHOLD = 10.0;
const float SEPARATION_THRESHOLD_SQ = SEPARATION_THRESHOLD * SEPARATION_THRESHOLD;

const float COHESION_FACTOR = 0.2;
const float COHESION_THRESHOLD = 40.0;
const float COHESION_THRESHOLD_SQ = COHESION_THRESHOLD * COHESION_THRESHOLD;

const float ALIGNMENT_FACTOR = 0.1;
const float ALIGNMENT_THRESHOLD = 20.0;
const float ALIGNMENT_THRESHOLD_SQ = ALIGNMENT_THRESHOLD * ALIGNMENT_THRESHOLD;

const float CENTER_FACTOR = 0.02;

const float DX = 1.0/resolution.x;
const float DY = 1.0/resolution.y;

void main() {
    vec4 boid = texture2D(swarm, gl_FragCoord.xy / resolution.xy);

    vec2 pos = boid.xy;
    vec2 vel = boid.zw;

    vec2 cohesion_target = vec2(0, 0);
    vec2 separation_target = vec2(0, 0);
    vec2 alignment_target = vec2(0, 0);

    for (float y=0.0; y<1.0; y+=DY) {
        for (float x=0.0; x<1.0; x+=DX) {
            vec4 other = texture2D(swarm, vec2(x, y));
            vec2 o_pos = other.xy;

            if (pos != o_pos) {
                vec2 diff = o_pos - pos;
                float dist_sq = diff.x * diff.x + diff.y * diff.y;

                if (dist_sq < COHESION_THRESHOLD_SQ) {

                    float dist = sqrt(dist_sq);
                    vec2 diff_norm = diff / dist;

                    cohesion_target += diff_norm;   // Cohesion

                    if (dist < SEPARATION_THRESHOLD) separation_target -= diff_norm;        // Separation
                    if (dist < ALIGNMENT_THRESHOLD) alignment_target += normalize(other.zw);   // Alignment
                }

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