# @gaoxy-code/handy-cli

定番ミニ実用ツールを集めた CLI（TypeScript + tsup + commander）。GitHub Packages (npm) で公開している。

## インストール / アップデート

GitHub Packages からの取得にはトークン設定が必要。手順は **[docs/INSTALL.md](docs/INSTALL.md)** を参照。

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

npm link             # グローバルに handy コマンドをリンクして試す
npm unlink -g @gaoxy-code/handy-cli  # 後片付け
```

## リリース

`v*` タグの push で GitHub Actions が自動 publish する。手順は **[docs/RELEASE.md](docs/RELEASE.md)** を参照。

```bash
npm version patch
git push origin main --follow-tags
```
