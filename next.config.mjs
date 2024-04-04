/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (
      config, options
    ) => {
      // Important: return the modified config
      config.module.rules.push({
        // regex match only for canvas.node
        test: /\bcanvas\.node\b/,
        use: 'raw-loader',
      });
      return config;
    },
};
  
export default nextConfig;
