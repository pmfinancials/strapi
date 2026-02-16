import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  return mergeConfig(config, {
    server: {
      host: true,
      hmr: {
        clientPort: 443,
        protocol: 'wss',
      },
    },
  });
};

