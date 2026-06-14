import { useMemo, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ─────────────────────────────────────────────────────────────────────
   Cosmic 3D backdrop (React Three Fiber), lazy-loaded.

     • a broad, soft violet NEBULA GLOW that fills the hero
     • a dissolved particle-cloud "orb" (star cluster), off-centre
     • crystalline wireframe satellites orbiting that cluster
     • a comet that travels a top→down spiral, driven by scroll
     • a deep starfield for parallax depth

   Everything reacts to pointer + scroll. `three` stays out of the
   initial bundle.
   ───────────────────────────────────────────────────────────────────── */

type Theme = 'dark' | 'light'

const PALETTE: Record<Theme, [string, string, string]> = {
  dark: ['#4dd0ff', '#9b6bff', '#ff5fd0'], // cyan · violet · magenta
  light: ['#1f86c4', '#6b3fd0', '#c43f9e'],
}

const isDark = (t: Theme) => t === 'dark'

// Ashima 3D simplex noise (public domain).
const snoise = /* glsl */ `
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }
`

/* ── Nebula glow — a broad, soft cloud filling the hero ──────────────── */
const glowVert = /* glsl */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const glowFrag = /* glsl */ `
  precision highp float;
  uniform vec3 uC1; uniform vec3 uC2; uniform float uOpacity; uniform float uTime;
  varying vec2 vUv;
  ${snoise}
  void main(){
    vec2 p = vUv - vec2(0.5);
    float d = length(p * vec2(1.0, 1.35));
    float core = smoothstep(0.62, 0.02, d);
    float n = snoise(vec3(vUv * 2.2, uTime * 0.05));
    float cloud = clamp(core * (0.75 + 0.45 * n), 0.0, 1.0);
    vec3 col = mix(uC1, uC2, smoothstep(0.0, 0.7, d) + 0.25 * n);
    gl_FragColor = vec4(col, cloud * uOpacity);
  }
`

function NebulaGlow({ theme, reduced }: { theme: Theme; reduced: boolean }) {
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(() => {
    const [c1, c2] = PALETTE[theme]
    return {
      uTime: { value: 0 },
      uOpacity: { value: isDark(theme) ? 0.55 : 0.42 },
      uC1: { value: new THREE.Color(c2) }, // violet core
      uC2: { value: new THREE.Color(c1) }, // cyan edge
    }
  }, [theme])

  useFrame((state) => {
    if (matRef.current && !reduced) matRef.current.uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <mesh position={[0, 0.3, -8]}>
      <planeGeometry args={[34, 22]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={glowVert}
        fragmentShader={glowFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={isDark(theme) ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </mesh>
  )
}

/* ── Dissolved orb — a drifting star-cluster point cloud ─────────────── */
const cloudVert = /* glsl */ `
  uniform float uTime; uniform float uScroll; uniform float uSize; uniform float uViewH;
  attribute float aSeed; attribute float aScale;
  varying float vMix; varying float vTwinkle;
  ${snoise}
  void main(){
    vec3 dir = normalize(position);
    float t = uTime * 0.22;
    float n = snoise(dir * 1.1 + vec3(0.0, t, uScroll)) * 0.5
            + snoise(dir * 2.4 + vec3(t * 0.6, aSeed, 0.0)) * 0.28;
    float disp = n * (0.45 + uScroll * 0.5);
    vec3 pos = position + dir * disp;
    vMix = clamp(disp * 1.5 + 0.5, 0.0, 1.0);
    vTwinkle = 0.55 + 0.45 * sin(uTime * 1.8 + aSeed * 6.2831);
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * (uViewH / -mv.z);
  }
`
const cloudFrag = /* glsl */ `
  precision highp float;
  uniform vec3 uC1; uniform vec3 uC2; uniform vec3 uC3; uniform float uOpacity;
  varying float vMix; varying float vTwinkle;
  void main(){
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    vec3 col = mix(uC1, uC2, smoothstep(0.0, 0.5, vMix));
    col = mix(col, uC3, smoothstep(0.5, 1.0, vMix));
    gl_FragColor = vec4(col, a * uOpacity * vTwinkle);
  }
`

function CloudBlob({
  theme,
  scrollRef,
  reduced,
}: {
  theme: Theme
  scrollRef: React.MutableRefObject<number>
  reduced: boolean
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const pts = useRef<THREE.Points>(null)
  const gl = useThree((s) => s.gl)
  const count = useMemo(() => (window.innerWidth < 768 ? 2000 : 4200), [])

  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const seeds = new Float32Array(count)
    const scales = new Float32Array(count)
    const radius = 2.1
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2
      const r = Math.sqrt(Math.max(0, 1 - y * y))
      const th = golden * i
      const rr = radius * (0.8 + Math.random() * 0.42)
      positions[i * 3] = Math.cos(th) * r * rr
      positions[i * 3 + 1] = y * rr
      positions[i * 3 + 2] = Math.sin(th) * r * rr
      seeds[i] = Math.random() * 10
      scales[i] = 0.5 + Math.random() * 1.3
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
    g.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
    return g
  }, [count])

  const uniforms = useMemo(() => {
    const [c1, c2, c3] = PALETTE[theme]
    return {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uSize: { value: 0.085 },
      uViewH: { value: 450 },
      uOpacity: { value: isDark(theme) ? 0.9 : 0.85 },
      uC1: { value: new THREE.Color(c1) },
      uC2: { value: new THREE.Color(c2) },
      uC3: { value: new THREE.Color(c3) },
    }
  }, [theme])

  useFrame((state) => {
    const m = matRef.current
    if (m) {
      if (!reduced) m.uniforms.uTime.value = state.clock.elapsedTime
      m.uniforms.uScroll.value += (scrollRef.current - m.uniforms.uScroll.value) * 0.07
      m.uniforms.uViewH.value = gl.domElement.height * 0.5
    }
    if (pts.current && !reduced) {
      pts.current.rotation.y += 0.0014
      pts.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.15
    }
  })

  return (
    <points ref={pts} geometry={geo}>
      <shaderMaterial
        ref={matRef}
        vertexShader={cloudVert}
        fragmentShader={cloudFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={isDark(theme) ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  )
}

/* ── Satellites — crystalline shards orbiting the cluster ────────────── */
function Satellite({
  theme,
  radius,
  speed,
  size,
  phase,
}: {
  theme: Theme
  radius: number
  speed: number
  size: number
  phase: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const color = useMemo(() => new THREE.Color(PALETTE[theme][phase % 3]), [theme, phase])

  useFrame((state) => {
    const m = ref.current
    if (!m) return
    const t = state.clock.elapsedTime * speed * 0.35 + phase
    m.position.set(
      Math.cos(t) * radius,
      Math.sin(t * 1.1) * radius * 0.5,
      Math.sin(t) * radius * 0.8,
    )
    m.rotation.x += 0.004
    m.rotation.y += 0.006
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.8 + phase) * 0.12
    m.scale.setScalar(s)
  })

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[size, 0]} />
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={isDark(theme) ? 0.32 : 0.5}
        blending={isDark(theme) ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </mesh>
  )
}

/* ── Comet — travels a top→down spiral, driven by scroll ─────────────── */
const cometVert = /* glsl */ `
  uniform float uViewH; uniform float uSize;
  attribute float aLife;
  varying float vLife;
  void main(){
    vLife = aLife;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    // broad bright nucleus at the head, tapering to a fine tail
    float w = pow(aLife, 1.5) + smoothstep(0.86, 1.0, aLife) * 1.7;
    gl_PointSize = uSize * w * (uViewH / -mv.z);
  }
`
const cometFrag = /* glsl */ `
  precision highp float;
  uniform vec3 uHead; uniform vec3 uTail; uniform float uOpacity;
  varying float vLife;
  void main(){
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    // crisp bright core with a tight halo → shiny, not blurry
    float a = smoothstep(0.5, 0.14, d);
    vec3 col = mix(uTail, uHead, vLife * vLife);
    col += vLife * 0.7;           // hottest near the head
    gl_FragColor = vec4(col, a * uOpacity);
  }
`

const COMET_N = 340
// A meaningful, asymmetric weave that sweeps the FULL width of the page
// as it travels top → bottom.
function cometPath(p: number): [number, number, number] {
  const y = 4.7 - 9.4 * p
  const x = Math.sin(p * Math.PI * 2.0 + 0.5) * 3.6 + Math.sin(p * Math.PI * 4.3 + 1.0) * 0.8
  const z = Math.cos(p * Math.PI * 2.0 + 0.5) * 1.3 - 1.2
  return [x, y, z]
}

function Comet({
  theme,
  scrollRef,
  reduced,
}: {
  theme: Theme
  scrollRef: React.MutableRefObject<number>
  reduced: boolean
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const gl = useThree((s) => s.gl)
  const pRef = useRef(0)

  const geo = useMemo(() => {
    const positions = new Float32Array(COMET_N * 3)
    const life = new Float32Array(COMET_N)
    for (let i = 0; i < COMET_N; i++) life[i] = 1 - i / (COMET_N - 1)
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('aLife', new THREE.BufferAttribute(life, 1))
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 100)
    return g
  }, [])

  const uniforms = useMemo(() => {
    const [c1, , c3] = PALETTE[theme]
    const dark = isDark(theme)
    return {
      uViewH: { value: 450 },
      uSize: { value: 0.13 },
      uHead: { value: new THREE.Color(dark ? '#ffffff' : '#6a23c0') },
      uTail: { value: new THREE.Color(dark ? c1 : c3) },
      uOpacity: { value: dark ? 1.0 : 0.95 },
    }
  }, [theme])

  useFrame(() => {
    if (matRef.current) matRef.current.uniforms.uViewH.value = gl.domElement.height * 0.5
    const target = reduced ? scrollRef.current : pRef.current + (scrollRef.current - pRef.current) * 0.08
    pRef.current = target
    // head-start so the comet enters the viewport early instead of ~20% down
    const head = pRef.current + 0.12
    const pos = geo.attributes.position.array as Float32Array
    for (let i = 0; i < COMET_N; i++) {
      // allow negative so the tail runs off the top edge instead of piling up
      const pp = Math.min(1, head - i * 0.001)
      const [x, y, z] = cometPath(pp)
      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
    }
    geo.attributes.position.needsUpdate = true
  })

  return (
    <points geometry={geo}>
      <shaderMaterial
        ref={matRef}
        vertexShader={cometVert}
        fragmentShader={cometFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={isDark(theme) ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  )
}

/* ── Starfield ───────────────────────────────────────────────────────── */
function Starfield({ theme, reduced }: { theme: Theme; reduced: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const count = useMemo(() => (window.innerWidth < 768 ? 500 : 1100), [])

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const stops = PALETTE[theme].map((h) => new THREE.Color(h))
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 9
      const th = Math.random() * Math.PI * 2
      const ph = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th)
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th)
      pos[i * 3 + 2] = (r - 6) * Math.cos(ph) - 4
      const c = stops[i % 3]
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return [pos, col]
  }, [count, theme])

  useFrame((state, delta) => {
    if (ref.current && !reduced) {
      ref.current.rotation.y += delta * 0.03
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={isDark(theme) ? 0.05 : 0.045}
        vertexColors
        transparent
        opacity={isDark(theme) ? 0.9 : 0.7}
        sizeAttenuation
        depthWrite={false}
        blending={isDark(theme) ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  )
}

function Scene({ theme, reduced }: { theme: Theme; reduced: boolean }) {
  const rig = useRef<THREE.Group>(null)
  const scrollRef = useRef(0)
  const pointer = useRef({ x: 0, y: 0 })
  const { size } = useThree()
  const fit = useMemo(() => Math.min(1, size.width / 1100), [size.width])

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement.scrollHeight - window.innerHeight
      scrollRef.current = h > 0 ? window.scrollY / h : 0
    }
    function onPointer(e: PointerEvent) {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onPointer, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointer)
    }
  }, [])

  useFrame(() => {
    const g = rig.current
    if (!g) return
    const tx = pointer.current.y * 0.2
    const ty = pointer.current.x * 0.3
    g.rotation.x += (tx - g.rotation.x) * 0.05
    g.rotation.y += (ty - g.rotation.y) * 0.05
    // the cluster "rises" out of view within the first screen of scrolling
    const vp = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.6)
    g.position.y += (vp * 5.0 - g.position.y) * 0.05
  })

  return (
    <>
      {/* comet lives at scene root so it spans the full viewport independently */}
      <group scale={fit}>
        <Comet key={`comet-${theme}`} theme={theme} scrollRef={scrollRef} reduced={reduced} />
      </group>

      <group ref={rig} scale={fit}>
        <NebulaGlow key={`glow-${theme}`} theme={theme} reduced={reduced} />
        <Starfield key={`stars-${theme}`} theme={theme} reduced={reduced} />
        {/* dissolved orb + its satellites, pushed off-centre */}
        <group position={[2.2, 0.5, -0.6]}>
          <CloudBlob key={`cloud-${theme}`} theme={theme} scrollRef={scrollRef} reduced={reduced} />
          <Satellite theme={theme} radius={2.6} speed={0.6} size={0.42} phase={0} />
          <Satellite theme={theme} radius={3.3} speed={-0.45} size={0.32} phase={1} />
          <Satellite theme={theme} radius={2.1} speed={0.5} size={0.26} phase={2} />
        </group>
      </group>
    </>
  )
}

export default function RibbonScene({ theme }: { theme: Theme }) {
  const reduced = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )
  const [visible, setVisible] = useState(!document.hidden)
  const layerRef = useRef<HTMLDivElement>(null)
  const readyRef = useRef(false)

  useEffect(() => {
    function applyOpacity() {
      const el = layerRef.current
      if (!el) return
      if (!readyRef.current) {
        el.style.opacity = '0'
        return
      }
      const f = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1)
      el.style.opacity = String(1 - f * 0.22)
    }
    function onVis() {
      setVisible(!document.hidden)
    }
    window.addEventListener('scroll', applyOpacity, { passive: true })
    document.addEventListener('visibilitychange', onVis)
    return () => {
      window.removeEventListener('scroll', applyOpacity)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <div ref={layerRef} className="backdrop-layer" style={{ opacity: 0, transition: 'opacity 0.5s ease' }}>
      <Canvas
        style={{ width: '100%', height: '100%' }}
        onCreated={() =>
          requestAnimationFrame(() => {
            readyRef.current = true
            const el = layerRef.current
            if (el) {
              const f = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1)
              el.style.opacity = String(1 - f * 0.22)
            }
          })
        }
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={visible && !reduced ? 'always' : 'demand'}
      >
        <Scene theme={theme} reduced={reduced} />
      </Canvas>
    </div>
  )
}
