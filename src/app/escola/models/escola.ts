import { Endereco } from './endereco';
import { Turma } from 'src/app/turma/models/turma';

export class Escola {
    id: string;
    nome: string;
    documento: string;
    ativo: boolean;
    tipoEscola: number;
    endereco: Endereco;
    turmas: Turma[]
}

