import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { TurmaService } from '../services/turma.service';
import { environment } from 'src/environments/environment';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { TurmaBaseComponent } from '../turma-form.base.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent extends TurmaBaseComponent implements OnInit {

  imagens: string = environment.imagensUrl;

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  imageBase64: any;
  imagemPreview: any;
  imagemNome: string;
  imagemOriginalSrc: string;

  constructor(private fb: FormBuilder,
    private turmaService: TurmaService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {

    super();
    this.turma = this.route.snapshot.data['turma'];
  }

  ngOnInit(): void {

    this.turmaService.obterEscolas()
      .subscribe(
        escolas => this.escolas = escolas);

    this.turmaForm = this.fb.group({
      escolaId: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
      imagem: [''],
      ativo: [0]
    });

    this.turmaForm.patchValue({
      escolaId: this.turma.escolaId,
      id: this.turma.id,
      nome: this.turma.nome,
      descricao: this.turma.descricao,
      ativo: this.turma.ativo
    });

    // utilizar o [src] na imagem para evitar que se perca após post
    this.imagemOriginalSrc = this.imagens + this.turma.imagem;
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  editarTurma() {
    if (this.turmaForm.dirty && this.turmaForm.valid) {
      this.turma = Object.assign({}, this.turma, this.turmaForm.value);

      if (this.imageBase64) {
        this.turma.imagemUpload = this.imageBase64;
        this.turma.imagem = this.imagemNome;
      }

      this.turmaService.atualizarTurma(this.turma)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.turmaForm.reset();
    this.errors = [];

    let toast = this.toastr.success('Turma editada com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/turmas/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  upload(file: any) {
    this.imagemNome = file[0].name;

    var reader = new FileReader();
    reader.onload = this.manipularReader.bind(this);
    reader.readAsBinaryString(file[0]);
  }

  manipularReader(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.imageBase64 = btoa(binaryString);
    this.imagemPreview = "data:image/jpeg;base64," + this.imageBase64;
  }
}

