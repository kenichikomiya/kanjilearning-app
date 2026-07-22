# 漢字検定 学習アプリ

iPhone ブラウザで使える、漢字検定対策の学習アプリです。3級からスタートし、準2級、2級へとレベルアップしていく構成になっています。

## 機能

- 📱 **iPhone/ブラウザ対応** - インストール不要で、ブラウザで即利用可能
- ✍️ **2字/3字熟語対応** - 読みと意味を効率的に学習
- 👆 **タッチ・フリック操作** - 直感的な操作で学習
- 📊 **進捗管理** - ローカルストレージで学習履歴を自動保存
- 📚 **段階学習** - 3級 → 準2級 → 2級と段階的に学習可能

## 使い方

### 基本的な操作

1. **問題画面**
   - 上部に熟語が表示されます
   - 読みと意味を確認するには「覚えた」ボタンを**押し続けて**ください

2. **「覚えた」ボタン**
   - **押し続ける** → 読みと意味が表示
   - **指を離す** → 元の問題画面に戻る
   - フリック操作で次へ進みます

3. **フリック操作**
   - 👆 上にフリック / ← 左にフリック → **正解**：次の問題へ
   - 👇 下にフリック / → 右にフリック → **不正解**：同じ問題をもう一度

4. **「覚えていない」ボタン**
   - 1回目のタップ → 読みと意味を表示
   - 2回目のタップ → 次の問題へ

### 20問ごとのセット

- 全問題は20問ずつのセットに分かれています
- 1セット完了すると、次のセットへ進みます
- 学習進捗は自動的に保存されます

## GitHub へのセットアップ手順

### 1. リポジトリを作成

```bash
# 新しいディレクトリを作成
mkdir kanjilearning-app
cd kanjilearning-app

# Git を初期化
git init

# GitHub 上で新規リポジトリを作成（Public）
```

### 2. ファイルを配置

```
kanjilearning-app/
├── index.html
├── kokugo_kyu3.json
├── README.md
└── .gitignore
```

### 3. Git にコミット・プッシュ

```bash
git add .
git commit -m "Initial commit: Kanji learning app"
git remote add origin https://github.com/YOUR_USERNAME/kanjilearning-app.git
git branch -M main
git push -u origin main
```

### 4. GitHub Pages を有効化

1. GitHub のリポジトリ画面で **Settings** を開く
2. 左メニューの **Pages** をクリック
3. **Build and deployment** で以下を設定:
   - Source: `Deploy from a branch`
   - Branch: `main / (root)`
4. **Save** をクリック

数分待つと、以下の URL でアプリにアクセスできます:
```
https://YOUR_USERNAME.github.io/kanjilearning-app/
```

## データベース構成

JSON ファイルの構造:

```json
[
  {
    "id": 1,
    "kanji": "哀哀父母",
    "yomi": "あいあいふぼ",
    "imi": "自分を生んで苦労を重ねてくれた父母の死を悼む",
    "difficulty": "kyu3"
  }
]
```

## 今後の改善予定

- [ ] 復習機能の追加（「覚えていない」問題だけを集中学習）
- [ ] 難易度別の分類（3級、準2級、2級）
- [ ] 進捗状況のビジュアル表示
- [ ] 音声読み上げ機能
- [ ] ダークモード対応
- [ ] GitHub API との連携（データを GitHub から直接読み込み）

## 技術スタック

- React 18
- Tailwind CSS
- HTML5 / JavaScript
- LocalStorage API

## ライセンス

MIT License

## お問い合わせ

改善提案やバグ報告は GitHub Issues までお願いします。
