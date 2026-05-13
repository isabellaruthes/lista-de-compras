// src/components/FormularioItem.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SeletorCategoria } from './SeletorCategoria';
import { CORES } from '../utils/constants';

export function FormularioItem({ onAdicionar }) {
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('geral');
  const [expandido, setExpandido] = useState(false);
  const inputRef = useRef(null);

  const handleAdicionar = () => {
    const sucesso = onAdicionar(nome, categoria);
    if (sucesso) {
      setNome('');
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      {/* Linha principal de input */}
      <View style={styles.inputRow}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Adicionar item..."
          placeholderTextColor={CORES.textMuted}
          value={nome}
          onChangeText={setNome}
          onSubmitEditing={handleAdicionar}
          returnKeyType="done"
          onFocus={() => setExpandido(true)}
        />

        {/* Botão de expandir/categoria */}
        <TouchableOpacity
          style={styles.btnCategoria}
          onPress={() => setExpandido((v) => !v)}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name={expandido ? 'expand-less' : 'tune'}
            size={20}
            color={CORES.textSecondary}
          />
        </TouchableOpacity>

        {/* Botão de adicionar */}
        <TouchableOpacity
          style={[styles.btnAdicionar, !nome.trim() && styles.btnDesabilitado]}
          onPress={handleAdicionar}
          activeOpacity={0.8}
          disabled={!nome.trim()}
        >
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Seletor de categoria (expandível) */}
      {expandido && (
        <View style={styles.expandido}>
          <SeletorCategoria
            categoriaSelecionada={categoria}
            onSelecionar={setCategoria}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CORES.surface,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: CORES.border,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: CORES.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: CORES.text,
    borderWidth: 1,
    borderColor: CORES.border,
  },
  btnCategoria: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: CORES.background,
    borderWidth: 1,
    borderColor: CORES.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnAdicionar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: CORES.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: CORES.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  btnDesabilitado: {
    backgroundColor: CORES.textMuted,
    shadowOpacity: 0,
    elevation: 0,
  },
  expandido: {
    marginTop: 14,
  },
});
