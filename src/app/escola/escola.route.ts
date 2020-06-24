import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscolaAppComponent } from './escola.app.component';
import { NovoComponent } from './novo/novo.component';
import { ListaComponent } from './lista/lista.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { EscolaResolve } from './services/escola.resolve';
import { EscolaGuard } from './services/escola.guard';

const escolaRouterConfig: Routes = [
    {
        path: '', component: EscolaAppComponent,
        children: [
            { path: 'listar-todos', component: ListaComponent },
            {
                path: 'adicionar-novo', component: NovoComponent,
                data: [{ claim: { nome: 'Escola', valor: 'Adicionar'}}]
            },
            {
                path: 'editar/:id', component: EditarComponent,
                data: [{ claim: { nome: 'Escola', valor: 'Atualizar' } }],
                resolve: {
                    escola: EscolaResolve
                }
            },
            {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    escola: EscolaResolve
                }
            },
            {
                path: 'excluir/:id', component: ExcluirComponent,
                data: [{ claim: { nome: 'Escola', valor: 'Excluir' } }],
                resolve: {
                    escola: EscolaResolve
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(escolaRouterConfig)
    ],
    exports: [RouterModule]
})
export class EscolaRoutingModule { }