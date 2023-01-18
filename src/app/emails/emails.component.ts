import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from '../shared/api/api.service';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.scss']
})

export class EmailsComponent {
  @ViewChild('firstInput')
  firstInput!: ElementRef;

  @Input() input_id_contato: number = 0;

  endpoint: string = "Emails";

  data = [];
  showAdd: boolean = false;
  api: ApiService;

  email: string = "";
  id: number = 0;
  id_contato: number = 0;

  lista_contatos = [];

  constructor(api: ApiService) {
    this.api = api;
    setTimeout(() => {
      this.Lista();
      this.populaDDL();
      this.id_contato = this.input_id_contato;
    }, 0);
  }

  populaDDL() {
    if (this.input_id_contato == 0)
      this.api.get('Contatos').subscribe(data => {
        this.lista_contatos = data;
      });
  }

  rowClick(obj: any) {
    this.ShowAdd();
    this.id = obj.id;
    this.email = obj.email;
    this.id_contato = obj.id_contato;
  }

  Lista() {
    this.api.get(this.endpoint + (this.input_id_contato != 0 ? '?id_contato=' + this.input_id_contato : '')).subscribe(data => {
      this.data = data;
    });
  }

  ShowAdd() {
    this.email = "";
    this.id_contato = this.input_id_contato ?? 0;
    this.showAdd = true;
    setTimeout(() => {
      this.firstInput.nativeElement.focus();
    }, 0);
  }

  CloseAdd() {
    this.showAdd = false;
    this.id = 0;
  }

  Add() {
    if (!this.ChecaCampos())
      return;

    this.api.post(this.endpoint, { email: this.email, id_contato: this.id_contato }).subscribe(x => {
      if (x) {
        Swal.fire('Sucesso!', 'Cadastrado com sucesso!', 'success');
        this.Lista();
        this.CloseAdd();
      }
    },
      error => {
        Swal.fire('Falha!', 'algo deu errado, tenta novamente mais tarde!', 'error');
        console.error(error);
      });
  }

  Edit() {
    if (!this.ChecaCampos())
      return;

    this.api.put(this.endpoint, this.id, { id: this.id, email: this.email, id_contato: this.id_contato }).subscribe(x => {
      Swal.fire('Sucesso!', 'Atualizado com sucesso!', 'success');
      this.Lista();
      this.CloseAdd();
    },
      error => {
        Swal.fire('Falha!', 'algo deu errado, tenta novamente mais tarde!', 'error');
        console.error(error);
      });
  }

  Delete() {
    this.api.delete(this.endpoint, this.id).subscribe(x => {
      Swal.fire('Sucesso!', 'Deletado com sucesso!', 'success');
      this.Lista();
      this.CloseAdd();
    },
      error => {
        Swal.fire('Falha!', 'algo deu errado, tenta novamente mais tarde!', 'error');
        console.error(error);
      });
  }

  ChecaCampos() {
    if (!this.email || this.email == "" || 
    !String(this.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ||
    !this.id_contato || this.id_contato == 0) {
      Swal.fire('Atenção!', 'Existem campos obrigatórios não preenchidos!', 'warning');
      return false;
    }
    return true;
  }
}