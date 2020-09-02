import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

const routes: Routes = [
  {
    path: 'municipio',
    loadChildren: () => import('./municipio/municipio.module').then(m => m.MunicipioModule)
  },
  {
    path: 'compras',
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
  }
  ,
  {
    path: 'duvidas',
    loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule)
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
