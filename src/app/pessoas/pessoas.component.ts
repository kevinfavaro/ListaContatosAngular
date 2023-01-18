import { Component, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from '../shared/api/api.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.scss']
})

export class PessoasComponent {
  @ViewChild('firstInput')
  firstInput!: ElementRef;

  endpoint: string = "Pessoas";

  data = [];
  showAdd: boolean = false;
  api: ApiService;

  nome: string = "";
  id: number = 0;

  constructor(api: ApiService) {
    this.api = api;
    this.Lista();
  }

  rowClick(obj: any) {
    this.CloseAdd();
    setTimeout(() => {
      this.ShowAdd();
      this.id = obj.id;
      this.nome = obj.nome;
    }, 0);
  }

  Lista() {
    this.api.get(this.endpoint).subscribe(data => {
      this.data = data;
    });
  }

  ShowAdd() {
    this.nome = "";
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

    this.api.post(this.endpoint, { nome: this.nome }).subscribe(x => {
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

    this.api.put(this.endpoint, this.id, { id: this.id, nome: this.nome }).subscribe(x => {
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
    if (!this.nome || this.nome == "") {
      Swal.fire('Atenção!', 'Existem campos obrigatórios não preenchidos!', 'warning');
      return false;
    }
    return true;
  }
}