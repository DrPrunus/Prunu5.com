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
  Shapes
} from 'lucide-react';
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
    image: '/covers/gc.png',
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
    image: '/covers/404.jpg',
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
    image: '/covers/sts.png',
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
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
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
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800',
    tags: ['社交系统', '交互设计', '3C逻辑'],
    link: 'https://xcnselbxoekt.feishu.cn/drive/folder/UwMOfYpM0lgN9LdkJc3cpRronph',
    github: '#'
  },
  {
    id: '1',
    title: 'Neon Odyssey',
    category: 'PC',
    description: {
      zh: '深度设计的赛博朋克肉鸽游戏，专注于快节奏战斗系统的打击感优化与随机关卡生成的逻辑构架。',
      en: 'A deeply designed cyberpunk rogue-like, focusing on combat feel optimization and the logical framework of procedural level generation.',
      ja: 'サイバーパンクなローグライクゲーム。テンポの良い戦闘系统的优化と、ランダム生成ステージの论理的フレームワークに焦点を当てています。'
    },
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
    tags: ['System Design', 'Combat', 'Rogue-like'],
    link: '#',
    github: '#'
  },
  {
    id: '2',
    title: 'Pixel Tactics',
    category: 'PC',
    description: {
      zh: '多人策略对战游戏，核心在于回合制平衡性设计、技能克制矩阵以及玩家交互心智模型的构建。',
      en: 'Multiplayer strategy game centered on turn-based balance design, skill counter matrices, and the construction of player mental models.',
      ja: 'マルチプレイヤー戦略ゲーム。ターン制のバランス設計、スキルカウンターのマトリックス、プレイヤーのメンタルモデルの構築が核心です。'
    },
    image: 'https://images.unsplash.com/photo-1592609931095-54a2168ae893?auto=format&fit=crop&q=80&w=800',
    tags: ['Balance Design', 'Strategy', 'UI/UX'],
    link: '#',
    github: '#'
  },
  {
    id: '3',
    title: 'Deep Analysis: Elden Ring',
    category: '游戏拆解',
    description: {
      zh: '对《艾尔登法环》开放世界关卡流向与箱庭设计的深度拆解，分析其视觉引导与碎片化叙事的结合点。',
      en: 'A deep deconstruction of Elden Ring\'s open-world level flow and sandbox design, analyzing the intersection of visual guidance and environmental storytelling.',
      ja: '「エルデンリング」のオープンワールドのレベルフローと箱庭设计の深い解体分析。视覚的誘導と环境ストーリーテリングの结合点を分析。'
    },
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800',
    tags: ['Level Design', 'Narrative', 'Mechanics'],
    link: '#',
    github: '#'
  }
];

// --- Sub-components ---

const SectionHeading = ({ children, icon: Icon, subtitle }: { children: React.ReactNode, icon?: any, subtitle?: string }) => (
  <div className="mb-12 border-b-8 border-brand-black pb-8">
    <div className="flex items-center gap-3 mb-2">
      {Icon && <Icon className="text-brand-primary w-6 h-6" />}
      <h2 className="text-4xl font-display font-black tracking-tighter uppercase leading-none">{children}</h2>
    </div>
    {subtitle && <p className="text-brand-black/50 font-mono text-[10px] uppercase tracking-widest font-bold">{subtitle}</p>}
  </div>
);

const ProjectCard = ({ project, lang, className }: { project: Project; lang: Language; className?: string; key?: string }) => {
  const CardContent = (
    <div className={`group relative h-full bg-white brutalist-border overflow-hidden transition-all hover:rotate-0 hover:scale-[1.02] ${className} origin-center`}>
      <div className="aspect-video relative overflow-hidden border-b-2 border-brand-black bg-brand-black/5">
        <img 
          src={project.image} 
          alt={project.title} 
          className="object-cover w-full h-full transition-all duration-500 rounded-none"
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

  const t = translations[lang];

  const filteredProjects = activeTab === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen selection:bg-brand-primary selection:text-white pb-10">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-brand-bg" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] -z-10" 
        style={{ backgroundImage: `radial-gradient(circle, var(--color-brand-black) 1px, transparent 0)`, backgroundSize: '32px 32px' }} 
      />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-brand-black text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm font-mono tracking-widest font-black">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-brand-primary flex items-center justify-center -rotate-3 hover:rotate-0 transition-transform cursor-pointer brutalist-border border-white">
              <span className="text-white font-display font-black text-2xl">桃</span>
            </div>
            <span className="hidden sm:inline text-lg tracking-tighter normal-case font-sans">DrPrunus</span>
          </motion.div>
          
          <div className="flex items-center gap-8">
            <div className="hidden lg:flex gap-10">
              <a href="#intro" className="hover:text-brand-primary transition-colors flex items-center gap-2 group">
                <span className="text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">●</span>
                {t.nav.intro}
              </a>
              <a href="#works" className="hover:text-brand-primary transition-colors flex items-center gap-2 group">
                <span className="text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">●</span>
                {t.nav.works}
              </a>
              <a href="#about" className="hover:text-brand-primary transition-colors flex items-center gap-2 group">
                <span className="text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">●</span>
                {t.nav.about}
              </a>
              <a href="#contact" className="hover:text-brand-primary transition-colors flex items-center gap-2 group">
                <span className="text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">●</span>
                {t.nav.contact}
              </a>
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
      <header id="intro" className="relative pt-12 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 z-10"
          >
            <div className="inline-block bg-brand-primary text-white px-6 py-2 mb-8 -rotate-1 brutalist-shadow font-display font-black uppercase tracking-tighter text-4xl">
              {t.hero.title} {t.hero.titleAccent}
            </div>
            <h1 className="text-7xl md:text-[8rem] font-display font-black leading-[0.75] tracking-tighter mb-10 uppercase break-words hyphens-auto">
              {t.hero.titleEnd}
            </h1>
            <p className="text-brand-black text-xl max-w-xl mb-12 leading-tight font-black p-8 border-l-[12px] border-brand-primary bg-white brutalist-border">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-6">
              <a href="#works" className="bg-brand-black text-white px-12 py-6 font-display font-black uppercase tracking-widest brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-3 text-lg">
                {t.hero.btnRepo} <ChevronRight size={24} />
              </a>
              <a href="#contact" className="bg-white border-2 border-brand-black px-12 py-6 font-display font-black uppercase tracking-widest hover:bg-brand-black hover:text-white transition-all flex items-center gap-3 text-lg brutalist-border">
                {t.hero.btnContact} <Mail size={24} />
              </a>
            </div>
          </motion.div>

          <div className="lg:col-span-4 relative hidden lg:block">
            <div className="w-full aspect-[4/5] bg-brand-black brutalist-shadow rotate-3 relative overflow-hidden">
               <div className="absolute inset-4 border-2 border-white/20" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-brand-primary rotate-45" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand-accent -rotate-12 flex items-center justify-center">
                 <Gamepad2 size={64} className="text-brand-black" />
               </div>
               <div className="absolute bottom-4 right-4 text-white font-mono text-[8px] opacity-30 text-right">
                 COMPOSITION_01<br />AXIS_Y_REDACTED
               </div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-accent brutalist-border -rotate-6 z-20 flex items-center justify-center">
               <Cpu size={64} className="text-brand-black" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 space-y-24">
        
        {/* Projects */}
        <section id="works">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
            <SectionHeading icon={Layers} subtitle={t.sections.portfolio.subtitle}>{t.sections.portfolio.title}</SectionHeading>
            
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
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
        <section id="about" className="relative">
          <div className="absolute top-0 left-0 w-full h-full diagonal-line opacity-5 -z-10" />
          <div className="max-w-7xl mx-auto relative px-6">
            <div className="relative z-10">
              <SectionHeading icon={User} subtitle={t.sections.about.subtitle}>{t.sections.about.title}</SectionHeading>
              
              <div className="grid lg:grid-cols-12 gap-12 mt-16">
                {/* Text Content */}
                <div className="lg:col-span-12 space-y-8">
                  <div className="flex gap-6 items-start bg-white p-8 brutalist-border rotate-1 hover:rotate-0 transition-all origin-center">
                    <div className="bg-brand-primary p-4 brutalist-border flex-shrink-0">
                      <Terminal className="text-white w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-xl font-bold leading-tight decoration-brand-primary/30 decoration-4 underline-offset-4">
                        {t.sections.about.p1}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start bg-brand-accent p-8 brutalist-border -rotate-1 hover:rotate-0 transition-all origin-center">
                    <div className="bg-brand-black p-4 brutalist-border flex-shrink-0">
                      <Music className="text-white w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-xl font-bold leading-tight">
                        {t.sections.about.p2}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start bg-white p-8 brutalist-border rotate-0.5 hover:rotate-0 transition-all origin-center">
                    <div className="bg-brand-primary p-4 brutalist-border flex-shrink-0">
                      <Layout className="text-white w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-xl font-bold leading-tight">
                        {t.sections.about.p3}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tech Grids */}
                <div className="lg:col-span-6">
                  <div className="bg-white p-8 brutalist-border h-full">
                    <h4 className="text-brand-primary font-display font-black uppercase mb-8 text-2xl border-b-4 border-brand-primary pb-2 flex items-center gap-3">
                      <Monitor className="w-6 h-6" /> {t.sections.about.tech}
                    </h4>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm font-black font-mono">
                      <li className="flex items-center gap-2"><div className="w-2 h-2 bg-brand-black" /> UNITY // C#</li>
                      <li className="flex items-center gap-2"><div className="w-2 h-2 bg-brand-black" /> GODOT ENGINE</li>
                      <li className="flex items-center gap-2"><div className="w-2 h-2 bg-brand-black" /> UNREAL ENGINE</li>
                      <li className="flex items-center gap-2"><div className="w-2 h-2 bg-brand-black" /> PYTHON // REN'PY</li>
                      <li className="flex items-center gap-2"><div className="w-2 h-2 bg-brand-black" /> FL STUDIO</li>
                      <li className="flex items-center gap-2"><div className="w-2 h-2 bg-brand-black" /> ASEPRITE</li>
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="bg-brand-black text-white p-8 brutalist-border h-full">
                    <h4 className="text-brand-accent font-display font-black uppercase mb-8 text-2xl border-b-4 border-brand-accent pb-2 flex items-center gap-3">
                      <Briefcase className="w-6 h-6" /> {t.sections.about.disciplines}
                    </h4>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm font-black font-mono">
                      <li className="flex items-center gap-2"><div className="w-2 h-2 bg-brand-accent" /> 项目策划 // 通信</li>
                      <li className="flex items-center gap-2"><div className="w-2 h-2 bg-brand-accent" /> 原型设计 (AXURE)</li>
                      <li className="flex items-center gap-2"><div className="w-2 h-2 bg-brand-accent" /> XMIND 流程规划</li>
                      <li className="flex items-center gap-2"><div className="w-2 h-2 bg-brand-accent" /> 独立逻辑实现</li>
                      <li className="flex items-center gap-2"><div className="w-2 h-2 bg-brand-accent" /> 音美全栈制作</li>
                      <li className="flex items-center gap-2"><div className="w-2 h-2 bg-brand-accent" /> 系统构架设计</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-10 relative text-center">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-4 bg-brand-black -z-10 opacity-10" />
          <SectionHeading icon={Rocket} subtitle={t.sections.contact.subtitle}>{t.sections.contact.title}</SectionHeading>
          <div className="max-w-4xl mx-auto bg-white brutalist-border p-10 relative">
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-brand-accent rounded-full border-8 border-brand-black flex items-center justify-center font-black text-4xl">!</div>
            {t.sections.contact.text && (
              <p className="text-brand-black text-4xl mb-10 font-black uppercase tracking-tight leading-[0.9] italic">
                "{t.sections.contact.text}"
              </p>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
              <a href="mailto:2279670554@qq.com" className="w-full sm:w-auto bg-brand-primary text-white px-10 py-5 font-display font-black tracking-widest brutalist-shadow hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all flex items-center justify-center gap-4 text-xl">
                <Mail size={24} /> {t.sections.contact.btnEmail}
              </a>
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
