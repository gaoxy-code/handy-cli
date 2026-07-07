# @gaoxy-code/handy-cli

定番ミニ実用ツールを集めた CLI。TypeScript + tsup + commander で作った CLI を GitHub Packages (npm) に publish する学習プロジェクト。

## インストール

GitHub Packages からインストールするため、`.npmrc` に以下を設定する（`read:packages` スコープのトークンが必要）:

```
@gaoxy-code:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```bash
npm install -g @gaoxy-code/handy-cli
```

## 使い方

```bash
handy                       # help を表示
handy version               # バージョンを表示
handy uuid                  # UUID を1つ生成
handy uuid -n 3             # UUID を3つ生成
handy slug "Hello World"    # → hello-world
handy slug "Hello" --upper  # → HELLO
handy -V                    # バージョンフラグ（commander 標準）
handy -h                    # ヘルプ（commander 標準）
```

## 開発

```bash
npm install
npm run build        # tsup で dist/cli.js を生成
node dist/cli.js -h  # ローカル実行

npm link             # グローバルに handy コマンドをリンク
handy version
npm unlink -g @gaoxy-code/handy-cli  # 後片付け
```

## publish（手動）

```bash
cp .npmrc.example .npmrc
GITHUB_TOKEN=<write:packages の PAT> npm publish
```

## publish（CI）

`v*` タグを push すると GitHub Actions が publish する:

```bash
npm version patch          # package.json の version を上げてタグ作成
git push origin main --follow-tags
```
