# CLAUDE.md

이 파일은 Claude Code가 CaffeineTracker 프로젝트 코드 작업 시 사용하는 가이드입니다.

## 프로젝트 설명

**CaffeineTracker** - 사용자의 카페인 섭취량을 실시간으로 추적하고, 개인별 권장량을 기준으로 건강한 카페인 섭취를 도와주는 React Native 모바일 앱

## 기술 스택

- **Frontend**: React Native (Expo)
- **Styling**: NativeWindCSS (Tailwind CSS 기반)
- **Icons**: Ionicons
- **Navigation**: React Navigation
- **Backend/Database**: Supabase (PostgreSQL)
- **Data Fetching**: @tanstack/react-query
- **Form**: React Hook Form
- **Storage**: @react-native-async-storage/async-storage, expo-secure-store
- **Theme**: System theme detection (expo-system-ui)

## 개발 환경

- **OS**: Windows + WSL (Ubuntu)
- **Node.js**: v18+
- **Package Manager**: npm 또는 yarn
- **Expo CLI**: 최신 버전

## 프로젝트 구조

```
/
├── App.js                    # 앱 엔트리 포인트
├── app.json                  # Expo 설정
├── .env                      # 환경변수 (git에서 제외)
├── .env.example              # 환경변수 예시
├── src/
│   ├── components/           # 재사용 컴포넌트
│   │   ├── themed/          # 테마 적용 기본 컴포넌트
│   │   ├── CategoryButton.js
│   │   ├── BrandButton.js
│   │   ├── DrinkButton.js
│   │   ├── SizeButton.js
│   │   ├── CaffeineHierarchySelector.js
│   │   ├── CaffeineProgressBar.js
│   │   └── ThemeToggle.js
│   ├── screens/             # 화면 컴포넌트
│   │   ├── auth/           # 인증 관련 화면
│   │   ├── HomeScreen.js
│   │   ├── CaffeineSelectionScreen.js
│   │   ├── ProfileScreen.js
│   │   ├── HistoryScreen.js
│   │   └── SettingsScreen.js
│   ├── hooks/              # 커스텀 hooks
│   │   ├── useCaffeineData.js
│   │   ├── useOfflineSupport.js
│   │   └── useAuth.js
│   ├── context/            # React Context
│   │   ├── ThemeContext.js
│   │   └── AuthContext.js
│   ├── lib/                # 핵심 라이브러리
│   │   ├── supabase.js
│   │   └── queryClient.js
│   ├── utils/              # 유틸리티 함수
│   │   ├── cache.js
│   │   ├── caffeine.js
│   │   └── theme.js
│   ├── theme/              # 테마 설정
│   │   └── colors.js
│   └── types/              # TypeScript 타입
│       └── env.d.ts
├── .claude/
│   └── commands/           # 커스텀 Claude 명령어
└── assets/                 # 정적 자산
```

## 중요한 명령어

- `npm start` 또는 `expo start` - 개발 서버 시작
- `npm run start:tunnel` 또는 `expo start --tunnel` - 터널링으로 실행 (WSL 환경에서 유용)
- `npm test` - Jest 테스트 실행
- `npm run lint` - ESLint 코드 검사 실행
- `npm run lint:fix` - ESLint 자동 수정
- `npm run type-check` - TypeScript 타입 체크
- `expo install` - Expo 호환 패키지 설치
- `expo doctor` - 프로젝트 설정 진단

## WSL 특별 고려사항

- `expo start --tunnel` 사용으로 네트워크 이슈 해결
- Windows와 WSL 간 파일 시스템 성능 차이 고려
- Expo DevTools 접근 시 localhost 대신 터널 URL 사용
- 환경변수 파일은 WSL 경로에서 작업

## 환경변수 설정

필수 환경변수 (`.env` 파일):

```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_APP_ENV=development
EXPO_PUBLIC_CACHE_DURATION=300000
```

## 코딩 컨벤션

- **React Native**: 함수형 컴포넌트 + hooks
- **Styling**: NativeWindCSS 클래스명 사용
- **파일명**: 컴포넌트는 PascalCase, 유틸리티는 camelCase
- **변수명**: camelCase
- **상수**: UPPER_SNAKE_CASE
- **인덴테이션**: 2 spaces
- **import 순서**: React → 라이브러리 → 로컬 모듈

## 특별한 아키텍처 패턴

### 계층적 선택 시스템

카페인 선택은 **단일 화면에서 계층적**으로 처리:

1. 카테고리 선택 (커피/에너지 드링크)
2. 브랜드 선택 (스타벅스, 메가, 컴포즈, 빽다방 등)
3. 음료 선택 (아메리카노, 라떼 등)
4. 사이즈 선택 (커피만, S/M/L)

### 테마 시스템

- **3가지 모드**: light, dark, system
- **NativeWindCSS 다크모드**: `className="bg-white dark:bg-gray-800"`
- **시스템 테마 감지**: expo-system-ui 사용
- **AsyncStorage 저장**: 사용자 선택 저장

### 캐싱 전략

- **실시간 데이터**: 30초 TTL (카페인 수치)
- **준정적 데이터**: 5분 TTL (사용자 프로필)
- **정적 데이터**: 1시간 TTL (카페인 아이템 목록)
- **오프라인 지원**: AsyncStorage 기반

## Claude를 위한 특별한 지침

### 역할 설정

- **Claude**: 세계 최고의 시니어 개발자 멘토
- **사용자**: 주니어 개발자 (친절하고 교육적인 설명 필요)

### 작업 프로세스

1. **계획 수립**: 항상 먼저 명확한 계획을 세우고 설명
2. **코드 작업**: 계획 승인 후 코드 수정/생성 진행
3. **인코딩 확인**: 코드 작업 완료 후 파일 인코딩 상태 확인 및 안내
4. **린팅 실행**: `npm run lint`로 코드 품질 검사 권장

### 개발 지침

- **보안 우선**: 환경변수와 expo-secure-store 활용
- **성능 최적화**: React.memo, useMemo, useCallback 적극 사용
- **테마 고려**: 모든 컴포넌트에 다크모드 지원
- **계층적 UI**: 단일 화면에서 단계별 선택 구현
- **WSL 환경**: 파일 경로와 네트워킹 이슈 고려
- **카페인 계산**: 반감기 5.5시간 기반 분해 알고리즘
- **타입 안전성**: TypeScript 적극 활용
- **오프라인 우선**: AsyncStorage 캐시 활용

### 코드 품질 체크

작업 완료 후 다음 명령어들로 검증:

```bash
npm run lint          # ESLint 코드 검사
npm run type-check    # TypeScript 타입 검사
npm test             # 테스트 실행
```

## 데이터베이스 스키마 (Supabase PostgreSQL)

### 주요 테이블 구조

#### users 테이블

```sql
- id: uuid (PK, auto-generated)
- email: varchar (UNIQUE, NOT NULL)
- name: varchar (NOT NULL)
- gender: varchar ('male', 'female', 'other')
- age: integer (13-120)
- weight: numeric (> 0)
- daily_caffeine_limit: integer (default: 400mg)
- current_caffeine: numeric (default: 0mg)
- theme_preference: varchar ('light', 'dark', 'system', default: 'system')
- created_at, updated_at: timestamp with timezone
```

#### caffeine_items 테이블

```sql
- id: uuid (PK, auto-generated)
- category: varchar ('coffee', 'energy_drink')
- brand: varchar (스타벅스, 메가커피, 컴포즈커피, 빽다방, 몬스터, 레드불, 핫식스)
- name: varchar (아이스 아메리카노, 카페라떼, 몬스터 오리지널 등)
- size: varchar (S, M, L - 커피만, 에너지드링크는 NULL)
- caffeine_content: numeric (mg 단위)
- serving_size_ml: integer (ml 단위)
- icon_name: varchar (default: 'cafe-outline')
- display_order: integer (표시 순서)
- is_active: boolean (default: true)
- created_at: timestamp with timezone
```

#### caffeine_logs 테이블

```sql
- id: uuid (PK, auto-generated)
- user_id: uuid (FK → users.id)
- caffeine_item_id: uuid (FK → caffeine_items.id)
- caffeine_amount: numeric (실제 섭취한 카페인량 mg)
- consumed_at: timestamp with timezone (섭취 시간)
- metabolism_complete_at: timestamp with timezone (분해 완료 예상 시간)
- is_active: boolean (아직 분해 중인지 여부)
- created_at: timestamp with timezone
```

### Supabase Functions

#### 1. calculate_daily_limit (RPC Function)

**목적**: 사용자의 나이, 체중, 성별을 기반으로 일일 카페인 권장량 계산

**매개변수**:

- `user_age`: integer (사용자 나이)
- `user_weight`: numeric (사용자 체중 kg)
- `user_gender`: varchar ('male', 'female', 'other')

**계산 로직**:

- 기본값: 체중 1kg당 5.5mg, 최대 400mg
- 나이 조정: 18세 미만 50% 감소, 65세 이상 20% 감소
- 성별 조정: 여성 10% 감소

**사용 예시**:

```javascript
const { data, error } = await supabase.rpc('calculate_daily_limit', {
  user_age: 25,
  user_gender: 'female',
  user_weight: 60,
});
```

#### 2. update_daily_caffeine_limit (Trigger Function)

**목적**: users 테이블의 age, weight, gender 변경 시 자동으로 daily_caffeine_limit 재계산

**트리거 조건**: users 테이블 UPDATE 시 나이, 체중, 성별 변경 감지
**동작**: calculate_daily_limit 함수 호출하여 권장량 자동 업데이트

#### 3. update_updated_at_column (Trigger Function)

**목적**: 레코드 수정 시 updated_at 컬럼 자동 업데이트

**트리거 조건**: users 테이블 UPDATE 시
**동작**: NEW.updated_at을 현재 시간(NOW())으로 설정

### 데이터베이스 관련 주요 로직

- **카페인 분해**: 반감기 5.5시간 기반으로 metabolism_complete_at 계산
- **권장량 자동 계산**: 프로필 변경 시 트리거로 자동 재계산
- **실시간 업데이트**: current_caffeine은 활성 로그들의 현재 잔여 카페인량 합계

## 알려진 제약사항

- Expo 환경에서 네이티브 모듈 제한
- WSL에서 Expo DevTools 접근 시 터널 필요
- AsyncStorage 용량 제한 (6MB)
- 카페인 분해는 개인차 고려 안 함 (평균값 사용)

## 테스팅 전략

- React Native Testing Library 사용
- 컴포넌트 단위 테스트 우선
- 오프라인 시나리오 테스트 필수
- 테마 전환 테스트 포함

## Git 워크플로우 & 커밋 컨벤션

### 브랜치 전략 (개인 프로젝트)

- **main 브랜치 직접 작업**: 개인 프로젝트이므로 main에 바로 커밋
- **작은 단위 커밋**: 한 커밋에는 한 가지 문제만 해결
- **의미있는 커밋**: 추적 가능하고 이해하기 쉬운 커밋 메시지

### 커밋 메시지 컨벤션

#### 커밋 유형 (영어 대문자)

| 타입               | 의미                                            |
| ------------------ | ----------------------------------------------- |
| `Feat`             | 새로운 기능 추가                                |
| `Fix`              | 버그 수정                                       |
| `Docs`             | 문서 수정                                       |
| `Style`            | 코드 formatting, 세미콜론 누락 등 (로직 변경 X) |
| `Refactor`         | 코드 리팩토링                                   |
| `Test`             | 테스트 코드 추가/수정                           |
| `Chore`            | 패키지 매니저, 설정 파일 등 기타 수정           |
| `Design`           | UI/UX 디자인 변경                               |
| `Comment`          | 주석 추가/변경                                  |
| `Rename`           | 파일/폴더명 수정 또는 이동                      |
| `Remove`           | 파일 삭제                                       |
| `!BREAKING CHANGE` | 큰 API 변경                                     |
| `!HOTFIX`          | 치명적인 버그 긴급 수정                         |

#### 작성 규칙

1. **제목과 본문**: 빈 행으로 분리
2. **언어**: 커밋 유형은 영어, 제목/본문은 한글
3. **제목 형식**: 첫 글자 대문자, 끝에 마침표 금지
4. **제목 길이**: 50자 이내 권장
5. **본문 내용**: 무엇을, 왜 변경했는지 설명

#### 커밋 메시지 예시

```bash
# 단일 라인
git commit -m "Feat: 카페인 계층적 선택 UI 구현"

# 멀티 라인
git commit -m "Feat: 카페인 분해 시스템 구현

- 카페인 반감기 5.5시간 기반 계산 로직 추가
- AsyncStorage 캐시와 연동
- 백그라운드 자동 업데이트 스케줄링"
```

#### React Native 프로젝트 특화 예시

```bash
# 컴포넌트 개발
git commit -m "Feat: CaffeineHierarchySelector 컴포넌트 구현"

# 테마 시스템
git commit -m "Design: 다크모드 테마 시스템 구축"

# 성능 최적화
git commit -m "Refactor: useMemo로 카페인 계산 최적화"

# 환경 설정
git commit -m "Chore: Expo 환경변수 설정 추가"

# WSL 관련
git commit -m "Fix: WSL 환경에서 터널링 스크립트 수정"
```
