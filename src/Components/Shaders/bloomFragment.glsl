uniform float uTime;
varying vec2 vUv;

void main() {
    vec3 color = vec3(0.0);
    
    // Create base glow
    float glow = sin(vUv.x * 10.0 + uTime) * 0.5 + 0.5;
    glow *= sin(vUv.y * 8.0 + uTime) * 0.5 + 0.5;
    
    // Add color variations
    vec3 color1 = vec3(1.0, 0.2, 0.5); // Pink
    vec3 color2 = vec3(0.2, 0.5, 1.0); // Blue
    
    color = mix(color1, color2, glow);
    
    // Add extra bloom
    float bloom = pow(glow, 3.0);
    color += bloom * 0.5;
    
    gl_FragColor = vec4(color, 1.0);
} 