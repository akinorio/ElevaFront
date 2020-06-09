import { Component, OnInit } from '@angular/core';
import { EscolaService } from '../services/escola.service';
import { Escola } from '../models/escola';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  public escolas: Escola[];
  errorMessage: string;

  constructor(private escolaService: EscolaService) { }

  ngOnInit(): void {
    this.escolaService.obterTodos()
      .subscribe(
        escolas => this.escolas = escolas,
        error => this.errorMessage);
  }
}
