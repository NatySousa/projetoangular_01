import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consulta-funcionarios',
  templateUrl: './consulta-funcionarios.component.html',
  styleUrls: ['./consulta-funcionarios.component.css']
})
export class ConsultaFuncionariosComponent implements OnInit {

  //atributos..
  funcionarios = [{
    idFuncionario: '', nome: '', cpf: '', matricula: '', dataAdmissao: '',
    idEmpresa: '', nomeFantasia: '', razaoSocial: '', cnpj: ''
  }]

  funcionario = {
    idFuncionario: '', nome: '', cpf: '', matricula: '', dataAdmissao: '', idEmpresa: ''
  }

  empresas = [{
    idEmpresa: '', razaoSocial: '', nomeFantasia: '', cnpj: ''
  }]

  //mensagens..
  mensagemExclusao = "";
  mensagemEdicao = "";

  //atributo para armazenar a paginação..
  page = 1;

  //função para realizar a paginação..
  handlePageChange(event: number) {
    this.page = event;
  }

  constructor(private httpClient: HttpClient) { }

  //função executada quando o componente é carregado..
  ngOnInit(): void {

    this.httpClient.get(environment.apiUrl + "/Funcionarios")
      .subscribe(
        (data) => {
          this.funcionarios = (data as any[]);
        },
        (e) => {
          console.log(e);
        }
      )
  }

  //função para realizar a pesquisa de funcionários
  pesquisarFuncionarios(formConsulta: any): void {

    var dataMin = formConsulta.form.value.dataAdmissaoMin;
    var dataMax = formConsulta.form.value.dataAdmissaoMax;

    this.httpClient.get(environment.apiUrl + "/Funcionarios/" + dataMin + "/" + dataMax)
      .subscribe(
        (data) => {
          this.funcionarios = (data as any[]);
        },
        (e) => {
          console.log(e);
        }
      )
  }

  //função para excluir o funcionario
  excluirFuncionario(idFuncionario: any): void {
    //verificar se o usuario deseja excluir o funcionario
    if (window.confirm('Deseja realmente excluir o funcionário?')) {
      //acessando o serviço de exclusão na API..
      this.httpClient.delete(environment.apiUrl + "/Funcionarios/" + idFuncionario,
        { responseType: 'text' })
        .subscribe(
          (data) => {
            this.mensagemExclusao = data;
            this.ngOnInit(); //recarregar a consulta de funcionarios
          },
          (e) => {
            console.log(e);
          }
        )
    }
  }

  obterFuncionario(idFuncionario: any): void {

    this.mensagemEdicao = "";

    //realizar uma chamada na API para consultar o funcionario
    this.httpClient.get(environment.apiUrl + "/Funcionarios/" + idFuncionario)
      .subscribe(
        (data) => {
          this.funcionario = (data as any);
        },
        (e) => {
          console.log(e);
        }
      )

    //realizar uma chamada na API para consultar empresas
    this.httpClient.get(environment.apiUrl + "/Empresas")
      .subscribe(
        (data) => {
          this.empresas = (data as any[]);
        },
        (e) => {
          console.log(e);
        }
      )
  }

  atualizarFuncionario(formEdicao: any): void {

    this.httpClient.put(environment.apiUrl + "/Funcionarios", 
      formEdicao.form.value, { responseType : 'text' })
      .subscribe(
        (data) => { //retorno de sucesso da API
          this.mensagemEdicao = data;

          //recarregar a consulta de funcionarios
          this.ngOnInit();
        },
        (e) => { //retorno de erro da API
          console.log(e);
        }
      );
  }

}




