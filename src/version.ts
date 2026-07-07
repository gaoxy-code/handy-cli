// package.json を単一の真実源としてバージョンを取得する。
// Node の import attributes を使うと tsup(esbuild) がビルド時にインライン化するため、
// 実行時に package.json のパス解決をする必要がない。
import pkg from '../package.json' with { type: 'json' };

export const version: string = pkg.version;
