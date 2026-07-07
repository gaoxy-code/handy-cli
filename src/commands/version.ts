import type { Command } from 'commander';
import { version } from '../version.js';

export function registerVersionCommand(program: Command): void {
  program
    .command('version')
    .description('バージョンを表示する')
    .action(() => {
      console.log(version);
    });
}
