/**
 * 프로젝트 묵향: 다크레이디의 귀환 (Project Mukhyang: Return of the Dark Lady)
 * 통합 애플리케이션: 90s 클래식 로우폴리 3D 뷰포트 + 텍스트 어드벤처 엔진
 * (file:// 로컬 실행 및 GitHub Pages 100% 호환)
 */

(function () {
  "use strict";

  // =========================================================================
  // 1. DATA: COMPANIONS & ITEMS
  // =========================================================================

  const COMPANIONS = {
    yubaek: {
      id: "yubaek",
      name: "마제 유백",
      title: "전대 천마 · 묵향의 스승",
      quote: "무공의 끝에는 선악이 없다. 오직 네 자신의 의지만이 존재할 뿐.",
      description: "살수였던 묵향의 재능을 알아보고 천마신교의 후계자로 키워낸 스승.",
      passive: "천마심법 (내공 최대치 및 공격력 상승)",
      avatar: "🧙‍♂️"
    },
    artheus: {
      id: "artheus",
      name: "아르티어스",
      title: "블루 드래곤 · 묵향의 의부",
      quote: "인간 꼬마야, 이 몸의 위대한 마법 앞에서 경탄하거라!",
      description: "인간 세상에서 유희를 즐기던 고룡. 묵향의 오만한 기백을 마음에 들어 해 의부를 자처함.",
      passive: "드래곤의 가호 (마법 저항 및 치명적 피해 무효화)",
      avatar: "🐉"
    },
    karel: {
      id: "karel",
      name: "카렐",
      title: "크루마 제국 기사",
      quote: "다크 경의 타이탄 뒤라면 그 어떤 전장이라도 두렵지 않습니다!",
      description: "묵향(다크)의 압도적인 타이탄 조종술에 반해 충성을 맹세한 기사.",
      passive: "기사단의 돌격 (타이탄 연계 공격력 증가)",
      avatar: "⚔️"
    },
    choyoung: {
      id: "choyoung",
      name: "초영",
      title: "천마신교 호법",
      quote: "교주님! 40년을 하루같이 교주님의 귀환만을 기다렸습니다!",
      description: "묵향이 실종된 후 40년간 마교의 잔존 세력을 이끌며 복수의 칼을 갈아온 충신.",
      passive: "혈교 추적 (배신자 및 기습 사전 간파)",
      avatar: "🧝‍♀️"
    }
  };

  const ITEMS = {
    demon_sword: {
      id: "demon_sword",
      name: "천마도 (天魔刀)",
      type: "equipment",
      icon: "🗡️",
      description: "천마신교 교주의 상징. 검붉은 마기가 서려 있는 각진 보도.",
      effectDescription: "기본 무기 (검강/삼절검 판정 기반)"
    },
    titan_heracles: {
      id: "titan_heracles",
      name: "타이탄 헤라클레스",
      type: "equipment",
      icon: "🤖",
      description: "크루마 제국 최강의 마도 거대 병기. 묵향의 내공과 결합하면 일개 군단을 격멸함.",
      effectDescription: "탑승 시 타이탄 전투 선택지 해금"
    },
    mana_stone: {
      id: "mana_stone",
      name: "최상급 마나스톤",
      type: "consumable",
      icon: "💎",
      description: "순도 100%의 마나 결정체. 마나와 내공을 단숨에 채워줍니다.",
      effectDescription: "사용 시 내공/마나 50 회복",
      healQi: 50
    },
    holy_elixir: {
      id: "holy_elixir",
      name: "소림 대환단",
      type: "consumable",
      icon: "💊",
      description: "내외상을 치유하고 기혈을 뚫어주는 영약.",
      effectDescription: "사용 시 체력 40 회복",
      healHp: 40
    },
    dimension_scroll: {
      id: "dimension_scroll",
      name: "차원 이동 마법식",
      type: "key_item",
      icon: "📜",
      description: "아르티어스와 함께 수년에 걸쳐 완성한 무림 귀환용 차원 마법진 두루마리.",
      effectDescription: "무림 귀환의 열쇠"
    }
  };

  // =========================================================================
  // 2. SCENARIO SCENES DATA (30-Minute Playthrough)
  // =========================================================================

  const SCENES = {
    // -----------------------------------------------------------------------
    // PROLOGUE: 살수 2호에서 마교의 후계자로
    // -----------------------------------------------------------------------
    prologue_1_assassin: {
      id: "prologue_1_assassin",
      chapter: "Prologue. 감정 없는 살수, 2호",
      realm: "절정 (絶頂)",
      model3d: "sword",
      speaker: "묵향 (살수 2호)",
      text: "어둠 속에서 숨을 죽였다. 살수 문파 백살문에서 나는 이름 대신 '2호'로 불렸다.\n\n피 냄새와 차가운 쇠붙이의 감촉만이 내 세계의 전부였다. 하지만 오늘, 백살문의 본산이 천마신교의 붉은 깃발 아래 무너져 내리고 있었다.",
      choices: [
        {
          text: "살수의 본능으로 적의 틈을 노린다.",
          fx: "slash",
          nextSceneId: "prologue_2_meet_yubaek"
        }
      ]
    },

    prologue_2_meet_yubaek: {
      id: "prologue_2_meet_yubaek",
      chapter: "Prologue. 감정 없는 살수, 2호",
      realm: "절정 (絶頂)",
      model3d: "sword",
      speaker: "마제 유백",
      text: "\"살기로 가득 찬 눈빛이로군. 핏덩이 주제에 제법 날카로운 칼날을 품었구나.\"\n\n불타는 백살문 마당에 홀로 선 거한, 천마신교의 전대 교주 '마제 유백'이 내 목에 겨눠진 비검을 손가락 하나로 튕겨냈다. 웅혼한 마기가 대기를 짓눌렀다.",
      choices: [
        {
          text: "\"죽일 테면 죽여라. 살수는 목숨을 구걸하지 않는다.\"",
          nextSceneId: "prologue_3_apprentice"
        }
      ]
    },

    prologue_3_apprentice: {
      id: "prologue_3_apprentice",
      chapter: "Prologue. 감정 없는 살수, 2호",
      realm: "절정 (絶頂)",
      model3d: "sword",
      speaker: "마제 유백",
      text: "\"크하하하! 마음에 들었다. 오늘부터 네 이름은 '묵향(墨香)'이다. 먹물처럼 어둡고 묵직한 칼을 쓰라는 뜻이지.\n나를 따라와라. 천하를 네 발밑에 꿇려주마!\"\n\n이로써 나는 살수 2호의 껍질을 벗고 마제의 유일한 직계 제자가 되었다.",
      choices: [
        {
          text: "스승을 따라 천마신교의 본산 십마관으로 향한다.",
          effect: { companionsAdd: ["yubaek"], itemsAdd: ["demon_sword"] },
          nextSceneId: "act1_ascension"
        }
      ]
    },

    // -----------------------------------------------------------------------
    // ACT 1: 천마의 등극과 배신 (무협편)
    // -----------------------------------------------------------------------
    act1_ascension: {
      id: "act1_ascension",
      chapter: "Act 1. 천마의 비상과 암투",
      realm: "화경 (化境) / 극마",
      model3d: "sword",
      speaker: "묵향",
      text: "수십 년의 혹독한 폐관 수련 끝에 나는 마침내 마도의 지고한 경지인 '화경(극마)'에 도달했다.\n\n늙은 장로들의 거센 반발을 꺾고 마침내 천마신교의 8대 교주 자리에 올랐다. 검붉은 옥좌에 앉아 천하를 굽어보았다.",
      choices: [
        {
          text: "정마대전에서 정파 무림맹을 짓밟는다.",
          fx: "slash",
          effect: { qi: 20 },
          nextSceneId: "act1_conspiracy"
        },
        {
          text: "교내 반역 장로들의 동태를 감시한다.",
          fx: "demon",
          nextSceneId: "act1_conspiracy"
        }
      ]
    },

    act1_conspiracy: {
      id: "act1_conspiracy",
      chapter: "Act 1. 천마의 비상과 암투",
      realm: "화경 (化境) / 극마",
      model3d: "sword",
      speaker: "지문",
      text: "그러나 묵향의 압도적인 무력과 독선에 위협을 느낀 장로원과 비밀 결사 '혈교'의 잔당들이 은밀히 연합했다.\n\n정마대전의 막바지, 승리를 축하하는 연회장 바닥에 붉은 마법진이 번쩍였다. 고대 금제와 차원 이동 술식이었다!",
      choices: [
        {
          text: "[천마강기] 전신의 마기를 폭발시켜 마법진을 부수려 한다!",
          fx: "demon",
          effect: { hp: -20, qi: -30 },
          nextSceneId: "act1_betrayal_rift"
        },
        {
          text: "[삼절검] 배신한 장로들의 목을 먼저 베어 넘긴다!",
          fx: "slash",
          effect: { hp: -10 },
          nextSceneId: "act1_betrayal_rift"
        }
      ]
    },

    act1_betrayal_rift: {
      id: "act1_betrayal_rift",
      chapter: "Act 1. 천마의 비상과 암투",
      realm: "화경 (化境) / 극마",
      model3d: "sword",
      speaker: "묵향",
      text: "\"감히 네놈들이... 이 천마를 배신해?!\"\n장로들의 피가 튀었지만 이미 공간이 비틀리고 있었다. 허공에 거대한 차원의 균열이 열리며 내 육신을 삼켜버렸다.\n\n시야가 암전되며 영혼이 찢겨나가는 듯한 혼돈 속으로 떨어졌다.",
      choices: [
        {
          text: "의식을 잃으며 알 수 없는 이계로 추락한다...",
          nextSceneId: "act2_fantasy_arrival"
        }
      ]
    },

    // -----------------------------------------------------------------------
    // ACT 2: 판타지 대륙 표류 & 드래곤과의 만남 & 타이탄 (판타지편)
    // -----------------------------------------------------------------------
    act2_fantasy_arrival: {
      id: "act2_fantasy_arrival",
      chapter: "Act 2. 이계의 표류자",
      realm: "화경 (化境) / 극마",
      model3d: "dragon",
      speaker: "묵향",
      text: "눈을 떴을 때, 머리 위에는 두 개의 달이 떠 있었다. 중원의 하늘이 아니었다.\n\n숲속에서 나는 푸른 비늘을 번뜩이는 거대한 생명체와 마주쳤다. 전설 속의 영물, 블루 드래곤이었다.",
      choices: [
        {
          text: "바스타드 소드를 뽑아 겨누며 기세를 뿜는다.",
          fx: "slash",
          nextSceneId: "act2_artheus_encounter"
        },
        {
          text: "상대의 지성을 확인하기 위해 말을 건넨다.",
          nextSceneId: "act2_artheus_encounter"
        }
      ]
    },

    act2_artheus_encounter: {
      id: "act2_artheus_encounter",
      chapter: "Act 2. 이계의 표류자",
      realm: "화경 (化境) / 극마",
      model3d: "dragon",
      speaker: "블루 드래곤 아르티어스",
      text: "\"호오? 다른 차원에서 온 인간이라... 미천한 인간 주제에 나 아르티어스 앞에서 오만한 눈빛을 잃지 않는군!\n마음에 들었다! 이 몸이 너를 가엾게 여겨 의붓아들로 삼아주마!\"\n\n수천 년을 산 유쾌하고 자존심 강한 고룡 아르티어스와 기묘한 부자의 연을 맺게 되었다.",
      choices: [
        {
          text: "\"늙은 도마뱀 영감, 날 가르치려 들지 마시오.\"",
          effect: { companionsAdd: ["artheus"], itemsAdd: ["mana_stone"] },
          nextSceneId: "act2_titan_discovery"
        }
      ]
    },

    act2_titan_discovery: {
      id: "act2_titan_discovery",
      chapter: "Act 2. 이계의 표류자",
      realm: "화경 (化境) / 극마",
      model3d: "titan",
      speaker: "묵향 (다크)",
      text: "아르티어스로부터 이 세계의 언어와 마나 체계를 배운 뒤, 나는 '다크'라는 이름의 용병으로 활동했다.\n\n그리고 이 세계 전장의 주역인 거대 마도 기계 병기 **'타이탄(Titan)'**을 목격했다. 강철과 마나로 움직이는 5미터짜리 거신이었다.",
      choices: [
        {
          text: "크루마 제국의 최신형 타이탄 '헤라클레스'에 탑승한다.",
          fx: "smash",
          effect: { titanActive: true, itemsAdd: ["titan_heracles"] },
          nextSceneId: "act2_titan_piloting"
        }
      ]
    },

    act2_titan_piloting: {
      id: "act2_titan_piloting",
      chapter: "Act 2. 이계의 표류자",
      realm: "화경 (化境) / 극마",
      model3d: "titan",
      speaker: "카렐 경",
      text: "\"믿을 수가 없습니다! 다크 경이 헤라클레스의 마나 회로에 내공을 주입하자 출력이 300% 이상 폭증했습니다!\n마치 거신이 살아서 춤추는 듯합니다!\"\n\n무공의 원리를 타이탄 조종술에 접목하자, 나의 타이탄은 일개 군단을 홀로 유린하는 절대 병기로 거듭났다.",
      choices: [
        {
          text: "코린트 제국의 타이탄 부대를 단칼에 베어 넘긴다!",
          fx: "smash",
          nextSceneId: "act3_curse_darklady"
        }
      ]
    },

    // -----------------------------------------------------------------------
    // ACT 3: 다크레이디의 저주 & 제국 대전쟁
    // -----------------------------------------------------------------------
    act3_curse_darklady: {
      id: "act3_curse_darklady",
      chapter: "Act 3. 다크레이디의 저주",
      realm: "현경 (玄境) 진입",
      model3d: "titan",
      speaker: "지문",
      text: "다크(묵향)의 무시무시한 활약에 경악한 적국 코린트 제국의 흑마법사들이 연합하여 사악한 저주 의식을 감행했다.\n\n어둠의 주문이 전장을 뒤덮었고, 타이탄 조종석에 앉아 있던 묵향의 육신이 뒤틀리기 시작했다.",
      choices: [
        {
          text: "내공으로 저주를 밀어내려 발악한다!",
          fx: "demon",
          effect: { hp: -20, qi: -20 },
          nextSceneId: "act3_transformation"
        }
      ]
    },

    act3_transformation: {
      id: "act3_transformation",
      chapter: "Act 3. 다크레이디의 저주",
      realm: "현경 (玄境) 진입",
      model3d: "sword",
      speaker: "묵향 (다크 레이디)",
      text: "\"이... 이게 무슨 해괴망측한 꼴이란 말이냐?!\"\n\n거칠고 굳은살 박힌 무인의 손은 온데간데없고, 은발의 아름답고 가녀린 소녀의 손이 눈앞에 있었다. 적들의 저주로 인해 **소녀의 육체(TS)**로 강제 변이당한 것이었다!\n\n아르티어스가 배를 잡고 뒹굴며 웃었다. \"크하하하! 꼬마야, 딸내미가 된 걸 축하한다!\"",
      choices: [
        {
          text: "분노를 억누르고 아르티어스에게 저주 해제법을 묻는다.",
          nextSceneId: "act3_war_climax"
        },
        {
          text: "\"영감! 웃지 말고 당장 이 저주를 풀어내시오!\"",
          nextSceneId: "act3_war_climax"
        }
      ]
    },

    act3_war_climax: {
      id: "act3_war_climax",
      chapter: "Act 3. 다크레이디의 저주",
      realm: "현경 (玄境) / 탈마",
      model3d: "titan",
      speaker: "묵향 (다크 레이디)",
      text: "비록 몸은 소녀로 변했으나, 수련한 무공과 내공의 본질은 변하지 않았다.\n\n나는 '다크 레이디'로서 크루마 제국의 선봉에 서서 대륙 전쟁의 최종 결전에 돌입했다. 수백 기의 타이탄이 격돌하는 카토로나 평원에서 적국의 심장을 박살 냈다.",
      choices: [
        {
          text: "타이탄 메가 캐넌으로 적 본대를 궤멸시킨다!",
          fx: "smash",
          effect: { hp: -15 },
          nextSceneId: "act3_dimension_formula"
        }
      ]
    },

    act3_dimension_formula: {
      id: "act3_dimension_formula",
      chapter: "Act 3. 다크레이디의 저주",
      realm: "현경 (玄境) / 탈마",
      model3d: "dragon",
      speaker: "블루 드래곤 아르티어스",
      text: "\"드디어 완성했다. 네 원래 세계로 돌아갈 차원 이동 마법진이다.\n그리고 네 본래 육신을 되찾는 주문도 걸어두었지... 꼬마야, 가면 다시는 못 볼 텐데 정말 갈 테냐?\"\n\n장난기 많던 늙은 드래곤의 눈빛에 쓸쓸한 정이 어려 있었다.",
      choices: [
        {
          text: "\"영감, 고마웠소. 무림에는 아직 내가 정리해야 할 빚이 남아있소.\"",
          effect: { itemsAdd: ["dimension_scroll"] },
          nextSceneId: "act4_return_murim"
        }
      ]
    },

    // -----------------------------------------------------------------------
    // ACT 4: 40년 만의 무림 귀환 & 생사경의 도래 (귀환편)
    // -----------------------------------------------------------------------
    act4_return_murim: {
      id: "act4_return_murim",
      chapter: "Act 4. 천마의 귀환",
      realm: "생사경 (生死境) 직전",
      model3d: "formation",
      speaker: "묵향",
      text: "번쩍이는 백색 섬광과 함께 흙냄새가 코를 찔렀다. 중원의 대지였다.\n본래의 건장한 사내 모습으로 돌아왔으나, 어딘가 이상했다.\n\n천마신교의 총본산 십마관은 폐허가 되어 잡초만 무성했고, 내가 아끼던 궁전은 불타 있었다.",
      choices: [
        {
          text: "주변의 생존자를 찾아 사태를 파악한다.",
          nextSceneId: "act4_forty_years_later"
        }
      ]
    },

    act4_forty_years_later: {
      id: "act4_forty_years_later",
      chapter: "Act 4. 천마의 귀환",
      realm: "생사경 (生死境) 직전",
      model3d: "formation",
      speaker: "초영 (노파)",
      text: "\"교... 교주님?! 정말 교주님이십니까?!\"\n백발이 성성한 노파가 내 앞에 엎드려 통곡했다. 과거 내 곁을 지키던 어린 호법 초영이었다.\n\n\"교주님께서 실종되신 지 무려 **40년**이 흘렀습니다... 배신자 장로들과 혈교 놈들이 교단을 찢어발겼습니다...\"",
      choices: [
        {
          text: "\"초영, 고개를 들어라. 내가 돌아왔으니 이제 천마신교는 부활할 것이다.\"",
          effect: { companionsAdd: ["choyoung"] },
          nextSceneId: "act4_final_revenge"
        }
      ]
    },

    act4_final_revenge: {
      id: "act4_final_revenge",
      chapter: "Act 4. 천마의 귀환",
      realm: "생사경 (生死境) 완성",
      model3d: "formation",
      speaker: "배신자 장로",
      text: "마교를 찬탈하고 호의호식하던 늙은 배신자들이 사병 천 명을 이끌고 나를 포위했다.\n\"네놈이 묵향이라고?! 40년 전 귀신이 어떻게 살아 돌아온단 말이냐! 죽여라!\"\n\n나는 천마도를 천천히 허공으로 띄웠다. 무공의 지고한 극의, 생사경(탈경)의 경지가 열렸다.",
      choices: [
        {
          text: "[만검귀종] 수백 자루의 비검을 허공에 소환하여 배신자들을 심판한다!",
          fx: "slash",
          nextSceneId: "ending_true"
        },
        {
          text: "[천마혈겁] 압도적인 내공 파동으로 적의 기혈을 단숨에 터뜨린다!",
          fx: "demon",
          nextSceneId: "ending_normal"
        }
      ]
    },

    // -----------------------------------------------------------------------
    // ENDINGS
    // -----------------------------------------------------------------------
    ending_true: {
      id: "ending_true",
      chapter: "True Ending. 생사경의 무신(武神)",
      realm: "생사경 (生死境)",
      model3d: "formation",
      speaker: "묵향",
      text: "수백 자루의 칼날이 허공을 가르며 배신자들을 흔적도 없이 쓸어버렸다.\n\n천마신교는 완벽하게 재건되었고, 정파와 사파를 막론하고 천하의 모든 무림인이 내 이름 앞에 무릎을 꿇었다.\n하지만 내 시선은 먼 서쪽 하늘, 두 개의 달이 뜨던 아르티어스의 세계를 향하고 있었다.\n\n인간의 한계를 넘어선 자, 묵향은 이제 무림을 넘어 전설의 신화로 영원히 남게 되었다.\n\n— [True Ending: 생사경의 무신] 완결 —",
      choices: [
        {
          text: "처음부터 다시 플레이하기",
          effect: { restart: true },
          nextSceneId: "prologue_1_assassin"
        }
      ]
    },

    ending_normal: {
      id: "ending_normal",
      chapter: "Normal Ending. 천마의 패도(覇道)",
      realm: "현경 (玄境) / 극마",
      model3d: "sword",
      speaker: "묵향",
      text: "배신자들의 피로 본산을 물들이며 천마신교의 깃발을 다시 높이 세웠다.\n\n나는 다시금 천하제일의 패왕으로서 중원 무림을 철권통치하기 시작했다. 비록 판타지 세계의 기억은 아련한 꿈처럼 희미해졌지만, 나의 칼날은 여전히 천하를 호령하고 있다.\n\n— [Normal Ending: 천마의 패도] 완결 —",
      choices: [
        {
          text: "처음부터 다시 플레이하기",
          effect: { restart: true },
          nextSceneId: "prologue_1_assassin"
        }
      ]
    }
  };

  // =========================================================================
  // 3. RETRO LOW-POLY 3D VIEWPORT ENGINE (Three.js)
  // =========================================================================

  class Retro3DEngine {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      if (!this.container || typeof THREE === "undefined") {
        console.warn("Three.js not loaded or container missing.");
        return;
      }

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x0a0b10);

      // Low resolution buffer for retro pixelated feeling
      this.width = 400;
      this.height = 220;

      this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 100);
      this.camera.position.set(0, 0, 7);

      this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
      this.renderer.setSize(this.width, this.height, false);
      this.renderer.domElement.className = "viewport-3d-canvas";
      this.container.appendChild(this.renderer.domElement);

      // Lights: Ambient + Directional (Flat shading friendly)
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      this.scene.add(ambientLight);

      this.dirLight = new THREE.DirectionalLight(0xe2b05f, 1.2);
      this.dirLight.position.set(5, 8, 5);
      this.scene.add(this.dirLight);

      const rimLight = new THREE.DirectionalLight(0xd63d4a, 0.8);
      rimLight.position.set(-5, -5, -3);
      this.scene.add(rimLight);

      // Model groups
      this.models = {};
      this.activeModelKey = null;

      this.createModels();

      // Mouse Parallax Interaction
      this.mouseX = 0;
      this.mouseY = 0;
      window.addEventListener("mousemove", (e) => {
        const rect = this.container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        this.mouseX = x * 2;
        this.mouseY = y * 2;
      });

      this.animate = this.animate.bind(this);
      this.animate();
    }

    createModels() {
      // 1. Heavenly Demon Sword (천마도)
      const swordGroup = new THREE.Group();
      const bladeMat = new THREE.MeshLambertMaterial({ color: 0xc0c5ce, flatShading: true });
      const guardMat = new THREE.MeshLambertMaterial({ color: 0xd63d4a, flatShading: true });
      const goldMat = new THREE.MeshLambertMaterial({ color: 0xe2b05f, flatShading: true });

      // Blade: Faceted elongated prism
      const bladeGeo = new THREE.CylinderGeometry(0.08, 0.28, 3.8, 4);
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      blade.position.y = 0.8;
      swordGroup.add(blade);

      // Guard: Angular block
      const guardGeo = new THREE.BoxGeometry(1.2, 0.22, 0.35);
      const guard = new THREE.Mesh(guardGeo, guardMat);
      guard.position.y = -1.1;
      swordGroup.add(guard);

      // Grip: Octagonal cylinder
      const gripGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.9, 6);
      const grip = new THREE.Mesh(gripGeo, goldMat);
      grip.position.y = -1.65;
      swordGroup.add(grip);

      // Pommel
      const pommelGeo = new THREE.DodecahedronGeometry(0.24);
      const pommel = new THREE.Mesh(pommelGeo, guardMat);
      pommel.position.y = -2.15;
      swordGroup.add(pommel);

      swordGroup.rotation.z = -Math.PI / 6;
      this.models["sword"] = swordGroup;

      // 2. Titan Mech / Golem (마도 거대 병기 헤라클레스)
      const titanGroup = new THREE.Group();
      const armorMat = new THREE.MeshLambertMaterial({ color: 0x242d3d, flatShading: true });
      const jointMat = new THREE.MeshLambertMaterial({ color: 0x475569, flatShading: true });
      const coreMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

      // Torso
      const chestGeo = new THREE.BoxGeometry(1.8, 1.4, 1.2);
      const chest = new THREE.Mesh(chestGeo, armorMat);
      titanGroup.add(chest);

      // Mana Core (Glowing Crystal in Center)
      const coreGeo = new THREE.OctahedronGeometry(0.35);
      const core = new THREE.Mesh(coreGeo, coreMat);
      core.position.set(0, 0, 0.65);
      titanGroup.add(core);

      // Head / Visor
      const headGeo = new THREE.BoxGeometry(0.7, 0.6, 0.8);
      const head = new THREE.Mesh(headGeo, armorMat);
      head.position.y = 1.1;
      const visorGeo = new THREE.BoxGeometry(0.5, 0.15, 0.2);
      const visor = new THREE.Mesh(visorGeo, coreMat);
      visor.position.set(0, 1.1, 0.42);
      titanGroup.add(head);
      titanGroup.add(visor);

      // Massive Shoulder Plates
      const shoulderGeo = new THREE.BoxGeometry(0.9, 0.9, 0.9);
      const leftShoulder = new THREE.Mesh(shoulderGeo, armorMat);
      leftShoulder.position.set(-1.4, 0.5, 0);
      const rightShoulder = new THREE.Mesh(shoulderGeo, armorMat);
      rightShoulder.position.set(1.4, 0.5, 0);
      titanGroup.add(leftShoulder);
      titanGroup.add(rightShoulder);

      // Arms
      const armGeo = new THREE.BoxGeometry(0.6, 1.4, 0.6);
      const leftArm = new THREE.Mesh(armGeo, jointMat);
      leftArm.position.set(-1.4, -0.6, 0);
      const rightArm = new THREE.Mesh(armGeo, jointMat);
      rightArm.position.set(1.4, -0.6, 0);
      titanGroup.add(leftArm);
      titanGroup.add(rightArm);

      titanGroup.scale.set(0.95, 0.95, 0.95);
      this.models["titan"] = titanGroup;

      // 3. Blue Dragon Artheus (블루 드래곤 아르티어스)
      const dragonGroup = new THREE.Group();
      const blueMat = new THREE.MeshLambertMaterial({ color: 0x1d4ed8, flatShading: true });
      const lightBlueMat = new THREE.MeshLambertMaterial({ color: 0x60a5fa, flatShading: true });
      const eyeMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });

      // Head
      const dHeadGeo = new THREE.ConeGeometry(1.0, 2.2, 5);
      const dHead = new THREE.Mesh(dHeadGeo, blueMat);
      dHead.rotation.x = Math.PI / 2;
      dragonGroup.add(dHead);

      // Horns
      const hornGeo = new THREE.ConeGeometry(0.2, 1.6, 4);
      const hornL = new THREE.Mesh(hornGeo, lightBlueMat);
      hornL.position.set(-0.6, 0.8, -0.4);
      hornL.rotation.set(-0.4, 0, -0.4);
      const hornR = new THREE.Mesh(hornGeo, lightBlueMat);
      hornR.position.set(0.6, 0.8, -0.4);
      hornR.rotation.set(-0.4, 0, 0.4);
      dragonGroup.add(hornL);
      dragonGroup.add(hornR);

      // Glowing Eyes
      const eyeGeo = new THREE.SphereGeometry(0.12, 4, 4);
      const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
      eyeL.position.set(-0.45, 0.2, 0.3);
      const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
      eyeR.position.set(0.45, 0.2, 0.3);
      dragonGroup.add(eyeL);
      dragonGroup.add(eyeR);

      this.models["dragon"] = dragonGroup;

      // 4. Swords Formation (만검귀종 / 생사경의 검진)
      const formationGroup = new THREE.Group();
      const miniSwordMat = new THREE.MeshLambertMaterial({ color: 0x93c5fd, flatShading: true });
      const runeMat = new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true });

      // Central Rune Octagram
      const runeGeo = new THREE.TorusGeometry(2.3, 0.08, 4, 8);
      const rune = new THREE.Mesh(runeGeo, runeMat);
      formationGroup.add(rune);

      // 8 Floating Swords in an Octagram Ring
      this.formationSwords = [];
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const miniSword = new THREE.Mesh(
          new THREE.CylinderGeometry(0.04, 0.12, 1.5, 4),
          miniSwordMat
        );
        miniSword.position.set(Math.cos(angle) * 2.3, Math.sin(angle) * 2.3, 0);
        miniSword.rotation.z = angle + Math.PI / 2;
        formationGroup.add(miniSword);
        this.formationSwords.push(miniSword);
      }

      this.models["formation"] = formationGroup;

      // Add all models to scene but hide initially
      for (const key in this.models) {
        this.scene.add(this.models[key]);
        this.models[key].visible = false;
      }
    }

    switchModel(modelKey) {
      if (!this.models[modelKey]) modelKey = "sword";
      if (this.activeModelKey === modelKey) return;

      for (const key in this.models) {
        this.models[key].visible = key === modelKey;
      }
      this.activeModelKey = modelKey;

      const badge = document.getElementById("viewportBadge");
      if (badge) {
        const titles = {
          sword: "🗡️ 천마도 (天魔刀)",
          titan: "🤖 마도 타이탄 헤라클레스",
          dragon: "🐉 블루 드래곤 아르티어스",
          formation: "✨ 생사경 만검귀종 (萬劍歸宗)"
        };
        badge.textContent = titles[modelKey] || "3D 뷰포트";
      }
    }

    animate() {
      requestAnimationFrame(this.animate);

      const time = performance.now() * 0.001;

      // Parallax camera easing
      this.camera.position.x += (this.mouseX * 0.8 - this.camera.position.x) * 0.05;
      this.camera.position.y += (-this.mouseY * 0.6 - this.camera.position.y) * 0.05;
      this.camera.lookAt(0, 0, 0);

      // Active model animation
      if (this.activeModelKey === "sword") {
        const s = this.models["sword"];
        s.rotation.y = time * 0.8;
        s.position.y = Math.sin(time * 2) * 0.15;
      } else if (this.activeModelKey === "titan") {
        const t = this.models["titan"];
        t.rotation.y = Math.sin(time * 0.8) * 0.35;
        t.position.y = Math.sin(time * 1.5) * 0.1;
      } else if (this.activeModelKey === "dragon") {
        const d = this.models["dragon"];
        d.rotation.y = Math.sin(time * 0.6) * 0.4;
        d.rotation.z = Math.cos(time * 0.8) * 0.15;
      } else if (this.activeModelKey === "formation") {
        const f = this.models["formation"];
        f.rotation.z = time * 0.6;
        f.rotation.x = Math.sin(time * 0.8) * 0.3;
      }

      this.renderer.render(this.scene, this.camera);
    }
  }

  // =========================================================================
  // 4. CORE GAME ENGINE
  // =========================================================================

  class MukhyangEngine {
    constructor(retro3D) {
      this.retro3D = retro3D;
      this.state = this.getInitialState();
      this.isTyping = false;
      this.typingTimer = null;
      this.typingSpeed = 20;
      this.onStateChangeCallbacks = [];
      this.audioCtx = null;
    }

    initAudio() {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.audioCtx = new AudioContext();
        }
      }
    }

    playSound(type) {
      if (!this.audioCtx) return;
      try {
        if (this.audioCtx.state === "suspended") {
          this.audioCtx.resume();
        }
        const now = this.audioCtx.currentTime;

        if (type === "type") {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.type = "sine";
          osc.frequency.setValueAtTime(520 + Math.random() * 150, now);
          gain.gain.setValueAtTime(0.012, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
          osc.start(now);
          osc.stop(now + 0.04);
        } else if (type === "slash") {
          // Sharp martial arts sword slash
          const bufferSize = this.audioCtx.sampleRate * 0.16;
          const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
          }
          const noise = this.audioCtx.createBufferSource();
          noise.buffer = buffer;
          const filter = this.audioCtx.createBiquadFilter();
          filter.type = "bandpass";
          filter.frequency.setValueAtTime(3600, now);
          filter.frequency.exponentialRampToValueAtTime(500, now + 0.16);
          const gain = this.audioCtx.createGain();
          gain.gain.setValueAtTime(0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
          noise.connect(filter);
          filter.connect(gain);
          gain.connect(this.audioCtx.destination);
          noise.start(now);
        } else if (type === "smash") {
          // Deep mechanical titan punch / blast
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(150, now);
          osc.frequency.exponentialRampToValueAtTime(35, now + 0.35);
          gain.gain.setValueAtTime(0.35, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.35);
        } else if (type === "demon" || type === "qi") {
          // Resonant Qi blast
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(220, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);
          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.3);
        } else if (type === "damage") {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(180, now);
          osc.frequency.linearRampToValueAtTime(60, now + 0.22);
          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.22);
        } else if (type === "heal") {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.exponentialRampToValueAtTime(900, now + 0.3);
          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.3);
        }
      } catch (e) {}
    }

    getInitialState() {
      return {
        currentSceneId: "prologue_1_assassin",
        currentChapter: "Prologue. 감정 없는 살수, 2호",
        realm: "절정 (絶頂)",
        player: {
          hp: 100,
          maxHp: 100,
          qi: 60,
          maxQi: 100,
          titanActive: false
        },
        inventory: ["demon_sword", "mana_stone", "holy_elixir"],
        companions: [],
        flags: {},
        rescueCount: 0,
        checkpointSceneId: "prologue_1_assassin"
      };
    }

    onStateChange(callback) {
      this.onStateChangeCallbacks.push(callback);
    }

    notifyStateChange() {
      this.onStateChangeCallbacks.forEach(cb => cb(this.state));
    }

    getState() {
      return JSON.parse(JSON.stringify(this.state));
    }

    loadState(savedState) {
      this.state = JSON.parse(JSON.stringify(savedState));
      this.goToScene(this.state.currentSceneId, false);
    }

    restartGame() {
      this.state = this.getInitialState();
      this.goToScene("prologue_1_assassin", true);
    }

    toggleTitan() {
      if (!this.state.inventory.includes("titan_heracles")) return;
      this.initAudio();
      this.playSound("smash");
      this.state.player.titanActive = !this.state.player.titanActive;
      if (this.retro3D) {
        this.retro3D.switchModel(this.state.player.titanActive ? "titan" : "sword");
      }
      this.notifyStateChange();
    }

    useItem(itemId) {
      const item = ITEMS[itemId];
      if (!item || item.type !== "consumable") return false;

      const idx = this.state.inventory.indexOf(itemId);
      if (idx === -1) return false;

      this.initAudio();
      this.playSound("heal");

      if (item.healHp) {
        this.state.player.hp = Math.min(this.state.player.maxHp, this.state.player.hp + item.healHp);
      }
      if (item.healQi) {
        this.state.player.qi = Math.min(this.state.player.maxQi, this.state.player.qi + item.healQi);
      }

      this.state.inventory.splice(idx, 1);
      this.notifyStateChange();
      return true;
    }

    checkRequirement(choice) {
      if (!choice.requires) return { available: true };
      const req = choice.requires;

      if (req.titanActive !== undefined && this.state.player.titanActive !== req.titanActive) {
        return { available: false, reason: "타이탄 탑승 필요" };
      }
      if (req.companion && !this.state.companions.includes(req.companion)) {
        const comp = COMPANIONS[req.companion];
        return { available: false, reason: `동료 [${comp ? comp.name : req.companion}] 필요` };
      }
      if (req.item && !this.state.inventory.includes(req.item)) {
        const item = ITEMS[req.item];
        return { available: false, reason: `소지품 [${item ? item.name : req.item}] 필요` };
      }
      if (req.qi && this.state.player.qi < req.qi) {
        return { available: false, reason: `내공/마나(${req.qi}) 부족` };
      }

      return { available: true };
    }

    applyEffect(effect) {
      if (!effect) return;

      if (effect.restart) {
        this.state = this.getInitialState();
        return;
      }

      if (effect.hp) {
        this.state.player.hp = Math.max(0, Math.min(this.state.player.maxHp, this.state.player.hp + effect.hp));
        if (effect.hp < 0) this.playSound("damage");
        else this.playSound("heal");
      }

      if (effect.qi) {
        this.state.player.qi = Math.max(0, Math.min(this.state.player.maxQi, this.state.player.qi + effect.qi));
      }

      if (effect.titanActive !== undefined) {
        this.state.player.titanActive = effect.titanActive;
      }

      if (effect.companionsAdd) {
        effect.companionsAdd.forEach(id => {
          if (!this.state.companions.includes(id)) {
            this.state.companions.push(id);
          }
        });
      }

      if (effect.itemsAdd) {
        effect.itemsAdd.forEach(id => {
          if (!this.state.inventory.includes(id)) {
            this.state.inventory.push(id);
          }
        });
      }

      if (effect.flags) {
        Object.assign(this.state.flags, effect.flags);
      }
    }

    selectChoice(choiceIndex) {
      const scene = SCENES[this.state.currentSceneId];
      if (!scene || !scene.choices || !scene.choices[choiceIndex]) return;

      const choice = scene.choices[choiceIndex];
      const check = this.checkRequirement(choice);
      if (!check.available) return;

      this.initAudio();

      if (choice.fx) {
        this.triggerVisualEffect(choice.fx);
      } else {
        this.playSound("type");
      }

      if (choice.effect) {
        this.applyEffect(choice.effect);
        if (choice.effect.hp && choice.effect.hp < 0) {
          this.triggerVisualEffect("damage");
        }
      }

      if (this.state.player.hp <= 0) {
        this.handlePlayerDeath();
        return;
      }

      this.goToScene(choice.nextSceneId);
    }

    triggerVisualEffect(type) {
      const overlay = document.getElementById("fxOverlay");
      const mainWrapper = document.getElementById("gameMainWrapper");
      if (!overlay) return;

      overlay.innerHTML = "";

      if (type === "slash") {
        this.playSound("slash");
        const slash1 = document.createElement("div");
        slash1.className = "fx-slash-element";
        const slash2 = document.createElement("div");
        slash2.className = "fx-slash-element reverse";
        overlay.appendChild(slash1);
        setTimeout(() => overlay.appendChild(slash2), 90);
      } else if (type === "smash") {
        this.playSound("smash");
        if (mainWrapper) {
          mainWrapper.classList.remove("screen-shake");
          void mainWrapper.offsetWidth;
          mainWrapper.classList.add("screen-shake");
          setTimeout(() => mainWrapper.classList.remove("screen-shake"), 350);
        }
        const smash = document.createElement("div");
        smash.className = "fx-smash-element";
        overlay.appendChild(smash);
      } else if (type === "demon") {
        this.playSound("demon");
        const flash = document.createElement("div");
        flash.className = "fx-flash-element demon";
        overlay.appendChild(flash);
      } else if (type === "qi") {
        this.playSound("qi");
        const flash = document.createElement("div");
        flash.className = "fx-flash-element qi";
        overlay.appendChild(flash);
      } else if (type === "damage") {
        this.playSound("damage");
        if (mainWrapper) {
          mainWrapper.classList.remove("screen-shake");
          void mainWrapper.offsetWidth;
          mainWrapper.classList.add("screen-shake");
          setTimeout(() => mainWrapper.classList.remove("screen-shake"), 350);
        }
        const flash = document.createElement("div");
        flash.className = "fx-flash-element damage";
        overlay.appendChild(flash);
      }

      setTimeout(() => {
        overlay.innerHTML = "";
      }, 500);
    }

    handlePlayerDeath() {
      this.playSound("damage");
      if (this.state.rescueCount === 0 && this.state.companions.length > 0) {
        this.state.rescueCount++;
        this.state.player.hp = 35;
        this.state.player.qi = 30;

        const savior = this.state.companions.includes("artheus")
          ? "블루 드래곤 아르티어스"
          : this.state.companions.includes("yubaek")
          ? "스승 마제 유백"
          : "충직한 동료들";

        alert(`[절체절명의 위기!]\n${savior}의 절대적인 비호로 죽음의 문턱에서 기적적으로 살아났습니다!\n(체력 35, 내공 30으로 소생)`);
        this.notifyStateChange();
      } else {
        alert("[무운이 다했습니다]\n치명상을 입고 쓰러졌습니다. 챕터 시작 지점으로 돌아갑니다.");
        this.state.player.hp = 100;
        this.state.player.qi = 50;
        this.goToScene(this.state.checkpointSceneId || "prologue_1_assassin");
      }
    }

    goToScene(sceneId, autoSave = true) {
      const scene = SCENES[sceneId];
      if (!scene) {
        console.error("Scene not found:", sceneId);
        return;
      }

      this.state.currentSceneId = sceneId;
      if (scene.chapter) this.state.currentChapter = scene.chapter;
      if (scene.realm) this.state.realm = scene.realm;

      if (sceneId.includes("_1_") || sceneId.includes("_arrival") || sceneId.includes("_ascension")) {
        this.state.checkpointSceneId = sceneId;
      }

      // Switch 3D Model in Viewport
      if (this.retro3D) {
        if (this.state.player.titanActive) {
          this.retro3D.switchModel("titan");
        } else if (scene.model3d) {
          this.retro3D.switchModel(scene.model3d);
        }
      }

      this.notifyStateChange();

      if (autoSave && window.gameSaveSystem) {
        window.gameSaveSystem.saveToSlot("auto", `${this.state.currentChapter} (자동 저장)`);
      }
    }

    getCurrentScene() {
      return SCENES[this.state.currentSceneId] || null;
    }
  }

  // =========================================================================
  // 5. SAVE & LOAD SYSTEM
  // =========================================================================

  class MukhyangSaveSystem {
    constructor(engine) {
      this.engine = engine;
      this.storageKeyPrefix = "mukhyang_save_";
    }

    getSlotKey(slotId) {
      return `${this.storageKeyPrefix}${slotId}`;
    }

    saveToSlot(slotId, customTitle = "") {
      try {
        const state = this.engine.getState();
        const saveData = {
          version: "1.0",
          timestamp: new Date().toISOString(),
          formattedDate: new Date().toLocaleString("ko-KR"),
          slotId: slotId,
          title: customTitle || state.currentChapter || "무림 비망록",
          realm: state.realm,
          state: state
        };

        localStorage.setItem(this.getSlotKey(slotId), JSON.stringify(saveData));
        return { success: true, message: `슬롯 [${slotId}]에 저장되었습니다.` };
      } catch (e) {
        console.error("Save failed:", e);
        return { success: false, message: "저장에 실패했습니다: " + e.message };
      }
    }

    loadFromSlot(slotId) {
      try {
        const rawData = localStorage.getItem(this.getSlotKey(slotId));
        if (!rawData) {
          return { success: false, message: "해당 슬롯에 저장된 데이터가 없습니다." };
        }

        const saveData = JSON.parse(rawData);
        this.engine.loadState(saveData.state);
        return { success: true, message: `슬롯 [${slotId}]에서 불러왔습니다.` };
      } catch (e) {
        console.error("Load failed:", e);
        return { success: false, message: "불러오기에 실패했습니다: " + e.message };
      }
    }

    getSlotList() {
      const slots = ["auto", "1", "2", "3"];
      return slots.map(slotId => {
        const rawData = localStorage.getItem(this.getSlotKey(slotId));
        if (!rawData) {
          return {
            slotId,
            isEmpty: true,
            label: slotId === "auto" ? "자동 저장" : `슬롯 ${slotId}`
          };
        }
        try {
          const data = JSON.parse(rawData);
          return {
            slotId,
            isEmpty: false,
            label: slotId === "auto" ? "자동 저장" : `슬롯 ${slotId}`,
            title: data.title,
            formattedDate: data.formattedDate,
            realm: data.realm || data.state.realm,
            hp: data.state.player.hp,
            qi: data.state.player.qi
          };
        } catch (e) {
          return { slotId, isEmpty: true, label: `슬롯 ${slotId} (손상됨)` };
        }
      });
    }

    exportSaveDataString(slotId = "auto") {
      const rawData = localStorage.getItem(this.getSlotKey(slotId));
      if (!rawData) {
        const state = this.engine.getState();
        const exportObj = {
          version: "1.0",
          timestamp: new Date().toISOString(),
          formattedDate: new Date().toLocaleString("ko-KR"),
          slotId: "export",
          title: state.currentChapter || "내보낸 비망록",
          realm: state.realm,
          state: state
        };
        return JSON.stringify(exportObj, null, 2);
      }
      return rawData;
    }

    importSaveDataString(jsonString) {
      try {
        const saveData = JSON.parse(jsonString);
        if (!saveData.state || !saveData.state.currentSceneId) {
          throw new Error("유효한 세이브 데이터 형식이 아닙니다.");
        }

        this.engine.loadState(saveData.state);
        this.saveToSlot("auto", "가져온 세이브");
        return { success: true, message: "비망록 데이터를 성공적으로 가져왔습니다!" };
      } catch (e) {
        console.error("Import failed:", e);
        return { success: false, message: "데이터 가져오기 실패: " + e.message };
      }
    }
  }

  // =========================================================================
  // 6. UI BINDING & APP INITIALIZATION
  // =========================================================================

  document.addEventListener("DOMContentLoaded", () => {
    const retro3D = new Retro3DEngine("viewport3dContainer");
    const engine = new MukhyangEngine(retro3D);
    const saveSystem = new MukhyangSaveSystem(engine);

    window.gameEngine = engine;
    window.gameSaveSystem = saveSystem;

    // DOM Caching
    const chapterBadge = document.getElementById("chapterBadge");
    const realmBadge = document.getElementById("realmBadge");
    const hpFill = document.getElementById("hpFill");
    const hpText = document.getElementById("hpText");
    const qiFill = document.getElementById("qiFill");
    const qiText = document.getElementById("qiText");
    const titanToggleBtn = document.getElementById("titanToggleBtn");
    const titanStatusText = document.getElementById("titanStatusText");

    const speakerBadge = document.getElementById("speakerBadge");
    const storyText = document.getElementById("storyText");
    const choicesContainer = document.getElementById("choicesContainer");

    const companionList = document.getElementById("companionList");
    const companionCount = document.getElementById("companionCount");
    const inventoryList = document.getElementById("inventoryList");

    const saveModal = document.getElementById("saveModal");
    const btnOpenSaveModal = document.getElementById("btnOpenSaveModal");
    const btnCloseSaveModal = document.getElementById("btnCloseSaveModal");
    const saveSlotsContainer = document.getElementById("saveSlotsContainer");

    const exportModal = document.getElementById("exportModal");
    const btnOpenExportModal = document.getElementById("btnOpenExportModal");
    const btnCloseExportModal = document.getElementById("btnCloseExportModal");
    const jsonExportText = document.getElementById("jsonExportText");
    const btnCopyJson = document.getElementById("btnCopyJson");
    const btnImportJson = document.getElementById("btnImportJson");

    const btnRestartGame = document.getElementById("btnRestartGame");

    let currentTypingIndex = 0;
    let fullCurrentText = "";
    let typingInterval = null;

    function renderUI(state) {
      // 1. Top HUD
      chapterBadge.textContent = state.currentChapter || "무림행";
      realmBadge.textContent = state.realm || "화경";

      const hpPercent = Math.max(0, Math.min(100, (state.player.hp / state.player.maxHp) * 100));
      hpFill.style.width = `${hpPercent}%`;
      hpText.textContent = `${state.player.hp}/${state.player.maxHp}`;

      const qiPercent = Math.max(0, Math.min(100, (state.player.qi / state.player.maxQi) * 100));
      qiFill.style.width = `${qiPercent}%`;
      qiText.textContent = `${state.player.qi}/${state.player.maxQi}`;

      if (state.player.titanActive) {
        titanToggleBtn.classList.add("active");
        titanStatusText.textContent = "[탑승중]";
      } else {
        titanToggleBtn.classList.remove("active");
        titanStatusText.textContent = "[대기]";
      }

      // 2. Companions
      companionCount.textContent = `${state.companions.length}명`;
      companionList.innerHTML = "";
      if (state.companions.length === 0) {
        companionList.innerHTML = '<div class="empty-state">아직 함께하는 조력자가 없습니다.</div>';
      } else {
        state.companions.forEach(compId => {
          const comp = COMPANIONS[compId];
          if (!comp) return;
          const compEl = document.createElement("div");
          compEl.className = "companion-item";
          compEl.innerHTML = `
            <span class="companion-avatar">${comp.avatar}</span>
            <div class="companion-info">
              <h4>${comp.name} <small style="font-size:0.75rem; color:var(--accent-gold);">(${comp.title})</small></h4>
              <p>${comp.passive}</p>
            </div>
          `;
          companionList.appendChild(compEl);
        });
      }

      // 3. Inventory
      inventoryList.innerHTML = "";
      if (state.inventory.length === 0) {
        inventoryList.innerHTML = '<div class="empty-state">소지품이 비어 있습니다.</div>';
      } else {
        state.inventory.forEach(itemId => {
          const item = ITEMS[itemId];
          if (!item) return;
          const itemEl = document.createElement("div");
          itemEl.className = "inventory-item";

          let useBtnHtml = "";
          if (item.type === "consumable") {
            useBtnHtml = `<button class="btn-use-item" data-item-id="${itemId}">복용</button>`;
          }

          itemEl.innerHTML = `
            <span class="item-icon">${item.icon}</span>
            <div class="item-details">
              <h4>${item.name}</h4>
              <p>${item.effectDescription}</p>
            </div>
            ${useBtnHtml}
          `;
          inventoryList.appendChild(itemEl);
        });

        inventoryList.querySelectorAll(".btn-use-item").forEach(btn => {
          btn.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-item-id");
            engine.useItem(id);
          });
        });
      }

      // 4. Story Text & Choices
      const scene = engine.getCurrentScene();
      if (scene) {
        speakerBadge.textContent = scene.speaker || "지문";
        startTypingAnimation(scene.text, scene.choices);
      }
    }

    function startTypingAnimation(text, choices) {
      if (typingInterval) {
        clearInterval(typingInterval);
        typingInterval = null;
      }

      fullCurrentText = text;
      currentTypingIndex = 0;
      storyText.innerHTML = '<span class="typing-cursor"></span>';
      choicesContainer.innerHTML = "";
      choicesContainer.style.opacity = "0.3";
      choicesContainer.style.pointerEvents = "none";

      engine.isTyping = true;

      typingInterval = setInterval(() => {
        if (currentTypingIndex < fullCurrentText.length) {
          currentTypingIndex++;
          const partial = fullCurrentText.substring(0, currentTypingIndex);
          storyText.innerHTML = partial.replace(/\n/g, "<br>") + '<span class="typing-cursor"></span>';
          if (currentTypingIndex % 3 === 0) {
            engine.playSound("type");
          }
        } else {
          finishTypingAnimation(choices);
        }
      }, engine.typingSpeed);
    }

    function finishTypingAnimation(choices) {
      if (typingInterval) {
        clearInterval(typingInterval);
        typingInterval = null;
      }
      engine.isTyping = false;
      storyText.innerHTML = fullCurrentText.replace(/\n/g, "<br>");
      renderChoices(choices);
    }

    function renderChoices(choices) {
      choicesContainer.innerHTML = "";
      choicesContainer.style.opacity = "1";
      choicesContainer.style.pointerEvents = "auto";

      if (!choices || choices.length === 0) return;

      choices.forEach((choice, index) => {
        const check = engine.checkRequirement(choice);
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        if (!check.available) {
          btn.disabled = true;
        }

        const keyNum = index + 1;
        let fxIcon = "";
        if (choice.fx === "slash") fxIcon = "⚔️ ";
        else if (choice.fx === "smash") fxIcon = "🤖 ";
        else if (choice.fx === "demon") fxIcon = "🔥 ";
        else if (choice.fx === "qi") fxIcon = "✨ ";

        btn.innerHTML = `
          <div class="choice-left">
            <span class="choice-key-badge">${keyNum}</span>
            <span>${fxIcon}${choice.text}</span>
          </div>
          ${!check.available ? `<span class="choice-req-warning">(${check.reason})</span>` : ""}
        `;

        btn.addEventListener("click", () => {
          if (check.available) {
            engine.selectChoice(index);
          }
        });

        choicesContainer.appendChild(btn);
      });
    }

    function renderSaveSlots() {
      const slots = saveSystem.getSlotList();
      saveSlotsContainer.innerHTML = "";

      slots.forEach(slot => {
        const card = document.createElement("div");
        card.className = "save-slot-card";

        let metaHtml = "";
        if (slot.isEmpty) {
          metaHtml = `
            <div class="slot-meta">
              <h4>${slot.label}</h4>
              <p>저장된 비망록 없음</p>
            </div>
          `;
        } else {
          metaHtml = `
            <div class="slot-meta">
              <h4>${slot.label}: ${slot.title}</h4>
              <p>${slot.formattedDate} | [${slot.realm}] | HP: ${slot.hp} | 內功: ${slot.qi}</p>
            </div>
          `;
        }

        const actions = document.createElement("div");
        actions.className = "slot-actions";

        if (slot.slotId !== "auto") {
          const btnSave = document.createElement("button");
          btnSave.className = "btn-slot btn-slot-save";
          btnSave.textContent = "기록";
          btnSave.addEventListener("click", () => {
            saveSystem.saveToSlot(slot.slotId);
            renderSaveSlots();
          });
          actions.appendChild(btnSave);
        }

        if (!slot.isEmpty) {
          const btnLoad = document.createElement("button");
          btnLoad.className = "btn-slot btn-slot-load";
          btnLoad.textContent = "열람";
          btnLoad.addEventListener("click", () => {
            saveSystem.loadFromSlot(slot.slotId);
            saveModal.classList.add("hidden");
          });
          actions.appendChild(btnLoad);
        }

        card.innerHTML = metaHtml;
        card.appendChild(actions);
        saveSlotsContainer.appendChild(card);
      });
    }

    // Event Bindings
    titanToggleBtn.addEventListener("click", () => {
      engine.toggleTitan();
    });

    storyText.addEventListener("click", () => {
      if (engine.isTyping) {
        const scene = engine.getCurrentScene();
        if (scene) finishTypingAnimation(scene.choices);
      }
    });

    btnOpenSaveModal.addEventListener("click", () => {
      renderSaveSlots();
      saveModal.classList.remove("hidden");
    });

    btnCloseSaveModal.addEventListener("click", () => {
      saveModal.classList.add("hidden");
    });

    btnOpenExportModal.addEventListener("click", () => {
      jsonExportText.value = saveSystem.exportSaveDataString("auto");
      exportModal.classList.remove("hidden");
    });

    btnCloseExportModal.addEventListener("click", () => {
      exportModal.classList.add("hidden");
    });

    btnCopyJson.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(jsonExportText.value);
        alert("비망록 JSON 데이터가 클립보드에 복사되었습니다!");
      } catch (e) {
        jsonExportText.select();
        document.execCommand("copy");
        alert("비망록 데이터가 복사되었습니다.");
      }
    });

    btnImportJson.addEventListener("click", () => {
      const text = jsonExportText.value.trim();
      if (!text) return;
      const res = saveSystem.importSaveDataString(text);
      alert(res.message);
      if (res.success) {
        exportModal.classList.add("hidden");
      }
    });

    btnRestartGame.addEventListener("click", () => {
      if (confirm("정말 처음부터 다시 시작하시겠습니까?")) {
        engine.restartGame();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (!saveModal.classList.contains("hidden") || !exportModal.classList.contains("hidden")) {
        return;
      }

      if (e.code === "Space") {
        if (engine.isTyping) {
          e.preventDefault();
          const scene = engine.getCurrentScene();
          if (scene) finishTypingAnimation(scene.choices);
        }
      } else if (["Digit1", "Digit2", "Digit3", "Digit4"].includes(e.code)) {
        if (!engine.isTyping) {
          const idx = parseInt(e.code.replace("Digit", ""), 10) - 1;
          engine.selectChoice(idx);
        }
      } else if (e.key === "s" || e.key === "S") {
        if (e.ctrlKey || e.metaKey) return;
        saveSystem.saveToSlot("1", "빠른 저장 (S키)");
        alert("슬롯 1에 빠른 기록되었습니다.");
      } else if (e.key === "l" || e.key === "L") {
        if (e.ctrlKey || e.metaKey) return;
        const res = saveSystem.loadFromSlot("1");
        if (!res.success) {
          saveSystem.loadFromSlot("auto");
        }
      }
    });

    engine.onStateChange(renderUI);

    // Initial load
    const autoSaveSlot = saveSystem.getSlotList().find(s => s.slotId === "auto");
    if (autoSaveSlot && !autoSaveSlot.isEmpty) {
      saveSystem.loadFromSlot("auto");
    } else {
      engine.goToScene("prologue_1_assassin", true);
    }
  });
})();
