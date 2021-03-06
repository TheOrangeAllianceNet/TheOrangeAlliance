import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { AFewTipsToBringYourDrivingGameToTheNextLevelComponent } from '../a-few-tips-to-bring-your-driving-game-to-the-next-level/a-few-tips-to-bring-your-driving-game-to-the-next-level.component';
import { OptInEmailModule } from '../opt-in-email/opt-in-email.module';

const routes = [
  { path: '', component: AFewTipsToBringYourDrivingGameToTheNextLevelComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OptInEmailModule
  ],
  declarations: [AFewTipsToBringYourDrivingGameToTheNextLevelComponent]
})
export class AFewTipsToBringYourDrivingGameToTheNextLevelModule {}
