import { Component } from '@angular/core';
import { Escola } from '../models/escola';
import { DomSanitizer } from '@angular/platform-browser';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  escola: Escola = new Escola();
  enderecoMap;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {

      this.escola = this.route.snapshot.data['escola'];
      //this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?q=" + this.EnderecoCompleto() + "&key=AIzaSyAP0WKpL7uTRHGKWyakgQXbW6FUhrrA5pE");
  }

  // public EnderecoCompleto(): string {
  //   return this.escola.endereco.logradouro + ", " + this.escola.endereco.numero + " - " + this.escola.endereco.bairro + ", " + this.escola.endereco.cidade + " - " + this.escola.endereco.estado;
  // }
}
