/**
 * Hero shader — flowing mesh gradient driven by 3D simplex noise.
 * Five accent colors blended by smooth noise fields, with subtle mouse parallax.
 * Designed to read as a premium "Stripe / Linear" liquid backdrop.
 */
export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;
  uniform float uIntensity;

  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform vec3 uColorD;
  uniform vec3 uColorBg;

  // ── 3D simplex noise (Ashima) ─────────────────────────────────────────
  vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0);
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

    i = mod(i, 289.0);
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 1.0 / 7.0;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    // Aspect-correct centered UV (-1..1 on both axes, 1 unit = half-width)
    vec2 p = (vUv - 0.5);
    p.x *= uResolution.x / uResolution.y;

    // Mouse parallax — gentle drift toward cursor
    vec2 m = (uMouse - 0.5) * 0.6;
    p -= m * 0.18;

    float t = uTime * 0.06;

    // Three flowing noise fields
    float n1 = snoise(vec3(p * 1.05, t)) * 0.5 + 0.5;
    float n2 = snoise(vec3(p * 2.40 + 5.0, t * 1.3)) * 0.5 + 0.5;
    float n3 = snoise(vec3(p * 0.55 - 3.0, t * 0.55)) * 0.5 + 0.5;

    // Smooth color blend across the noise fields
    vec3 accent = mix(uColorA, uColorB, smoothstep(0.15, 0.90, n1));
    accent = mix(accent, uColorC, smoothstep(0.35, 0.95, n2));
    accent = mix(accent, uColorD, smoothstep(0.55, 0.95, n3 * n1));

    // Off-center spotlight: brightest in the upper-right (above the headline)
    // and lower-right corner, with deeper shadow on the left where text sits.
    vec2 f1 = p - vec2(0.30, 0.20);
    vec2 f2 = p - vec2(0.50, -0.30);
    float spot1 = smoothstep(1.25, 0.00, length(f1));
    float spot2 = smoothstep(0.95, 0.00, length(f2)) * 0.75;
    float radial = max(spot1, spot2);

    // Bottom fade — dissolve into the page background at the seam.
    float bottomFade = smoothstep(-0.55, 0.10, p.y);

    // Mix accent into the deep page background.
    // Cap below 1.0 so even peaks retain a hint of background, keeping text legible.
    float intensity = clamp(radial * bottomFade * uIntensity * 0.85, 0.0, 0.55);
    vec3 col = mix(uColorBg, accent, intensity);

    // Filmic grain — breaks up banding
    float grain = fract(sin(dot(vUv * uResolution, vec2(12.9898, 78.233))) * 43758.5453);
    col += (grain - 0.5) * 0.014;

    gl_FragColor = vec4(col, 1.0);
  }
`;
