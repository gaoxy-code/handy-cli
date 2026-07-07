# リリース手順（メンテナ向け）

## 通常リリース: タグ push で CI が自動 publish（推奨）

`.github/workflows/publish.yml` により、`v*` タグの push で GitHub Actions が build → publish する。
Actions は自動発行の `GITHUB_TOKEN` を使うため、**PAT の用意は不要**。

```bash
# 1. main が最新であることを確認
git checkout main && git pull

# 2. バージョンを上げる（package.json 更新＋コミット＋ v タグ作成が一度に行われる）
npm version patch    # 0.1.1 → 0.1.2（bug fix）
# npm version minor  # 0.1.x → 0.2.0（機能追加）
# npm version major  # 0.x.y → 1.0.0（破壊的変更）

# 3. コミットとタグを push → Actions が起動
git push origin main --follow-tags

# 4. 結果確認
gh run list --repo gaoxy-code/handy-cli --limit 1
```

成功すると https://github.com/gaoxy-code/handy-cli/packages に新バージョンが表示される。

## 手動 publish（CI を使わない場合）

`write:packages` スコープの PAT (classic) が必要。

```bash
cp .npmrc.example .npmrc                      # 初回のみ（.npmrc は gitignore 済み）
read -s GITHUB_TOKEN && export GITHUB_TOKEN   # PAT を貼り付け（画面に表示されない）
npm publish                                   # prepublishOnly で自動ビルドされる
```

## 注意事項

- **同一バージョンの再 publish は不可（409 Conflict）**。publish するたびに必ず `npm version` で上げる。
- publish に含まれるのは `files` フィールドで指定した `dist/` のみ（＋ README / package.json）。
  内容は `npm pack --dry-run` で事前確認できる。
- `prepublishOnly` により publish 前に必ず `npm run build` が走る（ビルド忘れ防止）。
- トークンを `.npmrc` に直書きしない。シェル履歴にも残さない（`read -s` を使う）。

## 失敗したときの確認ポイント

| 症状 | 原因と対処 |
|---|---|
| Actions が 401/403 | `permissions: packages: write` と `setup-node` の `registry-url` の両方が必要。どちらか欠けていないか確認 |
| `409 Conflict` | 同一バージョンを再 publish しようとしている。`npm version patch` で上げる |
| タグを push したのに Actions が動かない | タグ名が `v*` パターンか確認（例: `v0.1.2`）。`git push --follow-tags` を忘れていないか |
