import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { ImageCroppedEvent, ImageTransform, Dimensions } from 'ngx-image-cropper';

import { TurmaService } from '../services/turma.service';
import { CurrencyUtils } from '../../../../src/app/utils/currency-utils';
import { TurmaBaseComponent } from '../turma-form.base.component';


@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends TurmaBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  imageURL: string;
  imagemNome: string;

  constructor(private fb: FormBuilder,
    private turmaService: TurmaService,
    private router: Router,
    private toastr: ToastrService) { super(); }

  ngOnInit(): void {

    this.turmaService.obterEscolas()
      .subscribe(
        escolas => this.escolas = escolas);

    this.turmaForm = this.fb.group({
      escolaId: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]],
      ativo: [true]
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarTurma() {
    if (this.turmaForm.dirty && this.turmaForm.valid) {
      this.turma = Object.assign({}, this.turma, this.turmaForm.value);

      this.turma.imagemUpload = this.croppedImage.split(',')[1];
      this.turma.imagem = this.imagemNome;

      this.turmaService.novoTurma(this.turma)
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

    let toast = this.toastr.success('Turma cadastrada com sucesso!', 'Sucesso!');
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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imagemNome = event.currentTarget.files[0].name;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    this.showCropper = true;
  }
  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }
  loadImageFailed() {
    this.errors.push('O formato do arquivo ' + this.imagemNome + ' não é aceito.');
  }
}

