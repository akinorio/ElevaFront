import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from '../../services/base.service';
import { Turma } from '../models/turma';
import { Escola } from "../../escola/models/escola";

@Injectable()
export class TurmaService extends BaseService {

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<Turma[]> {
        return this.http
            .get<Turma[]>(this.UrlServiceV1 + "turmas", super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Turma> {
        return this.http
            .get<Turma>(this.UrlServiceV1 + "turmas/" + id, super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoTurma(turma: Turma): Observable<Turma> {
        return this.http
            .post(this.UrlServiceV1 + "turmas", turma, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarTurma(turma: Turma): Observable<Turma> {
        return this.http
            .put(this.UrlServiceV1 + "turmas/" + turma.id, turma, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirTurma(id: string): Observable<Turma> {
        return this.http
            .delete(this.UrlServiceV1 + "turmas/" + id, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }    

    obterEscolas(): Observable<Escola[]> {
        return this.http
            .get<Escola[]>(this.UrlServiceV1 + "escolas")
            .pipe(catchError(super.serviceError));
    }
}
