// App.js (versão final equilibrada para entrega)
import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const cores = {
  fundo: '#f2f2f2',
  verde: '#2ecc71',
  texto: '#222',
  cinza: '#777',
  vermelho: '#e74c3c',
};

export default function App() {
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [textoInput, setTextoInput] = useState('');

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      const dados = await AsyncStorage.getItem('@lista');
      if (dados) setLista(JSON.parse(dados));
    } catch (e) {
      console.log('Erro ao carregar', e);
    }
    setCarregando(false);
  }

  async function salvar(novaLista) {
    try {
      await AsyncStorage.setItem('@lista', JSON.stringify(novaLista));
    } catch (e) {
      console.log('Erro ao salvar', e);
    }
  }

  function adicionar() {
    if (!textoInput.trim()) {
      Alert.alert('Aviso', 'Digite um item antes de adicionar');
      return;
    }

    const novo = {
      id: uuidv4(),
      nome: textoInput,
      feito: false,
    };

    const novaLista = [...lista, novo];
    setLista(novaLista);
    salvar(novaLista);
    setTextoInput('');
  }

  function marcar(id) {
    const novaLista = lista.map(item =>
      item.id === id ? { ...item, feito: !item.feito } : item
    );
    setLista(novaLista);
    salvar(novaLista);
  }

  function deletar(id) {
    Alert.alert('Confirmação', 'Deseja remover este item?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', onPress: () => {
        const novaLista = lista.filter(item => item.id !== id);
        setLista(novaLista);
        salvar(novaLista);
      }}
    ]);
  }

  function apagarTudo() {
    if (lista.length === 0) return;

    Alert.alert('Confirmação', 'Todos os itens serão removidos', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover tudo', style: 'destructive', onPress: () => {
        setLista([]);
        salvar([]);
      }}
    ]);
  }

  const pendentes = lista.filter(i => !i.feito).length;

  function Item({ item }) {
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => marcar(item.id)}>
          <Text>{item.feito ? '✅' : '⬜'}</Text>
        </TouchableOpacity>

        <Text style={[styles.textoItem, item.feito && styles.riscado]}>
          {item.nome}
        </Text>

        <TouchableOpacity onPress={() => deletar(item.id)}>
          <Text>🗑️</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (carregando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.container}>
        <Text style={styles.titulo}>Lista de Compras</Text>

        <Text style={styles.info}>{pendentes} item(ns) pendente(s)</Text>

        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="Digite um item..."
            value={textoInput}
            onChangeText={setTextoInput}
            onSubmitEditing={adicionar}
          />

          <TouchableOpacity style={styles.botao} onPress={adicionar}>
            <Text style={{ color: '#fff', fontSize: 18 }}>+</Text>
          </TouchableOpacity>
        </View>

        {lista.length === 0 ? (
          <View style={styles.center}>
            <Text style={{ fontSize: 40 }}>🛒</Text>
            <Text>Nenhum item na lista</Text>
          </View>
        ) : (
          <FlatList
            data={lista}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Item item={item} />}
          />
        )}

        <TouchableOpacity style={styles.apagar} onPress={apagarTudo}>
          <Text style={{ color: '#fff' }}>Limpar tudo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cores.fundo },
  container: { flex: 1, padding: 20 },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: cores.verde,
  },
  info: {
    textAlign: 'center',
    marginBottom: 15,
    color: cores.cinza,
  },
  inputArea: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  botao: {
    backgroundColor: cores.verde,
    padding: 12,
    borderRadius: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  textoItem: {
    flex: 1,
    marginLeft: 10,
  },
  riscado: {
    textDecorationLine: 'line-through',
    color: cores.cinza,
  },
  apagar: {
    marginTop: 10,
    backgroundColor: cores.vermelho,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
