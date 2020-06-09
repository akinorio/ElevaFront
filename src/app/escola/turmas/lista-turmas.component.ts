import { Component, Input } from '@angular/core';
import { Turma } from 'src/app/turma/models/turma';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'lista-turma',
  templateUrl: './lista-turmas.component.html'
})
export class ListaTurmasComponent {

  imagens: string = environment.imagensUrl;

  @Input()
  turmas: Turma[];
}