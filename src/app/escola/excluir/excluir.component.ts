import { Component } from '@angular/core';
import { Escola } from '../models/escola';

import { ActivatedRoute, Router } from '@angular/router';
import { EscolaService } from '../services/escola.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent {

  escola: Escola = new Escola();
  enderecoMap;
  errors: any[] = [];

  constructor(
    private escolaService: EscolaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer) {

    this.escola = this.route.snapshot.data['escola'];
    this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?q=" + this.EnderecoCompleto() + "&key=AIzaSyAP0WKpL7uTRHGKWyakgQXbW6FUhrrA5pE");
  }

  public EnderecoCompleto(): string {
    return this.escola.endereco.logradouro + ", " + this.escola.endereco.numero + " - " + this.escola.endereco.bairro + ", " + this.escola.endereco.cidade + " - " + this.escola.endereco.estado;
  }

  excluirEvento() {
    this.escolaService.excluirEscola(this.escola.id)
      .subscribe(
        escola => { this.sucessoExclusao(escola) },
        error => { this.falha(error) }
      );
  }

  sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Escola excluída com sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/escolas/listar-todos']);
      });
    }
  }

  falha(fail) {
    this.errors = fail.error.errors;
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
