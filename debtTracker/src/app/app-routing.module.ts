import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },  
  {
    path: 'add-new-transaction',
    loadChildren: () => import('./add-new-transaction/add-new-transaction.module').then( m => m.AddNewTransactionPageModule)
  },
  {
    path: 'update-details/:id',
    loadChildren: () => import('./update-details/update-details.module').then( m => m.UpdateDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
