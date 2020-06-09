export interface Turma {
  id: string,
  nome: string,
  descricao: string,
  imagem: string,
  imagemUpload: string;
  dataCadastro: string,
  ativo: true,
  escolaId: string,
  nomeEscola: string
}

export interface Escola{
  id: string,
  nome: string,
}

