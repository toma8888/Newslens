# 뉴스 렌즈 (News Lens)

간밤 이슈를 여러 언론의 시선으로 한 번에 보여 주는 출퇴근길 뉴스 비교 에이전트입니다.
AI Agent 설계 및 비즈니스 (전병진 교수) 기말 과제 · 우희태 (2025522128)

- 앱은 `index.html` 한 파일로 동작합니다.
- **API 키는 이 저장소에 들어 있지 않습니다.** 접속한 사람이 앱의 설정에서 자기 키를 넣고, 키는 그 사람의 브라우저에만 저장됩니다.
- 키가 없으면 **체험 모드**(가상의 도시·언론사)로 모든 기능을 볼 수 있습니다.

## 파일

| 파일 | 역할 |
|---|---|
| `index.html` | 앱 전체 |
| `server.js`, `package.json` | Railway 같은 서버 호스팅용 (외부 패키지 없음, `npm start`) |
| `manifest.webmanifest`, `icon*.png`, `icon.svg` | 휴대폰 "홈 화면에 추가"용 이름·아이콘 |

## 배포 1: GitHub Pages

1. GitHub에서 새 저장소를 만듭니다 (Public).
2. 이 폴더의 파일을 모두 올립니다 (Add file → Upload files).
3. Settings → Pages → Branch: `main`, 폴더: `/ (root)` → Save.
4. 1~2분 뒤 `https://<아이디>.github.io/<저장소>/` 로 접속합니다.

## 배포 2: Railway

1. 위 GitHub 저장소를 먼저 만듭니다.
2. railway.com → New Project → Deploy from GitHub repo → 저장소 선택.
3. Railway가 Node 앱으로 알아보고 `npm start`로 실행합니다 (설치할 패키지 없음).
4. 서비스 → Settings → Networking → **Generate Domain** 으로 주소를 만듭니다.
5. 상태 확인: `https://<주소>/health` 가 `ok` 를 돌려주면 정상입니다.

## 휴대폰에서

- 주소를 Chrome(안드로이드)이나 Safari(아이폰)로 엽니다.
- 공유 메뉴 → **홈 화면에 추가** 하면 앱처럼 열립니다.
- 휴대폰에서는 체험 모드로 시작합니다. 실제 뉴스를 보려면 설정에서 API 키를 넣습니다 (그 휴대폰 브라우저에만 저장).

## 주의

- 이 구조는 서버가 키를 보관하지 않으므로, AI 호출 비용은 키를 넣은 사람에게 청구됩니다.
- 새벽에 브리핑을 미리 만들어 모두가 같이 보는 방식은 키를 숨기는 서버가 따로 필요합니다 (확장 계획).
