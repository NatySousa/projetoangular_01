
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-consulta-empresas',
  templateUrl: './consulta-empresas.component.html',
  styleUrls: ['./consulta-empresas.component.css']
})
export class ConsultaEmpresasComponent implements OnInit {

  //atributos (dados)
  mensagemExclusao = "";
  mensagemEdicao = "";

  //atributo para capturar a consulta de empresas (todas as empresas)
  empresas = [ {
    idEmpresa : '', nomeFantasia : '', razaoSocial : '', cnpj : ''
  } ]; //array..

  //atributo para capturar a consulta que retorna 1 empresa pelo id
  empresa = {
    idEmpresa : '', nomeFantasia : '', razaoSocial : '', cnpj : ''
  }
   
  //atributo para armazenar a paginação
  page = 1;

  //função para realizar a paginação
  handlePageChange(event : number) {
    this.page = event;
  }

  constructor(private httpClient:HttpClient) {
    //inicializando o objeto HttpClient
  }

  //função executada quando o componente é carregado..
  ngOnInit(): void {
    //executando a consulta de empresas na API..
    this.httpClient.get(environment.apiUrl + "/Empresas")
      .subscribe( //obtendo o retorno da API..
        data => { //sucesso!
          this.empresas = data as any[];
        },
        e => { //erro!
          console.log(e);
        }
      )
  }

  //função para excluir a empresa
  excluirEmpresa(idEmpresa:any) : void {
    if(confirm('Deseja realmente excluir a empresa selecionada?')){
      //executando a exclusão na API..
      this.httpClient.delete(environment.apiUrl + "/Empresas/" + idEmpresa, 
        { responseType : 'text' })
        .subscribe(
          data => {
            this.mensagemExclusao = data; //exibir a mensagem
            this.ngOnInit(); //executar a consulta novamente..
          },  
          e => {
            //verificar o código do erro
            switch(e.status){

              case 422:
                this.mensagemExclusao = e.error;
                break;
            }
            console.log(e);
          }
        )
    }
  }

  //função para exibir os dados da empresa..
  obterEmpresa(idEmpresa : any) : void {
    //realizar uma chamada para a API -> consultar empresa por id..
    this.httpClient.get(environment.apiUrl + "/Empresas/" + idEmpresa)
      .subscribe(
        (data) => { //resposta de sucesso da API..
          //armazenar os dados da empresa obtida
          this.empresa = (data as any);
        },
        (e) => { //resposta de erro da API..
          console.log(e);
        }
      )
  }

  //função para atualizar os dados da empresa..
  atualizarEmpresa(formEdicao : any) : void {
    this.httpClient.put(environment.apiUrl + "/Empresas", formEdicao.form.value, 
      { responseType : 'text' })
      .subscribe(
        (data) => {
          this.mensagemEdicao = data; //exibe mensagem de sucesso..
          this.ngOnInit(); //executando a consulta de empresas
        },
        (e) => {
          console.log(e);
        }
      )
  }

}
