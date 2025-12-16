/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... outras configurações

  // ATIVAR MODO STANDALONE PARA Otimizar o Docker Build
  output: 'standalone',

  // Requerido quando usando pastas de apps
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;