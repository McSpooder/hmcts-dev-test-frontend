const originalConfig = require('./webpack.config.js');

// Create a modified configuration
const customConfig = {
  ...originalConfig,
  mode: 'development',
  module: {
    ...originalConfig.module,
    rules: originalConfig.module.rules.map(rule => {
      // Find the rule that handles TypeScript files
      if (rule.test && rule.test.toString().includes('.tsx?')) {
        return {
          ...rule,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true, // Skip type checking
              compilerOptions: {
                module: 'esnext',
                moduleResolution: 'node',
                skipLibCheck: true,
                esModuleInterop: true,
                allowSyntheticDefaultImports: true,
              },
            },
          },
        };
      }
      return rule;
    }),
  },
};

module.exports = customConfig;
