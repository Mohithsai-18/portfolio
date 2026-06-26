"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ── World & camera constants (carefully tuned to match reference) ── */
const COLS    = 650;    // optimized grid columns
const ROWS    = 500;    // optimized grid rows
const W_WIDTH = 160;    // world width  (units)
const W_DEPTH = 130;    // world depth  (units)
const CAM_X   = -10.0;  // shift camera left for diagonal viewing angle
const CAM_Y   = 8.0;    // camera height above origin
const CAM_Z   = 19.0;   // camera Z (behind origin)
const LOOK_X  = 8.0;    // look-at target X (offset right)
const LOOK_Y  = 1.0;    // look-at target Y
const LOOK_Z  = -18.0;  // look-at target Z (in front)
const FOV     = 50;     // degrees
const FLOW    = 0.16;   // reduced flow speed for extremely slow, ambient cinematic rate

/* ── Wave height function for JS/CPU and dust vertex shader ── */
const WAVE_FN = `
  uniform sampler2D u_noiseTex;
  uniform float u_t;
  uniform float u_flow;
  uniform vec3  u_camPos;

  float waveH(vec2 p) {
    float ft = u_t * u_flow;

    // Layer 1: Primary wave crests (flowing +X and -Z, left-bottom to right-top)
    float s1 = sin(p.x * 0.11 - p.y * 0.06 - ft * 0.85);
    float h1 = (pow(s1 * 0.5 + 0.5, 2.0) * 2.0 - 1.0) * 4.2;

    // Layer 2: Secondary wave layer at a diagonal angle
    float s2 = sin(p.x * 0.085 - p.y * 0.09 - ft * 0.65);
    float h2 = (pow(s2 * 0.5 + 0.5, 2.0) * 2.0 - 1.0) * 2.6;

    // Layer 3: Cross waves for additional depth sheets
    float s3 = sin(p.x * 0.07 - p.y * 0.045 - ft * 0.52);
    float h3 = (pow(s3 * 0.5 + 0.5, 1.8) * 2.0 - 1.0) * 1.8;

    // Layer 4: Medium ripple undulations
    float h4 = sin(p.x * 0.20 - ft * 1.0) * 0.8;
    // Layer 5: Fine ripple detail
    float h5 = sin(p.x * 0.35 - p.y * 0.08 - ft * 1.3) * 0.45;

    // Organic noise perturbation
    vec2 nuv = p * 0.0055 + vec2(ft * 0.08, 0.0);
    float nx = texture2D(u_noiseTex, nuv * 0.00390625 * 256.0).r * 2.0 - 1.0;

    return h1 + h2 + h3 + h4 + h5 + nx * 0.5;
  }
`;

/* ── Optimized Sand Vert Shader using Analytical Derivatives ── */
const SAND_VERT = `
  uniform sampler2D u_noiseTex;
  uniform float u_t;
  uniform float u_flow;
  uniform vec3  u_camPos;
  uniform float u_ww;
  uniform float u_wd;
  uniform float u_fade;
  attribute vec3 a_rnd;
  varying vec3  v_col;
  varying float v_opa;
  varying float v_isStar;

  float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }

  void main(){
    vec3 p = position;

    /* Tile-wrap centered on camera so waves appear infinite */
    p.x = mod(p.x - u_camPos.x + u_ww*0.5, u_ww) - u_ww*0.5 + u_camPos.x;
    p.z = mod(p.z - u_camPos.z + u_wd*0.5, u_wd) - u_wd*0.5 + u_camPos.z;

    float ft = u_t * u_flow;

    /* Calculate heights and partial derivatives analytically for high performance */
    // Layer 1
    float arg1 = p.x * 0.11 - p.z * 0.06 - ft * 0.85;
    float s1 = sin(arg1);
    float c1 = cos(arg1);
    float val1 = s1 * 0.5 + 0.5;
    float h1 = (val1 * val1 * 2.0 - 1.0) * 4.2;
    float dh1_dx = 8.4 * val1 * 0.11 * c1;
    float dh1_dz = 8.4 * val1 * (-0.06) * c1;

    // Layer 2
    float arg2 = p.x * 0.085 - p.z * 0.09 - ft * 0.65;
    float s2 = sin(arg2);
    float c2 = cos(arg2);
    float val2 = s2 * 0.5 + 0.5;
    float h2 = (val2 * val2 * 2.0 - 1.0) * 2.6;
    float dh2_dx = 5.2 * val2 * 0.085 * c2;
    float dh2_dz = 5.2 * val2 * (-0.09) * c2;

    // Layer 3
    float arg3 = p.x * 0.07 - p.z * 0.045 - ft * 0.52;
    float s3 = sin(arg3);
    float c3 = cos(arg3);
    float val3 = s3 * 0.5 + 0.5;
    float h3 = (pow(val3, 1.8) * 2.0 - 1.0) * 1.8;
    float dh3_dx = 3.6 * 1.8 * pow(val3, 0.8) * 0.5 * 0.07 * c3;
    float dh3_dz = 3.6 * 1.8 * pow(val3, 0.8) * 0.5 * (-0.045) * c3;

    // Layer 4
    float arg4 = p.x * 0.20 - ft * 1.0;
    float s4 = sin(arg4);
    float c4 = cos(arg4);
    float h4 = s4 * 0.8;
    float dh4_dx = 0.8 * 0.20 * c4;
    float dh4_dz = 0.0;

    // Layer 5
    float arg5 = p.x * 0.35 - p.z * 0.08 - ft * 1.3;
    float s5 = sin(arg5);
    float c5 = cos(arg5);
    float h5 = s5 * 0.45;
    float dh5_dx = 0.45 * 0.35 * c5;
    float dh5_dz = 0.45 * (-0.08) * c5;

    // Noise height (derivative contribution approximated as zero)
    vec2 nuv = p.xz * 0.0055 + vec2(ft * 0.08, 0.0);
    float nx = texture2D(u_noiseTex, nuv * 0.00390625 * 256.0).r * 2.0 - 1.0;
    float hn = nx * 0.5;

    float h = h1 + h2 + h3 + h4 + h5 + hn;
    p.y = h + a_rnd.z * 0.12;

    /* Analytical Normal construction */
    float dh_dx = dh1_dx + dh2_dx + dh3_dx + dh4_dx + dh5_dx;
    float dh_dz = dh1_dz + dh2_dz + dh3_dz + dh4_dz + dh5_dz;
    vec3 N = normalize(vec3(-dh_dx, 1.0, -dh_dz));

    vec3 V = normalize(u_camPos - p);

    /* Lighting specs matching template */
    vec3  L    = normalize(vec3(-0.6, 0.5, -0.45));
    float diff = max(dot(N, L), 0.0);
    vec3  H    = normalize(L + V);
    float spec = pow(max(dot(N, H), 0.0), 48.0);

    /* Normalized height: 0 = deepest trough, 1 = highest crest */
    float totalAmp = 3.8 + 2.6 + 1.8 + 1.2 + 0.7 + 0.35 + 0.55;
    float normH = clamp((h + totalAmp) / (2.0 * totalAmp), 0.0, 1.0);

    /* Specular highlight on ridge crests */
    float onCrest = smoothstep(0.55, 0.9, normH);
    vec3 specCol = vec3(0.60, 0.68, 0.72) * spec * 0.85 * onCrest;
    
    // Content-aware bloom intensity reduction (25%)
    specCol = specCol * (1.0 - u_fade * 0.25);

    /* Green glow factors */
    float trough = 1.0 - smoothstep(0.0, 0.35, normH);
    float pulse  = sin(p.x * 0.045 - u_t * 0.45) * 0.5 + 0.5;
    float edge   = smoothstep(0.28, 0.48, normH) * (1.0 - smoothstep(0.48, 0.65, normH));

    /* 33/33/33 stochastic blend */
    vec3 base;
    vec3 greenCol = vec3(0.0);
    v_isStar = 0.0;

    if (a_rnd.y < 0.333) {
      v_isStar = 1.0;
      float twinkle = sin(u_t * 5.0 + a_rnd.x * 250.0) * 0.35 + 0.65;
      base = vec3(0.92, 0.95, 1.0) * (0.45 + 0.55 * twinkle);
      greenCol = base * vec3(0.0, 0.45, 0.15) * trough * 0.25;
    } else if (a_rnd.y < 0.666) {
      base = vec3(0.038, 0.040, 0.045);
      greenCol = base * vec3(0.0, 0.45, 0.15) * trough * 0.4;
    } else {
      base = vec3(0.008, 0.018, 0.010);
      greenCol = vec3(0.0, 0.82, 0.28) * trough * (0.3 + 0.7 * pulse) * 1.9;
      greenCol += vec3(0.0, 0.45, 0.18) * edge * 0.95;
    }

    // Content-aware green glow reduction (30%)
    greenCol = greenCol * (1.0 - u_fade * 0.30);

    vec3 col = base * (0.15 + diff * 0.85) + specCol + greenCol;

    if(hash(floor(p.xz * 220.0) + a_rnd.y) > 0.990){
      col += vec3(0.85, 0.95, 0.90) * (0.4 + 1.2 * onCrest);
    }

    v_col = col;

    /* Distance Horizon Fades */
    float dist  = length(p - u_camPos);
    float nearF = smoothstep(2.0, 8.0,   dist);
    float farF  = smoothstep(220.0, 140.0, dist);
    float sideF = smoothstep(88.0, 68.0, abs(p.x - u_camPos.x));
    
    // Content-aware particle opacity reduction (40%)
    v_opa = nearF * farF * sideF * 0.95 * (1.0 - u_fade * 0.40);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    /* Particle sizing */
    float sz = a_rnd.x * 0.4 + 0.15;
    if (a_rnd.y < 0.333) {
      float twinkle = sin(u_t * 5.0 + a_rnd.x * 250.0) * 0.3 + 0.7;
      sz *= (0.6 + 0.6 * twinkle);
    }
    // Scale size up slightly to compensate for particle density adjustments
    gl_PointSize = sz * (200.0 / -mv.z);
  }
`;

const SAND_FRAG = `
  varying vec3  v_col;
  varying float v_opa;
  varying float v_isStar;
  void main(){
    vec2  uv = gl_PointCoord - 0.5;
    float d  = length(uv);
    if(d > 0.5) discard;
    
    float a;
    if (v_isStar > 0.5) {
      a = smoothstep(0.5, 0.02, d) * v_opa * 1.3;
    } else {
      a = smoothstep(0.5, 0.32, d) * v_opa;
    }
    gl_FragColor = vec4(v_col, a);
  }
`;

/* ── Dust shaders ── */
const DUST_VERT = `
  ${WAVE_FN}
  uniform float u_ww;
  uniform float u_wd;
  uniform float u_fade;
  attribute vec3 a_attr;
  varying float v_opa;
  varying float v_green;

  void main(){
    vec3 p = position;
    p.x += u_t * u_flow * 22.0 + sin(u_t * 0.038 + a_attr.y) * 12.0;
    p.z += sin(u_t * 0.025 + a_attr.y * 0.7) * 6.0;

    p.x = mod(p.x - u_camPos.x + u_ww*0.5, u_ww) - u_ww*0.5 + u_camPos.x;
    p.z = mod(p.z - u_camPos.z + u_wd*0.5, u_wd) - u_wd*0.5 + u_camPos.z;

    p.y = waveH(p.xz) + a_attr.x;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position  = projectionMatrix * mv;
    gl_PointSize = (a_attr.x * 0.28 + 0.9) * (260.0 / -mv.z);

    float dist  = length(p.xz - u_camPos.xz);
    float fadeD = smoothstep(200.0, 80.0, dist) * smoothstep(8.0, 30.0, dist);
    float shim  = sin(u_t * 0.055 + a_attr.y) * 0.4 + 0.6;
    
    // Content-aware opacity reduction (40%)
    v_opa   = fadeD * shim * 0.55 * (1.0 - u_fade * 0.40);
    v_green = a_attr.z * (1.0 - u_fade * 0.30);
  }
`;

const DUST_FRAG = `
  varying float v_opa;
  varying float v_green;
  void main(){
    vec2  uv = gl_PointCoord - 0.5;
    if(length(uv) > 0.5) discard;
    float a  = smoothstep(0.5, 0.04, length(uv)) * v_opa;
    vec3  col= mix(vec3(0.4, 0.85, 0.60), vec3(0.0, 1.0, 0.35), v_green);
    gl_FragColor = vec4(col, a);
  }
`;

/* ── Noise Texture Builder ── */
function buildNoiseTex() {
  const S = 256, G = 16;
  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const grid = Array.from({ length: G }, () => Array.from({ length: G }, Math.random));
  const vnoise = (x: number, y: number) => {
    const xi = Math.floor(x) & (G - 1), yi = Math.floor(y) & (G - 1);
    const xf = x - Math.floor(x), yf = y - Math.floor(y);
    const nx = (xi + 1) & (G - 1), ny = (yi + 1) & (G - 1);
    return lerp(lerp(grid[yi][xi], grid[yi][nx], fade(xf)),
      lerp(grid[ny][xi], grid[ny][nx], fade(xf)), fade(yf));
  };
  const data = new Uint8Array(S * S * 4);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const nx = x / G, ny = y / G;
    const v = vnoise(nx, ny) * 0.55 + vnoise(nx * 2, ny * 2) * 0.28 + vnoise(nx * 4, ny * 4) * 0.17;
    const b = Math.round(v * 255);
    const i = (y * S + x) * 4;
    data[i] = data[i + 1] = data[i + 2] = b; data[i + 3] = 255;
  }
  const tex = new THREE.DataTexture(data, S, S, THREE.RGBAFormat);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  tex.needsUpdate = true;
  return tex;
}

/* ── Sand Grain System Component ── */
function SandSystem({ noiseTex }: { noiseTex: THREE.Texture }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [geo, mat] = useMemo(() => {
    const N = COLS * ROWS;
    const pos = new Float32Array(N * 3);
    const rnd = new Float32Array(N * 3);

    const sx = W_WIDTH / COLS;
    const sz = W_DEPTH / ROWS;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const i = r * COLS + c;
        pos[i * 3]     = (c - COLS * 0.5) * sx + (Math.random() - 0.5) * sx * 0.88;
        pos[i * 3 + 1] = 0;
        pos[i * 3 + 2] = (r - ROWS * 0.5) * sz + (Math.random() - 0.5) * sz * 0.88;
        rnd[i * 3]     = Math.random();
        rnd[i * 3 + 1] = Math.random();
        rnd[i * 3 + 2] = Math.random();
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geometry.setAttribute("a_rnd", new THREE.BufferAttribute(rnd, 3));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_t: { value: 0 },
        u_camPos: { value: new THREE.Vector3(0, CAM_Y, CAM_Z) },
        u_flow: { value: FLOW },
        u_noiseTex: { value: noiseTex },
        u_ww: { value: W_WIDTH },
        u_wd: { value: W_DEPTH },
        u_fade: { value: 0 },
      },
      vertexShader: SAND_VERT,
      fragmentShader: SAND_FRAG,
      transparent: true,
      depthWrite: true,
      depthTest: true,
      blending: THREE.NormalBlending,
    });

    return [geometry, material];
  }, [noiseTex]);

  const fadeRef = useRef(0);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mat.uniforms.u_t.value = t;
    mat.uniforms.u_camPos.value.copy(state.camera.position);

    // Dynamic scroll content-aware modes
    const targetFade = (typeof window !== "undefined" && window.scrollY > 300) ? 1.0 : 0.0;
    fadeRef.current = THREE.MathUtils.lerp(fadeRef.current, targetFade, 0.08);
    mat.uniforms.u_fade.value = fadeRef.current;
  });

  return <points ref={pointsRef} geometry={geo} material={mat} />;
}

/* ── Floating Dust Motes Component ── */
function DustSystem({ noiseTex }: { noiseTex: THREE.Texture }) {
  const pointsRef = useRef<THREE.Points>(null);
  const N = 3000;

  const [geo, mat] = useMemo(() => {
    const pos = new Float32Array(N * 3);
    const attr = new Float32Array(N * 3);

    for (let i = 0; i < N; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * W_WIDTH;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = (Math.random() - 0.5) * W_DEPTH;
      attr[i * 3]     = Math.random() * 5.0 + 0.5;
      attr[i * 3 + 1] = Math.random() * 100;
      attr[i * 3 + 2] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geometry.setAttribute("a_attr", new THREE.BufferAttribute(attr, 3));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_t: { value: 0 },
        u_camPos: { value: new THREE.Vector3(0, CAM_Y, CAM_Z) },
        u_flow: { value: FLOW },
        u_noiseTex: { value: noiseTex },
        u_ww: { value: W_WIDTH },
        u_wd: { value: W_DEPTH },
        u_fade: { value: 0 },
      },
      vertexShader: DUST_VERT,
      fragmentShader: DUST_FRAG,
      transparent: true,
      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending,
    });

    return [geometry, material];
  }, [noiseTex]);

  const fadeRef = useRef(0);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mat.uniforms.u_t.value = t;
    mat.uniforms.u_camPos.value.copy(state.camera.position);

    // Dynamic scroll content-aware modes
    const targetFade = (typeof window !== "undefined" && window.scrollY > 300) ? 1.0 : 0.0;
    fadeRef.current = THREE.MathUtils.lerp(fadeRef.current, targetFade, 0.08);
    mat.uniforms.u_fade.value = fadeRef.current;
  });

  return <points ref={pointsRef} geometry={geo} material={mat} />;
}

/* ── Camera Rig Component (Diagonal drift + mouse orbit) ── */
function CameraRig() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mouse = mouseRef.current;

    const cx = CAM_X + Math.sin(t * 0.015) * 3 + mouse.x * 5;
    const cy = CAM_Y + Math.sin(t * 0.025) * 1.0;
    const cz = CAM_Z + Math.sin(t * 0.011) * 3;

    camera.position.set(cx, cy, cz);
    camera.lookAt(LOOK_X + mouse.x * 6, LOOK_Y + mouse.y * 1.5, LOOK_Z);
  });

  return null;
}

/* ── Main Export component ── */
export default function DuneScene() {
  const noiseTex = useMemo(() => buildNoiseTex(), []);

  // Dispose texture cleanly on unmount to prevent GPU memory leaks
  useEffect(() => {
    return () => {
      noiseTex.dispose();
    };
  }, [noiseTex]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-[#050505] pointer-events-none">
      <Canvas
        camera={{ position: [CAM_X, CAM_Y, CAM_Z], fov: FOV, near: 0.1, far: 500 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#050505"]} />
        <SandSystem noiseTex={noiseTex} />
        <DustSystem noiseTex={noiseTex} />
        <CameraRig />
      </Canvas>
    </div>
  );
}
