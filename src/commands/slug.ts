import type { Command } from 'commander';

export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // 英数字以外の連続をハイフン1つに
    .replace(/^-+|-+$/g, ''); // 先頭・末尾のハイフンを除去
}

export function registerSlugCommand(program: Command): void {
  program
    .command('slug <text>')
    .description('テキストをスラッグ化する (例: "Hello World" → hello-world)')
    .option('--upper', '大文字で出力する')
    .action((text: string, options: { upper?: boolean }) => {
      const slug = slugify(text);
      console.log(options.upper ? slug.toUpperCase() : slug);
    });
}
