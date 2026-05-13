// src/components/SeletorCategoria.js
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { CATEGORIAS, CORES } from '../utils/constants';

export function SeletorCategoria({ categoriaSelecionada, onSelecionar }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Categoria</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {CATEGORIAS.map((cat) => {
          const selecionada = categoriaSelecionada === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.chip,
                selecionada && { backgroundColor: cat.color, borderColor: cat.color },
              ]}
              onPress={() => onSelecionar(cat.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.emoji}>{cat.emoji}</Text>
              <Text style={[styles.label2, selecionada && styles.labelSelecionada]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 11,
    color: CORES.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    fontWeight: '600',
  },
  scroll: {
    gap: 8,
    paddingBottom: 4,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: CORES.border,
    backgroundColor: CORES.background,
  },
  emoji: {
    fontSize: 14,
  },
  label2: {
    fontSize: 12,
    color: CORES.textSecondary,
    fontWeight: '500',
  },
  labelSelecionada: {
    color: '#fff',
    fontWeight: '700',
  },
});
