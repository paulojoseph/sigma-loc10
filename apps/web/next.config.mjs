/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone", // <--- ADICIONE ESTA LINHA OBRIGATORIAMENTE

  // Isso ajuda a evitar erros de imagem se não tivermos biblioteca de otimização
  images: {
    unoptimized: true,
  },
};

export default nextConfig;