import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from '../shared/api/api.service';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss']
})

export class ContatosComponent {
  @ViewChild('firstInput')
  firstInput!: ElementRef;

  @Input() input_id_pessoa: number = 0;

  endpoint: string = "Contatos";

  data = [];
  showAdd: boolean = false;
  api: ApiService;

  nome: string = "";
  id: number = 0;
  id_pessoa: number = 0;

  lista_pessoas = [];

  constructor(api: ApiService) {
    this.api = api;
    this.id_pessoa = this.input_id_pessoa;
    setTimeout(() => {
      this.Lista();
      this.populaDDL();
    }, 0);
  }

  populaDDL() {
    if (this.input_id_pessoa == 0)
      this.api.get('Pessoas').subscribe(data => {
        this.lista_pessoas = data;
      });
  }

  rowClick(obj: any) {
    this.ShowAdd();
    this.id = obj.id;
    this.nome = obj.nome;
    this.id_pessoa = obj.id_pessoa;
  }

  Lista() {
    this.api.get(this.endpoint + (this.input_id_pessoa != 0 ? '?id_pessoa=' + this.input_id_pessoa : '')).subscribe(data => {
      this.data = data;
    });
  }

  ShowAdd() {
    this.nome = "";
    this.id_pessoa = this.input_id_pessoa ?? 0;
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

    this.api.post(this.endpoint, { nome: this.nome, id_pessoa: this.id_pessoa }).subscribe(x => {
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

    this.api.put(this.endpoint, this.id, { id: this.id, nome: this.nome, id_pessoa: this.id_pessoa }).subscribe(x => {
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
    if (!this.nome || this.nome == "" || !this.id_pessoa || this.id_pessoa == 0) {
      Swal.fire('Atenção!', 'Existem campos obrigatórios não preenchidos!', 'warning');
      return false;
    }
    return true;
  }
}