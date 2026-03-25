import { mergeConfig, type UserConfig } from "vite";

export default (config: UserConfig) => {
  return mergeConfig(config, {
    server: {
      allowedHosts: [
        "nonmetaphoric-nonpalatably-kacie.ngrok-free.dev",
        ".ngrok-free.dev",
        ".ngrok-free.app",
      ],
    },
  });
};