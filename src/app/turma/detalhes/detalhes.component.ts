import { Component } from '@angular/core';
import { Turma } from '../models/turma';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../src/environments/environment';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  imagens: string = environment.imagensUrl;
  turma: Turma;

  constructor(private route: ActivatedRoute) {

    this.turma = this.route.snapshot.data['turma'];
  }

}
