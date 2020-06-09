import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NgBrazilValidators } from 'ng-brazil';
import { utilsBr } from 'js-brasil';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

import { StringUtils } from '../../utils/string-utils';
import { Escola } from '../models/escola';
import { Endereco, CepConsulta } from '../models/endereco';
import { EscolaService } from '../services/escola.service';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { FormBaseComponent } from '../../base-components/form-base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  errorsEndereco: any[] = [];
  escolaForm: FormGroup;
  enderecoForm: FormGroup;

  escola: Escola = new Escola();
  endereco: Endereco = new Endereco();

  textoDocumento: string = '';

  MASKS = utilsBr.MASKS;
  tipoEscola: number;

  constructor(private fb: FormBuilder,
    private escolaService: EscolaService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService) {

    super();

    this.validationMessages = {
      nome: {
        required: 'Informe o Nome',
      },
      documento: {
        required: 'Informe o Documento',
        cpf: 'CPF em formato inválido',
        cnpj: 'CNPJ em formato inválido'
      },
      logradouro: {
        required: 'Informe o Logradouro',
      },
      numero: {
        required: 'Informe o Número',
      },
      bairro: {
        required: 'Informe o Bairro',
      },
      cep: {
        required: 'Informe o CEP',
        cep: 'CEP em formato inválido',
      },
      cidade: {
        required: 'Informe a Cidade',
      },
      estado: {
        required: 'Informe o Estado',
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);

    this.escola = this.route.snapshot.data['escola'];
    this.tipoEscola = this.escola.tipoEscola;
  }

  ngOnInit() {

    this.spinner.show();

    this.escolaForm = this.fb.group({
      id: '',
      nome: ['', [Validators.required]],
      documento: '',
      ativo: ['', [Validators.required]],
      tipoEscola: ['', [Validators.required]]
    });

    this.enderecoForm = this.fb.group({
      id: '',
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: [''],
      bairro: ['', [Validators.required]],
      cep: ['', [Validators.required, NgBrazilValidators.cep]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      escolaId: ''
    });

    this.preencherForm();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  preencherForm() {

    this.escolaForm.patchValue({
      id: this.escola.id,
      nome: this.escola.nome,
      ativo: this.escola.ativo,
      tipoEscola: this.escola.tipoEscola.toString(),
      documento: this.escola.documento
    });

    if (this.tipoEscolaForm().value === "1") {
      this.documento().setValidators([Validators.required, NgBrazilValidators.cpf]);
    }
    else {
      this.documento().setValidators([Validators.required, NgBrazilValidators.cnpj]);
    }

    this.enderecoForm.patchValue({
      id: this.escola.endereco.id,
      logradouro: this.escola.endereco.logradouro,
      numero: this.escola.endereco.numero,
      complemento: this.escola.endereco.complemento,
      bairro: this.escola.endereco.bairro,
      cep: this.escola.endereco.cep,
      cidade: this.escola.endereco.cidade,
      estado: this.escola.endereco.estado
    });
  }

  ngAfterViewInit() {
    this.tipoEscolaForm().valueChanges.subscribe(() => {
      this.trocarValidacaoDocumento();
      super.configurarValidacaoFormularioBase(this.formInputElements, this.escolaForm)
      super.validarFormulario(this.escolaForm)
    });

    super.configurarValidacaoFormularioBase(this.formInputElements, this.escolaForm);
  }

  trocarValidacaoDocumento() {

    if (this.tipoEscolaForm().value === "1") {
      this.documento().clearValidators();
      this.documento().setValidators([Validators.required, NgBrazilValidators.cpf]);
    }

    else {
      this.documento().clearValidators();
      this.documento().setValidators([Validators.required, NgBrazilValidators.cnpj]);
    }
  }

  documento(): AbstractControl {
    return this.escolaForm.get('documento');
  }

  tipoEscolaForm(): AbstractControl {
    return this.escolaForm.get('tipoEscola');
  }

  buscarCep(cep: string) {

    cep = StringUtils.somenteNumeros(cep);
    if (cep.length < 8) return;

    this.escolaService.consultarCep(cep)
      .subscribe(
        cepRetorno => this.preencherEnderecoConsulta(cepRetorno),
        erro => this.errors.push(erro));
  }

  preencherEnderecoConsulta(cepConsulta: CepConsulta) {

    this.enderecoForm.patchValue({
      logradouro: cepConsulta.logradouro,
      bairro: cepConsulta.bairro,
      cep: cepConsulta.cep,
      cidade: cepConsulta.localidade,
      estado: cepConsulta.uf
    });
  }

  editarEscola() {
    if (this.escolaForm.dirty && this.escolaForm.valid) {

      this.escola = Object.assign({}, this.escola, this.escolaForm.value);
      this.escola.documento = StringUtils.somenteNumeros(this.escola.documento);

      /* Workaround para evitar cast de string para int no back-end */
      this.escola.tipoEscola = parseInt(this.escola.tipoEscola.toString());

      this.escolaService.atualizarEscola(this.escola)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );
    }
  }

  processarSucesso(response: any) {
    this.errors = [];

    let toast = this.toastr.success('Escola atualizada com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/escolas/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  editarEndereco() {
    if (this.enderecoForm.dirty && this.enderecoForm.valid) {

      this.endereco = Object.assign({}, this.endereco, this.enderecoForm.value);

      this.endereco.cep = StringUtils.somenteNumeros(this.endereco.cep);
      this.endereco.escolaId = this.escola.id;

      this.escolaService.atualizarEndereco(this.endereco)
        .subscribe(
          () => this.processarSucessoEndereco(this.endereco),
          falha => { this.processarFalhaEndereco(falha) }
        );
    }
  }

  processarSucessoEndereco(endereco: Endereco) {
    this.errors = [];

    this.toastr.success('Endereço atualizado com sucesso!', 'Sucesso!');
    this.escola.endereco = endereco
    this.modalService.dismissAll();
  }

  processarFalhaEndereco(fail: any) {
    this.errorsEndereco = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  abrirModal(content) {
    this.modalService.open(content);
  }
}
