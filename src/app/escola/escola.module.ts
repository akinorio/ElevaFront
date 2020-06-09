import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoComponent } from './novo/novo.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { EscolaRoutingModule } from './escola.route';
import { EscolaAppComponent } from './escola.app.component';
import { ListaComponent } from './lista/lista.component';
import { EscolaService } from './services/escola.service';

import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxSpinnerModule } from "ngx-spinner";

import { EditarComponent } from './editar/editar.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { EscolaResolve } from './services/escola.resolve';
import { EscolaGuard } from './services/escola.guard';
import { ListaTurmasComponent } from './turmas/lista-turmas.component';

@NgModule({
  declarations: [
    EscolaAppComponent,
    NovoComponent,
    ListaComponent,
    EditarComponent,
    ExcluirComponent,
    DetalhesComponent,
    ListaTurmasComponent
  ],
  imports: [
    CommonModule,
    EscolaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgBrazil,
    TextMaskModule,
    NgxSpinnerModule
  ],
  providers: [
    EscolaService,
    EscolaResolve,
    EscolaGuard
  ]
})
export class EscolaModule { }
