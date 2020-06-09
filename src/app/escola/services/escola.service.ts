import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { Escola } from '../models/escola';
import { CepConsulta, Endereco } from '../models/endereco';

@Injectable()
export class EscolaService extends BaseService {

    escola: Escola = new Escola();

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<Escola[]> {
        return this.http
            .get<Escola[]>(this.UrlServiceV1 + "escolas")
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Escola> {
        return this.http
            .get<Escola>(this.UrlServiceV1 + "escolas/" + id, super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoEscola(escola: Escola): Observable<Escola> {
        return this.http
            .post(this.UrlServiceV1 + "escolas", escola, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarEscola(escola: Escola): Observable<Escola> {
        return this.http
            .put(this.UrlServiceV1 + "escolas/" + escola.id, escola, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirEscola(id: string): Observable<Escola> {
        return this.http
            .delete(this.UrlServiceV1 + "escolas/" + id, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarEndereco(endereco: Endereco): Observable<Endereco> {
        return this.http
            .put(this.UrlServiceV1 + "escolas/endereco/" + endereco.id, endereco, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    consultarCep(cep: string): Observable<CepConsulta> {
        return this.http
            .get<CepConsulta>(`https://viacep.com.br/ws/${cep}/json/`)
            .pipe(catchError(super.serviceError))
    }
}
