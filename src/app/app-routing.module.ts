import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConverterComponent} from './components/converter/converter.component';

const routes: Routes = [
    { path:'converter',component:ConverterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }