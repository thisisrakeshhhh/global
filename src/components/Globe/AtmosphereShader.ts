import * as THREE from 'three';

/**
 * Authentic NASA/Kaspersky atmospheric glow shader
 * Uses view-angle Fresnel rim lighting with additive blending
 */
export function createAtmosphereMesh(radius: number = 2.0): THREE.Mesh {
  const geometry = new THREE.SphereGeometry(radius * 1.05, 64, 64);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      glowColor: { value: new THREE.Color(0x38bdf8) }
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vec3 viewDir = normalize(-vPosition);
        // Fresnel rim effect - glow only at glancing grazing angles
        float rim = 1.0 - max(0.0, dot(vNormal, viewDir));
        float intensity = pow(rim, 3.5) * 0.95;
        gl_FragColor = vec4(glowColor, intensity);
      }
    `,
    blending: THREE.AdditiveBlending,
    side: THREE.FrontSide,
    transparent: true,
    depthWrite: false
  });

  return new THREE.Mesh(geometry, material);
}
