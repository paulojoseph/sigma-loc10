// apps/frontend/src/app/page.tsx
import EquipmentList from '../components/EquipmentList'; // <--- Verifique se o caminho está certo

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Se tiver Header ou Navbar, coloque aqui */}

      <div className="container mx-auto py-8">
        <EquipmentList /> {/* <--- O componente tem que ser chamado aqui */}
      </div>
    </main>
  );
}