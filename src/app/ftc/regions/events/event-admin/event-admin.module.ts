import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EventAdminComponent } from './event-admin.component';

import { RouterModule } from '@angular/router';

const routes = [
  { path: '', component: EventAdminComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [EventAdminComponent]
})
export class EventAdminModule {}
