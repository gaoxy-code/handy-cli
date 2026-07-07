import { randomUUID } from 'node:crypto';
import type { Command } from 'commander';

export function registerUuidCommand(program: Command): void {
  program
    .command('uuid')
    .description('UUID (v4) を生成する')
    .option('-n, --count <n>', '生成する個数', '1')
    .action((options: { count: string }) => {
      const count = Number.parseInt(options.count, 10);
      if (Number.isNaN(count) || count < 1) {
        program.error(`error: count には 1 以上の整数を指定してください: ${options.count}`);
      }
      for (let i = 0; i < count; i++) {
        console.log(randomUUID());
      }
    });
}
