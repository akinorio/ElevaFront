import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';

import { utilsBr } from 'js-brasil';

import { FormBaseComponent } from '../base-components/form-base.component';
import { Turma } from './models/turma';
import { Escola } from '../escola/models/escola';

export abstract class TurmaBaseComponent extends FormBaseComponent {
    
    turma: Turma;
    escolas: Escola[];
    errors: any[] = [];
    turmaForm: FormGroup;

    MASKS = utilsBr.MASKS;

    constructor() {
        super();

        this.validationMessages = {
            escolaId: {
                required: 'Escolha uma escola',
            },
            nome: {
                required: 'Informe o Nome',
                minlength: 'Mínimo de 2 caracteres',
                maxlength: 'Máximo de 100 caracteres'
            },
            descricao: {
                required: 'Informe a Descrição',
                minlength: 'Mínimo de 2 caracteres',
                maxlength: 'Máximo de 200 caracteres'
            }
        }

        super.configurarMensagensValidacaoBase(this.validationMessages);
    }

    protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
        super.configurarValidacaoFormularioBase(formInputElements, this.turmaForm);
    }
}