import { Component, OnInit } from '@angular/core';
import { Turma } from '../models/turma';
import { TurmaService } from '../services/turma.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  imagens: string = environment.imagensUrl;

  public turmas: Turma[];
  errorMessage: string;

  constructor(private turmaService: TurmaService) { }

  ngOnInit(): void {
    this.turmaService.obterTodos()
      .subscribe(
        turmas => this.turmas = turmas,
        error => this.errorMessage);
  }
}
