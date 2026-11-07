import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { ArcadeGame } from '@/lib/arcadeGame';
import { playClick, playError, playKeyTick, playPop } from '@/hooks/useSoundEffects';

const BG = '#0a0f1a';
const BLUE = '#3b82f6';
const BLUE_SOFT = '#60a5fa';
const VIOLET = '#a78bfa';

// Side silhouette of the cabinet as (depth, height) points; depth grows toward the viewer.
const PROFILE: [number, number][] = [
  [0, 0],
  [1.1, 0],
  [1.1, 0.95],
  [1.38, 1.08],
  [1.32, 1.2],
  [0.98, 1.3],
  [0.78, 2.05],
  [0.98, 2.16],
  [0.98, 2.48],
  [0, 2.48],
];
const WIDTH = 1.24; // inner width between side panels
const PANEL = 0.08; // side panel thickness

const makeMarqueeTexture = () => {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 112;
  const g = c.getContext('2d')!;
  const grad = g.createLinearGradient(0, 0, 512, 0);
  grad.addColorStop(0, '#1e1b4b');
  grad.addColorStop(0.5, '#1d4ed8');
  grad.addColorStop(1, '#1e1b4b');
  g.fillStyle = grad;
  g.fillRect(0, 0, 512, 112);
  g.font = 'bold 54px "JetBrains Mono Variable", monospace';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.shadowColor = '#93c5fd';
  g.shadowBlur = 18;
  g.fillStyle = '#e0f2fe';
  g.fillText('SHANMUKHA', 256, 52);
  g.shadowBlur = 0;
  g.font = 'bold 16px "JetBrains Mono Variable", monospace';
  g.fillStyle = '#a5b4fc';
  g.fillText('GAME DEV  ·  C# / C++', 256, 92);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
};

interface CabinetProps {
  game: ArcadeGame;
  playing: boolean;
  animate: boolean;
  onActivate: () => void;
}

const Cabinet = ({ game, playing, animate, onActivate }: CabinetProps) => {
  const root = useRef<THREE.Group>(null);
  const stick = useRef<THREE.Group>(null);
  const fireBtn = useRef<THREE.Mesh>(null);
  const screenLight = useRef<THREE.PointLight>(null);

  const sideGeo = useMemo(() => {
    const shape = new THREE.Shape(PROFILE.map(([x, y]) => new THREE.Vector2(x, y)));
    const geo = new THREE.ExtrudeGeometry(shape, { depth: PANEL, bevelEnabled: false });
    geo.rotateY(-Math.PI / 2); // shape x (depth) -> world z, extrusion -> world -x
    return geo;
  }, []);
  const sideEdges = useMemo(() => new THREE.EdgesGeometry(sideGeo), [sideGeo]);

  const screenTex = useMemo(() => {
    const t = new THREE.CanvasTexture(game.canvas);
    t.magFilter = THREE.NearestFilter;
    t.minFilter = THREE.NearestFilter;
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [game]);
  const marqueeTex = useMemo(makeMarqueeTexture, []);

  useEffect(
    () => () => {
      screenTex.dispose();
      marqueeTex.dispose();
      sideGeo.dispose();
      sideEdges.dispose();
    },
    [screenTex, marqueeTex, sideGeo, sideEdges],
  );

  useFrame((state, delta) => {
    game.update(delta);
    screenTex.needsUpdate = true;

    const g = root.current;
    if (g) {
      const t = state.clock.elapsedTime;
      const baseY = -0.45;
      g.position.y = animate && !playing ? baseY + Math.sin(t * 0.9) * 0.05 : baseY;
      // Face the visitor while they play; otherwise a 3/4 view that follows the pointer.
      const targetRotY = playing ? -0.08 : -0.32 + state.pointer.x * 0.22;
      const targetRotX = playing ? 0 : -state.pointer.y * 0.06;
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetRotY, 3, delta);
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetRotX, 3, delta);
    }

    // Joystick and fire button mirror the game input (the stick wiggles in demo mode).
    if (stick.current) {
      const dir = (game.input.right ? 1 : 0) - (game.input.left ? 1 : 0);
      const demo = game.mode === 'attract' ? Math.sin(state.clock.elapsedTime * 2.2) * 0.6 : 0;
      stick.current.rotation.z = THREE.MathUtils.damp(stick.current.rotation.z, -(dir || demo) * 0.45, 12, delta);
    }
    if (fireBtn.current) {
      const pressed = game.input.fire;
      fireBtn.current.position.y = THREE.MathUtils.damp(fireBtn.current.position.y, pressed ? 0.015 : 0.035, 20, delta);
    }
    if (screenLight.current) {
      screenLight.current.intensity = 5 + Math.sin(state.clock.elapsedTime * 13) * 0.4;
    }
  });

  const body = <meshStandardMaterial color="#0d1324" metalness={0.3} roughness={0.55} />;
  const side = (
    <meshStandardMaterial color="#18245a" emissive="#1e1b4b" emissiveIntensity={0.5} metalness={0.35} roughness={0.4} />
  );

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onActivate();
  };

  return (
    <group ref={root} position={[0.15, -0.45, 0]} rotation={[0, -0.32, 0]}>
      <group
        position={[0, 0, -0.65]}
        onClick={onClick}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = '')}
      >
        {/* Side panels with neon edge trim */}
        {[WIDTH / 2 + PANEL, -WIDTH / 2].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            <mesh geometry={sideGeo}>{side}</mesh>
            <lineSegments geometry={sideEdges}>
              <lineBasicMaterial color={i ? VIOLET : BLUE_SOFT} transparent opacity={0.9} />
            </lineSegments>
            {/* Side art: angled neon stripes on the outer face */}
            {[0.55, 0.75].map((y, k) => (
              <mesh
                key={y}
                position={[i ? -PANEL - 0.002 : 0.002, y + 0.6, 0.55]}
                rotation={[0.5, i ? -Math.PI / 2 : Math.PI / 2, 0]}
              >
                <planeGeometry args={[0.9, k ? 0.03 : 0.06]} />
                <meshBasicMaterial color={k ? VIOLET : BLUE_SOFT} toneMapped={false} side={THREE.DoubleSide} />
              </mesh>
            ))}
          </group>
        ))}

        {/* Main body + lower front */}
        <mesh position={[0, 1.24, 0.39]}>
          <boxGeometry args={[WIDTH, 2.48, 0.78]} />
          {body}
        </mesh>
        <mesh position={[0, 0.5, 0.94]}>
          <boxGeometry args={[WIDTH, 1.0, 0.32]} />
          {body}
        </mesh>

        {/* Coin door */}
        <group position={[0, 0.55, 1.105]}>
          <mesh>
            <planeGeometry args={[0.42, 0.34]} />
            <meshStandardMaterial color="#0a0f1a" metalness={0.6} roughness={0.4} />
          </mesh>
          {[-0.09, 0.09].map((x) => (
            <mesh key={x} position={[x, 0.05, 0.002]}>
              <planeGeometry args={[0.07, 0.12]} />
              <meshBasicMaterial color="#f59e0b" toneMapped={false} />
            </mesh>
          ))}
        </group>

        {/* Control panel (tilted toward the player) */}
        <group position={[0, 1.15, 1.16]} rotation={[0.42, 0, 0]}>
          <mesh>
            <boxGeometry args={[WIDTH, 0.06, 0.42]} />
            <meshStandardMaterial color="#1e293b" metalness={0.2} roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.031, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[WIDTH - 0.06, 0.38]} />
            <meshStandardMaterial color="#172554" emissive="#1e3a8a" emissiveIntensity={0.25} />
          </mesh>
          {/* Joystick */}
          <group ref={stick} position={[-0.3, 0.03, 0.02]}>
            <mesh position={[0, 0.08, 0]}>
              <cylinderGeometry args={[0.012, 0.012, 0.16, 8]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.17, 0]}>
              <sphereGeometry args={[0.045, 16, 16]} />
              <meshStandardMaterial color="#ef4444" emissive="#7f1d1d" emissiveIntensity={0.4} />
            </mesh>
          </group>
          {/* Buttons */}
          <mesh ref={fireBtn} position={[0.12, 0.035, 0.03]}>
            <cylinderGeometry args={[0.045, 0.045, 0.03, 20]} />
            <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={0.9} toneMapped={false} />
          </mesh>
          {(
            [
              [0.27, 0.0, '#4ade80'],
              [0.4, -0.04, '#f472b6'],
            ] as const
          ).map(([x, z, color]) => (
            <mesh key={color} position={[x, 0.035, z]}>
              <cylinderGeometry args={[0.04, 0.04, 0.03, 20]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} toneMapped={false} />
            </mesh>
          ))}
        </group>

        {/* CRT screen: bezel + live game texture */}
        <group position={[0, 1.675, 0.885]} rotation={[-0.26, 0, 0]}>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[WIDTH, 0.82]} />
            <meshStandardMaterial color="#05070d" roughness={0.9} />
          </mesh>
          <mesh>
            <planeGeometry args={[1.04, 0.73]} />
            <meshBasicMaterial map={screenTex} toneMapped={false} />
          </mesh>
          <pointLight ref={screenLight} position={[0, 0, 0.5]} color={BLUE_SOFT} intensity={5} distance={3} />
        </group>

        {/* Backlit marquee */}
        <mesh position={[0, 2.32, 0.985]}>
          <planeGeometry args={[WIDTH, 0.3]} />
          <meshBasicMaterial map={marqueeTex} toneMapped={false} />
        </mesh>
        <pointLight position={[0, 2.35, 1.4]} color={VIOLET} intensity={3} distance={2.5} />
      </group>
    </group>
  );
};

/** A neon grid floor that scrolls toward the viewer. */
const GridFloor = ({ animate }: { animate: boolean }) => {
  const grid = useRef<THREE.GridHelper>(null);
  const helper = useMemo(() => {
    const g = new THREE.GridHelper(40, 40, BLUE, '#1e3a8a');
    const mats = Array.isArray(g.material) ? g.material : [g.material];
    mats.forEach((m) => {
      m.transparent = true;
      m.opacity = 0.55;
    });
    return g;
  }, []);
  useFrame((_, delta) => {
    if (!animate || !grid.current) return;
    grid.current.position.z = (grid.current.position.z + delta * 0.6) % 1;
  });
  return <primitive ref={grid} object={helper} position={[0, -0.47, 0]} />;
};

/** Square "pixels" drifting upward around the cabinet. */
const PIXEL_COUNT = 140;
const Pixels = ({ animate }: { animate: boolean }) => {
  const ref = useRef<THREE.Points>(null);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(PIXEL_COUNT * 3);
    const speeds = new Float32Array(PIXEL_COUNT);
    for (let i = 0; i < PIXEL_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 1] = Math.random() * 5 - 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
      speeds[i] = 0.08 + Math.random() * 0.25;
    }
    return { positions, speeds };
  }, []);
  useFrame((_, delta) => {
    const pts = ref.current;
    if (!animate || !pts) return;
    const attr = pts.geometry.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < PIXEL_COUNT; i++) {
      let y = attr.getY(i) + speeds[i] * delta;
      if (y > 4.5) y = -0.5;
      attr.setY(i, y);
    }
    attr.needsUpdate = true;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={BLUE_SOFT} size={0.045} sizeAttenuation transparent opacity={0.7} />
    </points>
  );
};

const CameraRig = () => {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0.2, 0.45, 0);
  }, [camera]);
  return null;
};

interface HeroSceneProps {
  /** Float, scroll and drift; false keeps it still (reduced motion). */
  animate: boolean;
  /** Render frames at all (paused when the hero is offscreen). */
  active: boolean;
  /** Whether the visitor is currently playing. */
  playing: boolean;
  onPlayingChange: (playing: boolean) => void;
}

const HeroScene = ({ animate, active, playing, onPlayingChange }: HeroSceneProps) => {
  const game = useMemo(
    () =>
      new ArcadeGame({
        onShoot: () => playKeyTick(),
        onHit: () => playPop(),
        onLifeLost: () => playClick(),
        onGameOver: () => playError(),
      }),
    [],
  );

  // Keyboard control while playing: arrows / A-D to move, Space to fire, Esc to quit.
  useEffect(() => {
    if (!playing) {
      game.input = { left: false, right: false, fire: false };
      game.stop();
      return;
    }
    game.start();
    const set = (e: KeyboardEvent, down: boolean) => {
      const k = e.key;
      if (k === 'ArrowLeft' || k === 'a' || k === 'A') game.input.left = down;
      else if (k === 'ArrowRight' || k === 'd' || k === 'D') game.input.right = down;
      else if (k === ' ' || k === 'ArrowUp' || k === 'w' || k === 'W') game.input.fire = down;
      else if (k === 'Escape' && down) onPlayingChange(false);
      else return;
      e.preventDefault();
    };
    const onDown = (e: KeyboardEvent) => set(e, true);
    const onUp = (e: KeyboardEvent) => set(e, false);
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  }, [playing, game, onPlayingChange]);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [1.7, 1.55, 7.6], fov: 36 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
      onPointerMissed={() => playing && onPlayingChange(false)}
      aria-hidden="true"
    >
      <CameraRig />
      <fog attach="fog" args={[BG, 7, 18]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} color="#dbeafe" />
      <pointLight position={[-3, 1, 2]} intensity={14} color={BLUE} />
      <pointLight position={[3, 3, -2]} intensity={10} color={VIOLET} />
      <Cabinet game={game} playing={playing} animate={animate} onActivate={() => onPlayingChange(!playing)} />
      <GridFloor animate={animate} />
      <Pixels animate={animate} />
    </Canvas>
  );
};

export default HeroScene;
