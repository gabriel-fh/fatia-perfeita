type Product = {
  codigo: string;
  nome: string;
  imagem: string;
  descricao: string;
  tipo: 'PIZZA' | 'BEBIDA' | 'SOBREMESA';
  preco_base: number;
  situacao: 'DISPONIVEL' | 'INDISPONIVEL';
};