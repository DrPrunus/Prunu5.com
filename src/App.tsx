import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Cpu, 
  Rocket, 
  Github, 
  Twitter, 
  Mail, 
  ChevronRight,
  ChevronDown,
  Layers,
  Terminal,
  User,
  Languages,
  Code2,
  Music,
  Palette,
  Layout,
  Briefcase,
  Monitor,
  RefreshCcw,
  Shapes,
  Volume2,
  VolumeX,
  MessageSquare,
  Shield,
  Sword,
  Zap,
  Users,
  Target,
  Trophy,
  CassetteTape,
  Joystick,
  ExternalLink,
  Clock,
  Infinity as InfinityIcon,
  Star,
  ArrowDown
} from 'lucide-react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Wireframe, Html } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import * as Tone from 'tone';
import { translations, Language } from './translations';

// --- Steam Icon Component ---
const SteamIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.49 0 4.524 2.031 4.524 4.527s-2.034 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.533 2.715-.096 3.173-1.413.232-.668.234-1.4.006-2.069l1.511.628c.695.29 1.205.947 1.305 1.681.176 1.307-.789 2.494-2.154 2.651-.554.062-1.098-.05-1.567-.345-.468-.29-.79-.734-.937-1.266-.145-.528-.086-1.067.17-1.538l1.478.614c-.657 1.23-.22 2.757 1.015 3.527.6.374 1.32.479 1.997.3.678-.18 1.25-.632 1.573-1.237.326-.605.363-1.309.105-1.938-.26-.63-.79-1.127-1.46-1.358-.67-.227-1.38-.183-1.965.123-.59.312-1.05.85-1.264 1.48-.213.627-.16 1.305.15 1.868l-1.847-.77z"/>
  </svg>
);

// --- Types ---
interface Project {
  id: string;
  title: string;
  category: '游戏拆解' | 'PC';
  description: Record<Language, string>;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  awards?: Record<Language, string>;
  awardImage?: string;
}

// --- Mock Data ---
const PROJECTS: Project[] = [
  {
    id: '4',
    title: '404 Princess Not Found',
    category: 'PC',
    description: {
      zh: 'HD2D 箱庭解谜 | Unity | 2025 TapTap 聚光灯 GameJam。以“勇者修复残缺游戏世界 Bug、追寻不存在的公主”为主线，担任策划、程序与音乐制作，上线 TapTap PC 端。',
      en: 'HD2D Exploration Puzzle Game developed in Unity for 2025 TapTap Spotlight GameJam 21-day challenge. A meta-narrative adventure about a hero fixing system bugs to find a non-existent princess. Roles: Design, Dev, Music.',
      ja: 'Unityで制作されたHD2D探索パズルゲーム。2025 TapTap Spotlight GameJam 21日間チャレンジ参加作品。勇者がバグを修正しながら存在しない王女を探すメタフィクション。役割：企画、開発、音楽。'
    },
    image: '/covers/404.jpg', // Path: /covers/404.jpg
    tags: ['策划', '程序', '音乐', 'Unity'],
    link: 'https://www.taptap.cn/app/779210?os=pc',
    github: '#'
  },
  {
    id: '9',
    title: 'Connection',
    category: 'PC',
    description: {
      zh: '角色扮演 + 视觉小说 | Unity | 2026 thatgamejam。通过管理多种属性指标来引导女儿的成长轨迹，在成长的过程中探索羁绊与各种可能性。',
      en: 'A deep character growth simulation developed for 2026 thatgamejam. Players guide their daughter\'s growth through a variety of attributes, exploring possibilities and connections.',
      ja: '2026 thatgamejamにて制作されたキャラクター育成シミュレーション。プレイヤーはさまざまな属性を管理することで娘の成長を導き、成長過程における可能性と絆を探索します。'
    },
    image: '/covers/c.jpg',
    tags: ['策划', '音乐', 'Unity'],
    link: 'https://tzzsleep.itch.io/connection',
    github: '#'
  },
  {
    id: '11',
    title: '跟你豹了',
    category: 'PC',
    description: {
      zh: '平台跳跃 + 解谜 | Unity | 2026 奇点律动 Vol2 GameJam。围绕“充气 / 放气”能力制作的游戏原型，展现了基础能力在关卡设计中的多种应用可能性。',
      en: 'Developed for the 2026 Singularity Rhythm Vol2 GameJam, this game focuses on "inflation/deflation" mechanics. Although short, it demonstrates the scalability of its abilities.',
      ja: '2026 奇点律動Vol2 GameJam向けに制作された作品。「膨張・収縮」の能力を核としたゲームプレイ。短いながらも、各能力の拡張性を示しています。'
    },
    image: '/covers/gnbl.png',
    tags: ['策划', '音乐', '关卡设计', 'Unity'],
    link: 'https://www.bilibili.com/video/BV1QoFNzUETM/',
    github: '#'
  },
  {
    id: '8',
    title: 'GhostCookies',
    category: 'PC',
    description: {
      zh: '2D 益智类网页游戏 | Unity | 2025 Brackeys Jam。以 “鬼魂吃饼干” 为核心玩法，针对 H5 平台特性深度适配优化，独自完成策划、程序及音乐与音效设计。',
      en: '2D Puzzle Web Game developed in Unity for 2025 Brackeys Jam 7-day challenge. Features "Ghost eating cookies" core gameplay, deeply optimized for H5 platforms. Roles: Design, Development, Music & Sound.',
      ja: 'Unityで制作された2Dパズルウェブゲーム。2025 Brackeys Jam 7日間ジャム参加作品。「幽霊がクッキーを食べる」核心的な遊び。H5プラットフォーム向けに最適化。役割：企画、開発、音楽、効果音。'
    },
    image: '/covers/gc.png', // Path: /covers/gc.png
    tags: ['策划', '程序', '音乐', 'Unity'],
    link: 'https://volticx.itch.io/ghostcookies',
    github: '#'
  },
  {
    id: '10',
    title: '完美通关',
    category: 'PC',
    description: {
      zh: '2D解谜闯关 | Unity | 034 GameJam。通过鼠标点击规划路径，并在特定关卡巧用获得的道具来达成“完美”成就。',
      en: 'Clearing the level is just the beginning. Use items strategically to achieve a "Perfect Clear"! A puzzle game focused on path planning and item management.',
      ja: 'クリアは終わりではありません。アイテムを駆使して「パーフェクトクリア」を目指しましょう！パスプランニングとアイテム使用が鍵となるパズルゲーム。'
    },
    image: '/covers/pc.png',
    tags: ['策划', '音乐', '关卡设计', 'Unity'],
    awards: {
      zh: '最魂like的顶级游戏',
      en: 'Top Soul-like Game',
      ja: '最高にソウルライクなトップゲーム'
    },
    awardImage: '/soullike.jpg',
    link: 'https://034gamejam.uneoon.com/games/24',
    github: '#'
  },
  {
    id: '6',
    title: '《深岩银河》赛季通行证系统拆解案',
    category: '游戏拆解',
    description: {
      zh: '系统拆解 | 多人合作射击 | 赛季通行证系统。该拆解案聚焦《深岩银河》通行证 “可自由切换任意永久赛季 + 线性进度 + 非线性奖励树” 的核心设计，剖析其如何通过去时间压力、高自主解锁机制，实现长期友好的玩家体验与正向社群效应。',
      en: 'Focuses on Deep Rock Galactic\'s "switchable permanent seasons + linear progress + non-linear reward tree" design, analyzing how it achieves long-term player friendly experience through high autonomy.',
      ja: '「Deep Rock Galactic」の「いつでも切り替え可能な永久赛季＋线形进捗＋非线形報酬ツリー」のコア设计に焦点を当て、时间制约の排除和高い自主性による长期的なプレイヤー体验を分析。'
    },
    image: '/covers/dr.png',
    tags: ['奖励系统', '拆解分析'],
    link: 'https://xcnselbxoekt.feishu.cn/drive/folder/BnVjfi28ulUhZkdw4NIcoFimnid',
    github: '#'
  },
  {
    id: '7',
    title: '《光·遇》社交系统拆解案',
    category: '游戏拆解',
    description: {
      zh: '系统拆解 | 社交冒险 | 情感化社交系统。该拆解案聚焦《光·遇》以“情绪连接”为核心的社交系统，深度解析陌生人互动、好友关系、情绪动作、礼物互赠等六大模块，结合3C设计逻辑，剖析其“非语言沟通+轻量协作+双向付出”的关系构建路径与匿名机制的设计取舍。',
      en: 'Deeply analyzes Sky: Children of the Light\'s social system focused on "emotional connection," exploring non-verbal communication, lightweight cooperation, and the design trade-offs of the anonymity mechanism.',
      ja: '「Sky 星を紡ぐ子どもたち」の「情緒的な繋がり」を核心としたソーシャルシステムを深く解析。非言語コミュニケーション、軽量な協調、匿名メカニズムの設計上の选择を剖析。'
    },
    image: '/covers/gy.png',
    tags: ['社交系统', '拆解分析'],
    link: 'https://xcnselbxoekt.feishu.cn/drive/folder/UwMOfYpM0lgN9LdkJc3cpRronph',
    github: '#'
  },
  {
    id: '5',
    title: '《杀戮尖塔》核心模块拆解',
    category: '游戏拆解',
    description: {
      zh: '系统拆解 | Roguelike卡牌 | 核心战斗与数值系统。该拆解案聚焦《杀戮尖塔》的战斗、卡牌、关卡三大核心系统，深度解析其“可控随机性+卡组构筑成长+风险收益选择”的核心设计逻辑，包括战斗机制、卡牌连携与数值规范、关卡路线与房间设计。',
      en: 'Deep analysis of Slay the Spire\'s combat, map, and relic systems. Explores infinite replayability under minimalist rules and investigates how system coupling affects strategic depth.',
      ja: '「Slay the Spire」の戦闘、マップ、レリックシステムを深く解析。ミニマルなルール下での無限のリプレイ性を探求し、システム間の結合が戦略的深みに与える影響を調査。'
    },
    image: '/covers/sts.png',
    tags: ['战斗系统', '数值系统', '拆解分析'],
    link: 'https://xcnselbxoekt.feishu.cn/drive/folder/VZLQfKfxhlBxHkdw3ykcwPCwn7g',
    github: '#'
  }
];

// --- Sub-components ---

function NeuralWaveform() {
  const [points, setPoints] = React.useState<string>("");
  const frameRef = React.useRef<number>(0);

  React.useEffect(() => {
    let lastY = 20;
    const animate = () => {
      frameRef.current++;
      if (frameRef.current % 3 === 0) {
        let newPoints = "M0 20 ";
        for (let i = 1; i <= 20; i++) {
          const x = i * 5;
          // Stochastic jump logic
          const rand = Math.random();
          let y = 20;
          if (rand > 0.92) y = 5 + Math.random() * 5;      // High peak
          else if (rand > 0.84) y = 30 + Math.random() * 5; // Low peak
          else y = 18 + Math.random() * 4;                 // Noise

          // Smooth transition slightly
          const targetY = y;
          lastY = lastY + (targetY - lastY) * 0.8;
          newPoints += `L${x} ${lastY} `;
        }
        setPoints(newPoints);
      }
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="w-24 h-6 relative overflow-hidden bg-brand-primary/5 border border-brand-primary/20 rounded-sm">
      <svg viewBox="0 0 100 40" className="w-full h-full preserve-3d">
        <path
          d={points}
          fill="none"
          stroke="#ED2224"
          strokeWidth="2"
          className="transition-all duration-75 ease-linear opacity-80"
        />
        {/* Glow duplication */}
        <path
          d={points}
          fill="none"
          stroke="#ED2224"
          strokeWidth="4"
          className="opacity-20 blur-[2px]"
        />
      </svg>
    </div>
  );
}

const GENRES = ['TRAP', 'DUBSTEP', 'TECHNO', 'HOUSE', 'HARDSTYLE', 'FUTURE BASS', 'DRUM & BASS', 'PHONK', 'GLITCH HOP', 'RIDDIM', 'PSYTRANCE', 'EDM', 'CORE', 'BASS'];

function GenreTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(Math.floor(Math.random() * GENRES.length));
    }, 120);
    return () => clearInterval(timer);
  }, []);

  return <>{GENRES[index]}</>;
}

// --- Components ---

const landChars = ['#', '*', '@', '8', 'æ'];
const waterChars = ['%', '+', '.', ' ', '≈'];
const denseChars = ['·', ':', 'ı', '°', '·', '¨', '·', ':', '!', ';', '|'];

const PointChar = React.memo(({ position, id, refs }: { position: THREE.Vector3, id: number, refs: React.MutableRefObject<(HTMLSpanElement | null)[]> }) => {
  return (
    <Html position={position} center distanceFactor={8} zIndexRange={[10, 20]}>
      <span 
        ref={el => { refs.current[id] = el; }}
        className="font-mono text-[7px] text-brand-primary font-black opacity-90 select-none pointer-events-none transition-opacity duration-300"
      >
        #
      </span>
    </Html>
  );
});

const CoreChar = React.memo(({ position, id, refs }: { position: THREE.Vector3, id: number, refs: React.MutableRefObject<(HTMLSpanElement | null)[]> }) => {
  return (
    <Html position={position} center distanceFactor={10} zIndexRange={[-20, 5]}>
      <span 
        ref={el => { refs.current[id] = el; }}
        className="font-mono text-[4px] text-brand-primary opacity-30 select-none pointer-events-none"
      >
        ·
      </span>
    </Html>
  );
});

function TacticalAsciiPlanet() {
  const groupRef = React.useRef<THREE.Group>(null!);
  const meshRef = React.useRef<THREE.Mesh>(null!);
  const surfaceRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const coreRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
  
  // Outer shell points (Surface)
  const surfacePoints = React.useMemo(() => {
    const p = [];
    const count = 60; // Optimized count
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(phi);
      const radius = 1.4; 
      p.push(new THREE.Vector3(x, y, z).multiplyScalar(radius));
    }
    return p;
  }, []);

  // Inner shell points (Dense Core)
  const corePoints = React.useMemo(() => {
    const p = [];
    const count = 100; // Optimized count
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(phi);
      const radius = 0.7; 
      p.push(new THREE.Vector3(x, y, z).multiplyScalar(radius));
    }
    return p;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.1;
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.05;
    
    if (meshRef.current) {
      meshRef.current.rotation.z = t * 0.02;
      const s = 1 + Math.sin(t * 2) * 0.01;
      meshRef.current.scale.set(s, s, s);
    }

    // Ultra-optimized batch update: only update 25% of characters per frame
    const frameIdx = Math.floor(t * 60) % 4;
    
    surfacePoints.forEach((pos, i) => {
      // Staggered update logic
      if (i % 4 !== frameIdx) return;
      
      const el = surfaceRefs.current[i];
      if (!el) return;
      const val = Math.sin(pos.x * 2.2 + t * 0.4) * Math.cos(pos.y * 2.2) + Math.sin(pos.z * 3.2 + t * 0.3);
      const isLand = val > 0.42;
      const pool = isLand ? landChars : waterChars;
      const charIdx = (Math.floor(t * 5) + i) % pool.length;
      el.textContent = pool[charIdx % pool.length];
    });

    corePoints.forEach((pos, i) => {
      // Staggered update logic
      if (i % 4 !== frameIdx) return;

      const el = coreRefs.current[i];
      if (!el) return;
      const val = Math.sin(pos.x * 5 + t * 1.2) * Math.cos(pos.y * 5 + t * 0.4) * Math.sin(pos.z * 5);
      const charIdx = Math.floor(Math.abs(val) * denseChars.length);
      el.textContent = denseChars[charIdx % denseChars.length];
    });
  });

  return (
    <group ref={groupRef}>
      {/* Structural Geometry */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial 
          color="#020202" 
          emissive="#ED2224" 
          emissiveIntensity={0.35} 
          flatShading 
        />
        {/* Facet Edge Highlights - Pure Black for maximum definition */}
        <mesh scale={1.002}>
          <icosahedronGeometry args={[0.55, 1]} />
          <meshBasicMaterial color="#000000" wireframe transparent opacity={0.8} />
        </mesh>
        {/* Very subtle glow shell */}
        <mesh scale={1.03}>
          <icosahedronGeometry args={[0.55, 1]} />
          <meshBasicMaterial color="#ED2224" wireframe transparent opacity={0.08} />
        </mesh>
      </mesh>

      {/* Surface ASCII Shell */}
      {surfacePoints.map((p, i) => (
        <PointChar key={`s-${i}`} position={p} id={i} refs={surfaceRefs} />
      ))}

      {/* Compact Core ASCII Shell */}
      {corePoints.map((p, i) => (
        <CoreChar key={`c-${i}`} position={p} id={i} refs={coreRefs} />
      ))}

      {/* Internal Orbitals */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.6, 0.0015, 16, 80]} />
        <meshBasicMaterial color="#ED2224" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function InteractiveCore() {
  const ring1Ref = React.useRef<THREE.Mesh>(null!);
  const ring2Ref = React.useRef<THREE.Mesh>(null!);
  const ring3Ref = React.useRef<THREE.Mesh>(null!);
  const scanRef = React.useRef<THREE.Mesh>(null!);
  const groupRef = React.useRef<THREE.Group>(null!);
  const hudRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mouse = state.pointer;
    
    // 简化动画：只做必要的更新
    const tiltX = mouse.y * 8;
    const tiltY = -mouse.x * 8;

    hudRefs.current.forEach(el => {
      if (el) {
        el.style.transform = `perspective(500px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }
    });

    // 降低旋转速度
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.02;
    }
    
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.15;
    }
    if (scanRef.current) {
      scanRef.current.position.y = Math.sin(time * 0.5) * 1.5;
      const mat = scanRef.current.material as THREE.MeshBasicMaterial;
      if (mat) mat.opacity = (Math.cos(time * 0.5) + 1) * 0.015;
    }
  });

  const hudLabels = [
    { text: "PRTS_LINK_V7.2", pos: [2.2, 1.2, 0] },
    { text: "CORE_STABILITY: 99.8%", pos: [-2.2, -1.2, 1] },
    { text: "LOGIC_SYNC_ESTABLISHED", pos: [0, 2.5, -1] }
  ];

  return (
    <group ref={groupRef}>
      <TacticalAsciiPlanet />

      {/* Horizontal Scan Plane */}
      <mesh ref={scanRef} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial color="#ED2224" transparent opacity={0.03} side={THREE.DoubleSide} />
      </mesh>

      {/* Heavy Circular Logic Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.6, 0.005, 12, 4]} />
        <meshStandardMaterial color="#ED2224" emissive="#ED2224" emissiveIntensity={8} />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, Math.PI / 4]}>
        <torusGeometry args={[1.8, 0.005, 12, 4]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* Floating Tactical Labels with 3D Mouse Tilt */}
      {hudLabels.map((item, i) => (
        <group key={i} position={item.pos as any}>
          <Html center distanceFactor={10}>
            <div 
              ref={el => { hudRefs.current[i] = el; }}
              className="flex flex-col items-center pointer-events-none select-none transition-transform duration-150 ease-out"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="w-1.5 h-1.5 bg-brand-primary rhombus-fill mb-1 animate-pulse" style={{ transform: 'translateZ(20px)' }} />
              <div 
                className="bg-brand-black/90 backdrop-blur-sm border border-brand-primary/40 px-2 py-0.5 text-[6px] font-mono text-brand-primary whitespace-nowrap tracking-[0.2em] font-black shadow-[4px_4px_10px_rgba(0,0,0,0.5)]"
                style={{ transform: 'translateZ(10px)' }}
              >
                <span className="animate-flicker">{item.text}</span>
              </div>
              <div className="w-px h-12 bg-gradient-to-b from-brand-primary/40 to-transparent" />
            </div>
          </Html>
        </group>
      ))}

      {/* Particle Shell */}
      <CoreParticles count={120} />

      {/* Rotating markers */}
      <group rotation={[0, 0, Math.PI/4]}>
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(angle) * 2.2, Math.sin(angle) * 2.2, 0]}>
              <boxGeometry args={[0.05, 0.05, 0.005]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
            </mesh>
          );
        })}
      </group>

      <pointLight intensity={6} distance={8} color="#ED2224" />
      <pointLight position={[2, 2, 2]} intensity={2} color="#ffffff" />
    </group>
  );
}

function CoreParticles({ count = 100 }) {
  const pointsRef = React.useRef<THREE.Points>(null!);
  
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2.4 + Math.random() * 0.4;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#ED2224" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

const SectionHeading = ({ children, icon: Icon, subtitle }: { children: React.ReactNode, icon?: any, subtitle?: string }) => (
  <div className="mb-8 md:mb-12 relative flex flex-col items-start group pt-6">
    {/* Drafting Line Extensions */}
    <div className="absolute top-0 left-0 w-full flex items-center gap-2 pointer-events-none">
      <div className="w-8 md:w-12 h-[1px] bg-brand-primary" />
      <div className="flex-1 h-[1px] bg-brand-black/10" />
      <div className="w-[1px] h-4 bg-brand-black/20" />
      {/* T-Square like extension */}
      <div className="absolute -left-6 top-1/2 w-4 h-[1px] bg-brand-primary/40 hidden md:block" />
    </div>
    <div className="absolute bottom-0 right-0 h-full w-[1px] bg-brand-black/10 pointer-events-none translate-x-4 md:translate-x-12" />
    
    {/* Dimension Markers - Mechanical Style */}
    <div className="absolute -top-6 left-0 font-mono text-[8px] text-brand-black/40 flex gap-2 md:gap-4 items-center">
      <span className="flex items-center gap-1"><div className="w-1 h-1 bg-brand-primary rhombus-fill" /> REF_X/0.00</span>
      <span className="flex items-center gap-1"><div className="w-1 h-1 bg-brand-primary rhombus-fill" /> REF_Y/0.00</span>
      <span className="opacity-50 tracking-tighter hidden sm:inline">SPEC_DRAWING_VER_2.4</span>
    </div>

    {/* Rhombus Section Marker */}
    <div className="absolute -left-4 md:-left-12 top-14 text-brand-primary z-10">
      <motion.div 
        animate={{ rotate: 45, scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="rhombus-fill w-4 h-4 md:w-6 md:h-6 border-2 border-current flex items-center justify-center bg-brand-bg"
      >
        <div className="w-1 md:w-2 h-1 md:h-2 bg-current rhombus-fill" />
      </motion.div>
    </div>

    {/* Abstract background planes - Multi-layered */}
    <div className="absolute -left-16 top-0 w-40 h-full bg-brand-primary/[0.03] -skew-x-[24deg] -z-10 group-hover:bg-brand-primary/5 transition-all duration-700 hidden md:block" />
    <div className="absolute -left-10 top-0 w-32 h-full bg-brand-black/[0.02] -skew-x-[20deg] -z-10 hidden md:block" />
    <div className="absolute left-0 top-0 w-full h-[2px] bg-brand-black/20" />
    
    <div className="flex items-center gap-6 mb-4 md:mb-6">
      <div className="h-[2px] flex-1 min-w-[100px] md:min-w-[200px] bg-gradient-to-r from-brand-primary via-brand-black/10 to-transparent" />
    </div>

    <div className="flex items-center gap-6 md:gap-10 mb-4 md:mb-6 relative">
      {Icon && (
        <div className="relative group/icon scale-100 md:scale-125 ml-4 md:ml-0">
          <div className="absolute -inset-4 md:-inset-6 border border-brand-primary/20 rotate-45 group-hover:rotate-90 transition-transform duration-1000" />
          <div className="absolute inset-x-0 -top-2 md:-top-3 -bottom-2 md:-bottom-3 border-l-[4px] md:border-l-[6px] border-r-[4px] md:border-r-[6px] border-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="bg-brand-primary p-3 md:p-4 tactical-border text-white rotate-[-4deg] group-hover:rotate-0 transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)]">
            <Icon size={24} className="md:w-[36px] md:h-[36px]" />
          </div>
        </div>
      )}
      <div className="flex flex-col">
        <h2 className="text-2xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tighter leading-[0.8] italic group-hover:text-brand-primary transition-colors select-none whitespace-nowrap">
          {children}
        </h2>
      </div>
    </div>

    {subtitle && (
      <div className="flex items-center gap-4 md:gap-8 w-full mt-4 pl-0 md:pl-4">
        <div className="w-8 h-8 md:w-12 md:h-12 rounded-none border-2 md:border-4 border-brand-primary/20 flex items-center justify-center group-hover:rotate-[225deg] transition-transform duration-1000 relative overflow-hidden flex-shrink-0">
           <div className="w-6 md:w-8 h-[2px] md:h-[3px] bg-brand-primary/40" />
           <motion.div 
             initial={{ x: '-100%' }}
             whileInView={{ x: '100%' }}
             transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
             className="absolute inset-0 bg-brand-primary/10 -skew-x-12"
           />
        </div>
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <p className="text-brand-black/80 font-mono text-[9px] md:text-[14px] uppercase tracking-[0.2em] sm:tracking-[0.4em] md:tracking-[0.8em] font-black truncate">
            {subtitle}
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 geometric-stripe text-brand-primary/10 group-hover:text-brand-primary/40 transition-colors" />
            <div className="segmented-bar opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex">
              <div className="w-1.5 h-1.5 bg-brand-primary rhombus-fill" />
              <div className="w-1.5 h-1.5 bg-brand-primary/40 rhombus-fill" />
            </div>
          </div>
        </div>
        <div className="hidden md:block flex-1 h-[2px] dashed-line-horizontal text-brand-black/40" />
        <div className="flex gap-1 md:gap-2 items-end h-8 md:h-10">
           <div className="w-2 md:w-3 h-full bg-brand-primary" />
           <div className="w-2 md:w-3 h-2/3 bg-brand-black" />
           <div className="w-2 md:w-3 h-1/3 bg-brand-primary/30" />
        </div>
      </div>
    )}

    <div className="absolute top-0 right-0 w-16 h-16 md:w-32 md:h-32 border-t-4 md:border-t-8 border-r-4 md:border-r-8 border-brand-black/[0.03] transition-all group-hover:border-brand-primary/10 pointer-events-none" />
  </div>
);

// --- Helpers ---
const getImageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  // Use relative paths for local assets. This is the most compatible way
  // to ensure images work when the app is moved to prunu5.com or other domains.
  return path;
};

const ProjectCard = ({ project, lang, className }: { project: Project; lang: Language; className?: string; key?: string | number }) => {
  const [imageError, setImageError] = useState(false);
  const [showAwardImage, setShowAwardImage] = useState(false);
  const [showLinkPreview, setShowLinkPreview] = useState(false);
  const imageUrl = getImageUrl(project.image);

  const CardContent = (
    <div className={`group relative h-full bg-white tactical-border overflow-hidden transition-all hover:rotate-0 hover:scale-[1.02] ${className} origin-center shadow-xl`}>
      {/* Tactical UI Frame Brackets (Animated on hover) */}
      <div className="absolute -inset-1 border border-brand-primary/0 group-hover:border-brand-primary/40 transition-all duration-300 pointer-events-none" />
      
      {/* Corner Brackets */}
      {/* Arknights Geometric Overlay (Hover only) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity z-10 pointer-events-none overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 border-[20px] border-brand-primary rotate-45" />
        <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-brand-primary rotate-45" />
      </div>

      <div className="absolute top-2 left-2 w-6 h-6 border-t-[3px] border-l-[3px] border-brand-primary opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 group-hover:-translate-x-1 group-hover:-translate-y-1" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-[3px] border-r-[3px] border-brand-primary opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 group-hover:translate-x-1 group-hover:translate-y-1" />

      {/* Rhombus Moving Accent */}
      <motion.div 
        className="absolute top-12 right-6 w-4 h-4 bg-brand-primary rhombus-fill opacity-0 group-hover:opacity-100 z-20"
        animate={{ rotate: 45, y: [0, -20, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Edge Accent Plane */}
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Dossier Side Tab */}
      <div className="absolute right-0 top-1/4 h-32 w-1.5 bg-brand-black/10 group-hover:bg-brand-primary/40 transition-colors" />
      <div className="absolute right-0 top-[calc(1/4+40px)] h-4 w-4 bg-brand-black/5 rotate-45 translate-x-1/2" />

      {/* Floating data cluster indicators */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="data-cluster text-brand-primary w-4">
          <div className="line" />
          <div className="line opacity-50" />
          <div className="line opacity-20" />
        </div>
        <div className="w-1.5 h-1.5 rounded-none bg-brand-primary rotate-45" />
      </div>

      {/* Barcode side decor */}
      <div className="absolute bottom-10 -right-6 w-32 h-4 rotate-90 opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none barcode-sim text-brand-black" />
      
      <div className="aspect-video relative overflow-hidden border-b-2 border-brand-black bg-brand-black/5">
        {/* HUD Frame Brackets Inside Image */}
        <div className="absolute top-4 left-4 angle-bracket text-white/60 group-hover:text-brand-primary transition-colors z-10" />
        <div className="absolute top-4 right-4 angle-bracket text-white/60 group-hover:text-brand-primary transition-colors z-10 rotate-90" />
        <div className="absolute bottom-4 left-4 angle-bracket text-white/60 group-hover:text-brand-primary transition-colors z-10 -rotate-90" />
        <div className="absolute bottom-4 right-4 angle-bracket text-white/60 group-hover:text-brand-primary transition-colors z-10 rotate-180" />

        {/* Floating Accent Bar */}
        <div className="absolute top-1/2 left-0 w-1 h-12 bg-white/20 group-hover:bg-brand-primary z-10 transition-colors" />

        <img 
          src={imageError ? `https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800&sig=${project.id}` : imageUrl} 
          alt={project.title} 
          className="object-cover w-full h-full transition-all duration-700 rounded-none group-hover:scale-110"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
        />
        <div className="absolute top-0 left-0 bg-brand-primary text-white px-3 py-1 text-[10px] font-black uppercase tracking-tighter">
          {(translations[lang].sections.portfolio as any).categories[project.category] || project.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-display font-black mb-3 leading-none group-hover:text-brand-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-brand-black font-medium text-sm mb-6 leading-relaxed">
          {project.description[lang].includes('。') && project.description[lang].indexOf('。') < project.description[lang].length - 1 ? (
            <>
              <span className="block mb-2 text-brand-black">
                {project.description[lang].split('。')[0].split('|').map((part, i, arr) => (
                  <span key={i}>
                    <span className="font-black">{part.trim()}</span>
                    {i < arr.length - 1 && <span className="mx-2 opacity-30 font-normal">|</span>}
                  </span>
                ))}
              </span>
              <span className="opacity-80 leading-relaxed block">{project.description[lang].split('。').slice(1).join('。')}</span>
            </>
          ) : (
            <span className="opacity-80 block">
              {project.description[lang].includes('|') ? (
                project.description[lang].split('|').map((part, i, arr) => (
                  <span key={i}>
                    <span className="font-black">{part.trim()}</span>
                    {i < arr.length - 1 && <span className="mx-2 opacity-30 font-normal">|</span>}
                  </span>
                ))
              ) : (
                project.description[lang]
              )}
            </span>
          )}
        </p>

        {project.awards && (
          <div 
            className="mb-4 bg-brand-primary/10 border-l-2 border-brand-primary p-2 flex items-start gap-2 relative cursor-help group/award"
            onMouseEnter={() => setShowAwardImage(true)}
            onMouseLeave={() => setShowAwardImage(false)}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowAwardImage(!showAwardImage);
            }}
          >
            <Trophy className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" />
            <span className="text-[11px] font-black italic text-brand-primary uppercase tracking-wider">
              {project.awards[lang]}
            </span>

            {/* Award Image Popup */}
            <AnimatePresence>
              {showAwardImage && project.awardImage && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute bottom-full left-0 mb-2 z-[100] w-64 p-1 bg-white border-2 border-brand-primary shadow-[10px_10px_0px_rgba(0,0,0,1)] pointer-events-none"
                >
                  <img 
                    src={project.awardImage} 
                    alt="Award" 
                    className="w-full h-auto"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1594914141274-12933758e5ff?w=400&q=80';
                    }}
                  />
                  <div className="bg-brand-primary text-white text-[8px] font-mono p-1 uppercase text-center font-black">
                    {project.awards[lang]}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            {project.category !== '游戏拆解' && (
              <div className="flex items-center gap-2 border-b border-brand-black/5 pb-1">
                <div className="w-1.5 h-1.5 bg-brand-primary rhombus-fill" />
                <span className="text-[9px] font-mono font-black text-brand-primary/80 uppercase tracking-widest">
                  {translations[lang].sections.portfolio.roleLabel}
                </span>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="text-[10px] font-black bg-brand-black text-white px-2 py-0.5 uppercase tracking-tighter shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
             {project.link && project.link !== '#' && (
               <div 
                 className="relative group/link"
                 onMouseEnter={() => setShowLinkPreview(true)}
                 onMouseLeave={() => setShowLinkPreview(false)}
               >
                 <div className="flex items-center gap-2 text-brand-primary group-hover/link:scale-105 transition-transform origin-left">
                   <div className="w-6 h-[1px] bg-brand-primary" />
                   <span className="text-[10px] font-black uppercase tracking-tighter italic">{translations[lang].sections.portfolio.visitBtn}</span>
                   <ChevronRight size={14} />
                 </div>

                {/* Link Preview Popup */}
                <AnimatePresence>
                  {showLinkPreview && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full left-0 mb-4 z-[110] w-72 bg-white brutalist-border shadow-[15px_15px_0px_rgba(0,0,0,0.1)] p-1 pointer-events-none"
                    >
                       <div className="p-3 border-t border-brand-black bg-brand-black text-white flex items-center justify-between">
                          <span className="text-[9px] font-mono font-bold tracking-widest">DIRECT_LINK</span>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/60" />
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/30" />
                          </div>
                       </div>
                       <div className="p-4 bg-white">
                          <div className="flex items-center gap-2 mb-2">
                             <div className="w-2 h-2 bg-brand-primary animate-pulse" />
                             <span className="text-[8px] font-mono font-black text-brand-black uppercase">Target URL</span>
                          </div>
                          <div className="bg-brand-black/5 p-3 border border-brand-black/10">
                            <span className="text-[10px] font-mono text-brand-primary break-all leading-relaxed">
                              {project.link.replace('https://', '').replace('http://', '')}
                            </span>
                          </div>
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                </div>
              )}
              
              {/* Functional status indicator (dots) */}
              <div className="segmented-bar ml-auto text-brand-primary/40 group-hover:text-brand-primary transition-colors">
                <div className="segmented-bar-item" />
                <div className="segmented-bar-item" />
                <div className="segmented-bar-item h-2" />
              </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="p-2"
    >
      {project.link && project.link !== '#' ? (
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full">
          {CardContent}
        </a>
      ) : (
        <div className="h-full">
          {CardContent}
        </div>
      )}
    </motion.div>
  );
};


function MouseCodeStream() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mouseRef = React.useRef({ x: 0, y: 0 });
  const [code, setCode] = React.useState<string[]>([]);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;
    const updatePosition = () => {
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${mouseRef.current.x}px, ${mouseRef.current.y}px, 0)`;
      }
      animationId = requestAnimationFrame(updatePosition);
    };
    updatePosition();

    const chars = "0123456789ABCDEF<>[]/_*-";
    const interval = setInterval(() => {
      const newLine = "0x" + Array(4).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
      setCode(prev => [newLine, ...prev].slice(0, 4));
    }, 120);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      clearInterval(interval);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed pointer-events-none z-[2100] top-0 left-0 flex flex-col font-mono text-[8px] text-gray-800/60 transition-opacity duration-300 will-change-transform"
      style={{ 
        paddingLeft: '18px', 
        paddingTop: '18px',
        textShadow: '0.5px 0.5px 0px rgba(255,255,255,0.4)'
      }}
    >
      {code.map((line, i) => (
        <div key={i} className="whitespace-nowrap tracking-wider font-bold" style={{ opacity: 0.9 - i * 0.2 }}>
          {line}
        </div>
      ))}
      <div className="flex justify-between text-[6px] opacity-40 mt-1 gap-4">
        <span className="animate-pulse">PTRS_LIVE</span>
      </div>
    </div>
  );
}

// --- Steam Experience Components ---

interface SteamGame {
  name: string;
  appid: string;
  image: string;
  hours: string;
  lastPlayed?: string | null;
  categories?: string[];
}

interface SteamStats {
  avatar: string | null;
  level: string;
  status: string;
}

const STEAM_CATEGORIES = [
  { id: 'all', zh: '全部', en: 'All' },
  { id: 'metroidvania', zh: '类银河恶魔城', en: 'Metroidvania' },
  { id: 'action-rpg', zh: '动作角色扮演', en: 'Action RPG' },
  { id: 'multiplayer', zh: '多人/竞技', en: 'Multiplayer' },
  { id: 'rpg', zh: 'RPG/叙事', en: 'RPG/Narrative' },
  { id: 'strategy', zh: '策略', en: 'Strategy' },
  { id: 'indie', zh: '独立游戏', en: 'Indie' },
  { id: 'puzzle', zh: '解谜', en: 'Puzzle' },
];

const STEAM_GAMES_FALLBACK: SteamGame[] = [
  { name: "Palworld", appid: "1623730", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1623730/header.jpg", hours: "162+", categories: ['multiplayer'] },
  { name: "Hollow Knight", appid: "367520", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/header.jpg", hours: "110", categories: ['metroidvania'] },
  { name: "Hades", appid: "1145360", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1145360/header.jpg", hours: "94", categories: ['action-rpg'] },
  { name: "Baldur's Gate 3", appid: "1086940", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/header.jpg", hours: "82", categories: ['rpg'] },
  { name: "Stardew Valley", appid: "413150", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/header.jpg", hours: "70", categories: ['rpg'] },
  { name: "Black Myth: Wukong", appid: "2358720", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/header.jpg", hours: "65", categories: ['action-rpg'] },
  { name: "Outer Wilds", appid: "753640", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/753640/header.jpg", hours: "48", categories: ['indie'] },
];

const SteamGameCard = ({ game, i }: { game: SteamGame; i: number }) => {
  const [imgError, setImgError] = React.useState(false);
  const [showUrlTooltip, setShowUrlTooltip] = React.useState(false);
  
  // 如果图片加载失败，直接不渲染这个卡片
  if (imgError) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: Math.min(i * 0.02, 0.5), duration: 0.3 }}
      viewport={{ once: true }}
      className="bg-white p-1.5 pb-6 shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col gap-1.5 relative group hover:shadow-lg transition-shadow"
    >
      <div className="aspect-square bg-gray-50 overflow-hidden relative border border-gray-100">
        <img 
          src={game.image} 
          alt={game.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
        />
        <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/10 transition-colors" />
        
        {/* Steam Link Overlay */}
        <a 
          href={`https://store.steampowered.com/app/${game.appid}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          onMouseEnter={() => setShowUrlTooltip(true)}
          onMouseLeave={() => setShowUrlTooltip(false)}
        >
           <div className="w-8 h-8 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
              <ExternalLink size={14} className="text-brand-black" />
           </div>
           {showUrlTooltip && (
             <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-brand-black text-white px-2 py-1 text-[8px] font-mono font-black uppercase tracking-tighter whitespace-nowrap z-20">
               store.steampowered.com/app/{game.appid}
             </div>
           )}
        </a>
      </div>

      <div className="flex flex-col items-center text-center px-1">
        <h4 className="text-brand-black font-display font-black text-[10px] leading-tight mb-0.5 truncate w-full">
          {game.name}
        </h4>
        <p className="text-[9px] font-bold text-brand-primary tracking-tight">
          {game.hours}h
        </p>
      </div>

      {/* Hand-written style number */}
      <div className="absolute bottom-1 left-2 text-[6px] font-mono text-gray-200 select-none">
        {i + 1}
      </div>
    </motion.div>
  );
};

function SteamExperience({ lang }: { lang: Language }) {
  const [games, setGames] = useState<SteamGame[]>([]);
  const [stats, setStats] = useState<SteamStats | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchSteam = async () => {
      try {
        setError(null);
        
        // 统一使用 /api/steam 代理（本地用 server.ts，Vercel 用 api/steam.js）
        const res = await fetch('/api/steam');
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || 'Failed to fetch Steam data');
        }
        const data = await res.json();
        
        if (data.games) {
          // Filtering logic: Remove games with issues
          const idleKeywords = ['idle', 'clicker', '放置', '挂机'];
          const eroticaKeywords = ['hentai', 'porn', 'sex', 'erotica', '色情', 'adult', 'mature', '羞辱'];
          const blacklistedTitles = ['bongo cat', 'banana', 'the artisan of glimmith', 'summer memories', 'summer memorise', 'escape from duckov', 'tiny pasture', 'cato: buttered cat', 'squeakross', 'wallpaper engine'];
          // 可能有问题的游戏名（封面异常）
          const problematicNames = [
            'apex legends', 'genshin impact', 'pubg', 'destiny 2', 'lost ark',
            'shelldiver', 'shell diver', 'peak', '乌合之众', 'resident evil requiem',
            'shell', 'diver', 'residen', 'requiem'
          ];
          
          const filteredGames = data.games.filter((g: any) => {
            const lowName = (g.name || "").toLowerCase();
            const hasValidImage = g.image && 
              g.image.includes('steamstatic') && 
              !g.image.includes('_placeholder');
            const isIdle = idleKeywords.some(k => lowName.includes(k));
            const isErotica = eroticaKeywords.some(k => lowName.includes(k));
            const isBlacklisted = blacklistedTitles.some(t => lowName.includes(t));
            const isProblematic = problematicNames.some(n => lowName.includes(n));
            const hours = parseFloat(String(g.hours).replace(/,/g, '')) || 0;
            const isBelow2Hours = hours < 2;
            return hasValidImage && !isIdle && !isErotica && !isBlacklisted && !isBelow2Hours && !isProblematic;
          });

          const processedGames = filteredGames.map((g: any) => {
            const cats: string[] = ['all']; // Single category for all games
            return { ...g, categories: cats };
          });

          // Sort by hours (descending)
          processedGames.sort((a: any, b: any) => {
            const hA = parseFloat(String(a.hours).replace(/,/g, ''));
            const hB = parseFloat(String(b.hours).replace(/,/g, ''));
            return hB - hA;
          });
          
          setGames(processedGames);
          setStats(data.stats);
        }
      } catch (err: any) {
        console.error("Steam Error:", err);
        setError(err.message || 'Steam Library Offline');
      } finally {
        setLoading(false);
      }
    };
    fetchSteam();
  }, []);

  const sourceGames = games.length > 0 ? games : STEAM_GAMES_FALLBACK;
  
  // Only show categories that actually have games
  const availableCategories = STEAM_CATEGORIES.filter(cat => {
    if (cat.id === 'all') return true;
    return sourceGames.some(g => g.categories?.includes(cat.id));
  });

  const filteredGames = sourceGames.filter(g => 
    activeCategory === 'all' || (g.categories && g.categories.includes(activeCategory))
  );

  const displayedGames = isExpanded ? filteredGames : filteredGames.slice(0, 10);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 mb-24">
      {/* Title Area */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
          {/* Avatar & Level HUD */}
          {stats && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white p-1 rotate-3 shadow-lg border border-gray-100">
                <img 
                  src={stats.avatar || ""} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-2 -left-2 bg-brand-primary text-white text-[10px] font-mono px-2 py-0.5 font-black z-10 shadow-sm">
                DrPrunus
              </div>
            </motion.div>
          )}

          <div className="flex flex-col items-center md:items-start gap-1">
            <h2 className="text-3xl md:text-5xl font-display font-black text-brand-black tracking-tight flex flex-wrap items-center justify-center gap-4">
              游戏经历
              <div className="flex items-center gap-2 bg-brand-bg px-3 py-1 rounded-full border border-gray-200">
                 <div className="w-5 h-5 bg-brand-black rounded-full flex items-center justify-center">
                    <Gamepad2 size={12} className="text-white" />
                 </div>
                 <span className="text-xs font-black text-brand-black/60 font-mono tracking-tight uppercase">
                   {stats?.status === 'ONLINE' ? 'ONLINE_READY' : 'Steam Gallery'}
                 </span>
              </div>
            </h2>
            <p className="text-brand-black/60 font-medium text-lg text-center md:text-left">
              启发我设计哲学的游戏
            </p>
          </div>
        </div>
      </div>

      {/* Categories Filter */}
      {availableCategories.length > 1 && (
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2 md:gap-4 overflow-x-auto no-scrollbar pb-4 max-w-full">
            {availableCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setIsExpanded(false);
                }}
                className={`px-5 py-2 rounded-full font-black text-xs md:text-sm transition-all whitespace-nowrap border-2 ${
                  activeCategory === cat.id 
                    ? 'bg-brand-black text-white border-brand-black' 
                    : 'bg-white text-brand-black/40 border-transparent hover:border-gray-200 hover:text-brand-black'
                }`}
              >
                {lang === 'zh' ? cat.zh : cat.en}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid Layout */}
      {error ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <Gamepad2 size={48} className="text-gray-300 mb-4" />
          <p className="text-brand-black/60 font-medium mb-6 uppercase tracking-wider text-sm mx-4 text-center">
            {lang === 'zh' ? 'Steam 库目前不可用' : 'Steam Library temporarily unavailable'} 
            <br />
            <span className="text-[10px] opacity-40 font-mono mt-2 block">{error}</span>
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-brand-black text-white text-xs font-black rounded-lg hover:translate-y-1 transition-transform"
          >
            {lang === 'zh' ? '重新加载' : 'REFRESH'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
          <AnimatePresence mode="popLayout">
            {displayedGames.map((game, i) => (
              <SteamGameCard key={game.appid || game.name} game={game} i={i} />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Expand/Collapse Toggle */}
      {filteredGames.length > 10 && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="bg-white border-2 border-brand-black px-8 py-2 md:py-3 font-display font-black uppercase text-xs md:text-sm tracking-widest hover:bg-brand-black hover:text-white transition-all shadow-[6px_6px_0px_rgba(0,0,0,0.1)] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1">
              {isExpanded 
                ? (lang === 'zh' ? '收起' : 'COLLAPSE') 
                : (lang === 'zh' ? `展开 (${filteredGames.length - 10}+)` : `EXPAND (${filteredGames.length - 10}+)`)}
            </div>
            <motion.div
              animate={{ y: isExpanded ? -2 : 2 }}
              transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
            >
              <ChevronDown className={`w-5 h-5 text-brand-primary transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </motion.div>
          </button>
        </div>
      )}

      {/* Footer Link */}
      <div className="mt-20 flex justify-center">
         <a 
          href="https://steamcommunity.com/id/prunu5h3ad/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-brand-black text-white px-8 py-4 rounded-xl flex items-center gap-4 shadow-xl hover:translate-y-1 transition-transform group"
         >
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
               <SteamIcon className="w-5 h-5" />
            </div>
            <span className="font-display font-black uppercase text-base tracking-widest">
              {lang === 'zh' ? '在 Steam 上查看更多' : 'View More on Steam'}
            </span>
         </a>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Language>('zh');
  const [activeTab, setActiveTab] = useState<'all' | Project['category']>('all');
  const [copied, setCopied] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const t = translations[lang];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatLocalTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', { hour12: false });
  };

  const handleCopyWeChat = () => {
    navigator.clipboard.writeText(t.sections.contact.btnWechat);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredProjects = activeTab === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen selection:bg-brand-primary selection:text-white pb-10 overflow-x-hidden relative">
      <div className="crt-overlay" />
      <MouseCodeStream />
      {/* Arknights Global System Bar */}
      <div className="fixed top-0 left-0 right-0 h-6 bg-brand-black z-[60] flex items-center justify-between px-4 border-b border-brand-primary/40 pointer-events-none md:pointer-events-auto">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 bg-brand-primary rhombus-fill animate-pulse" />
          <span className="text-[8px] font-mono text-white/60 tracking-widest uppercase font-black">
            System status: <span className="text-brand-primary">Nominal</span>
          </span>
          <div className="hidden md:flex gap-1">
             {[...Array(5)].map((_, i) => <div key={i} className="w-1 h-2 bg-brand-primary/20" />)}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[8px] font-mono text-white/40 tracking-tighter hidden sm:block uppercase">LOCAL_TIME: {formatLocalTime(currentTime)}</span>
          <span className="text-[8px] font-mono text-white/40 tracking-tighter">ID: {currentTime.getFullYear()}${(currentTime.getMonth() + 1).toString().padStart(2, '0')}{currentTime.getDate().toString().padStart(2, '0')}</span>
          <div className="h-4 w-24 caution-stripes opacity-30" />
        </div>
      </div>

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-brand-bg" />
      <div className="fixed inset-0 pointer-events-none -z-[9] y2k-mesh-bg" />
      
      {/* Y2K Floating Blobs */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-[#00f2ff] opacity-[0.05] blur-[100px] animate-blob" />
        <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-[#ff00ea] opacity-[0.05] blur-[80px] animate-blob [animation-delay:2s]" />
        <div className="absolute top-[60%] left-[40%] w-[300px] h-[300px] rounded-full bg-[#7000ff] opacity-[0.03] blur-[90px] animate-blob [animation-delay:4s]" />
      </div>

      {/* Retro Tech Decorations */}
      <div className="fixed inset-0 pointer-events-none -z-[8] overflow-hidden opacity-20">
        <div className="absolute top-40 -left-10 rotate-12 p-4 y2k-glass border border-white/20 rounded-2xl scale-75">
           <Gamepad2 className="text-[#00f2ff]" size={48} />
        </div>
        <div className="absolute bottom-60 -right-8 -rotate-12 p-3 y2k-glass border border-white/20 rounded-xl">
           <CassetteTape className="text-[#ff00ea]" size={40} />
        </div>
        <div className="absolute top-1/2 left-4 -translate-y-1/2 opacity-40">
           <Cpu className="text-white/20" size={120} />
        </div>
        <div className="absolute top-[20%] right-10 p-2 y2k-glass border border-white/20 rounded-full animate-pulse">
           <Joystick className="text-white/40" size={24} />
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-[0.03] -z-10 tactical-grid" />
      
      <div className="fixed inset-0 pointer-events-none opacity-[0.2] -z-10 scanlines" />

      {/* Global Drafting Lines */}
      <div className="fixed left-4 md:left-6 top-0 bottom-0 w-[1px] dashed-line-vertical text-brand-black/5 -z-10" />
      <div className="fixed right-4 md:right-6 top-0 bottom-0 w-[1px] dashed-line-vertical text-brand-black/5 -z-10" />
      <div className="fixed top-16 md:top-24 left-0 right-0 h-[1px] dashed-line-horizontal text-brand-black/5 -z-10" />
      
      {/* Corner Drafting Markers */}
      <div className="fixed top-4 md:top-6 left-4 md:left-6 w-12 h-12 md:w-16 md:h-16 border-t border-l border-brand-black/20 -z-10 pointer-events-none">
        <div className="absolute top-0 left-full ml-2 md:ml-4 text-[6px] md:text-[8px] font-mono text-brand-black/20">PX_COORD_X: 0</div>
      </div>
      <div className="fixed bottom-4 md:bottom-6 right-4 md:right-6 w-12 h-12 md:w-16 md:h-16 border-b border-r border-brand-black/20 -z-10 pointer-events-none">
        <div className="absolute bottom-0 right-full mr-2 md:mr-4 text-[6px] md:text-[8px] font-mono text-brand-black/20">PX_COORD_Y: MAX</div>
      </div>
      <div className="fixed top-12 right-12 font-mono text-[9px] text-brand-black/10 rotate-90 -z-10">SPEC_VER_7.02</div>
      <div className="fixed bottom-12 left-12 font-mono text-[9px] text-brand-black/10 -rotate-90 -z-10">LOCAL_SYS_READY</div>
      
      {/* Screen Frame Markers Removed */}

      {/* Global Status Label Removed */}
      <div className="fixed bottom-0 left-0 right-0 h-4 bg-brand-black z-[60] flex items-center justify-between px-4 opacity-80 pointer-events-none border-t border-brand-primary/20">
         <div className="flex gap-2">
           <div className="h-full w-4 bg-brand-primary/20" />
           <span className="text-[6px] font-mono text-white/50 tracking-tighter self-center uppercase">PRN_LOG_ACTIVE // CACHE_LOAD_NOMINAL</span>
         </div>
         <div className="flex gap-4 items-center h-full">
            <div className="w-1.5 h-1.5 bg-brand-primary rhombus-fill" />
            <div className="h-[2px] w-12 bg-white/10" />
            <span className="text-[6px] font-mono text-white/30 uppercase mr-2">Secured Connection</span>
         </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-6 z-50 bg-brand-black text-white px-4 md:px-6 py-2.5 flex justify-between items-center overflow-hidden border-b-2 border-brand-primary shadow-2xl">
        {/* Nav HUD Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-primary/20">
          <motion.div 
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="w-1/3 h-full bg-brand-primary"
          />
        </div>

        {/* Nav Scanline Effect */}
        <div className="absolute inset-x-0 bottom-0 h-[100%] bg-gradient-to-t from-brand-primary/10 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center text-sm font-mono tracking-widest font-black">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 md:gap-4 group cursor-pointer"
          >
            {/* Arknights Geometric Logo + Refresh Functionality */}
            <div 
              onClick={() => window.location.reload()}
              className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center cursor-pointer group/logo"
            >
              <motion.div 
                animate={{ rotate: [0, 90, 180, 270, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-brand-primary/30 rhombus-fill"
              />
              <div className="absolute inset-2 bg-brand-primary rhombus-fill group-hover/logo:rotate-90 transition-transform duration-500" />
              
              {/* Inner content switches on hover */}
              <div className="z-10 w-3 h-3 md:w-4 md:h-4 bg-white rhombus-fill group-hover/logo:scale-0 transition-transform duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/logo:opacity-100 transition-all duration-500 text-white">
                <RefreshCcw className="w-4 h-4 md:w-5 md:h-5 group-hover/logo:rotate-180 transition-transform duration-700" />
              </div>
              
              {/* Drafting crosshair extensions for the logo */}
              <div className="absolute -left-2 top-1/2 w-1 h-[1px] bg-brand-primary/60 hidden md:block" />
              <div className="absolute -right-2 top-1/2 w-1 h-[1px] bg-brand-primary/60 hidden md:block" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-[1px] bg-brand-primary/10 pointer-events-none" />
            </div>

            <div className="flex items-center gap-4" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="flex flex-col">
                <h1 className="text-xl md:text-2xl font-display font-black tracking-tighter text-white group-hover:text-brand-primary transition-colors leading-none">
                  DrPrunus
                </h1>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-6 md:w-8 h-[2px] bg-brand-primary" />
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-brand-primary rhombus-fill" />
                </div>
              </div>
              
              {/* Tactical Code Label */}
              <div className="hidden sm:flex flex-col border-l border-white/20 pl-4 h-8 justify-center">
                 <span className="text-[8px] text-brand-primary font-black tracking-widest font-mono">CODE: RI-01</span>
                 <span className="text-[6px] text-white/40 font-mono">TERM_A/7.2</span>
              </div>
            </div>
          </motion.div>
          
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden lg:flex gap-10">
                  {['intro', 'works', 'about', 'contact'].map((id, idx) => (
                <a 
                  key={id} 
                  href={`#${id}`} 
                  className="hover:text-brand-primary transition-colors flex items-center gap-2 group relative py-1"
                >
                  <div className="w-1.5 h-1.5 bg-brand-primary/40 rhombus-fill opacity-0 group-hover:opacity-100 transition-all group-hover:scale-125" />
                  <span className="uppercase text-[12px] tracking-widest font-black select-none whitespace-nowrap">{t.nav[id as keyof typeof t.nav]}</span>
                </a>
              ))}
            </div>

            {/* Cassette Tape Language Switcher - Translucent Tech Edition */}
            <div className="relative h-10 w-[180px] bg-white/5 backdrop-blur-md rounded-lg border border-white/20 shadow-2xl flex items-center px-2 py-1 overflow-hidden group/cassette">
              {/* Inner tech pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none tactical-grid scale-150" />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 to-transparent pointer-events-none" />
              
              {/* Left Reel - Glowing */}
              <div className="w-7 h-7 rounded-full bg-black/60 border border-white/20 flex items-center justify-center relative flex-shrink-0">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 rounded-full border border-brand-primary/40 border-t-brand-primary border-dashed"
                />
                <div className="absolute w-1.5 h-1.5 bg-brand-primary rounded-full shadow-[0_0_8px_#ff0055]" />
              </div>

              {/* Tape Label / Switcher Buttons - Tech Plate Style */}
              <div className="flex-1 mx-2 h-[85%] rounded bg-black/40 border border-white/10 flex items-center justify-around overflow-hidden relative">
                 <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-50" />
                 
                 {(['zh', 'en', 'ja'] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`relative z-10 h-full flex-1 flex items-center justify-center text-[10px] font-display font-black transition-all ${lang === l ? 'text-white' : 'text-white/30 hover:text-white/60'}`}
                    >
                      {l.toUpperCase()}
                      {lang === l && (
                        <motion.div 
                          layoutId="activeLang"
                          className="absolute inset-0 bg-brand-primary/20 border-x border-brand-primary/40" 
                        />
                      )}
                    </button>
                  ))}
              </div>

              {/* Right Reel - Glowing */}
              <div className="w-7 h-7 rounded-full bg-black/60 border border-white/20 flex items-center justify-center relative flex-shrink-0">
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className={`w-5 h-5 rounded-full border border-white/10 border-t-white/40 border-dashed ${lang === 'ja' ? 'border-t-brand-primary' : ''}`}
                />
                <div className="absolute w-1.5 h-1.5 bg-white/20 rounded-full" />
              </div>

              {/* Decorative side screws */}
              <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-white/10" />
              <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-white/10" />
              <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-white/10" />
              <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-white/10" />
            </div>


            {/* Audio Interface Toggle */}
            <div className="flex items-center gap-3 px-3 py-1.5 brutalist-border border-white/10 bg-brand-primary/5">
              <div className="flex flex-col items-start gap-1">
                <span className="text-[7px] uppercase font-black tracking-widest text-brand-primary/60 leading-none">
                  Electronic_Music
                </span>
                <NeuralWaveform />
              </div>
              <div className="flex flex-col text-brand-primary w-[80px]">
                <div className="text-[10px] font-mono font-black animate-pulse uppercase truncate">
                  <GenreTicker />
                </div>
                <div className="text-[6px] opacity-40 uppercase">Gate_V7.2</div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header id="intro" className="relative pt-4 md:pt-8 pb-6 px-4 md:px-6 max-w-7xl mx-auto">
        {/* HUD Frame Angles */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-30">
          <div className="hud-angle hud-angle-tl text-brand-primary" />
          <div className="hud-angle hud-angle-tr text-brand-primary" />
          <div className="hud-angle hud-angle-bl text-brand-primary" />
          <div className="hud-angle hud-angle-br text-brand-primary" />
          
          {/* Internal framing lines */}
          <div className="absolute top-6 md:top-10 left-6 md:left-10 right-6 md:right-10 h-[1px] bg-brand-black/5" />
          <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10 h-[1px] bg-brand-black/5" />
          <div className="absolute top-6 md:top-10 bottom-6 md:bottom-10 left-6 md:left-10 w-[1px] bg-brand-black/5" />
          <div className="absolute top-6 md:top-10 bottom-6 md:bottom-10 right-6 md:right-10 w-[1px] bg-brand-black/5" />
        </div>

        {/* Decorative HUD Frame */}
        <div className="absolute inset-4 pointer-events-none z-40 border border-brand-black/5 hidden md:block">
           <div className="ui-frame-corner ui-frame-corner-tl text-brand-primary/20 opacity-50" />
           <div className="ui-frame-corner ui-frame-corner-br text-brand-primary/20 opacity-50" />
           
           {/* Side Markers */}
           <div className="absolute top-1/2 left-0 -translate-y-1/2 h-32 w-1 bg-brand-primary/10" />
           <div className="absolute top-1/2 right-0 -translate-y-1/2 h-32 w-1 bg-brand-primary/10" />
        </div>

        {/* Tactical Background elements - Points, Lines, Planes */}
        <div className="absolute inset-0 crosshair-bg opacity-[0.03] pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-black/5 -skew-x-[20deg] translate-x-1/2 -z-10 hidden md:block" />
        
        {/* Multi-layered geometric panels */}
        <div className="absolute -top-40 right-1/4 w-[40%] h-[150%] bg-brand-primary/[0.03] skew-x-12 -z-10" />
        <div className="absolute -bottom-40 left-1/4 w-[30%] h-[120%] bg-brand-black/[0.02] -skew-x-12 -z-10" />
        
        {/* Floating crosshairs and markers */}
        <div className="absolute top-1/4 left-[5%] w-16 h-16 md:w-32 md:h-32 border border-brand-black/5 flex items-center justify-center -z-10">
           <div className="w-8 md:w-16 h-[1px] bg-brand-primary/20" />
           <div className="h-8 md:h-16 w-[1px] bg-brand-primary/20 absolute" />
           <div className="absolute inset-4 md:inset-8 border border-brand-primary/10 rounded-full animate-ping" />
        </div>

        {/* Tactical abstract planes */}
        <div className="absolute -bottom-10 right-1/4 w-32 h-64 bg-brand-primary/5 rotate-12 -z-10 hidden md:block" />
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-brand-black/5 -rotate-45 -z-10" />
        
        {/* Floating Crosshairs (Animated) */}
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 md:left-20 w-16 h-16 md:w-32 md:h-32 opacity-10 pointer-events-none"
        >
           <div className="absolute top-1/2 left-0 w-full h-[1px] bg-brand-black" />
           <div className="absolute left-1/2 top-0 w-[1px] h-full bg-brand-black" />
           <div className="absolute inset-2 md:inset-4 border border-brand-black rounded-full" />
        </motion.div>

        <div className="absolute top-1/2 right-[15%] w-1 h-[40%] bg-gradient-to-b from-transparent via-brand-primary/20 to-transparent -z-10" />
        <div className="absolute bottom-20 left-[10%] w-[30%] h-[1px] dashed-line-horizontal text-brand-black/10 -z-10" />

        {/* Halftone Layer for Hero */}
        <div className="absolute inset-0 halftone opacity-[0.03] pointer-events-none -z-10" />
        
        {/* Tactical Skew Background */}
        <div className="absolute -top-20 -left-20 w-[60%] h-[120%] bg-brand-primary opacity-[0.02] -skew-x-12 -z-20 pointer-events-none" />

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 z-10"
          >
            <div className="inline-block bg-brand-primary text-white px-4 md:px-6 py-2 mb-6 md:mb-8 -rotate-1 brutalist-shadow font-display font-black normal-case tracking-tighter text-2xl md:text-4xl select-none">
              Hi, I'm <span className="relative group/name cursor-help inline-grid place-items-center ml-1">
                <span className="transition-all duration-300 group-hover/name:opacity-0 group-hover/name:translate-y-2 group-hover/name:blur-sm">
                  DrPrunus
                </span>
                <span className="absolute inset-0 opacity-0 group-hover/name:opacity-100 transition-all duration-300 flex items-center justify-center font-sans tracking-normal -translate-y-2 group-hover/name:translate-y-0 text-brand-accent">
                  张溯峻
                </span>
              </span>
            </div>
            <div className="flex flex-col mb-8 md:mb-12 relative group max-w-full">
              {/* Mechanical extension lines */}
              <div className="absolute -left-12 top-0 h-full w-[1px] bg-brand-primary opacity-30 hidden md:block" />
              <div className="absolute -left-16 top-1/2 w-4 h-[1px] bg-brand-primary opacity-30 hidden md:block" />
              
              {/* Fake measurement annotations */}
              <div className="absolute -left-20 top-0 text-[8px] font-mono text-brand-black/20 vertical-text origin-top-left -rotate-90 hidden md:block">112.50mm</div>
              <div className="absolute right-0 -top-8 text-[8px] font-mono text-brand-black/20 flex gap-2">
                <div className="w-12 md:w-16 h-[1px] bg-brand-black/10" />
                <span>ANG_REF/45.0°</span>
              </div>

              <motion.h1 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl sm:text-4xl md:text-[4rem] lg:text-[5rem] font-display font-black leading-tight md:leading-none tracking-tighter uppercase text-brand-black whitespace-nowrap relative select-none"
              >
                {t.hero.roleGame}
                {/* Baseline extension line */}
                <div className="absolute bottom-1 left-0 w-full h-[1px] bg-brand-black/10 origin-left" />
              </motion.h1>
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4 md:gap-8 -mt-1 md:-mt-2 ml-0 sm:ml-4 md:ml-8 relative"
              >
                <div className="absolute top-1/2 left-0 -translate-x-full w-8 md:w-32 h-[1px] bg-brand-primary opacity-20 pointer-events-none hidden sm:block" />
                <h2 className="text-xl sm:text-3xl md:text-[3rem] lg:text-[4rem] font-display font-black leading-tight md:leading-none tracking-tighter uppercase text-brand-primary italic drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] md:drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] whitespace-nowrap relative select-none">
                  {t.hero.roleMusic}
                  {/* Extension line from cap-height */}
                  <div className="absolute top-0 right-0 w-12 md:w-32 h-[1px] bg-brand-primary/20 translate-x-full origin-left hidden md:block" />
                </h2>
              </motion.div>
            </div>
            <div className="flex flex-col gap-8 md:gap-12 relative max-w-4xl py-4">
            {/* New Quote Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="-mb-4 relative"
            >
              <div className="absolute -left-4 top-0 w-1 h-full bg-brand-primary/20" />
              <p className="text-xl md:text-2xl font-display font-black italic text-brand-black/60 tracking-tight leading-relaxed">
                "{t.hero.quote}"
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="relative pl-12 border-l-2 border-brand-black/10 mb-6 mt-0"
            >
              {/* Timeline Node */}
              <div className="absolute left-[-11px] top-0 w-5 h-5 rounded-full bg-brand-black border-4 border-white shadow-md" />
              
              <div className="bg-white brutalist-border p-4 hover:translate-x-1 transition-all group brutalist-shadow-small relative">
                {/* Education Badge */}
                <div className="absolute -top-3 -right-3 bg-brand-black text-white px-3 py-1 text-[11px] font-mono font-black uppercase brutalist-shadow-small z-10">
                  教育背景
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-1">
                  <h3 className="text-lg md:text-xl font-display font-black text-brand-black group-hover:text-brand-primary transition-colors">
                    {t.hero.education.school}
                  </h3>
                  <span className="text-[10px] md:text-xs font-black text-brand-black/50 font-mono">
                    {t.hero.education.date}
                  </span>
                </div>
                
                <p className="text-xs md:text-sm font-black text-brand-black/70 mb-1 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-brand-primary opacity-60" />
                  {t.hero.education.major}
                </p>

                <p className="text-[10px] md:text-xs font-black text-brand-black/40 leading-relaxed max-w-2xl">
                  {t.hero.education.courses}
                </p>
              </div>
            </motion.div>
            </div>

            <div className="flex flex-wrap gap-4 md:gap-6 pt-2">
              <div className="relative group">
                <div className="absolute -inset-2 border border-brand-primary/0 group-hover:border-brand-primary/40 transition-all pointer-events-none invisible lg:visible" />
                {/* Tactical Points */}
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity invisible lg:visible" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity invisible lg:visible" />
                
                <a href="#works" className="relative bg-brand-black text-white px-6 md:px-8 py-3 md:py-4 font-display font-black uppercase tracking-widest brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-3 text-sm md:text-base">
                  {t.hero.btnRepo} <ChevronRight size={18} />
                </a>
              </div>

              <div className="relative group">
                <div className="absolute inset-x-0 -top-1 h-[2px] bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <a 
                  href="https://163cn.tv/6EIYNv4" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-brand-accent border-2 border-brand-black px-6 md:px-8 py-3 md:py-4 font-display font-black uppercase tracking-widest hover:bg-brand-black hover:text-white transition-all flex items-center gap-3 text-sm md:text-base brutalist-border"
                >
                  {t.hero.btnMusic} <Music size={18} />
                </a>
              </div>

              <a href="#contact" className="bg-white border-2 border-brand-black px-6 md:px-8 py-3 md:py-4 font-display font-black uppercase tracking-widest hover:bg-brand-black hover:text-white transition-all flex items-center gap-3 text-sm md:text-base brutalist-border">
                {t.hero.btnContact} <Mail size={18} />
              </a>
            </div>
          </motion.div>

          <div className="lg:col-span-4 relative hidden lg:block h-[560px]">
              {/* Arknights Tactical Decorative Framework */}
            <div className="absolute -top-10 -right-10 w-32 h-32 border-t-4 border-r-4 border-brand-primary opacity-20 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 border-b-4 border-l-4 border-brand-black opacity-20 pointer-events-none" />
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, rotate: 5 }}
              animate={{ scale: 1, opacity: 1, rotate: 3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full h-full bg-brand-black brutalist-shadow relative overflow-hidden group cursor-grab active:cursor-grabbing border-4 border-brand-black"
            >
              {/* Halftone Glow for 3D Area */}
              <div className="absolute inset-0 halftone opacity-[0.1] text-white mix-blend-overlay pointer-events-none" />
              
              {/* Tactical Scanlines */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.05] to-transparent bg-[length:100%_4px] pointer-events-none z-10" />

              {/* Arknights Moving Scanning Bar */}
              <motion.div 
                animate={{ top: ['-10%', '110%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-[2px] bg-brand-primary/40 shadow-[0_0_15px_rgba(237,34,36,0.8)] z-20 pointer-events-none"
              />

              <div className="absolute inset-0 z-0">
                <Canvas 
                  camera={{ position: [0, 0, 5], fov: 45 }} 
                  gl={{ antialias: false, stencil: false, alpha: true, powerPreference: 'low-power' }}
                  dpr={[1, 1.5]}
                >
                  <color attach="background" args={["#030303"]} />
                  <ambientLight intensity={0.3} />
                  <pointLight position={[10, 10, 10]} intensity={1.2} color="#ED2224" />
                  <pointLight position={[-10, 5, -5]} intensity={0.4} color="#600000" />
                  <InteractiveCore />
                  <OrbitControls enableZoom={false} enablePan={false} />
                  
                  <EffectComposer multisampling={0}>
                    <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.7} mipmapBlur intensity={0.6} />
                    <Vignette eskil={false} offset={0.2} darkness={1.0} />
                  </EffectComposer>
                </Canvas>
              </div>
              
              <div className="absolute inset-4 border-2 border-white/10 pointer-events-none overflow-hidden">
                {/* Internal HUD elements */}
                <div className="absolute top-2 right-2 flex flex-col items-end opacity-40">
                  <div className="text-[6px] font-mono text-white">ID: 2279670554</div>
                  <div className="text-[6px] font-mono text-white">VER: 7.02.4</div>
                </div>
                
                {/* Tactical grid in a small corner */}
                <div className="absolute bottom-2 left-2 w-12 h-12 border border-white/5 layered-grid opacity-20" />
              </div>
              
              <div className="absolute top-6 left-6 bg-brand-primary text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest brutalist-border-small border-white z-10 flex items-center gap-2">
                <div className="w-2 h-2 bg-white rhombus-fill animate-pulse" />
                DrPrunus
              </div>

              {/* Arknights-style Tactical Labels */}
              <div className="absolute top-1/2 left-4 -translate-y-1/2 flex flex-col gap-8 opacity-40 z-10">
                <div className="flex flex-col">
                  <div className="text-[6px] font-mono text-white uppercase tracking-tighter">Lat_Coord</div>
                  <div className="text-[8px] font-mono text-brand-primary font-bold">39.9042° N</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[6px] font-mono text-white uppercase tracking-tighter">Lon_Coord</div>
                  <div className="text-[8px] font-mono text-brand-primary font-bold">116.4074° E</div>
                </div>
              </div>
              
               {/* Tactical Status Bars */}
              <div className="absolute bottom-6 right-6 flex items-center gap-4 z-20">
                <div className="flex flex-col items-end">
                   <div className="text-[7px] text-white/70 font-mono flex items-center gap-1">
                     <span className="animate-flicker">LOGIC_SYNC</span>
                     <div className="w-1 h-1 bg-brand-primary rounded-full animate-pulse" />
                   </div>
                   <div className="text-[7px] text-white/50 font-mono">CONNECTION_ESTABLISHED</div>
                   <div className="w-32 h-1.5 bg-white/20 brutalist-border-small border-white/10 overflow-hidden relative mt-1">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "95%" }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        className="h-full bg-brand-primary" 
                      />
                      {/* Sub-bar markers */}
                      <div className="absolute inset-0 flex justify-between px-2">
                        {[...Array(4)].map((_, i) => <div key={i} className="w-[1px] h-full bg-white/20" />)}
                      </div>
                   </div>
                </div>
              </div>

              <motion.div 
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [-6, -4, -6]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute -bottom-10 -left-10 w-40 h-32 bg-white brutalist-border z-20 flex flex-col pointer-events-none shadow-[8px_8px_0px_rgba(0,0,0,1)] overflow-hidden"
              >
                {/* Header Strip */}
                <div className="h-6 bg-brand-black w-full flex items-center justify-between px-2">
                  <span className="text-[6px] font-mono text-white/80 font-black tracking-widest uppercase">Personnel_File_V7</span>
                  <div className="flex gap-0.5">
                    <div className="w-1.5 h-1.5 bg-brand-primary rhombus-fill" />
                  </div>
                </div>
                
                {/* Main Content */}
                <div className="flex-1 flex p-2 gap-2">
                  <div className="w-1/3 border-r border-brand-black/10 flex flex-col items-center justify-center relative">
                    <Shield size={36} className="text-brand-black" />
                    <div className="absolute -bottom-1 left-0 text-[5px] font-mono font-black text-brand-primary">GUARD_CLASS</div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                         <div className="text-[7px] font-mono text-brand-black opacity-40 uppercase">Operator_Spec</div>
                         <div className="text-[9px] font-display font-black text-brand-black uppercase leading-none">High-Priority</div>
                    </div>
                    <div className="flex items-end justify-between">
                       <div className="flex flex-col">
                          <div className="text-[6px] font-mono text-brand-black/40">LEVEL</div>
                          <div className="text-sm font-display font-black leading-none">90</div>
                       </div>
                       {/* Elite 2 Icon Mockup */}
                       <div className="w-6 h-6 border-2 border-brand-primary/20 rotate-45 flex items-center justify-center">
                          <div className="w-4 h-4 bg-brand-primary/10 border border-brand-primary/40 rhombus-fill" />
                       </div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Deco */}
                <div className="h-2 caution-stripes opacity-20" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Projects */}
        <section id="works" className="relative pt-8">
          {/* Geometric Plane Accents - Bolder Layering */}
          <div className="absolute -left-60 top-0 w-[500px] h-[500px] bg-brand-primary/[0.03] -skew-x-12 -z-10 rotate-12" />
          <div className="absolute right-0 top-1/3 w-[40%] h-[2px] dashed-line-horizontal text-brand-black/5 -z-10" />
          <div className="absolute bottom-0 right-[10%] w-32 h-32 layered-grid text-brand-black opacity-[0.03] -z-10" />
          
          <div className="absolute -left-20 top-0 font-mono text-[120px] font-black opacity-[0.03] select-none pointer-events-none -rotate-90 origin-top-left">PROJECT_LIB</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-12">
            <SectionHeading icon={Layers} subtitle={t.sections.portfolio.subtitle}>
              {t.sections.portfolio.title}
            </SectionHeading>
            
            <div className="flex items-center gap-2 md:gap-3 mb-10 overflow-x-auto no-scrollbar lg:overflow-visible pb-2 max-w-full relative">
              <button
                onClick={() => setActiveTab('all')}
                className={`relative px-4 md:px-6 py-2 md:py-3 font-display font-black uppercase text-[10px] md:text-sm brutalist-border transition-all flex items-center gap-2 group whitespace-nowrap flex-shrink-0 ${activeTab === 'all' ? 'bg-brand-primary text-white translate-x-1 translate-y-1 shadow-none overflow-hidden' : 'bg-white hover:bg-brand-accent'}`}
              >
                {activeTab === 'all' && (
                  <>
                    <div className="w-2 md:w-2.5 h-2 md:h-2.5 bg-white rhombus-fill" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
                  </>
                )}
                {t.sections.portfolio.all}
                <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-current opacity-0 group-hover:opacity-40" />
              </button>
              {(['游戏拆解', 'PC'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-4 md:px-6 py-2 md:py-3 font-display font-black uppercase text-[10px] md:text-sm brutalist-border transition-all flex items-center gap-2 group whitespace-nowrap flex-shrink-0 ${activeTab === tab ? 'bg-brand-primary text-white translate-x-1 translate-y-1 shadow-none overflow-hidden' : 'bg-white hover:bg-brand-accent'}`}
                >
                  {activeTab === tab && (
                    <>
                      <div className="w-2 md:w-2.5 h-2 md:h-2.5 bg-white rhombus-fill" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
                    </>
                  )}
                  {(t.sections.portfolio as any).categories[tab] || tab}
                  <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-current opacity-0 group-hover:opacity-40" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  lang={lang} 
                  className={idx % 2 === 0 ? 'rotate-1' : '-rotate-1'} 
                />
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* About */}
        <section id="about" className="relative pt-8">
          {/* Section Auxiliary Lines */}
          <div className="absolute top-0 left-0 w-full h-[1px] dashed-line-horizontal text-brand-black/20" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] dashed-line-horizontal text-brand-black/20" />
          <div className="absolute top-1/2 left-0 w-48 h-[1px] bg-brand-primary/60 -translate-y-1/2 z-10" />
          <div className="absolute top-1/2 left-48 w-4 h-4 rhombus-marker text-brand-primary -translate-y-1/2 z-10" />

          <div className="absolute -right-20 top-40 font-mono text-[120px] font-black opacity-[0.02] select-none pointer-events-none rotate-90 origin-bottom-right">CURRICULUM</div>
          <div className="absolute top-0 left-0 w-full h-full diagonal-line opacity-5 -z-10" />
          <div className="max-w-7xl mx-auto relative ">
            {/* HUD Corner accents */}
            <div className="absolute -top-10 -left-10 w-24 h-24 border-t-2 border-l-2 border-brand-primary/20" />
            <div className="absolute -bottom-10 -right-10 w-24 h-24 border-b-2 border-r-2 border-brand-primary/20" />
            
            <div className="relative z-10">
              <SectionHeading icon={User} subtitle={t.sections.about.subtitle}>
                {t.sections.about.title}
              </SectionHeading>

              <div className="grid lg:grid-cols-12 gap-12 mt-16">
                {/* Text Content */}
                <div className="lg:col-span-12 space-y-8">
                  <div className="relative group">
                    <div className="absolute inset-x-0 -top-4 h-4 caution-stripes-subtle opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 halftone opacity-0 group-hover:opacity-10 transition-opacity translate-x-2 translate-y-2 -z-10" />
                    <div className="flex flex-col sm:flex-row gap-6 items-start bg-white p-6 md:p-8 tactical-border rotate-1 hover:rotate-0 transition-all origin-center group/card relative">
                      {/* Card HUD Corners */}
                      <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none border-t-4 border-r-4 border-brand-primary opacity-0 group-hover/card:opacity-100 transition-opacity" />
                      
                      <div className="bg-brand-primary p-4 brutalist-border flex-shrink-0 animate-pulse relative">
                        <Terminal className="text-white w-8 h-8" />
                        <div className="absolute -top-2 -left-2 w-4 h-4 bg-brand-black rotate-45" />
                      </div>
                      <div className="flex-1 tactical-bracket-l md:pl-8 border-brand-primary">
                        <div className="text-[12px] font-mono font-black text-brand-primary mb-3 tracking-[0.5em] flex items-center gap-2">
                           <div className="w-2 h-2 bg-brand-primary" />
                           <div className="h-[2px] w-12 bg-brand-primary/40" />
                        </div>
                        <p className="text-lg md:text-xl font-bold leading-tight">
                          {t.sections.about.p1}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-0 halftone-dense opacity-0 group-hover:opacity-20 transition-opacity -translate-x-2 translate-y-2 -z-10 text-brand-primary" />
                    <div className="flex flex-col sm:flex-row gap-6 items-start bg-brand-accent p-6 md:p-8 tactical-border -rotate-1 hover:rotate-0 transition-all origin-center">
                      <div className="bg-brand-black p-4 brutalist-border flex-shrink-0">
                        <Music className="text-white w-8 h-8" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                           <div className="w-1.5 h-1.5 bg-brand-black" />
                           <div className="h-[1px] w-8 bg-brand-black/30" />
                        </div>
                        <p className="text-lg md:text-xl font-bold leading-tight">
                          {t.sections.about.p2}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-x-0 -bottom-4 h-4 caution-stripes-subtle opacity-0 group-hover:opacity-100 transition-opacity rotate-180" />
                    <div className="absolute inset-0 halftone opacity-0 group-hover:opacity-10 transition-opacity translate-x-2 -translate-y-2 -z-10" />
                    <div className="flex flex-col sm:flex-row gap-6 items-start bg-white p-6 md:p-8 tactical-border rotate-0.5 hover:rotate-0 transition-all origin-center">
                      <div className="bg-brand-primary p-4 brutalist-border flex-shrink-0">
                        <Layout className="text-white w-8 h-8" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                           <div className="w-1.5 h-1.5 bg-brand-primary" />
                           <div className="h-[1px] w-8 bg-brand-primary/30" />
                        </div>
                        <p className="text-lg md:text-xl font-bold leading-tight">
                          {t.sections.about.p3}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tech Grids */}
                <div className="lg:col-span-6">
                  <div className="bg-white p-8 brutalist-border h-full">
                    <h4 className="text-brand-primary font-display font-black uppercase mb-8 text-2xl border-b-4 border-brand-primary pb-2 flex items-center gap-3">
                      <Monitor className="w-6 h-6" /> {t.sections.about.tech}
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-black font-mono">
                      <li className="flex items-center gap-3 p-2 bg-brand-bg/50 brutalist-border-small group hover:bg-white transition-colors">
                        <div className="w-8 h-8 bg-white brutalist-border-small flex items-center justify-center p-1 group-hover:rotate-3 transition-transform">
                          <img 
                            src="https://cdn.simpleicons.org/unity/000000" 
                            alt="Unity" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="whitespace-nowrap">unity // C#</span>
                      </li>
                      <li className="flex items-center gap-3 p-2 bg-brand-bg/50 brutalist-border-small group hover:bg-white transition-colors">
                        <div className="w-8 h-8 bg-white brutalist-border-small flex items-center justify-center p-1 group-hover:-rotate-3 transition-transform">
                          <img 
                            src="https://cdn.simpleicons.org/godotengine/478CBF" 
                            alt="Godot" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="whitespace-nowrap">Godot Engine</span>
                      </li>
                      <li className="flex items-center gap-3 p-2 bg-brand-bg/50 brutalist-border-small group hover:bg-white transition-colors">
                        <div className="w-8 h-8 bg-white brutalist-border-small flex items-center justify-center p-1 group-hover:rotate-3 transition-transform">
                          <img 
                            src="https://cdn.simpleicons.org/unrealengine/000000" 
                            alt="Unreal" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="whitespace-nowrap">Unreal Engine</span>
                      </li>
                      <li className="flex items-center gap-3 p-2 bg-brand-bg/50 brutalist-border-small group hover:bg-white transition-colors">
                        <div className="w-8 h-8 bg-white brutalist-border-small flex items-center justify-center p-1 group-hover:-rotate-3 transition-transform">
                          <img 
                            src="https://cdn.simpleicons.org/python/3776AB" 
                            alt="Python" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="whitespace-nowrap">Python // Ren'py</span>
                      </li>
                      <li className="flex items-center gap-3 p-2 bg-brand-bg/50 brutalist-border-small group hover:bg-white transition-colors">
                        <div className="w-8 h-8 bg-white brutalist-border-small flex items-center justify-center p-1 group-hover:rotate-3 transition-transform">
                          <img 
                            src="/FL.png" 
                            alt="FL Studio" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="whitespace-nowrap">FL studio</span>
                      </li>
                      <li className="flex items-center gap-3 p-2 bg-brand-bg/50 brutalist-border-small group hover:bg-white transition-colors">
                        <div className="w-8 h-8 bg-white brutalist-border-small flex items-center justify-center p-1 group-hover:rotate-3 transition-transform">
                          <img 
                            src="https://cdn.simpleicons.org/aseprite/7D929E" 
                            alt="Aseprite" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="whitespace-nowrap">Aseprite</span>
                      </li>
                      <li className="flex items-center gap-3 p-2 bg-brand-bg/50 brutalist-border-small group hover:bg-white transition-colors">
                        <div className="w-8 h-8 bg-white brutalist-border-small flex items-center justify-center p-1 group-hover:-rotate-3 transition-transform">
                          <img 
                            src="/axure.png" 
                            alt="Axure" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="whitespace-nowrap">Axure</span>
                      </li>
                      <li className="flex items-center gap-3 p-2 bg-brand-bg/50 brutalist-border-small group hover:bg-white transition-colors">
                        <div className="w-8 h-8 bg-white brutalist-border-small flex items-center justify-center p-1 group-hover:rotate-3 transition-transform">
                          <img 
                            src="/xmind.png" 
                            alt="XMind" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="whitespace-nowrap">XMind</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="bg-brand-black text-white p-8 brutalist-border h-full flex flex-col">
                    <h4 className="text-brand-accent font-display font-black uppercase mb-8 text-2xl border-b-4 border-brand-accent pb-2 flex items-center gap-3">
                      <Briefcase className="w-6 h-6" /> {t.sections.about.disciplines}
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-black font-mono flex-1">
                      <li className="flex items-center gap-3 p-2 bg-white/10 brutalist-border-small group hover:bg-white/20 transition-colors border-white/20">
                        <div className="w-8 h-8 bg-brand-accent flex items-center justify-center p-1 group-hover:rotate-3 transition-transform brutalist-border-small border-black">
                          <Sword className="w-5 h-5 text-black" />
                        </div>
                        <span className="whitespace-nowrap">{lang === 'zh' ? 'RPG' : 'RPG'}</span>
                      </li>
                      <li className="flex items-center gap-3 p-2 bg-white/10 brutalist-border-small group hover:bg-white/20 transition-colors border-white/20">
                        <div className="w-8 h-8 bg-brand-accent flex items-center justify-center p-1 group-hover:-rotate-3 transition-transform brutalist-border-small border-black">
                          <Zap className="w-5 h-5 text-black" />
                        </div>
                        <span className="whitespace-nowrap">{lang === 'zh' ? '平台跳跃' : 'Platformer'}</span>
                      </li>
                      <li className="flex items-center gap-3 p-2 bg-white/10 brutalist-border-small group hover:bg-white/20 transition-colors border-white/20">
                        <div className="w-8 h-8 bg-brand-accent flex items-center justify-center p-1 group-hover:rotate-3 transition-transform brutalist-border-small border-black">
                          <Users className="w-5 h-5 text-black" />
                        </div>
                        <span className="whitespace-nowrap">{lang === 'zh' ? '社交 / 在线 / 竞技' : 'Social / Online / Competitive'}</span>
                      </li>
                      <li className="flex items-center gap-3 p-2 bg-white/10 brutalist-border-small group hover:bg-white/20 transition-colors border-white/20">
                        <div className="w-8 h-8 bg-brand-accent flex items-center justify-center p-1 group-hover:-rotate-3 transition-transform brutalist-border-small border-black">
                          <Target className="w-5 h-5 text-black" />
                        </div>
                        <span className="whitespace-nowrap">{lang === 'zh' ? '策略类' : 'Strategy'}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Steam Gaming Experience */}
        <section id="steam" className="relative pt-24 pb-12">
          {/* Decorative Plane */}
          <div className="absolute -left-20 top-40 font-mono text-[100px] font-black opacity-[0.02] select-none pointer-events-none -rotate-90 origin-top-left">GAMING_LOG</div>
          
          <div className="max-w-7xl mx-auto">
             <SteamExperience lang={lang} />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="relative py-8 overflow-hidden">
          <div className="absolute inset-0 bg-brand-black/5 -z-10" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 layered-grid w-full h-1/2 text-brand-black opacity-[0.02] select-none pointer-events-none -z-10" />
          
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading icon={Rocket} subtitle={t.sections.contact.subtitle}>
              {t.sections.contact.title}
            </SectionHeading>
            
            {/* Tactical Divider */}
            <div className="h-4 w-full caution-stripes opacity-20 mb-12 -rotate-1 brutalist-border-small border-brand-black/10" />

            <div className="max-w-4xl mx-auto mt-12 bg-white brutalist-border p-6 md:p-16 relative shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] md:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
              {/* Decorative Warning Element */}
              <div className="absolute -top-6 -right-6 md:-top-8 md:-right-8 w-16 h-16 md:w-20 md:h-20 bg-brand-accent rounded-full border-4 border-brand-black flex items-center justify-center font-black text-2xl md:text-3xl z-20 brutalist-shadow rotate-12">!</div>
              
              {t.sections.contact.text && (
                <div className="mb-12 md:mb-16">
                  <p className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] italic text-left border-l-4 md:border-l-8 border-brand-primary pl-4 md:pl-6">
                    "{t.sections.contact.text}"
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-6 md:gap-12">
                {/* Email Channels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <a href={`mailto:${t.sections.contact.btnEmail}`} className="group relative bg-brand-primary text-white p-6 md:p-8 brutalist-border brutalist-shadow hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden flex flex-col justify-between min-h-[140px] md:min-h-[180px]">
                    <div className="absolute inset-0 halftone opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-0.5">
                           <div className="w-2 h-2 bg-white" />
                           <div className="w-2 h-2 bg-white/20" />
                        </div>
                        <span className="text-[10px] md:text-base font-mono opacity-100 uppercase tracking-widest font-black">QQ Email</span>
                      </div>
                      <Mail size={20} className="md:w-6 md:h-6 group-hover:rotate-12 transition-transform" />
                    </div>
                    <div className="text-left">
                      <span className="text-lg md:text-xl lg:text-2xl font-black whitespace-nowrap tracking-tighter block truncate">
                        {t.sections.contact.btnEmail}
                      </span>
                    </div>
                  </a>

                  <a href={`mailto:${t.sections.contact.btnGmail}`} className="group relative bg-brand-accent text-brand-black p-6 md:p-8 brutalist-border brutalist-shadow hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden flex flex-col justify-between min-h-[140px] md:min-h-[180px]">
                    <div className="absolute inset-0 halftone opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-0.5">
                           <div className="w-2 h-2 bg-brand-black" />
                           <div className="w-2 h-2 bg-brand-black/20" />
                        </div>
                        <span className="text-[10px] md:text-base font-mono opacity-100 uppercase tracking-widest font-black">Gmail</span>
                      </div>
                      <Mail size={20} className="md:w-6 md:h-6 group-hover:rotate-12 transition-transform" />
                    </div>
                    <div className="text-left">
                      <span className="text-lg md:text-xl lg:text-2xl font-black whitespace-nowrap tracking-tighter block truncate">
                        {t.sections.contact.btnGmail}
                      </span>
                    </div>
                  </a>
                </div>

                {/* WeChat Channel - Full Width */}
                <button 
                  onClick={handleCopyWeChat}
                  className="w-full bg-brand-black text-white p-6 md:p-12 brutalist-border brutalist-shadow relative overflow-hidden group hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] md:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.1)] transition-all cursor-pointer"
                >
                  <div className="absolute top-0 right-0 w-48 h-full bg-brand-accent/10 skew-x-[-20deg] translate-x-24" />
                  
                  <AnimatePresence>
                    {copied && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute inset-0 flex items-center justify-center bg-brand-accent/90 z-30"
                      >
                        <span className="text-brand-black text-2xl md:text-4xl font-black uppercase tracking-widest flex items-center gap-4">
                          <Rocket className="animate-bounce" /> {lang === 'zh' ? '已复制！' : 'COPIED!'}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-accent flex items-center justify-center brutalist-border rotate-3 group-hover:rotate-0 transition-transform">
                      <MessageSquare size={32} className="md:w-10 md:h-10 text-brand-black" />
                    </div>
                    <div className="text-center md:text-left">
                      <span className="block text-[10px] md:text-sm text-brand-accent font-mono uppercase tracking-[0.3em] mb-2 font-black group-hover:text-white transition-colors">WeChat (Click to Copy)</span>
                      <p className="text-2xl sm:text-4xl md:text-6xl font-black font-mono tracking-tighter text-white truncate max-w-full">
                        {t.sections.contact.btnWechat}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-10 border-t-8 border-brand-black bg-brand-black text-white px-6 py-6 relative overflow-hidden">
        {/* Warning Stripe */}
        <div className="absolute top-0 left-0 w-full h-1 caution-stripes opacity-40" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10 pt-4">
           <div className="flex justify-center gap-1 mb-4">
              {[...Array(8)].map((_, i) => <div key={i} className="w-4 h-1 bg-brand-primary/20" />)}
           </div>
          <p className="text-white/40 text-lg font-medium tracking-wide font-mono">
            © {new Date().getFullYear()} DrPrunus
          </p>
        </div>
      </footer>
    </div>
  );
}
