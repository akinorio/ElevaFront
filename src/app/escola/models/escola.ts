import { Endereco } from './endereco';
import { Turma } from 'src/app/turma/models/turma';

export class Escola {
    id: string;
    nome: string;
    descricao: string;
    ativo: boolean;
    endereco: Endereco;
    turmas: Turma[]
}

