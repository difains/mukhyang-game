# 🗡️ 프로젝트 묵향: 다크레이디의 귀환 (Project Mukhyang: Return of the Dark Lady)

<p align="center">
  <b>"무공의 끝에는 선악이 없다. 오직 네 자신의 의지만이 존재할 뿐."</b><br>
  한국 퓨전 무협 판타지의 전설, 전동조 작가의 <b>《묵향》</b>을 원작으로 한<br>
  <b>90s 클래식 로우폴리 3D 인터랙티브 텍스트 RPG</b>입니다.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Platform-Web%20(GitHub%20Pages)-informational?style=flat-square" alt="Platform">
  <img src="https://img.shields.io/badge/Graphics-90s%20Retro%20Low--Poly%203D%20(Three.js)-ff69b4?style=flat-square" alt="Graphics">
  <img src="https://img.shields.io/badge/Runtime-Vanilla%20JS%20(No%20Build)-success?style=flat-square" alt="Runtime">
  <img src="https://img.shields.io/badge/Playtime-~30%20Minutes-orange?style=flat-square" alt="Playtime">
  <img src="https://img.shields.io/badge/Font-Mona12%20Pixel-blueviolet?style=flat-square" alt="Font">
</p>

---

## 📖 시놉시스 (Story)

살수 조직 백살문에서 감정 없는 살수 **'2호'**로 길러졌던 소년.  
천마신교의 전대 교주 **마제 유백**에게 거두어져 **'묵향(墨香)'**이라는 이름을 얻고, 화경(극마)에 올라 8대 천마의 자리에 오른다.

그러나 장로들과 혈교의 배신으로 고대 차원 이동 마법진에 삼켜진 묵향은 푸른 비늘의 고룡 **아르티어스**와 거대 마도 병기 **타이탄(Titan)**이 지배하는 이계 대륙에 표류하게 되는데...

적의 저주로 인한 소녀화(TS 다크레이디)의 굴욕, 제국 대전쟁, 그리고 40년 만의 무림 귀환과 생사경(탈경)의 도래까지!  
묵향의 파란만장한 일대기를 30분간 직접 체험하세요.

---

## 🌟 핵심 특징

* 🎮 **90년대 고전 콘솔/PC 명작 감성의 로우폴리(Low-Poly) 3D 아트워크**:
  * 각진 면(Flat Shading)이 살아있는 클래식 폴리곤 3D 모델링 (천마도, 마도 타이탄 헤라클레스, 블루 드래곤, 생사경 만검귀종)
  * 마우스 커서와 터치에 실시간 반응하는 3D 시점 인터랙션 (Parallax Tilt)
  * 브라운관 CRT 스캔라인 오버레이 & 픽셀레이션 렌더링
* ⚔️ **다이내믹 무협 & 메카닉 전투 연출 (Combat FX)**:
  * 🗡️ **천마강기 / 삼절검 (`slash`)**: 화면을 가르는 예리한 참격선과 쇳소리
  * 🤖 **타이탄 메가 캐넌 / 펀치 (`smash`)**: 화면 전체 진동(Screen Shake)과 묵직한 베이스 폭발음
  * 🔥 **마기 / 내공 방출 (`demon`, `qi`)**: 화면 암전 및 붉은 마력/푸른 내공 플래시
  * 🩸 **피격 대미지 (`damage`)**: HP 손실 시 핏빛 플래시 점멸
* 🥋 **경지(Realm) & 타이탄 탑승 시스템**:
  * 절정(絶頂) → 화경(化境)/극마(極魔) → 현경(玄境)/탈마(脫魔) → 생사경(生死境)으로 이어지는 무공 성장
  * 타이탄 탑승 시 HUD 및 3D 뷰포트가 실시간 메카닉 모드로 전환
* 💾 **독립 로컬 세이브 & 스마트폰 공유**:
  * 브라우저 `localStorage` 기반 실시간 자동 기록 + 수동 슬롯 3개
  * **JSON 내보내기/가져오기 (Export/Import)**로 다른 PC나 모바일 기기에서도 세이브 이어하기 가능
* ⚡ **100% 무의존성 정적 웹**:
  * Node.js 빌드 과정 없이 `index.html` 파일을 더블클릭(`file://`)하거나 GitHub Pages에 올리기만 하면 즉시 무료 실행!

---

## 🎮 조작 방법

| 키 | 기능 |
|:---:|:---|
| `[1]` `[2]` `[3]` `[4]` | 번호에 해당하는 선택지 실행 |
| `[Space]` 또는 `[본문 클릭]` | 대사 타이핑 즉시 완료 |
| `[S]` | 슬롯 1 빠른 저장 (Quick Save) |
| `[L]` | 슬롯 1 빠른 불러오기 (Quick Load) |
| `[🤖 타이탄 버튼]` | 타이탄 탑승 / 대기 토글 (2막 이후) |
| `[마우스 이동 / 드래그]` | 3D 뷰포트 오브젝트 시점 조절 |

---

## 🚀 GitHub Pages 3분 배포 가이드

누구나 자신의 깃허브 계정에 올려 소장용 웹 게임으로 즐길 수 있습니다.

### 방법 1. 웹 브라우저에서 올리기 (가장 쉬움)
1. GitHub에서 새 저장소(`mukhyang-game` 등)를 생성합니다.
2. 프로젝트 폴더(`index.html`, `README.md`, `css` 폴더, `js` 폴더)를 브라우저의 **[Upload files]** 화면에 마우스로 끌어다 놓습니다.
3. 하단의 초록색 **[Commit changes]** 버튼을 누릅니다.
4. 저장소 **[Settings]** ➔ **[Pages]** 메뉴에서 `Branch: main / root`를 선택하고 **Save**를 누르면 끝!

### 방법 2. 터미널 명령어로 푸시하기
```bash
cd C:\Users\admin\.gemini\antigravity\scratch\mukhyang-game
git init
git add .
git commit -m "feat: Release Project Mukhyang 3D Text RPG v1.0"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<REPOSITORY_NAME>.git
git push -u origin main --force
```

배포 완료 후 **`https://<YOUR_GITHUB_USERNAME>.github.io/<REPOSITORY_NAME>/`** 링크로 접속하시면 언제 어디서든 플레이할 수 있습니다.

---

## 📂 파일 구성

```
mukhyang-game/
├── index.html              # 3D 캔버스, 상태 HUD, 반응형 메인 레이아웃
├── css/
│   └── style.css           # 90s 레트로 PC RPG 테마, Mona12 픽셀 폰트, 전투 FX
├── js/
│   └── app.js              # Three.js 클래식 로우폴리 3D 엔진, 시나리오, 사운드, 세이브
└── README.md               # 게임 소개 및 배포 가이드
```

---

## 📜 크레딧 & 라이선스

* **원작**: 전동조 작가 《묵향 (墨香)》
* **3D 라이브러리**: [Three.js](https://threejs.org/) (r128, MIT License)
* **폰트**: Monad ABXY — [Mona12](https://noonnu.cc/font_page/1792) (눈누 상업용 무료 폰트)
* 본 프로젝트는 원작 《묵향》을 사랑하는 팬의 비영리 개인 소장용 2차 창작물입니다.
