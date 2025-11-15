import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { HelloModuleComponent } from './hello.component';

const routes: Routes = [
  { path: '', component: HelloModuleComponent }
];

@NgModule({
  declarations: [
    HelloModuleComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ]
})
export class HelloModule { }