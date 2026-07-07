# インストール / アップデート手順（利用者向け）

`@gaoxy-code/handy-cli` は GitHub Packages (npm) で公開されている。GitHub Packages は **public パッケージでも install にトークン認証が必要** という仕様のため、事前設定が要る。

## 1. PAT（トークン）を用意する

1. https://github.com/settings/tokens → **Generate new token (classic)**
   - fine-grained PAT は GitHub Packages のレジストリ認証に使えないので **classic** を選ぶこと
2. スコープは **`read:packages`** のみチェック
3. Expiration は短め（30日以下）を推奨

## 2. `.npmrc` を設定する

ホームディレクトリの `~/.npmrc` に以下を追記する:

```
@gaoxy-code:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

トークンは直書きせず、環境変数で渡す。履歴に残さない安全な入れ方:

```bash
read -s GITHUB_TOKEN && export GITHUB_TOKEN   # 貼り付けて Enter（画面には表示されない）
echo ${#GITHUB_TOKEN}                          # 文字数だけ表示して入力確認（0 でなければ OK）
```

> **注意**: `~/.npmrc` に `${GITHUB_TOKEN}` 参照がある間は、`GITHUB_TOKEN` が未設定のシェルで npm コマンド全般が
> `Failed to replace env in config` エラーになる。使わない期間は該当行をコメントアウトするか削除すること。

## 3. インストール

```bash
npm install -g @gaoxy-code/handy-cli
handy version   # バージョンが表示されれば成功
```

## 4. アップデート

```bash
npm update -g @gaoxy-code/handy-cli
# または明示的に最新を入れ直す
npm install -g @gaoxy-code/handy-cli@latest

handy version   # 上がったことを確認
```

特定バージョンを入れる場合:

```bash
npm install -g @gaoxy-code/handy-cli@0.1.1
```

公開済みバージョンの一覧:

```bash
npm view @gaoxy-code/handy-cli versions
```

## 5. アンインストール

```bash
npm uninstall -g @gaoxy-code/handy-cli
```

`~/.npmrc` に追記した2行も不要なら削除する。

## トラブルシューティング

| 症状 | 原因と対処 |
|---|---|
| `404 Not Found` | `~/.npmrc` に `@gaoxy-code:registry=...` がない → 通常の npmjs を見に行っている。設定を追加する |
| `401 Unauthorized` | `GITHUB_TOKEN` が未設定・失効・スコープ不足（`read:packages` が必要）。`echo ${#GITHUB_TOKEN}` で確認 |
| `Failed to replace env in config` | `.npmrc` が `${GITHUB_TOKEN}` を参照しているのに環境変数が未設定。export するか該当行を外す |
| `handy: command not found` | グローバル bin が PATH に入っていない。`npm prefix -g` の `bin/` を PATH に追加する |
