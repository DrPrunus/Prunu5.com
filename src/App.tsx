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
    id: '4',
    title: '404 Princess Not Found',
    category: 'PC',
    description: {
      zh: 'HD2D 探索解谜游戏 | Unity 引擎 | 2025 TapTap 聚光灯 GameJam 21 天极限创作赛事参赛作品。以“勇者修复残缺游戏世界 Bug、追寻不存在的公主”为主线，担任策划、程序开发与音乐制作，上线 TapTap PC 端。',
      en: 'HD2D Exploration Puzzle Game developed in Unity for 2025 TapTap Spotlight GameJam 21-day challenge. A meta-narrative adventure about a hero fixing system bugs to find a non-existent princess. Roles: Design, Dev, Music.',
      ja: 'Unityで制作されたHD2D探索パズルゲーム。2025 TapTap Spotlight GameJam 21日間チャレンジ参加作品。勇者がバグを修正しながら存在しない王女を探すメタフィクション。役割：企画、開発、音楽。'
    },
    image: 'https://storage.googleapis.com/static-assets-public/ais-dev-axbs6h3ajy54zeu7bnu77p-370257112311.us-east1.run.app/attachments/2d93e1af-011f-4428-9418-28956e174092/1746517006815.jpg',
    tags: ['策划', '程序开发', '音乐', 'Unity'],
    link: 'https://www.taptap.cn/app/779210?os=pc',
    github: '#'
  },
  {
    id: '1',
    title: 'Neon Odyssey',
    category: 'PC',
    description: {
      zh: '深度设计的赛博朋克肉鸽游戏，专注于快节奏战斗系统的打击感优化与随机关卡生成的逻辑构架。',
      en: 'A deeply designed cyberpunk rogue-like, focusing on combat feel optimization and the logical framework of procedural level generation.',
      ja: 'サイバーパンクなローグライクゲーム。テンポの良い戦闘システムの最適化と、ランダム生成ステージの論理的フレームワークに焦点を当てています。'
    },
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
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
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
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
      ja: '「エルデンリング」のオープンワールドのレベルフローと箱庭設計の深い解体分析。視覚的誘導と環境ストーリーテリングの結合点を分析。'
    },
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=800',
    tags: ['Level Design', 'Narrative', 'Mechanics'],
    link: '#',
    github: '#'
  }
];

// --- Sub-components ---

const SectionHeading = ({ children, icon: Icon, subtitle }: { children: React.ReactNode, icon?: any, subtitle?: string }) => (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-2">
      {Icon && <Icon className="text-brand-primary w-6 h-6" />}
      <h2 className="text-4xl font-display font-black tracking-tighter uppercase leading-none">{children}</h2>
    </div>
    {subtitle && <p className="text-brand-black/50 font-mono text-[10px] uppercase tracking-widest font-bold">{subtitle}</p>}
    <div className="h-2 w-24 bg-brand-primary mt-4" />
  </div>
);

const ProjectCard = ({ project, lang, className }: { project: Project; lang: Language; className?: string; key?: string }) => {
  const CardContent = (
    <>
      <div className="aspect-video relative overflow-hidden border-b-2 border-brand-black">
        <img 
          src={project.image} 
          alt={project.title} 
          className="object-cover w-full h-full transition-all duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-0 left-0 bg-brand-primary text-white px-3 py-1 text-[10px] font-black uppercase tracking-tighter">
          {(translations[lang].sections.portfolio as any).categories[project.category] || project.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-display font-black mb-3 leading-none uppercase group-hover:text-brand-primary transition-colors">
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
    </>
  );

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`group relative bg-white brutalist-border overflow-hidden transition-all hover:-translate-y-1 ${className}`}
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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 border-b-8 border-brand-black pb-8">
            <SectionHeading icon={Layers} subtitle={t.sections.portfolio.subtitle}>{t.sections.portfolio.title}</SectionHeading>
            
            <div className="flex flex-wrap gap-3 mb-4">
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
                <ProjectCard key={project.id} project={project} lang={lang} className={idx % 2 === 0 ? 'collage-rotate-left' : 'collage-rotate-right'} />
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* About */}
        <section id="about" className="relative">
          <div className="absolute top-0 left-0 w-full h-full diagonal-line opacity-5 -z-10" />
          <div className="max-w-5xl mx-auto relative px-6">
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-brand-primary z-0 opacity-50" />
            <div className="relative z-10">
              <SectionHeading icon={User} subtitle={t.sections.about.subtitle}>{t.sections.about.title}</SectionHeading>
              
              <div className="grid lg:grid-cols-12 gap-12 mt-16">
                {/* Text Content */}
                <div className="lg:col-span-12 space-y-8">
                  <div className="flex gap-6 items-start bg-white p-8 brutalist-border collage-rotate-left hover:rotate-0 transition-transform">
                    <div className="bg-brand-primary p-4 brutalist-border flex-shrink-0">
                      <Terminal className="text-white w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-xl font-bold leading-tight decoration-brand-primary/30 decoration-4 underline-offset-4">
                        {t.sections.about.p1}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start bg-brand-accent p-8 brutalist-border collage-rotate-right hover:rotate-0 transition-transform">
                    <div className="bg-brand-black p-4 brutalist-border flex-shrink-0">
                      <Music className="text-white w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-xl font-bold leading-tight">
                        {t.sections.about.p2}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start bg-white p-8 brutalist-border -rotate-1 hover:rotate-0 transition-transform">
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
          <div className="max-w-4xl mx-auto bg-white brutalist-border p-10 rotate-1 relative">
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
