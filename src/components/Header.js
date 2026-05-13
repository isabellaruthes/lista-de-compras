// src/components/Header.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CORES } from '../utils/constants';

export function Header({ totalPendentes, totalComprados, onLimparLista, onLimparComprados }) {
  const total = totalPendentes + totalComprados;

  return (
    <View style={styles.container}>
      {/* Título */}
      <View style={styles.tituloContainer}>
        <Text style={styles.emoji}>🛒</Text>
        <View>
          <Text style={styles.titulo}>Lista de</Text>
          <Text style={styles.tituloDestaque}>Compras</Text>
        </View>
      </View>

      {/* Contadores */}
      {total > 0 && (
        <View style={styles.contadoresRow}>
          <View style={[styles.contador, styles.contadorPendente]}>
            <MaterialIcons name="radio-button-unchecked" size={14} color={CORES.primary} />
            <Text style={styles.contadorNumero}>{totalPendentes}</Text>
            <Text style={styles.contadorLabel}>pendente{totalPendentes !== 1 ? 's' : ''}</Text>
          </View>

          <View style={styles.separador} />

          <View style={[styles.contador, styles.contadorComprado]}>
            <MaterialIcons name="check-circle" size={14} color={CORES.success} />
            <Text style={[styles.contadorNumero, { color: CORES.success }]}>{totalComprados}</Text>
            <Text style={styles.contadorLabel}>comprado{totalComprados !== 1 ? 's' : ''}</Text>
          </View>
        </View>
      )}

      {/* Botões de ação */}
      {total > 0 && (
        <View style={styles.acoesRow}>
          {totalComprados > 0 && (
            <TouchableOpacity style={styles.btnAcao} onPress={onLimparComprados} activeOpacity={0.7}>
              <MaterialIcons name="done-all" size={14} color={CORES.success} />
              <Text style={[styles.btnAcaoTexto, { color: CORES.success }]}>Limpar comprados</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.btnAcao, styles.btnPerigo]}
            onPress={onLimparLista}
            activeOpacity={0.7}
          >
            <MaterialIcons name="delete-sweep" size={14} color={CORES.primary} />
            <Text style={[styles.btnAcaoTexto, { color: CORES.primary }]}>Limpar tudo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CORES.surface,
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: CORES.border,
  },
  tituloContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  emoji: {
    fontSize: 36,
  },
  titulo: {
    fontSize: 14,
    color: CORES.textSecondary,
    fontWeight: '400',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  tituloDestaque: {
    fontSize: 28,
    fontWeight: '800',
    color: CORES.text,
    letterSpacing: -0.5,
    lineHeight: 30,
  },
  contadoresRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: CORES.background,
    borderRadius: 12,
    padding: 10,
  },
  contador: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  contadorPendente: {
    justifyContent: 'flex-start',
  },
  contadorComprado: {
    justifyContent: 'flex-end',
  },
  separador: {
    width: 1,
    height: 20,
    backgroundColor: CORES.border,
    marginHorizontal: 12,
  },
  contadorNumero: {
    fontSize: 18,
    fontWeight: '800',
    color: CORES.primary,
  },
  contadorLabel: {
    fontSize: 12,
    color: CORES.textSecondary,
  },
  acoesRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  btnAcao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: CORES.border,
    backgroundColor: CORES.background,
  },
  btnPerigo: {},
  btnAcaoTexto: {
    fontSize: 12,
    fontWeight: '600',
  },
});
