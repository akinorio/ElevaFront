import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TurmaAppComponent } from './turma.app.component';
import { ListaComponent } from './lista/lista.component';
import { NovoComponent } from './novo/novo.component';
import { EditarComponent } from './editar/editar.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ExcluirComponent } from './excluir/excluir.component';
import { TurmaResolve } from './services/turma.resolve';
import { TurmaGuard } from './services/turma.guard';

const turmaRouterConfig: Routes = [
    {
        path: '', component: TurmaAppComponent,
        children: [
            { path: 'listar-todos', component: ListaComponent },
            {
                path: 'adicionar-novo', component: NovoComponent,
                canDeactivate: [TurmaGuard],
                canActivate: [TurmaGuard],
                data: [{ claim: { nome: 'Turma', valor: 'Adicionar' } }],
            },
            {
                path: 'editar/:id', component: EditarComponent,
                canActivate: [TurmaGuard],
                data: [{ claim: { nome: 'Turma', valor: 'Atualizar' } }],
                resolve: {
                    turma: TurmaResolve
                }
            },
            {
                path: 'detalhes/:id', component: DetalhesComponent,
                resolve: {
                    turma: TurmaResolve
                }
            },
            {
                path: 'excluir/:id', component: ExcluirComponent,
                canActivate: [TurmaGuard],
                data: [{ claim: { nome: 'Turma', valor: 'Excluir' } }],
                resolve: {
                    turma: TurmaResolve
                }
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(turmaRouterConfig)
    ],
    exports: [RouterModule]
})
export class TurmaRoutingModule { }