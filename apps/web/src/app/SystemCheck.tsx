'use client';

import { useState } from 'react';

export default function SystemCheck() {
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const addLog = (msg: string) => setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()} - ${msg}`]);

  const runDiagnostics = async () => {
    setStatus('loading');
    setLogs([]);
    addLog('Iniciando diagnóstico...');

    try {
      // 1. Teste de Login (Obter Token)
      addLog('Tentando autenticar como admin...');

      const loginRes = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: '', // Preencher ao testar
          password: ''  // Preencher ao testar
        }),
      });

      if (!loginRes.ok) throw new Error(`Falha no Login: ${loginRes.status}`);

      const tokens = await loginRes.json();
      addLog('✅ Login Sucesso! Token JWT recebido.');
      addLog(`🔑 Access Token: ${tokens.access.slice(0, 15)}...`);

      // 2. Teste de Dados (Usar Token para pegar usuários)
      addLog('Tentando buscar lista de usuários (Rota Protegida)...');

      const dataRes = await fetch('http://127.0.0.1:8000/api/users/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokens.access}`,
          'Content-Type': 'application/json'
        },
      });

      if (!dataRes.ok) throw new Error(`Falha ao buscar dados: ${dataRes.status}`);

      const users = await dataRes.json();
      addLog(`✅ Dados Recebidos! Encontrados ${users.length} usuário(s).`);
      addLog(`👤 Usuário 1: ${users[0].username} (${users[0].email || 'Sem email'})`);

      setStatus('success');

    } catch (err: any) {
      addLog(`❌ ERRO CRÍTICO: ${err.message}`);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-md w-full bg-gray-900/50 p-6 rounded-xl border border-gray-700 shadow-2xl backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Diagnóstico Sigma Nexus</h2>
        <span className={`h-3 w-3 rounded-full ${status === 'idle' ? 'bg-gray-500' :
            status === 'loading' ? 'bg-yellow-500 animate-pulse' :
              status === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`} />
      </div>

      <button
        onClick={runDiagnostics}
        disabled={status === 'loading'}
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-medium rounded-lg transition-all mb-4"
      >
        {status === 'loading' ? 'Executando...' : 'Rodar Teste Full-Stack'}
      </button>

      <div className="bg-black/80 rounded-lg p-3 h-64 overflow-y-auto font-mono text-xs text-green-400 border border-gray-800">
        {logs.length === 0 ? (
          <span className="text-gray-500">Aguardando execução...</span>
        ) : (
          logs.map((log, i) => <div key={i} className="mb-1 border-b border-gray-800/50 pb-1">{log}</div>)
        )}
      </div>
    </div>
  );
}