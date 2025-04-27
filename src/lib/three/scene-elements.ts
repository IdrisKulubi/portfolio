import * as THREE from 'three';

interface FloatingElement extends THREE.Mesh {
  userData: {
    rotationSpeed: {
      x: number;
      y: number;
      z: number;
    };
    floatSpeed: number;
    initialY: number;
    initialX: number;
    initialZ: number;
  };
}

// Modify the brand colors to have higher contrast and brightness for dark mode
const brandColors = [
  0x6366f1, // Indigo
  0xec4899, // Pink
  0x10b981, // Emerald
  0xf59e0b, // Amber
  0x34d399, // Brighter green  
  0x60a5fa, // Brighter blue
  0xffffff, // White
];

export function createFloatingElements(count = 25): FloatingElement[] {
  const elements: FloatingElement[] = [];
  const geometries = [
    new THREE.TetrahedronGeometry(0.8, 0),
    new THREE.OctahedronGeometry(0.8, 0),
    new THREE.IcosahedronGeometry(0.8, 0),
    new THREE.BoxGeometry(0.8, 0.8, 0.8),
    new THREE.TorusKnotGeometry(0.6, 0.15, 100, 16)
  ];

  for (let i = 0; i < count; i++) {
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    const material = new THREE.MeshPhysicalMaterial({
      color: brandColors[Math.floor(Math.random() * brandColors.length)],
      metalness: 0.3, // Increase metalness for more reflective surfaces
      roughness: Math.random() * 0.3 + 0.1, // Lower roughness for more shiny appearance
      transmission: 0.8,
      thickness: 0.8,
      transparent: true,
      opacity: 0.9,
      emissive: brandColors[Math.floor(Math.random() * brandColors.length)],
      emissiveIntensity: 0.15, // Increase emissive intensity for more glow
    });

    const mesh = new THREE.Mesh(geometry, material);

    const scale = Math.random() * 0.5 + 0.3;
    mesh.scale.set(scale, scale, scale);

    const radius = Math.random() * 5 + 4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    mesh.position.set(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi)
    );

    // Assign custom userData structure
    // Note: Direct assignment works here because TS allows adding properties
    // to the base Record<string, any> type.
    mesh.userData = {
        initialX: mesh.position.x,
        initialY: mesh.position.y,
        initialZ: mesh.position.z,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.008,
          y: (Math.random() - 0.5) * 0.008,
          z: (Math.random() - 0.5) * 0.008,
        },
        floatSpeed: Math.random() * 0.002 + 0.001
    };

    // Use the recommended cast via unknown
    elements.push(mesh as unknown as FloatingElement);
  }

  return elements;
}

export function animateFloatingElements(elements: FloatingElement[], mouse: THREE.Vector2, time: number) {
  elements.forEach((element) => {
    element.rotation.x += element.userData.rotationSpeed.x;
    element.rotation.y += element.userData.rotationSpeed.y;
    element.rotation.z += element.userData.rotationSpeed.z;

    const floatFactor = time * 0.3 + element.userData.initialX;
    element.position.y = element.userData.initialY + Math.sin(floatFactor) * 0.3;
    element.position.x = element.userData.initialX + Math.cos(floatFactor * 0.7) * 0.2;

    const targetX = element.userData.initialX + mouse.x * 0.3;
    const targetY = element.userData.initialY - mouse.y * 0.3;

    element.position.x += (targetX - element.position.x) * 0.03;
    element.position.y += (targetY - element.position.y) * 0.03;
  });
}

interface WaveBackground {
    mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
    material: THREE.ShaderMaterial;
}

export function createWaveBackground(): WaveBackground {
  const geometry = new THREE.PlaneGeometry(30, 30, 128, 128);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      mouse: { value: new THREE.Vector2(0, 0) },
      // Brighter, more saturated colors for better visibility in dark mode
      colorA: { value: new THREE.Color(0x2563eb) }, // Darker blue
      colorB: { value: new THREE.Color(0xc026d3) }, // Brighter purple
      colorC: { value: new THREE.Color(0xf43f5e) }  // Brighter pink
    },
    vertexShader: `
      uniform float time;
      uniform vec2 mouse;
      varying vec2 vUv;
      varying float vElevation;

      // Perlin 3D noise function
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute( permute( permute( i.z + vec4(0.0, i1.z, i2.z, 1.0 )) + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
      }

      void main() {
        vUv = uv;
        float mouseInfluence = smoothstep(1.0, 0.0, length(mouse)) * 1.5;
        float noiseFreq = 0.4;
        float noiseAmp = 1.8;
        vec3 noisePos = vec3(position.x * noiseFreq, position.y * noiseFreq, time * 0.1);
        float elevation = snoise(noisePos) * noiseAmp;
        elevation += snoise(vec3(position.x * 1.2, position.y * 1.2, time * 0.3)) * 0.5;
        float dist = distance(position.xy, mouse * 12.0);
        elevation -= smoothstep(6.0, 0.0, dist) * mouseInfluence * 2.0;
        vElevation = elevation;
        vec3 newPosition = position;
        newPosition.z += elevation * 0.8;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 colorA;
      uniform vec3 colorB;
      uniform vec3 colorC;
      uniform float time;
      varying vec2 vUv;
      varying float vElevation;

      void main() {
        float mixFactor1 = smoothstep(-0.8, 0.8, vElevation) * 0.5 + 0.5;
        float mixFactor2 = smoothstep(0.0, 1.0, vUv.x + sin(vUv.y * 5.0 + time * 0.2) * 0.1);
        vec3 color = mix(colorA, colorB, mixFactor1);
        color = mix(color, colorC, mixFactor2);
        float fresnel = pow(1.0 - abs(normalize(vec3(0.0, 0.0, 1.0)).z), 2.0);
        vec3 finalColor = color + vec3(fresnel * 0.1);
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `,
     side: THREE.DoubleSide,
    // wireframe: true,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2.3;
  mesh.position.z = -7;
  mesh.position.y = -3;

  return { mesh, material };
}

export function animateWaveBackground(wave: WaveBackground, mouse: THREE.Vector2, time: number) {
    wave.material.uniforms.time.value = time;
    wave.material.uniforms.mouse.value.lerp(mouse, 0.05);
}

export function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    // Error details are not needed here, just return false
    return false;
  }
} 