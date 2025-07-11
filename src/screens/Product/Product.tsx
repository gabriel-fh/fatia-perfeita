import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Produto, { SituacaoProduto, TipoProduto } from "@/src/model/Produto";
import { colors } from "@/src/utils/styles";
import CtrlManterProdutos from "@/src/controller/CtrlManterProdutos";

const ctrl = new CtrlManterProdutos();

export default function Product() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  // Form fields
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState<TipoProduto>("PIZZA");
  const [precoBase, setPrecoBase] = useState("");
  const [situacao, setSituacao] = useState<SituacaoProduto>("DISPONIVEL");
  const [editando, setEditando] = useState(false);

  const carregarProdutos = async () => {
    setLoading(true);
    const data = await ctrl.carregarProdutos();
    setProdutos(data);
    setLoading(false);
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const salvarProduto = async () => {
    const produto = new Produto(codigo, nome, imagem, descricao, tipo, parseFloat(precoBase), situacao);

    if (editando) {
      await ctrl.alterarProduto(produto);
    } else {
      await ctrl.incluirProduto(produto);
    }

    setModalVisible(false);
    setEditando(false);
    limparCampos();
    carregarProdutos();
  };

  const editarProduto = (produto: Produto) => {
    setCodigo(produto.getCodigo());
    setNome(produto.getNome());
    setImagem(produto.getImagem());
    setDescricao(produto.getDescricao());
    setTipo(produto.getTipo());
    setPrecoBase(produto.getPrecoBase().toString());
    setSituacao(produto.getSituacao());
    setEditando(true);
    setModalVisible(true);
  };

  const excluirProduto = async () => {
    await ctrl.excluirProduto(codigo);
    setModalVisible(false);
    carregarProdutos();
  };

  const limparCampos = () => {
    setCodigo("");
    setNome("");
    setImagem("");
    setDescricao("");
    setTipo("PIZZA");
    setPrecoBase("");
    setSituacao("DISPONIVEL");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bgPrimary} />
      <ScrollView style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Imagem</Text>
          <Text style={styles.headerText}>Código</Text>
          <Text style={styles.headerText}>Nome</Text>
          <Text style={styles.headerText}>Tipo</Text>
          <Text style={styles.headerText}>Preço</Text>
          <Text style={styles.headerText}>Situação</Text>
        </View>

        {loading ? (
          <ActivityIndicator style={{ marginTop: 50 }} />
        ) : (
          produtos.map((p) => (
            <TouchableOpacity onPress={() => editarProduto(p)} key={p.getCodigo()}>
              <View style={styles.row}>
                <Image source={{ uri: p.getImagem() }} style={styles.image} />
                <Text style={styles.cell}>{p.getCodigo()}</Text>
                <Text style={styles.cell}>{p.getNome()}</Text>
                <Text style={styles.cell}>{p.getTipo()}</Text>
                <Text style={styles.cell}>R$ {p.getPrecoBase().toFixed(2)}</Text>
                <Text style={styles.cell}>{p.getSituacao()}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Botão Flutuante */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Produto</Text>

            <TextInput
              placeholder="Código"
              value={codigo}
              onChangeText={setCodigo}
              style={styles.input}
              editable={!editando}
            />
            <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
            <TextInput placeholder="Imagem (URL)" value={imagem} onChangeText={setImagem} style={styles.input} />
            <TextInput placeholder="Descrição" value={descricao} onChangeText={setDescricao} style={styles.input} />
            <TextInput
              placeholder="Tipo PIZZA"
              value={tipo}
              onChangeText={(t) => setTipo(t as TipoProduto)}
              style={styles.input}
            />
            <TextInput
              placeholder="Preço base"
              value={precoBase}
              onChangeText={setPrecoBase}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              placeholder="Situação (DISPONIVEL | INATIVO)"
              value={situacao}
              onChangeText={(s) => setSituacao(s as SituacaoProduto)}
              style={styles.input}
            />

            <View style={styles.modalButtons}>
              {editando && (
                <TouchableOpacity style={[styles.button, { backgroundColor: "red" }]} onPress={excluirProduto}>
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.button} onPress={salvarProduto}>
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#aaa" }]}
                onPress={() => {
                  setModalVisible(false);
                  setEditando(false);
                }}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
  content: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 6,
  },
  cell: {
    flex: 1,
    fontSize: 10,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#2196F3",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  fabText: {
    color: "#fff",
    fontSize: 32,
    lineHeight: 36,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
