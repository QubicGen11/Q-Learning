uniform float uTime;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    // Darker base colors
    vec3 color1 = vec3(0.1, 0.4, 0.8);    // Darker blue
    vec3 color2 = vec3(0.6, 0.2, 0.6);    // Darker purple
    vec3 color3 = vec3(0.1, 0.6, 0.6);    // Darker turquoise
    
    // Smoother color transitions
    float colorMix1 = sin(vPosition.x + uTime * 0.2) * 0.5 + 0.5;
    float colorMix2 = cos(vPosition.y + uTime * 0.2) * 0.5 + 0.5;
    
    // Mix colors
    vec3 finalColor = mix(color1, color2, colorMix1);
    finalColor = mix(finalColor, color3, colorMix2);
    
    // Reduced fresnel effect
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 + dot(viewDirection, vNormal), 2.0);
    finalColor += fresnel * 0.1;  // Reduced from 0.2 to 0.1
    
    // Darker shading
    float diffuse = dot(normalize(vec3(1.0)), vNormal) * 0.2 + 0.8;  // Adjusted for subtler lighting
    finalColor *= diffuse;
    
    gl_FragColor = vec4(finalColor, 1.0);
} 