import SystemCheck from './SystemCheck';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-black text-white">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm flex flex-col gap-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          SIGMA NEXUS
        </h1>
        <p className="text-gray-400">Environment: Dev (Next.js 16 + Django 5)</p>
        
        {/* Componente Cliente renderizado dentro do Server Component */}
        <SystemCheck />
      </div>
    </main>
  );
}