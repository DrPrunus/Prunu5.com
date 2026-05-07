export type Language = 'zh' | 'en' | 'ja';

export const translations = {
  zh: {
    nav: {
      intro: '个人简介',
      works: '项目作品',
      about: '关于我',
      contact: '联系我',
      status: '',
    },
    hero: {
      title: '打破',
      titleAccent: '常规',
      titleEnd: '游戏策划',
      subtitle: '我致力于通过系统化的策划与技术实现，创造出独特且引人入胜的游戏世界。在逻辑与创意之间，将奇思妙想转化为玩家的沉浸式体验。',
      btnRepo: '查看项目',
      btnContact: '联系我',
    },
    sections: {
      portfolio: {
        title: '项目作品',
        subtitle: '',
        all: '全部类别',
        categories: {
          '游戏拆解': '游戏拆解',
          'PC': 'PC',
        }
      },
      about: {
        title: '关于我',
        subtitle: '',
        p1: '我是一名专注于项目导向的游戏开发者，致力于在设计、技术实现与项目管理之间寻找平衡。我不仅追求代码的严谨，更在乎作品最终传达的情感与体验。',
        p2: '在开发之余，我也是一名音乐爱好者与像素画创作者。我习惯使用 FL Studio 捕捉灵感片段，并用 Aseprite 勾勒奇思妙想。我始终相信，多维度的感官体验是塑造游戏灵魂的关键。',
        p3: '无论是独立的逻辑攻坚，还是复杂的流程规划，我都能以全栈思维切入。我正不断探索跨引擎开发的无限可能，力求将每一个概念草图转化为触手可及的数字现实。',
        tech: '软件与技术',
        disciplines: '专业领域',
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
        title: '联系我',
        subtitle: '',
        text: '',
        btnEmail: '2279670554@qq.com',
        btnWechat: 'DrPrunus',
        btnGmail: 'prunu5h3ad@gmail.com',
      }
    }
  },
  en: {
    nav: {
      intro: 'Profile',
      works: 'Works',
      about: 'About Me',
      contact: 'Contact Me',
      status: '',
    },
    hero: {
      title: 'Breaking',
      titleAccent: 'Rules',
      titleEnd: 'Game Design.',
      subtitle: 'I focus on creating unique and engaging game worlds through systematic planning and technical execution. Balancing logic and creativity to transform bold ideas into immersive player experiences.',
      btnRepo: 'View Works',
      btnContact: 'Contact Me',
    },
    sections: {
      portfolio: {
        title: 'Works',
        subtitle: '',
        all: 'All Categories',
        categories: {
          '游戏拆解': 'Game Deconstruction',
          'PC': 'PC',
        }
      },
      about: {
        title: 'About Me',
        subtitle: '',
        p1: 'I am a project-oriented game developer thriving at the intersection of design, technical implementation, and project management. I strive for code precision while prioritizing the ultimate emotional impact of the player experience.',
        p2: 'Beyond development, I am a music enthusiast and pixel artist. I regularly use FL Studio to capture melodic inspirations and Aseprite to illustrate imaginative ideas. I believe multi-sensory experiences are vital to a game\'s soul.',
        p3: 'Whether tackling solo logic challenges or complex workflow planning, I bring a full-stack mindset to every project. I am constantly exploring cross-engine possibilities to transform concept sketches into tangible digital realities.',
        tech: 'Software & Tech',
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
        title: 'Contact Me',
        subtitle: '',
        text: '',
        btnEmail: '2279670554@qq.com',
        btnWechat: 'DrPrunus',
        btnGmail: 'prunu5h3ad@gmail.com',
      }
    }
  },
  ja: {
    nav: {
      intro: 'プロフィール',
      works: 'プロジェクト',
      about: '私について',
      contact: '連絡',
      status: '',
    },
    hero: {
      title: '常識を',
      titleAccent: '破壊',
      titleEnd: 'ゲーム企画',
      subtitle: '私は、体系的な企画と技術的な実現を通じて、ユニークで魅力的なゲームの世界を作り上げることに専念しています。論理と創造性のバランスを保ち、奇抜なアイデアをプレイヤーの没入体験へと変えていきます。',
      btnRepo: 'プロジェクトを見る',
      btnContact: '連絡',
    },
    sections: {
      portfolio: {
        title: 'プロジェクト',
        subtitle: '',
        all: 'すべて',
        categories: {
          '游戏拆解': 'ゲーム解体',
          'PC': 'PC',
        }
      },
      about: {
        title: '私について',
        subtitle: '',
        p1: '私はデザイン、技術実装、プロジェクト管理の交差点で活躍する、プロジェクト指向のゲーム開発者です。コードの精密さを追求しつつ、プレイヤー体験がもたらす感情的なインパクトを最も大切にしています。',
        p2: '開発以外では、熱心な音楽ファンでありピクセルアーティストでもあります。FL Studioでインスピレーションを形にし、Asepriteで想像力豊かなアイデアを描き出すのが日課です。多角的な感覚体验こそがゲームの魂を形作ると信じています。',
        p3: '单独のロジック開発から複雑なワークフロー計画まで、あらゆるプロジェクトにフルスタックの思考で取り組みます。现在、コンセプトスケッチを確かなデジタルリアリティへと変えるため、エンジンを超えた開発の可能性を常に模索しています。',
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
        title: '連絡',
        subtitle: '',
        text: '',
        btnEmail: '2279670554@qq.com',
        btnWechat: 'DrPrunus',
        btnGmail: 'prunu5h3ad@gmail.com',
      }
    }
  }
};
