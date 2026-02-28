'use client'; // Esta linha diz ao Next.js que este componente roda no navegador

import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/navigation';

export default function FormularioUsuario() {
  const [nome, setNome] = useState('');
  const [carregando, setCarregando] = useState(false);
  const router = useRouter(); // Para recarregar a página após salvar

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que a página recarregue do jeito padrão
    if (!nome) return;

    setCarregando(true);

    // Inserindo no banco de dados
    const { error } = await supabase
      .from('usuarios')
      .insert([{ nome: nome }]);

    setCarregando(false);

    if (error) {
      alert('Erro ao salvar: ' + error.message);
    } else {
      setNome(''); // Limpa o campo
      router.refresh(); // Pede ao Next.js para atualizar a lista de usuários
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
      <input
        type="text"
        placeholder="Digite um novo nome..."
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="border p-2 rounded text-black"
        required
      />
      <button 
        type="submit" 
        disabled={carregando}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {carregando ? 'Salvando...' : 'Adicionar'}
      </button>
    </form>
  );
}