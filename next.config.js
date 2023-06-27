// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   output: "standalone",
// };

// module.exports = nextConfig;

module.exports = (phase) => {
  return {
    async redirects() {
      return [
        {
          source: "/docs",
          destination: "/api",
          permanent: false,
        },
      ];
    },
    reactStrictMode: true,
  };
};
