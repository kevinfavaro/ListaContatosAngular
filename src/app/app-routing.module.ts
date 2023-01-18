import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatosComponent } from './contatos/contatos.component';
import { EmailsComponent } from './emails/emails.component';
import { HomeComponent } from './home/home.component';
import { PessoasComponent } from './pessoas/pessoas.component';
import { TelefonesComponent } from './telefones/telefones.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'pessoas', component: PessoasComponent},
  {path: 'contatos', component: ContatosComponent},
  {path: 'telefones', component: TelefonesComponent},
  {path: 'emails', component: EmailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
