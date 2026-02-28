import { supabase } from '../lib/supabase';
import FormularioUsuario from '../components/FormularioUsuario'; // Importando o formulário

// Esta página continua sendo um Server Component
export default async function Home() {
  // O Next.js vai buscar os dados mais recentes no servidor
  const { data: usuarios, error } = await supabase
    .from('usuarios')
    .select('*')
    .order('id', { ascending: false }); // Mostra os mais recentes primeiro

  return (
    <main className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Meu App com Supabase</h1>
      
      {/* Colocando o nosso formulário interativo aqui */}
      <FormularioUsuario />

      <div className="bg-gray-50 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Lista de Usuários:</h2>
        {error && <p className="text-red-500">Erro ao carregar dados.</p>}
        
        <ul className="space-y-2">
          {usuarios?.map((user) => (
            <li key={user.id} className="p-2 bg-white border rounded text-gray-800">
              {user.nome}
            </li>
          ))}
          {usuarios?.length === 0 && <p className="text-gray-500">Nenhum usuário cadastrado.</p>}
        </ul>
      </div>
    </main>
  );
}