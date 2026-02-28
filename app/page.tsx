import { supabase } from '../lib/supabase';

export default async function Home() {
  // Exemplo: Buscando todos os registros de uma tabela chamada "usuarios"
  const { data: usuarios, error } = await supabase
    .from('usuarios')
    .select('*');

  if (error) {
    console.error('Erro ao buscar dados:', error);
  }

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-4">Meu App com Supabase</h1>
      <ul>
        {usuarios?.map((user) => (
          <li key={user.id}>{user.nome}</li>
        ))}
      </ul>
    </main>
  );
}