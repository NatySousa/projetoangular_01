import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-cadastro-empresas',
  templateUrl: './cadastro-empresas.component.html',
  styleUrls: ['./cadastro-empresas.component.css']
})
export class CadastroEmpresasComponent implements OnInit {

  //atributos (campo)
  mensagem = "";

  validacoes = { //capturar as mensagens de erro de validação
    NomeFantasia: [], RazaoSocial: [], Cnpj: []
  }

  ngOnInit(): void {
  }

  //construtor..
  constructor(private httpClient: HttpClient) {
    //inicializando o HttpClient
  }

  //função para processar o submit do formulário..
  cadastrarEmpresa(formCadastro: any): void {

    this.mensagem = ""; //limpando a mensagem..
    this.validacoes = { //limpando os erros de validação
      NomeFantasia: [], RazaoSocial: [], Cnpj: []
    }

    //fazendo uma chamada para o serviço de cadastro de empresa da API (POST)
    this.httpClient.post(environment.apiUrl + "/Empresas", formCadastro.form.value,
      { responseType: 'text' })
      .subscribe( //captura o callback da API (retorno da chamada ao serviço)
        (data) => { //retorno de sucesso da API

          this.mensagem = data;

          //limpar os campos do formulário..
          formCadastro.form.reset();
        },
        (e) => { //retorno de erro da API
          //verificar o tipo de erro..
          switch (e.status) {

            case 400: //erro de validação
              this.validacoes = JSON.parse(e.error).errors;
              break;

            case 422:
              this.mensagem = e.error;
              break;

            default:
              console.log(e);
          }
        }
      )
  }

}