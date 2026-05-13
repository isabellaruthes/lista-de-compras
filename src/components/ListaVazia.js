// src/components/ListaVazia.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CORES } from '../utils/constants';

export function ListaVazia() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🛍️</Text>
      <Text style={styles.titulo}>Lista vazia</Text>
      <Text style={styles.subtitulo}>
        Adicione itens usando o campo acima{'\n'}e comece sua lista de compras!
      </Text>
      <View style={styles.dica}>
        <Text style={styles.dicaTexto}>
          💡 Toque em <Text style={styles.destaque}>⚙</Text> para escolher a categoria do item
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingTop: 60,
    paddingBottom: 100,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '800',
    color: CORES.text,
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 14,
    color: CORES.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  dica: {
    backgroundColor: CORES.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: CORES.border,
  },
  dicaTexto: {
    fontSize: 13,
    color: CORES.textMuted,
    textAlign: 'center',
  },
  destaque: {
    color: CORES.primary,
    fontWeight: '700',
  },
});
