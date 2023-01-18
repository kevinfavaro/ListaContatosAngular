import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from '../shared/api/api.service';

@Component({
  selector: 'app-telefones',
  templateUrl: './telefones.component.html',
  styleUrls: ['./telefones.component.scss']
})

export class TelefonesComponent {
  @ViewChild('firstInput')
  firstInput!: ElementRef;

  @Input() input_id_contato: number = 0;

  endpoint: string = "Telefones";

  data = [];
  showAdd: boolean = false;
  api: ApiService;

  id: number = 0;
  id_contato: number = 0;
  pais: string = "";
  ddd: string = "";
  numero: string = "";
  whatsapp: boolean = false;
  obs: string = "";

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
    this.pais = obj.pais;
    this.ddd = obj.DDD;
    this.numero = obj.numero;
    this.whatsapp = obj.whatsapp;
    this.obs = obj.observacao;
    this.id_contato = obj.id_contato;
  }

  Lista() {
    this.api.get(this.endpoint + (this.input_id_contato != 0 ? '?id_contato=' + this.input_id_contato : '')).subscribe(data => {
      this.data = data;
    });
  }

  ShowAdd() {
    this.pais = '';
    this.ddd = '';
    this.numero = '';
    this.whatsapp = false;
    this.obs = '';
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

    this.api.post(this.endpoint, {
      pais: this.pais,
      ddd: this.ddd,
      numero: this.numero,
      whatsapp: this.whatsapp,
      observacao: this.obs,
      id_contato: this.id_contato
    }).subscribe(x => {
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

    this.api.put(this.endpoint, this.id, {
      id: this.id,
      pais: this.pais,
      ddd: this.ddd,
      numero: this.numero,
      whatsapp: this.whatsapp,
      observacao: this.obs,
      id_contato: this.id_contato
    }).subscribe(x => {
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
    if (!this.pais || this.pais == "" || this.pais.length != 2 ||
      !this.ddd || this.ddd == "" || this.ddd.length != 2 || Number(this.ddd[0]) == 0 ||
      !this.numero || this.numero == "" || this.numero.length < 8 || this.numero.length > 9 || this.numero[0] == '0' ||
      !this.id_contato || this.id_contato == 0) {
      Swal.fire('Atenção!', 'Existem campos obrigatórios não preenchidos ou com valores inválidos!', 'warning');
      return false;
    }
    return true;
  }
}