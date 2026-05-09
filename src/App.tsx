import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Cpu, 
  Rocket, 
  Github, 
  Twitter, 
  Mail, 
  ChevronRight,
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
  MessageSquare
} from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Wireframe, Html } from '@react-three/drei';
import * as THREE from 'three';
import { translations, Language } from './translations';

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
}

// --- Mock Data ---
const PROJECTS: Project[] = [
  {
    id: '8',
    title: 'GhostCookies',
    category: 'PC',
    description: {
      zh: '2D 益智类网页游戏 | Unity 引擎 | 2025 Brackeys Jam 7 天极限创作赛事参赛作品。以 “鬼魂吃饼干” 为核心玩法，针对 H5 平台特性深度适配优化，独自完成策划、程序开发及音乐与音效设计。',
      en: '2D Puzzle Web Game developed in Unity for 2025 Brackeys Jam 7-day challenge. Features "Ghost eating cookies" core gameplay, deeply optimized for H5 platforms. Roles: Design, Development, Music & Sound.',
      ja: 'Unityで制作された2Dパズルウェブゲーム。2025 Brackeys Jam 7日間ジャム参加作品。「幽霊がクッキーを食べる」核心的な遊び。H5プラットフォーム向けに最適化。役割：企画、開発、音楽、効果音。'
    },
    image: '/covers/gc.png', // Path: /covers/gc.png
    tags: ['策划', '程序开发', '音乐', 'Unity'],
    link: 'https://volticx.itch.io/ghostcookies',
    github: '#'
  },
  {
    id: '4',
    title: '404 Princess Not Found',
    category: 'PC',
    description: {
      zh: 'HD2D 探索解谜游戏 | Unity 引擎 | 2025 TapTap 聚光灯 GameJam 21 天极限创作赛事参赛作品。以“勇者修复残缺游戏世界 Bug、追寻不存在的公主”为主线，担任策划、程序开发与音乐制作，上线 TapTap PC 端。',
      en: 'HD2D Exploration Puzzle Game developed in Unity for 2025 TapTap Spotlight GameJam 21-day challenge. A meta-narrative adventure about a hero fixing system bugs to find a non-existent princess. Roles: Design, Dev, Music.',
      ja: 'Unityで制作されたHD2D探索パズルゲーム。2025 TapTap Spotlight GameJam 21日間チャレンジ参加作品。勇者がバグを修正しながら存在しない王女を探すメタフィクション。役割：企画、開発、音楽。'
    },
    image: '/covers/404.jpg', // Path: /covers/404.jpg
    tags: ['策划', '程序开发', '音乐', 'Unity'],
    link: 'https://www.taptap.cn/app/779210?os=pc',
    github: '#'
  },
  {
    id: '5',
    title: '《杀戮尖塔》核心模块拆解',
    category: '游戏拆解',
    description: {
      zh: '该拆解案聚焦《杀戮尖塔》的战斗、卡牌、关卡三大核心系统，深度解析其“可控随机性+卡组构筑成长+风险收益选择”的核心设计逻辑。',
      en: 'Focusing on the combat, card, and level systems of Slay the Spire, deeply analyzing its core design logic of "controlled randomness + deck construction growth + risk-reward choice."',
      ja: '「Slay the Spire」の戦闘、カード、ステージの3大コアシステムに焦点を当て、「コントロールされたランダム性＋デッキ構築の成長＋リスク・リターンの選択」というコアな設計ロジックを深く解析。'
    },
    image: '/covers/sts.png', // Path: /covers/sts.png
    tags: ['系统设计', '卡牌构筑', '数值平衡'],
    link: 'https://xcnselbxoekt.feishu.cn/drive/folder/VZLQfKfxhlBxHkdw3ykcwPCwn7g',
    github: '#'
  },
  {
    id: '6',
    title: '《深岩银河》赛季通行证系统拆解',
    category: '游戏拆解',
    description: {
      zh: '该拆解案聚焦《深岩银河》通行证 “可自由切换任意永久赛季 + 线性进度 + 非线性奖励树” 的核心设计，剖析其如何通过去时间压力、高自主解锁机制，实现长期友好的玩家体验与正向社群效应。',
      en: 'Focuses on Deep Rock Galactic\'s "switchable permanent seasons + linear progress + non-linear reward tree" design, analyzing how it achieves long-term player friendly experience through high autonomy.',
      ja: '「Deep Rock Galactic」の「いつでも切り替え可能な永久シーズン＋線形進捗＋非線形報酬ツリー」のコア設計に焦点を当て、時間制約の排除と高い自主性による長期的なプレイヤー体験を分析。'
    },
    image: '/covers/dr.png',
    tags: ['通行证设计', '系统分析', '数值构架'],
    link: 'https://xcnselbxoekt.feishu.cn/drive/folder/BnVjfi28ulUhZkdw4NIcoFimnid',
    github: '#'
  },
  {
    id: '7',
    title: '《光·遇》社交系统拆解案',
    category: '游戏拆解',
    description: {
      zh: '该拆解案聚焦《光·遇》以“情绪连接”为核心的社交系统，深度解析陌生人互动、好友关系、情绪动作、礼物互赠等六大模块，剖析其“非语言沟通+轻量协作+双向付出”的关系构建路径。',
      en: 'Deeply analyzes Sky: Children of the Light\'s social system focused on "emotional connection," exploring non-verbal communication, lightweight cooperation, and the design trade-offs of the anonymity mechanism.',
      ja: '「Sky 星を紡ぐ子どもたち」の「情緒的な繋がり」を核心としたソーシャルシステムを深く解析。非言語コミュニケーション、軽量な協調、匿名メカニズムの設計上の選択を剖析。'
    },
    image: '/covers/gy.png',
    tags: ['社交系统', '交互设计', '3C逻辑'],
    link: 'https://xcnselbxoekt.feishu.cn/drive/folder/UwMOfYpM0lgN9LdkJc3cpRronph',
    github: '#'
  },
  {
    id: '9',
    title: 'Connection',
    category: 'PC',
    description: {
      zh: '一款深度的角色养成模拟游戏，玩家通过管理多种属性指标来引导女儿的成长轨迹，探索成长过程中的可能性与羁绊。',
      en: 'A deep character growth simulation game where players guide their daughter\'s growth through a variety of attributes, exploring possibilities and connections.',
      ja: '深いキャラクター育成シミュレーションゲーム。プレイヤーはさまざまな属性を管理することで娘の成長を導き、成長過程における可能性と絆を探索します。'
    },
    image: '/covers/c.jpg',
    tags: ['养成模拟', '角色设计', '数值策划'],
    link: 'https://tzzsleep.itch.io/connection',
    github: '#'
  },
  {
    id: '10',
    title: '完美通关',
    category: 'PC',
    description: {
      zh: '有时候通关并不是游戏的终点，试试利用道具，达成完美通关吧！玩家需要通过鼠标点击规划路径，并在特定关卡巧用获得的道具来达成“完美”成就。',
      en: 'Clearing the level is just the beginning. Use items strategically to achieve a "Perfect Clear"! A puzzle game focused on path planning and item management.',
      ja: 'クリアは終わりではありません。アイテムを駆使して「パーフェクトクリア」を目指しましょう！パスプランニングとアイテム使用が鍵となるパズルゲーム。'
    },
    image: '/covers/pc.png',
    tags: ['关卡设计', '解谜逻辑', '道具系统'],
    link: 'https://034gamejam.uneoon.com/games/24',
    github: '#'
  }
];

// --- Sub-components ---

// --- Components ---

function InteractiveCore() {
  const innerRef = React.useRef<THREE.Group>(null!);
  const ring1Ref = React.useRef<THREE.Mesh>(null!);
  const ring2Ref = React.useRef<THREE.Mesh>(null!);
  const ring3Ref = React.useRef<THREE.Mesh>(null!);
  const ring4Ref = React.useRef<THREE.Group>(null!);
  const groupRef = React.useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    groupRef.current.rotation.y = time * 0.08;
    
    if (innerRef.current) {
      innerRef.current.rotation.x = time * 0.15;
      innerRef.current.rotation.y = time * 0.25;
      // Irregular aggressive pulse
      const pulse = 1 + (Math.sin(time * 2) * 0.02 + Math.sin(time * 5) * 0.01);
      innerRef.current.scale.set(pulse, pulse, pulse);
    }
    
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.4;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.6;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = time * 0.3;
      ring3Ref.current.rotation.y = time * 0.2;
    }
    if (ring4Ref.current) {
      ring4Ref.current.rotation.z = time * 1.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Originium Crystal Cluster */}
      <group ref={innerRef}>
        <mesh>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            color="#080808" 
            emissive="#ED2224"
            emissiveIntensity={1.2}
            flatShading
            metalness={1}
            roughness={0}
          />
        </mesh>
        <mesh scale={1.1}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            color="#ED2224"
            transparent
            opacity={0.15}
            wireframe
          />
        </mesh>
        {/* Floating internal dots */}
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[Math.sin(i) * 0.5, Math.cos(i) * 0.5, Math.sin(i * 2) * 0.5]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#ED2224" />
          </mesh>
        ))}
      </group>

      {/* Heavy Circular Logic Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.6, 0.01, 16, 4]} />
        <meshStandardMaterial color="#ED2224" emissive="#ED2224" emissiveIntensity={5} />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 1.82, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>

      {/* Dashed outer ring simulation using points */}
      <group ref={ring4Ref}>
        {[...Array(32)].map((_, i) => {
          const angle = (i / 32) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(angle) * 2.1, Math.sin(angle) * 2.1, 0]}>
              <boxGeometry args={[0.1, 0.01, 0.01]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
            </mesh>
          );
        })}
      </group>

      {/* Floating Tactical Tags (No Text) */}
      {[...Array(6)].map((_, i) => {
        const radius = 2.4;
        const angle = (i / 6) * Math.PI * 2;
        return (
          <Float key={i} speed={2} rotationIntensity={0} floatIntensity={1}>
            <group position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
               <mesh>
                 <boxGeometry args={[0.01, 1, 0.01]} />
                 <meshBasicMaterial color="#ED2224" transparent opacity={0.2} />
               </mesh>
               <mesh position={[0, 0.5, 0]}>
                 <sphereGeometry args={[0.03, 8, 8]} />
                 <meshBasicMaterial color="#ffffff" />
               </mesh>
            </group>
          </Float>
        );
      })}

      {/* Warning/Hazard Visual Layer */}
      <mesh ref={ring3Ref}>
        <octahedronGeometry args={[2.2, 0]} />
        <meshStandardMaterial transparent opacity={0} />
        <Wireframe 
          stroke="#ED2224" 
          thickness={0.01} 
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Originium Dust/Particles */}
      <group>
        {[...Array(40)].map((_, i) => (
          <Float key={i} speed={4} rotationIntensity={10}>
            <mesh position={[
              (Math.random() - 0.5) * 6,
              (Math.random() - 0.5) * 6,
              (Math.random() - 0.5) * 6
            ]}>
              <boxGeometry args={[0.02, 0.02, 0.02]} />
              <meshBasicMaterial color="#ED2224" transparent opacity={Math.random() * 0.7} />
            </mesh>
          </Float>
        ))}
      </group>

      <pointLight intensity={6} distance={8} color="#ED2224" />
      <pointLight position={[2, 2, 2]} intensity={2} color="#ffffff" />
    </group>
  );
}

const SectionHeading = ({ children, icon: Icon, subtitle }: { children: React.ReactNode, icon?: any, subtitle?: string }) => (
  <div className="mb-12 relative flex flex-col items-start group pt-6">
    {/* Rhombus Section Marker */}
    <div className="absolute -left-12 top-14 text-brand-primary">
      <div className="rhombus-marker animate-pulse" />
    </div>

    {/* Abstract background planes - Multi-layered */}
    <div className="absolute -left-16 top-0 w-40 h-full bg-brand-primary/[0.03] -skew-x-[24deg] -z-10 group-hover:bg-brand-primary/5 transition-all duration-700" />
    <div className="absolute -left-10 top-0 w-32 h-full bg-brand-black/[0.02] -skew-x-[20deg] -z-10" />
    <div className="absolute left-0 top-0 w-full h-[2px] bg-brand-black/20" />
    
    <div className="flex items-center gap-6 mb-6">
      <div className="h-[2px] flex-1 min-w-[200px] bg-gradient-to-r from-brand-primary via-brand-black/10 to-transparent" />
    </div>

    <div className="flex items-center gap-10 mb-6 relative">
      {Icon && (
        <div className="relative group/icon scale-125">
          <div className="absolute -inset-6 border border-brand-primary/20 rotate-45 group-hover:rotate-90 transition-transform duration-1000" />
          <div className="absolute inset-x-0 -top-3 -bottom-3 border-l-[6px] border-r-[6px] border-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="bg-brand-primary p-4 tactical-border text-white rotate-[-4deg] group-hover:rotate-0 transition-all shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)]">
            <Icon size={36} />
          </div>
        </div>
      )}
      <div className="flex flex-col">
        <h2 className="text-7xl md:text-9xl font-display font-black uppercase tracking-tighter leading-[0.8] italic group-hover:text-brand-primary transition-colors">
          {children}
        </h2>
      </div>
    </div>

    {subtitle && (
      <div className="flex items-center gap-8 w-full mt-4 pl-4">
        <div className="w-12 h-12 rounded-none border-4 border-brand-primary/20 flex items-center justify-center group-hover:rotate-[225deg] transition-transform duration-1000">
           <div className="w-8 h-[3px] bg-brand-primary/40" />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-brand-black/80 font-mono text-[14px] uppercase tracking-[0.8em] font-black whitespace-nowrap">
            {subtitle}
          </p>
          <div className="w-full h-1 geometric-stripe text-brand-primary/10" />
        </div>
        <div className="flex-1 h-[2px] dashed-line-horizontal text-brand-black/40" />
        <div className="flex gap-2 items-end h-10">
           <div className="w-3 h-full bg-brand-primary" />
           <div className="w-3 h-2/3 bg-brand-black" />
           <div className="w-3 h-1/3 bg-brand-primary/30" />
        </div>
      </div>
    )}

    <div className="absolute top-0 right-0 w-32 h-32 border-t-8 border-r-8 border-brand-black/[0.03] transition-all group-hover:border-brand-primary/10 pointer-events-none" />
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
  const imageUrl = getImageUrl(project.image);

  const CardContent = (
    <div className={`group relative h-full bg-white tactical-border overflow-hidden transition-all hover:rotate-0 hover:scale-[1.02] ${className} origin-center shadow-xl`}>
      {/* Tactical UI Frame Brackets (Animated on hover) */}
      <div className="absolute -inset-1 border border-brand-primary/0 group-hover:border-brand-primary/40 transition-all duration-300 pointer-events-none" />
      
      {/* Corner Brackets */}
      <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-brand-primary opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 group-hover:scale-110" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-brand-primary opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 group-hover:scale-110" />

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

      {/* Tactical Marker Badge Removed */}

      {/* Barcode side decor */}
      <div className="absolute bottom-10 -right-6 w-32 h-4 rotate-90 opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none barcode-sim text-brand-black" />

      {/* Halftone texture that follows the card */}
      <div className="absolute inset-0 halftone opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none" />
      
      <div className="aspect-video relative overflow-hidden border-b-2 border-brand-black bg-brand-black/5">
        <img 
          src={imageError ? `https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800&sig=${project.id}` : imageUrl} 
          alt={project.title} 
          className="object-cover w-full h-full transition-all duration-500 rounded-none"
          referrerPolicy="no-referrer"
          onError={(e) => {
            console.warn(`Failed to load image at: ${imageUrl}. Check if the file exists in public/covers/`);
            if (!imageError) {
              setImageError(true);
            }
          }}
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
          {project.description[lang]}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="text-[9px] font-black bg-brand-black text-white px-2 py-0.5 uppercase tracking-tighter">
              {tag}
            </span>
          ))}
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

export default function App() {
  const [lang, setLang] = useState<Language>('zh');
  const [activeTab, setActiveTab] = useState<'all' | Project['category']>('all');
  const [copied, setCopied] = useState(false);

  const t = translations[lang];

  const handleCopyWeChat = () => {
    navigator.clipboard.writeText(t.sections.contact.btnWechat);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredProjects = activeTab === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen selection:bg-brand-primary selection:text-white pb-10 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-brand-bg" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] -z-10 halftone-dense" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] -z-10 halftone-big" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.5] -z-10 scanlines" />
      <div className="fixed inset-0 pointer-events-none -z-10 tactical-grid opacity-[0.1]" />

      {/* Blueprint Measuring Lines */}
      <div className="fixed left-6 top-0 bottom-0 w-[1px] dashed-line-vertical text-brand-black/10 -z-10" />
      <div className="fixed right-6 top-0 bottom-0 w-[1px] dashed-line-vertical text-brand-black/10 -z-10" />
      <div className="fixed top-24 left-0 right-0 h-[1px] dashed-line-horizontal text-brand-black/10 -z-10" />
      
      {/* Screen Frame Markers */}
      <div className="fixed top-6 left-6 w-32 h-32 border-t-2 border-l-2 border-brand-black/10 -z-10 pointer-events-none" />
      <div className="fixed bottom-6 right-6 w-32 h-32 border-b-2 border-r-2 border-brand-black/10 -z-10 pointer-events-none" />

      <div className="fixed bottom-10 right-10 text-brand-black/20 font-mono text-[8px] pointer-events-none rotate-90 origin-bottom-right tracking-widest">COORD_SYS_ACTIVE</div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-brand-black text-white px-6 py-2.5 flex justify-between items-center overflow-hidden border-b-2 border-brand-primary shadow-2xl">
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4 group"
          >
            <div 
              onClick={() => window.location.reload()}
              className="relative w-10 h-10 bg-brand-primary flex items-center justify-center -rotate-3 hover:rotate-0 transition-all cursor-pointer brutalist-border border-white overflow-hidden"
            >
              <div className="absolute inset-0 halftone opacity-20" />
              <span className="relative text-white font-display font-black text-2xl group-hover:scale-0 transition-all duration-300">桃</span>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-500 text-white">
                <RefreshCcw className="w-5 h-5" />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg tracking-tighter normal-case font-sans">DrPrunus</span>
            </div>
          </motion.div>
          
          <div className="flex items-center gap-8">
            <div className="hidden lg:flex gap-10">
                  {['intro', 'works', 'about', 'contact'].map((id, idx) => (
                <a 
                  key={id} 
                  href={`#${id}`} 
                  className="hover:text-brand-primary transition-colors flex items-center gap-2 group relative py-1"
                >
                  <span className="uppercase text-[12px] tracking-widest font-black">{t.nav[id as keyof typeof t.nav]}</span>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-1 bg-white/10 p-1 brutalist-border border-white/20">
              {(['zh', 'en', 'ja'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 text-[10px] uppercase font-black transition-all ${lang === l ? 'bg-brand-primary text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header id="intro" className="relative pt-8 pb-6 px-6 max-w-7xl mx-auto overflow-hidden">
        {/* HUD Frame Angles */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-30">
          <div className="hud-angle hud-angle-tl text-brand-primary" />
          <div className="hud-angle hud-angle-tr text-brand-primary" />
          <div className="hud-angle hud-angle-bl text-brand-primary" />
          <div className="hud-angle hud-angle-br text-brand-primary" />
          
          {/* Internal framing lines */}
          <div className="absolute top-10 left-10 right-10 h-[1px] bg-brand-black/5" />
          <div className="absolute bottom-10 left-10 right-10 h-[1px] bg-brand-black/5" />
          <div className="absolute top-10 bottom-10 left-10 w-[1px] bg-brand-black/5" />
          <div className="absolute top-10 bottom-10 right-10 w-[1px] bg-brand-black/5" />
        </div>

        {/* Decorative HUD Frame */}
        <div className="absolute inset-4 pointer-events-none z-40 border border-brand-black/5 invisible xl:block">
           <div className="ui-frame-corner ui-frame-corner-tl text-brand-primary/20 opacity-50" />
           <div className="ui-frame-corner ui-frame-corner-br text-brand-primary/20 opacity-50" />
           
           {/* Side Markers */}
           <div className="absolute top-1/2 left-0 -translate-y-1/2 h-32 w-1 bg-brand-primary/10" />
           <div className="absolute top-1/2 right-0 -translate-y-1/2 h-32 w-1 bg-brand-primary/10" />
        </div>

        {/* Tactical Background elements - Points, Lines, Planes */}
        <div className="absolute inset-0 crosshair-bg opacity-[0.03] pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-black/5 -skew-x-[20deg] translate-x-1/2 -z-10" />
        
        {/* Multi-layered geometric panels */}
        <div className="absolute -top-40 right-1/4 w-[40%] h-[150%] bg-brand-primary/[0.03] skew-x-12 -z-10" />
        <div className="absolute -bottom-40 left-1/4 w-[30%] h-[120%] bg-brand-black/[0.02] -skew-x-12 -z-10" />
        
        {/* Floating crosshairs and markers */}
        <div className="absolute top-1/4 left-[5%] w-32 h-32 border border-brand-black/5 flex items-center justify-center -z-10">
           <div className="w-16 h-[1px] bg-brand-primary/20" />
           <div className="h-16 w-[1px] bg-brand-primary/20 absolute" />
           <div className="absolute inset-8 border border-brand-primary/10 rounded-full animate-ping" />
        </div>

        {/* Tactical abstract planes */}
        <div className="absolute -bottom-10 right-1/4 w-32 h-64 bg-brand-primary/5 rotate-12 -z-10" />
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-brand-black/5 -rotate-45 -z-10" />
        
        {/* Floating Crosshairs (Animated) */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-32 h-32 opacity-10 pointer-events-none"
        >
           <div className="absolute top-1/2 left-0 w-full h-[1px] bg-brand-black" />
           <div className="absolute left-1/2 top-0 w-[1px] h-full bg-brand-black" />
           <div className="absolute inset-4 border border-brand-black rounded-full" />
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
            <div className="inline-block bg-brand-primary text-white px-6 py-2 mb-8 -rotate-1 brutalist-shadow font-display font-black normal-case tracking-tighter text-4xl">
              Hi, I'm <span className="relative group/name cursor-help inline-grid place-items-center ml-1">
                <span className="transition-all duration-300 group-hover/name:opacity-0 group-hover/name:translate-y-2 group-hover/name:blur-sm">
                  DrPrunus
                </span>
                <span className="absolute inset-0 opacity-0 group-hover/name:opacity-100 transition-all duration-300 flex items-center justify-center font-sans tracking-normal -translate-y-2 group-hover/name:translate-y-0 text-brand-accent">
                  张溯峻
                </span>
              </span>
            </div>
            <div className="flex flex-col mb-12">
              <motion.h1 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-[4.5rem] lg:text-[5.5rem] font-display font-black leading-[0.75] tracking-tighter uppercase text-brand-black whitespace-nowrap"
              >
                {t.hero.roleGame}
              </motion.h1>
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4 md:gap-8 -mt-1 md:-mt-2 ml-4 md:ml-8"
              >
                <h2 className="text-2xl md:text-[3.5rem] lg:text-[4.5rem] font-display font-black leading-[0.75] tracking-tighter uppercase text-brand-primary italic drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] whitespace-nowrap">
                  {t.hero.roleMusic}
                </h2>
              </motion.div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-brand-black text-lg leading-tight font-black p-8 border-l-[12px] border-brand-primary bg-white brutalist-border relative"
              >
                <div className="absolute -top-4 -right-4 bg-brand-black text-white px-3 py-1 text-xs uppercase font-mono brutalist-shadow-small">
                  Logic
                </div>
                {t.hero.subtitleGame}
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-brand-black text-lg leading-tight font-black p-8 border-l-[12px] border-brand-accent bg-white brutalist-border mt-4 md:mt-8 relative"
              >
                <div className="absolute -top-4 -right-4 bg-brand-black text-white px-3 py-1 text-xs uppercase font-mono brutalist-shadow-small">
                  Vibe
                </div>
                {t.hero.subtitleMusic}
              </motion.div>
            </div>
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="relative group">
                <div className="absolute -inset-2 border border-brand-primary/0 group-hover:border-brand-primary/40 transition-all pointer-events-none invisible lg:visible" />
                {/* Tactical Points */}
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity invisible lg:visible" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity invisible lg:visible" />
                
                <a href="#works" className="relative bg-brand-black text-white px-8 py-4 font-display font-black uppercase tracking-widest brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-3 text-base">
                  {t.hero.btnRepo} <ChevronRight size={20} />
                </a>
              </div>

              <div className="relative group">
                <div className="absolute inset-x-0 -top-1 h-[2px] bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <a 
                  href="https://163cn.tv/6EIYNv4" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-brand-accent border-2 border-brand-black px-8 py-4 font-display font-black uppercase tracking-widest hover:bg-brand-black hover:text-white transition-all flex items-center gap-3 text-base brutalist-border"
                >
                  {t.hero.btnMusic} <Music size={20} />
                </a>
              </div>

              <a href="#contact" className="bg-white border-2 border-brand-black px-8 py-4 font-display font-black uppercase tracking-widest hover:bg-brand-black hover:text-white transition-all flex items-center gap-3 text-base brutalist-border">
                {t.hero.btnContact} <Mail size={20} />
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
              <div className="absolute inset-0 halftone opacity-[0.07] text-white mix-blend-overlay pointer-events-none" />
              
              {/* Tactical Scanlines */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent bg-[length:100%_4px] pointer-events-none z-10" />

              <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <ambientLight intensity={0.8} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ED2224" />
                  <InteractiveCore />
                  <OrbitControls enableZoom={false} autoRotate={false} />
                </Canvas>
              </div>
              
              <div className="absolute inset-4 border-2 border-white/10 pointer-events-none" />
              


              <div className="absolute top-6 left-6 bg-brand-primary text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest brutalist-border-small border-white z-10">
                DrPrunus Core
              </div>
              
               {/* Tactical Status Bars */}
              <div className="absolute bottom-6 right-6 flex items-center gap-2 z-20">
                <div className="flex flex-col items-end">
                   <div className="text-[7px] text-white/50 font-mono">CONNECTION</div>
                   <div className="w-24 h-1.5 bg-white/20 brutalist-border-small border-white/10 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "95%" }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        className="h-full bg-brand-primary" 
                      />
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
                className="absolute -bottom-8 -left-8 w-32 h-32 bg-brand-accent brutalist-border z-20 flex items-center justify-center pointer-events-none"
              >
                <Cpu size={48} className="text-brand-black" />
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
            
            <div className="flex flex-wrap gap-3 mb-10">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-8 py-3 font-display font-black uppercase text-sm brutalist-border transition-all ${activeTab === 'all' ? 'bg-brand-primary text-white translate-x-1 translate-y-1 shadow-none' : 'bg-white hover:bg-brand-accent'}`}
              >
                {t.sections.portfolio.all}
              </button>
              {(['游戏拆解', 'PC'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 font-display font-black uppercase text-sm brutalist-border transition-all ${activeTab === tab ? 'bg-brand-primary text-white translate-x-1 translate-y-1 shadow-none' : 'bg-white hover:bg-brand-accent'}`}
                >
                  {(t.sections.portfolio as any).categories[tab] || tab}
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
                    <div className="flex gap-6 items-start bg-white p-8 tactical-border rotate-1 hover:rotate-0 transition-all origin-center group/card relative">
                      {/* Card HUD Corners */}
                      <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none border-t-4 border-r-4 border-brand-primary opacity-0 group-hover/card:opacity-100 transition-opacity" />
                      
                      <div className="bg-brand-primary p-4 brutalist-border flex-shrink-0 animate-pulse relative">
                        <Terminal className="text-white w-8 h-8" />
                        <div className="absolute -top-2 -left-2 w-4 h-4 bg-brand-black rotate-45" />
                      </div>
                      <div className="flex-1 tactical-bracket-l pl-8 border-brand-primary">
                        <div className="text-[12px] font-mono font-black text-brand-primary mb-3 tracking-[0.5em] flex items-center gap-2">
                           <div className="w-2 h-2 bg-brand-primary" />
                           <div className="h-[2px] w-12 bg-brand-primary/40" />
                        </div>
                        <p className="text-2xl font-bold leading-tight decoration-brand-primary/30 decoration-8 underline-offset-8">
                          {t.sections.about.p1}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-0 halftone-dense opacity-0 group-hover:opacity-20 transition-opacity -translate-x-2 translate-y-2 -z-10 text-brand-primary" />
                    <div className="flex gap-6 items-start bg-brand-accent p-8 tactical-border -rotate-1 hover:rotate-0 transition-all origin-center">
                      <div className="bg-brand-black p-4 brutalist-border flex-shrink-0">
                        <Music className="text-white w-8 h-8" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                           <div className="w-1.5 h-1.5 bg-brand-black" />
                           <div className="h-[1px] w-8 bg-brand-black/30" />
                        </div>
                        <p className="text-xl font-bold leading-tight">
                          {t.sections.about.p2}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-x-0 -bottom-4 h-4 caution-stripes-subtle opacity-0 group-hover:opacity-100 transition-opacity rotate-180" />
                    <div className="absolute inset-0 halftone opacity-0 group-hover:opacity-10 transition-opacity translate-x-2 -translate-y-2 -z-10" />
                    <div className="flex gap-6 items-start bg-white p-8 tactical-border rotate-0.5 hover:rotate-0 transition-all origin-center">
                      <div className="bg-brand-primary p-4 brutalist-border flex-shrink-0">
                        <Layout className="text-white w-8 h-8" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                           <div className="w-1.5 h-1.5 bg-brand-primary" />
                           <div className="h-[1px] w-8 bg-brand-primary/30" />
                        </div>
                        <p className="text-xl font-bold leading-tight">
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
                        <div className="w-8 h-8 bg-white brutalist-border-small flex items-center justify-center p-1 group-hover:-rotate-3 transition-transform">
                          <img 
                            src="https://cdn.simpleicons.org/aseprite/7D929E" 
                            alt="Aseprite" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="whitespace-nowrap">Aseprite</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="bg-brand-black text-white p-8 brutalist-border h-full">
                    <h4 className="text-brand-accent font-display font-black uppercase mb-8 text-2xl border-b-4 border-brand-accent pb-2 flex items-center gap-3">
                      <Briefcase className="w-6 h-6" /> {t.sections.about.disciplines}
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-black font-mono">
                      <li className="flex items-center gap-3 p-2 bg-white/10 brutalist-border-small group hover:bg-white/20 transition-colors border-white/20">
                        <div className="w-8 h-8 bg-brand-accent flex items-center justify-center p-1 group-hover:rotate-3 transition-transform brutalist-border-small border-black">
                          <Layout className="w-5 h-5 text-black" />
                        </div>
                        <span className="whitespace-nowrap">项目策划 // 通信</span>
                      </li>
                      <li className="flex items-center gap-3 p-2 bg-white/10 brutalist-border-small group hover:bg-white/20 transition-colors border-white/20">
                        <div className="w-8 h-8 bg-white flex items-center justify-center p-1 group-hover:-rotate-3 transition-transform brutalist-border-small border-black">
                          <img 
                            src="/axure.png" 
                            alt="Axure" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="whitespace-nowrap">Axure // 原型设计</span>
                      </li>
                      <li className="flex items-center gap-3 p-2 bg-white/10 brutalist-border-small group hover:bg-white/20 transition-colors border-white/20">
                        <div className="w-8 h-8 bg-white flex items-center justify-center p-1 group-hover:rotate-3 transition-transform brutalist-border-small border-black">
                          <img 
                            src="/xmind.png" 
                            alt="XMind" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="whitespace-nowrap">XMind // 流程规划</span>
                      </li>
                      <li className="flex items-center gap-3 p-2 bg-white/10 brutalist-border-small group hover:bg-white/20 transition-colors border-white/20">
                        <div className="w-8 h-8 bg-brand-accent flex items-center justify-center p-1 group-hover:-rotate-3 transition-transform brutalist-border-small border-black">
                          <Code2 className="w-5 h-5 text-black" />
                        </div>
                        <span className="whitespace-nowrap">独立逻辑实现</span>
                      </li>
                      <li className="flex items-center gap-3 p-2 bg-white/10 brutalist-border-small group hover:bg-white/20 transition-colors border-white/20">
                        <div className="w-8 h-8 bg-brand-accent flex items-center justify-center p-1 group-hover:rotate-3 transition-transform brutalist-border-small border-black">
                          <Gamepad2 className="w-5 h-5 text-black" />
                        </div>
                        <span className="whitespace-nowrap">音美全栈制作</span>
                      </li>
                      <li className="flex items-center gap-3 p-2 bg-white/10 brutalist-border-small group hover:bg-white/20 transition-colors border-white/20">
                        <div className="w-8 h-8 bg-brand-accent flex items-center justify-center p-1 group-hover:-rotate-3 transition-transform brutalist-border-small border-black">
                          <Cpu className="w-5 h-5 text-black" />
                        </div>
                        <span className="whitespace-nowrap">系统构架设计</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
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

            <div className="max-w-4xl mx-auto mt-12 bg-white brutalist-border p-8 md:p-16 relative shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
              {/* Decorative Warning Element */}
              <div className="absolute -top-8 -right-8 w-20 h-20 bg-brand-accent rounded-full border-4 border-brand-black flex items-center justify-center font-black text-3xl z-20 brutalist-shadow rotate-12">!</div>
              
              {t.sections.contact.text && (
                <div className="mb-16">
                  <p className="text-brand-black text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] italic text-left border-l-8 border-brand-primary pl-6">
                    "{t.sections.contact.text}"
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-8 md:gap-12">
                {/* Email Channels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <a href={`mailto:${t.sections.contact.btnEmail}`} className="group relative bg-brand-primary text-white p-6 md:p-8 brutalist-border brutalist-shadow hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden flex flex-col justify-between">
                    <div className="absolute inset-0 halftone opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-0.5">
                           <div className="w-2 h-2 bg-white" />
                           <div className="w-2 h-2 bg-white/20" />
                        </div>
                        <span className="text-base font-mono opacity-100 uppercase tracking-widest font-black">QQ Email</span>
                      </div>
                      <Mail size={24} className="group-hover:rotate-12 transition-transform" />
                    </div>
                    <div className="text-left">
                      <span className="text-lg md:text-xl lg:text-2xl font-black whitespace-nowrap tracking-tighter block truncate">
                        {t.sections.contact.btnEmail}
                      </span>
                    </div>
                  </a>

                  <a href={`mailto:${t.sections.contact.btnGmail}`} className="group relative bg-brand-accent text-brand-black p-6 md:p-8 brutalist-border brutalist-shadow hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden flex flex-col justify-between">
                    <div className="absolute inset-0 halftone opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-0.5">
                           <div className="w-2 h-2 bg-brand-black" />
                           <div className="w-2 h-2 bg-brand-black/20" />
                        </div>
                        <span className="text-base font-mono opacity-100 uppercase tracking-widest font-black">Gmail</span>
                      </div>
                      <Mail size={24} className="group-hover:rotate-12 transition-transform" />
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
                  className="w-full bg-brand-black text-white p-8 md:p-12 brutalist-border brutalist-shadow relative overflow-hidden group hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.1)] transition-all cursor-pointer"
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
                        <span className="text-brand-black text-4xl font-black uppercase tracking-widest flex items-center gap-4">
                          <Rocket className="animate-bounce" /> {lang === 'zh' ? '已复制！' : 'COPIED!'}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-20 h-20 bg-brand-accent flex items-center justify-center brutalist-border rotate-3 group-hover:rotate-0 transition-transform">
                      <MessageSquare size={40} className="text-brand-black" />
                    </div>
                    <div className="text-center md:text-left">
                      <span className="block text-sm text-brand-accent font-mono uppercase tracking-[0.3em] mb-2 font-black group-hover:text-white transition-colors">WeChat (Click to Copy)</span>
                      <p className="text-4xl md:text-6xl font-black font-mono tracking-tighter text-white">
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
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <p className="text-white/40 text-lg font-medium tracking-wide">
            © 2026 DrPrunus
          </p>
        </div>
      </footer>
    </div>
  );
}
