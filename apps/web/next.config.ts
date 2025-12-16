/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... outras configurações

  // ATIVAR MODO STANDALONE PARA Otimizar o Docker Build
  output: 'standalone',
};

module.exports = nextConfig;