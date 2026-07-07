#!/usr/bin/env node
import { Command } from 'commander';
import { version } from './version.js';
import { registerVersionCommand } from './commands/version.js';
import { registerUuidCommand } from './commands/uuid.js';
import { registerSlugCommand } from './commands/slug.js';

const program = new Command();

program
  .name('handy')
  .description('Handy mini CLI tools (GitHub Packages publish study)')
  .version(version); // -V / --version フラグ（version サブコマンドとは別物）

registerVersionCommand(program);
registerUuidCommand(program);
registerSlugCommand(program);

// 引数なしで実行されたら help を表示する
if (process.argv.length <= 2) {
  program.help();
}

program.parse();
