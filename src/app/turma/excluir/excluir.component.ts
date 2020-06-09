import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TurmaService } from '../services/turma.service';

import { ToastrService } from 'ngx-toastr';

import { Turma } from '../models/turma';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent  {

  imagens: string = environment.imagensUrl;
  turma: Turma;

  constructor(private turmaService: TurmaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {

    this.turma = this.route.snapshot.data['turma'];
  }

  public excluirTurma() {
    this.turmaService.excluirTurma(this.turma.id)
      .subscribe(
      evento => { this.sucessoExclusao(evento) },
      ()     => { this.falha() }
      );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Turma excluída com sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/turmas/listar-todos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}

