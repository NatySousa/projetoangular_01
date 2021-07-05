
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-cadastro-funcionarios',
  templateUrl: './cadastro-funcionarios.component.html',
  styleUrls: ['./cadastro-funcionarios.component.css']
})
export class CadastroFuncionariosComponent implements OnInit {

  //atributos..
  empresas = [{
    idEmpresa : '', nomeFantasia : '', razaoSocial : '', cnpj : ''
  }];

  validacoes = {
    Nome : '', Cpf : '', Matricula : '', DataAdmissao : '', IdEmpresa : ''
  }

  mensagem = "";

  constructor(private httpClient:HttpClient) { }

  //função executada quando o componente é carregado..
  ngOnInit(): void {
    //consultar as empresas na API..
    this.httpClient.get(environment.apiUrl + "/Empresas")
      .subscribe(
        (data) => { //resposta de sucesso!
          this.empresas = (data as any[]);
        },
        (e) => { //resposta de erro!
          console.log(e);
        }
      )
  }

  //função para realizar o cadastro do funcionário
  cadastrarFuncionario(formCadastro:any) : void {

    //limpar as mensagens..
    this.mensagem = "";
    this.validacoes = {
      Nome : '', Cpf : '', Matricula : '', DataAdmissao : '', IdEmpresa : ''
    };

    //realizar uma chamada para a API para cadastrar um funcionário
    this.httpClient.post(environment.apiUrl + "/Funcionarios", 
        formCadastro.form.value, { responseType : 'text' })
      .subscribe(
        (data) => {
          this.mensagem = data; //exibir mensagem de sucesso.
          formCadastro.form.reset(); //limpar os campos do formulário
        },
        (e) => {
         
            //verificar o tipo do erro
            switch(e.status){
              case 400: //Erro de validação
                this.validacoes = JSON.parse(e.error).errors;
                break;

              case 422: //cpf já cadastrado
                this.mensagem = e.error;
                break;

              default:
                break;
            }

        }
      )
  }

}
