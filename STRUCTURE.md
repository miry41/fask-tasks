src/
├── app/
│   ├── (auth)/              # 認証関連のグループ
│   │   ├── login/
│   │   │   └── page.tsx     # ログイン画面
│   │   ├── register/
│   │   │   └── page.tsx     # ユーザー登録画面
│   │   └── profile/
│   │       └── page.tsx     # プロフィール画面
│   │
│   ├── tasks/               # タスク管理機能
│   │   ├── page.tsx         # タスク一覧（ダッシュボード）
│   │   ├── new/
│   │   │   └── page.tsx     # タスク作成
│   │   └── [id]/           # 動的ルート（タスクID）
│   │       └── edit/
│   │           └── page.tsx # タスク編集
│   │
│   ├── api/                 # APIエンドポイント
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts # 認証API（作成済み）
│   │   └── tasks/
│   │       ├── route.ts     # タスク一覧・作成
│   │       └── [id]/
│   │           └── route.ts # タスク取得・更新・削除
│   │
│   ├── layout.tsx           # 共通レイアウト
│   └── page.tsx             # トップページ
│
├── components/
│   ├── auth/                # 認証関連コンポーネント
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── ProfileForm.tsx
│   │
│   ├── tasks/               # タスク関連コンポーネント
│   │   ├── TaskList.tsx     # タスク一覧表示
│   │   ├── TaskItem.tsx     # 個別タスク表示
│   │   ├── TaskForm.tsx     # タスク作成・編集フォーム
│   │   ├── TaskFilter.tsx   # フィルター機能
│   │   └── TaskStatus.tsx   # ステータス表示・変更
│   │
│   ├── layout/              # レイアウト関連
│   │   ├── Header.tsx       # ヘッダー（ナビゲーション）
│   │   └── Footer.tsx       # フッター
│   │
│   └── ui/                  # 再利用可能なUI部品
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Calendar.tsx     # 期限日選択用
│
└── lib/                     # ユーティリティ
    ├── prisma.ts           # Prismaクライアント（作成済み）
    ├── auth.ts             # 認証ユーティリティ
    └── utils/
        ├── date.ts         # 日付操作
        └── validation.ts   # バリデーション
