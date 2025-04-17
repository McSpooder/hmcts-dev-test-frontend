const { spawn } = require('child_process');
const path = require('path');

// Find path to ts-node executable
const tsNodePath = path.resolve('./node_modules/.bin/ts-node');

// Use ts-node directly instead of through npx
const proc = spawn(tsNodePath, ['--transpile-only', 'src/main/server.ts'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'development',
    TS_NODE_TRANSPILE_ONLY: 'true',
  },
});

proc.on('close', code => {
  console.log(`Process exited with code ${code}`);
});
