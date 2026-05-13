// src/components/ItemCard.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CATEGORIAS, CORES } from '../utils/constants';

export function ItemCard({ item, onToggle, onExcluir }) {
  const categoriaInfo = CATEGORIAS.find((c) => c.id === item.categoria) || CATEGORIAS[0];

  return (
    <View style={[styles.container, item.comprado && styles.containerComprado]}>
      {/* Faixa lateral colorida por categoria */}
      <View style={[styles.faixaCategoria, { backgroundColor: categoriaInfo.color }]} />

      {/* Botão de toggle (marcar comprado) */}
      <TouchableOpacity
        style={styles.checkArea}
        onPress={() => onToggle(item.id)}
        activeOpacity={0.7}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <View style={[styles.checkbox, item.comprado && styles.checkboxMarcado]}>
          {item.comprado && (
            <MaterialIcons name="check" size={16} color="#fff" />
          )}
        </View>
      </TouchableOpacity>

      {/* Conteúdo do item */}
      <View style={styles.conteudo}>
        <Text
          style={[styles.nomeItem, item.comprado && styles.nomeComprado]}
          numberOfLines={2}
        >
          {item.nome}
        </Text>

        {/* Badge de categoria */}
        <View style={styles.badgeRow}>
          <Text style={styles.badgeEmoji}>{categoriaInfo.emoji}</Text>
          <Text style={[styles.badgeTexto, { color: categoriaInfo.color }]}>
            {categoriaInfo.label}
          </Text>

          {item.comprado && (
            <View style={styles.badgeComprado}>
              <Text style={styles.badgeCompradoTexto}>✓ Comprado</Text>
            </View>
          )}
        </View>
      </View>

      {/* Botão de excluir */}
      <TouchableOpacity
        style={styles.btnExcluir}
        onPress={() => onExcluir(item.id)}
        activeOpacity={0.7}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <MaterialIcons name="delete-outline" size={20} color={CORES.textMuted} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CORES.surfaceElevated,
    borderRadius: 14,
    marginHorizontal: 16,
    marginVertical: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: CORES.border,
    minHeight: 68,
  },
  containerComprado: {
    backgroundColor: CORES.comprado,
    borderColor: CORES.compradoBorder + '44',
    opacity: 0.85,
  },
  faixaCategoria: {
    width: 4,
    alignSelf: 'stretch',
  },
  checkArea: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: CORES.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  checkboxMarcado: {
    backgroundColor: CORES.success,
    borderColor: CORES.success,
  },
  conteudo: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 8,
  },
  nomeItem: {
    fontSize: 15,
    color: CORES.text,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 4,
  },
  nomeComprado: {
    textDecorationLine: 'line-through',
    color: CORES.textMuted,
    fontWeight: '400',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeEmoji: {
    fontSize: 12,
  },
  badgeTexto: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  badgeComprado: {
    marginLeft: 6,
    backgroundColor: CORES.success + '22',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeCompradoTexto: {
    fontSize: 10,
    color: CORES.success,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  btnExcluir: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
