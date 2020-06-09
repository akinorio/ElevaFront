import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Escola } from '../models/escola';
import { EscolaService } from './escola.service';

@Injectable()
export class EscolaResolve implements Resolve<Escola> {

    constructor(private escolaService: EscolaService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.escolaService.obterPorId(route.params['id']);
    }
}