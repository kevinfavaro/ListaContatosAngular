import { Component } from '@angular/core';
import { ApiService } from '../shared/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  pessoas: string = 'Carregando...';
  contatos: string = 'Carregando...';
  telefones: string = 'Carregando...';
  emails: string = 'Carregando...';
  
  constructor(api: ApiService) {
    api.get('Pessoas').subscribe(x => {
      this.pessoas = x.length
    },
    () => {
      this.pessoas = 'ERRO';
    });

    api.get('Contatos').subscribe(x => {
      this.contatos = x.length
    },
    () => {
      this.contatos = 'ERRO';
    });

    api.get('Telefones').subscribe(x => {
      this.telefones = x.length
    },
    () => {
      this.telefones = 'ERRO';
    });

    api.get('Emails').subscribe(x => {
      this.emails = x.length
    },
    () => {
      this.emails = 'ERRO';
    });
  }
}
