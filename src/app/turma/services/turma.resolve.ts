import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Turma } from '../models/turma';
import { TurmaService } from './turma.service';

@Injectable()
export class TurmaResolve implements Resolve<Turma> {

    constructor(private turmaService: TurmaService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.turmaService.obterPorId(route.params['id']);
    }
}