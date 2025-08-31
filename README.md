# オセロ（リバーシ）ゲーム - AI Powered by Trae

美しいUIを持つWebベースのオセロ（リバーシ）ゲームです。Vanilla JavaScriptで実装され、完全なゲームロジックとモダンなデザインを提供します。

## 🎮 ゲームの特徴

- **完全なオセロルール実装**: 正確な有効手判定、駒の反転、パス処理
- **美しいUI**: モダンなデザインとスムーズなアニメーション
- **レスポンシブデザイン**: デスクトップとモバイルの両方に対応
- **リアルタイムスコア**: 現在のスコアとターン表示
- **ゲーム制御**: リセット機能とパス機能
- **ゲーム終了処理**: 勝敗判定と結果表示

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (comes with Node.js)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/Project-Reversi-Othello-AI-powered-by-Trae.git
   cd Project-Reversi-Othello-AI-powered-by-Trae
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:8080`

## 🎯 ゲームルール

### 基本ルール
1. **初期配置**: 盤面中央に白と黒の駒が2個ずつ配置されます
2. **ターン制**: 黒が先手で、交互に駒を置きます
3. **有効な手**: 相手の駒を挟める位置にのみ駒を置けます
4. **駒の反転**: 挟んだ相手の駒はすべて自分の色になります
5. **パス**: 有効な手がない場合は自動的にパスされます
6. **ゲーム終了**: 両プレイヤーがパスするか、盤面が埋まると終了
7. **勝敗**: 最終的に駒の数が多い方の勝利

### 操作方法
- **駒を置く**: 緑色にハイライトされたマスをクリック
- **パス**: 「パス」ボタンをクリック（有効な手がない場合は自動）
- **リセット**: 「ゲームリセット」ボタンでゲームを最初から開始

## 📁 プロジェクト構造

```
Project-Reversi-Othello-AI-powered-by-Trae/
├── index.html          # メインHTMLファイル
├── styles.css          # スタイルシート
├── script.js           # ゲームロジック
├── package.json        # プロジェクト設定
├── mcp.json           # GitHub MCP設定
├── README.md          # このファイル
└── .docs/             # 要件書とGitHub依頼書
    ├── 要件
    └── GitHub依頼
```

## 🛠️ 技術仕様

### 使用技術
- **HTML5**: セマンティックなマークアップ
- **CSS3**: Flexbox、Grid、アニメーション
- **Vanilla JavaScript**: ES6+クラス構文
- **レスポンシブデザイン**: モバイルファースト

### ブラウザサポート
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🧪 テスト

### テストの実行

```bash
# 全テストを実行
npm test

# アクセシビリティテスト
npm run test:accessibility

# パフォーマンステスト
npm run test:performance

# テストをUIモードで実行
npm run test:ui

# テスト結果レポートを表示
npm run test:report
```

### テストカバレッジ

- **E2Eテスト**: ゲーム機能、UI操作、ユーザーフロー
- **アクセシビリティテスト**: WCAG 2.1 AA準拠
- **パフォーマンステスト**: 読み込み時間、メモリ使用量、FPS
- **クロスブラウザテスト**: Chrome, Firefox, Safari, Edge
- **モバイルテスト**: レスポンシブデザイン、タッチ操作

## 🔄 CI/CD パイプライン

### 自動化されたワークフロー

- **プルリクエスト時**:
  - 全テストスイートの実行
  - アクセシビリティチェック
  - パフォーマンス測定
  - Lighthouseスコア評価
  - セキュリティスキャン
  - プレビューデプロイ

- **メインブランチマージ時**:
  - 本番環境デプロイ
  - GitHub Pagesへの公開
  - リリースノート生成

### 品質ゲート

- テスト成功率: 100%
- Lighthouseスコア: Performance ≥ 80, Accessibility ≥ 90
- セキュリティ脆弱性: なし
- コードカバレッジ: ≥ 80%

## 🎨 デザイン特徴

- **グラデーション背景**: 美しい紫系グラデーション
- **カードデザイン**: 白い背景に影付きのモダンなカード
- **アニメーション**: 駒の配置時の回転アニメーション
- **ホバー効果**: インタラクティブなUI要素
- **モーダルダイアログ**: ゲーム終了時の結果表示

## 🔧 GitHub MCP設定

プロジェクトにはGitHub MCPの設定ファイル（`mcp.json`）が含まれています。

### 設定方法
1. GitHub Personal Access Tokenを取得
2. `mcp.json`の`GITHUB_PERSONAL_ACCESS_TOKEN`を実際のトークンに置き換え
3. MCPサーバーを起動

## 📝 開発ガイドライン

### コミット規則
- `feat:` 新機能追加
- `fix:` バグ修正
- `refactor:` リファクタリング
- `style:` スタイル変更
- `docs:` ドキュメント更新

### Issue管理
- 明確なタイトルと説明
- ToDoリスト形式での作業分割
- 関連ファイルのリンク

## 📱 レスポンシブデザイン

- **デスクトップ**: フル機能、マウス操作最適化
- **タブレット**: タッチ操作対応、適切なボタンサイズ
- **モバイル**: 縦画面レイアウト、片手操作考慮
- **アクセシビリティ**: キーボードナビゲーション、スクリーンリーダー対応

## 🤝 開発者向けガイド

### GitHub活用方法

#### Issue管理
- **バグレポート**: `.github/ISSUE_TEMPLATE/bug_report.md` を使用
- **機能リクエスト**: `.github/ISSUE_TEMPLATE/feature_request.md` を使用
- **パフォーマンス問題**: `.github/ISSUE_TEMPLATE/performance_issue.md` を使用
- **ラベル**: `bug`, `enhancement`, `performance`, `accessibility`, `mobile` など

#### プルリクエストワークフロー
1. **Issue作成**: 作業前に関連するIssueを作成
2. **ブランチ作成**: `feature/issue-123-add-new-feature` 形式
3. **開発**: 小さなコミットで段階的に実装
4. **テスト**: `npm test` で全テストを実行
5. **PR作成**: テンプレートに従って詳細を記載
6. **レビュー**: CI/CDチェックとコードレビューを待つ
7. **マージ**: 承認後にSquash and Mergeを実行

#### コミットメッセージ規約
```
type(scope): subject

body

footer
```

**Type**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
**例**:
- `feat(ai): add expert difficulty level`
- `fix(mobile): resolve touch event handling`
- `docs(readme): update installation instructions`

### 開発環境セットアップ

```bash
# 開発用依存関係のインストール
npm install

# 開発サーバー起動（ホットリロード付き）
npm run dev

# コード品質チェック
npm run lint

# フォーマット
npm run format

# 全テスト実行
npm test
```

### コード品質基準

- **ESLint**: コードスタイルとベストプラクティス
- **Prettier**: コードフォーマット
- **JSDoc**: 関数とクラスのドキュメント
- **テストカバレッジ**: 最低80%
- **パフォーマンス**: Lighthouse スコア80+
- **アクセシビリティ**: WCAG 2.1 AA準拠

## 🤝 コントリビューション

プロジェクトへの貢献を歓迎します！詳細は [CONTRIBUTING.md](CONTRIBUTING.md) を参照してください。

### 貢献の種類

- 🐛 **バグ修正**: 既存の問題を解決
- ✨ **新機能**: ゲーム体験を向上させる機能
- 📚 **ドキュメント**: README、コメント、ガイドの改善
- 🎨 **UI/UX**: デザインとユーザビリティの向上
- ♿ **アクセシビリティ**: 包括的なデザインの実装
- 🚀 **パフォーマンス**: 速度とメモリ使用量の最適化
- 🧪 **テスト**: テストカバレッジの向上

### 開発者コミュニティ

- **Discussions**: 機能提案や質問
- **Issues**: バグレポートと機能リクエスト
- **Pull Requests**: コード貢献
- **Wiki**: 開発ドキュメントと技術仕様

1. プロジェクトをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'feat: add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. Pull Requestを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 🙏 謝辞

- Trae AI による開発支援
- オセロゲームの伝統的なルールに基づく実装
- アクセシビリティガイドラインの提供
- オープンソースコミュニティのサポート
- Playwright、Axe-core、Lighthouseなどの優秀なテストツール

---

**楽しいオセロゲームをお楽しみください！** 🎉