import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateDetailsPageRoutingModule } from './update-details-routing.module';

import { UpdateDetailsPage } from './update-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateDetailsPageRoutingModule
  ],
  declarations: [UpdateDetailsPage]
})
export class UpdateDetailsPageModule {}
