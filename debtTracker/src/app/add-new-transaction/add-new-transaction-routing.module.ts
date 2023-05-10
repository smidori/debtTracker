import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewTransactionPage } from './add-new-transaction.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewTransactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewTransactionPageRoutingModule {}
