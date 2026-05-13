// src/hooks/useListaCompras.js
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '../utils/constants';

export function useListaCompras() {
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Carrega os dados ao iniciar o app
  useEffect(() => {
    carregarItens();
  }, []);

  // Salva sempre que a lista muda
  useEffect(() => {
    if (!carregando) {
      salvarItens(itens);
    }
  }, [itens, carregando]);

  const carregarItens = async () => {
    try {
      const dados = await AsyncStorage.getItem(STORAGE_KEY);
      if (dados !== null) {
        setItens(JSON.parse(dados));
      }
    } catch (erro) {
      console.error('Erro ao carregar itens:', erro);
    } finally {
      setCarregando(false);
    }
  };

  const salvarItens = async (lista) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
    } catch (erro) {
      console.error('Erro ao salvar itens:', erro);
    }
  };

  const adicionarItem = useCallback((nome, categoria = 'geral') => {
    if (!nome.trim()) return false;

    const novoItem = {
      id: Date.now().toString(),
      nome: nome.trim(),
      categoria,
      comprado: false,
      criadoEm: new Date().toISOString(),
    };

    setItens((prev) => [novoItem, ...prev]);
    return true;
  }, []);

  const toggleComprado = useCallback((id) => {
    setItens((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, comprado: !item.comprado } : item
      )
    );
  }, []);

  const excluirItem = useCallback((id) => {
    setItens((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const limparLista = useCallback(async () => {
    setItens([]);
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (erro) {
      console.error('Erro ao limpar lista:', erro);
    }
  }, []);

  const limparComprados = useCallback(() => {
    setItens((prev) => prev.filter((item) => !item.comprado));
  }, []);

  const totalPendentes = itens.filter((i) => !i.comprado).length;
  const totalComprados = itens.filter((i) => i.comprado).length;

  return {
    itens,
    carregando,
    adicionarItem,
    toggleComprado,
    excluirItem,
    limparLista,
    limparComprados,
    totalPendentes,
    totalComprados,
  };
}
