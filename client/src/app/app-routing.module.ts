import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
  relativeLinkResolution: 'legacy'
};

const routes: Routes = [
  {
    path: 'orgao',
    loadChildren: () => import('./municipio/municipio.module').then(m => m.MunicipioModule)
  },
  {
    path: 'contratos',
    loadChildren: () => import('./contratos/contratos.module').then(m => m.ContratosModule)
  },
  {
    path: 'itens',
    loadChildren: () => import('./itens/itens.module').then(m => m.ItensModule)
  },
  {
    path: 'licitacoes',
    loadChildren: () => import('./licitacoes/licitacoes.module').then(m => m.LicitacoesModule)
  },
  {
    path: 'fornecedores',
    loadChildren: () => import('./fornecedores/fornecedores.module').then(m => m.FornecedoresModule)
  },
  {
    path: 'busca',
    loadChildren: () => import('./busca/busca.module').then(m => m.BuscaModule)
  },
  {
    path: 'duvidas',
    loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule)
  },
  {
    path: 'malhaFina',
    loadChildren: () => import('./alertas/alertas.module').then(m => m.AlertasModule)
  },
  {
    path: '',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
