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
      roleGame: '游戏策划',
      roleMusic: '音乐编曲',
      subtitleGame: '深耕系统的游戏关卡逻辑与数值平衡，致力于构建严谨且有趣的交互规则。',
      subtitleMusic: '沉迷于旋律构筑的情感世界，用音符为空间赋予灵魂，创造全方位的沉浸体验。',
      btnRepo: '查看项目',
      btnContact: '联系我',
      btnMusic: '音乐主页',
      quote: 'First, I am a player. Then, I am a developer. And above all, a gameplay researcher.',
      education: {
        title: '教育背景',
        school: '沈阳航空航天大学',
        date: '2023年8月 – 至今',
        major: '主修：计算机科学与技术；辅修：日语',
        courses: '核心课程：数据结构，计算机组成原理，操作系统，计算机网络'
      }
    },
    sections: {
      portfolio: {
        title: '项目作品',
        subtitle: '',
        all: '全部类别',
        roleLabel: '项目角色',
        visitBtn: '直达项目',
        categories: {
          '游戏拆解': '游戏拆解',
          'PC': 'PC',
        }
      },
      about: {
        title: '关于我',
        subtitle: '',
        p1: '热爱游戏，涉猎品类广泛，兼具玩家直觉与策划思维。熟悉 Unity/UE 基本结构与操作，掌握 XML/JSON/Lua 等配置格式与脚本语言，可独立完成配表及脚本逻辑编写，与程序高效协作。沟通能力强，主动学习意愿高，擅长多线任务并行推进与优先级管理。',
        p2: '业余热衷音美创作，熟练使用 FL Studio 进行音频制作与编辑、Aseprite 进行像素美术创作，具备从玩法到视听的全链路游戏制作体验，对跨职能协作有更深的同理心。',
        p3: '无论是独立的逻辑攻坚，还是复杂的流程规划，我都能以全栈思维切入。我正不断探索跨引擎开发的无限可能，力求将每一个概念草图转化为触手可及的数字现实。',
        tech: '软件与技术',
        disciplines: '游戏偏好',
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
      },
      steam: {
        title: '游戏偏好',
        subtitle: '游戏偏好',
        level: '等级',
        games: '游戏数量',
        recent: '最近游玩',
        played: '累计时长',
        hours: '小时',
        viewMore: '在 Steam 上查看完整档案',
        viewLibrary: '查看我的完整 Steam 库',
        all: '全部游玩',
        toggleShow: '显示档案',
        toggleHide: '隐藏档案'
      }
    }
  },
  en: {
    nav: {
      intro: 'Profile',
      works: 'Projects',
      about: 'About Me',
      contact: 'Contact Me',
      status: '',
    },
    hero: {
      roleGame: 'Game Designer',
      roleMusic: 'Music Arrangement',
      subtitleGame: 'Specializing in game systems, balance, and level logic to create rigorous yet engaging player interactions.',
      subtitleMusic: 'Passionate about crafting emotional atmospheres through melody, giving soul to virtual spaces.',
      btnRepo: 'View Works',
      btnContact: 'Contact Me',
      btnMusic: 'NetEase Music',
      quote: 'First, I am a player. Then, I am a developer. And above all, a gameplay researcher.',
      education: {
        title: 'Education',
        school: 'Shenyang Aerospace University',
        date: 'Aug. 2023 – Present',
        major: 'Major: Computer Science & Tech; Minor: Japanese',
        courses: 'Core: Data Structures, Computer Architecture, OS, Networking'
      }
    },
    sections: {
      portfolio: {
        title: 'Projects',
        subtitle: '',
        all: 'All Categories',
        roleLabel: 'Project Role',
        visitBtn: 'Visit Site',
        categories: {
          '游戏拆解': 'Game Deconstruction',
          'PC': 'PC',
        }
      },
      about: {
        title: 'About Me',
        subtitle: '',
        p1: `Passionate about games with a broad range of experience, combining player intuition with a designer's mindset. Familiar with Unity/UE structures and operations, proficient in XML, JSON, and Lua for configuration and scripting. Capable of independent implementation of data tables and script logic, with high collaboration efficiency with developers. Strong communicator with a high proactivity, skilled in multitasking and priority management.`,
        p2: `Outside of work, I am passionate about music and art creation, proficiently using FL Studio for audio production and editing, and Aseprite for pixel art creation. I have full-cycle game development experience from gameplay to audiovisuals.`,
        p3: `From independent logic challenges to complex workflow planning, I approach everything with a full-stack mindset. Constantly exploring possibilities across engines to turn conceptual sketches into digital reality.`,
        tech: 'Software & Tech',
        disciplines: 'Gaming Preferences',
      },
      pipeline: {
        title: 'Pipeline Status',
        latestBuild: 'Latest Publish',
        coverage: 'Coverage',
        coffee: 'Energy Level',
        optimization: 'Optimization',
        reliability: 'Stability Index',
        success: 'SUCCESS',
        refill: 'WARNING: LOW ENERGY',
      },
      contact: {
        title: 'Contact Me',
        subtitle: '',
        text: '',
        btnEmail: '2279670554@qq.com',
        btnWechat: 'DrPrunus',
        btnGmail: 'prunu5h3ad@gmail.com',
      },
      steam: {
        title: 'Game Preferences',
        subtitle: 'Gaming Experience',
        level: 'LEVEL',
        games: 'GAMES',
        recent: 'RECENTLY PLAYED',
        played: 'TOTAL TIME',
        hours: 'HRS',
        viewMore: 'View Full Profile on Steam',
        viewLibrary: 'View Full Steam Library',
        all: 'All Played',
        toggleShow: 'Show Experience',
        toggleHide: 'Hide Experience'
      }
    }
  },
  ja: {
    nav: {
      intro: 'プロフィール',
      works: '実績リスト',
      about: '人事ファイル',
      contact: '通信連絡',
      status: '',
    },
    hero: {
      roleGame: 'ゲームプランナー',
      roleMusic: '音乐・編曲',
      subtitleGame: 'システム設計、バランス調整、レベルデザインに特化し、論理的かつ没入感のあるプレイ体験を構築。',
      subtitleMusic: '情绪的なメロディで空間を彩り、旋律によって仮想世界に魂を吹き込む。',
      btnRepo: 'アーカイブ閲覧',
      btnContact: '通信開始',
      btnMusic: '音乐ファイル',
      quote: 'First, I am a player. Then, I am a developer. And above all, a gameplay researcher.',
      education: {
        title: '教育背景',
        school: '瀋陽航空航天大学',
        date: '2023年8月 – 现在',
        major: '主専攻：コンピュータサイエンス；副専攻：日本語',
        courses: '核心科目：データ構造、コンピュータ構成、オペレーティングシステム、ネットワーク'
      }
    },
    sections: {
      portfolio: {
        title: '作戦履歴',
        subtitle: '',
        all: '全カテゴリー',
        roleLabel: 'プロジェクト役割',
        visitBtn: 'サイトへ',
        categories: {
          '游戏拆解': 'ゲーム分析',
          'PC': 'PC版',
        }
      },
      about: {
        title: '人事ファイル',
        subtitle: '',
        p1: 'ゲームへの情熱を持ち、幅広いジャンルを網羅。プレイヤーとしての直感とプランナーとしての思考を兼ね備えています。Unity/UEの基本構造と操作に精通し、XML/JSON/Luaなどの設定形式やスクリプト言語を習得。データテーブル作成やスクリプトの実装を自律的に行い、エンジニアと円滑に連携します。コミュニケーション能力が高く、自律的な学習意欲があり、マルチタスクと優先順位の管理に長けています。',
        p2: '余暇は音楽やアート制作に熱中しており、FL Studioによるオーディオ制作や編集、Asepriteによるピクセルアート制作に精通しています。ゲームプレイから視聴覚まで、全行程の制作経験を持ち、職能を超えたコラボレーションに対して深い共感を持っています。',
        p3: '単独のロジック開発から複雑なワークフロー設計まで、フルスタックな視点で挑む。常にエンジンを超えた可能性を模索し、コンセプトをデジタルな現実へと昇華させる。',
        tech: 'スキルセット',
        disciplines: 'ゲーム歴',
      },
      pipeline: {
        title: '制作パイプライン',
        latestBuild: '最終リリース',
        coverage: 'システム網羅',
        coffee: 'エネルギー',
        optimization: '最適化効率',
        reliability: '安定性指数',
        success: '正常',
        refill: '警告: 補充が必要',
      },
      contact: {
        title: '連絡先',
        subtitle: '',
        text: '',
        btnEmail: '2279670554@qq.com',
        btnWechat: 'DrPrunus',
        btnGmail: 'prunu5h3ad@gmail.com',
      },
      steam: {
        title: 'ゲーム体験',
        subtitle: '設計思想に影響を与えたゲーム',
        level: 'レベル',
        games: 'ゲーム数',
        recent: '最近のプレイ',
        played: '累计時間',
        hours: '時間',
        viewMore: 'Steamでプロフィールを見る',
        viewLibrary: 'Steamライブラリを表示',
        all: 'すべてのゲーム',
        toggleShow: 'アーカイブを表示',
        toggleHide: 'アーカイブを非表示'
      }
    }
  }
};
