export type Language = 'zh' | 'en' | 'ja';

export const translations = {
  zh: {
    nav: {
      works: '作品档案',
      about: '关于开发者',
      contact: '建立联络',
      status: '',
    },
    hero: {
      title: '打破',
      titleAccent: '常规',
      titleEnd: '重塑边界',
      subtitle: '我专注于通过代码构建交互式的、富有冲击力的游戏体验。每一行代码都是一种构造，每一次交互都是一场试验。',
      btnRepo: '进入档案库',
      btnContact: '建立连接',
    },
    sections: {
      portfolio: {
        title: '项目展示',
        subtitle: '已验证的构造',
        all: '全部类别',
      },
      about: {
        title: '核心数据',
        subtitle: '解构开发者',
        p1: '我是一名将代码视为建筑材料的游戏开发者。我热衷于平台跳跃与箱庭游戏的开发与探索。过去6年里，我一直致力于研究如何让虚拟世界更加生动且具有逻辑。',
        p2: '对我而言，游戏开发不仅仅是编程，它是一种在数字空间进行的构成主义艺术。我擅长解决复杂的技术难题，并将其转化为极致的视觉与交互体验。',
        tech: '技术堆栈',
        disciplines: '核心学科',
      },
      pipeline: {
        title: '生产流水线状态',
        latestBuild: '最后发布',
        coverage: '系统覆盖',
        coffee: '能源水平',
        optimization: '效能优化',
        reliability: '稳定性指数',
        success: '成功',
        refill: '警告:能源不足',
      },
      contact: {
        title: '信号源',
        subtitle: '建立通信',
        text: '准备好开始一场数字革命了吗？我的通信频道已经开启。',
        btnEmail: '发送指令',
      }
    },
    footer: {
      rights: '版权所有 // 系统状态: 完美',
      privacy: '隐私协议',
      terms: '使用条款',
      logs: '行为日志',
    }
  },
  en: {
    nav: {
      works: 'Archive',
      about: 'The Dev',
      contact: 'Connect',
      status: '',
    },
    hero: {
      title: 'Breaking',
      titleAccent: 'Rules',
      titleEnd: 'Redefining.',
      subtitle: 'I build interactive, high-impact gaming experiences through the lens of code. Every line is a construct, every interaction an experiment.',
      btnRepo: 'Enter Archive',
      btnContact: 'Connect Now',
    },
    sections: {
      portfolio: {
        title: 'Projects',
        subtitle: 'Verified Constructs',
        all: 'All Categories',
      },
      about: {
        title: 'Core Data',
        subtitle: 'Deconstructing the Dev',
        p1: 'I am a game developer who treats code as architectural material. I am passionate about the development and exploration of platformers and sandbox (box-garden) games.',
        p2: 'For me, game development is not just programming; it’s a form of Constructivist art performed in digital space. I specialize in solving complex technical problems and transforming them into ultimate visual and interactive experiences.',
        tech: 'Tech Stack',
        disciplines: 'Core Disciplines',
      },
      pipeline: {
        title: 'Production_Pipeline',
        latestBuild: 'Latest Release',
        coverage: 'System Coverage',
        coffee: 'Energy Levels',
        optimization: 'OPTIMIZATION',
        reliability: 'RELIABILITY',
        success: 'SUCCESS',
        refill: 'WARNING: REFILL NOW',
      },
      contact: {
        title: 'Signal Source',
        subtitle: 'Establish Comms',
        text: 'Ready to start a digital revolution? My communication channel is open.',
        btnEmail: 'Send Command',
      }
    },
    footer: {
      rights: 'ALL_SYSTEMS_OPTIMIZED',
      privacy: 'Privacy_Terms',
      terms: 'Usage_Rules',
      logs: 'Action_Logs',
    }
  },
  ja: {
    nav: {
      works: 'アーカイブ',
      about: '開発者',
      contact: '接続する',
      status: '',
    },
    hero: {
      title: '常識を',
      titleAccent: '破壊',
      titleEnd: 'し、再定義する',
      subtitle: '私はコードを通じて、インタラクティブでインパクトのあるゲーム体験を構築します。すべての行が構造であり、すべての相互作用が実験です。',
      btnRepo: 'アーカイブに入る',
      btnContact: '今すぐ接続',
    },
    sections: {
      portfolio: {
        title: 'プロジェクト',
        subtitle: '検証済み構造物',
        all: 'すべて',
      },
      about: {
        title: 'コアデータ',
        subtitle: '開発者の解体',
        p1: '私はコードを建築材料として扱うゲーム開発者です。プラットフォーマーや箱庭ゲームの開発と探索に情热を注いでいます。',
        p2: '私にとって、ゲーム開発は単なるプログラミングではありません。それはデジタル空間で行われる構成主義的な芸術の一形態です。私は複雑な技術問題を解決し、それを究極の視覚的・インタラクティブな体験へと変換することを得意としています。',
        tech: '技術スタック',
        disciplines: '専門分野',
      },
      pipeline: {
        title: '生産パイプライン',
        latestBuild: '最新リリース',
        coverage: 'システム網羅率',
        coffee: 'エネルギーレベル',
        optimization: '最適化',
        reliability: '信頼性',
        success: '成功',
        refill: '警告: 補充が必要',
      },
      contact: {
        title: '信号源',
        subtitle: '通信確立',
        text: 'デジタル革命を始める準備はできていますか？私の通信チャネルは開いています。',
        btnEmail: 'コマンド送信',
      }
    },
    footer: {
      rights: '全システム最適化済み',
      privacy: 'プライバシー',
      terms: '利用規約',
      logs: '動作ログ',
    }
  }
};
