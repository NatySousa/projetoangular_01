import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //atributo
  autenticado = false; //booleano

  //mensagens
  mensagemCadastro = "";
  mensagemLogin = "";

  //dados do usuario
  nome = "";
  email = "";

  //construtor
  constructor(private httpClient: HttpClient) {

  }

  //função executada quando o componente é carregado.
  ngOnInit() {
    //verificando se há um TOKEN gravado em sessão
    //se sim -> o usuario estara autenticado
    this.autenticado = localStorage.getItem('access_token') != null;
    
    if(this.autenticado){ //se o usuario estiver autenticado..
      this.nome = localStorage.getItem('nome_usuario') as string;
      this.email = localStorage.getItem('email_usuario') as string;
    }
  }

  cadastrarUsuario(formCadastro: any): void {
    
    this.mensagemCadastro = "";
    
    this.httpClient.post(environment.apiUrl + "/Account", formCadastro.form.value, 
      { responseType : 'text' })
      .subscribe(
        (data) => {
          this.mensagemCadastro = data; //mensagem de sucesso!
          formCadastro.form.reset(); //limpar os campos do formulário
        },
        (e) => {
          this.mensagemCadastro = e.error; //mensagem de erro!
        }
      )
  }

  autenticarUsuario(formLogin : any) : void {

    this.mensagemLogin = "";

    this.httpClient.post(environment.apiUrl + "/Auth", formLogin.form.value)
      .subscribe(
        (data:any) => {
          //gravar os dados do usuario autenticado em uma sessão:
          localStorage.setItem('access_token', data.accessToken);
          localStorage.setItem('nome_usuario', data.usuario.nome);
          localStorage.setItem('email_usuario', data.usuario.email);

          //recarregar a página..
          this.ngOnInit();
        },
        (e) => {
          this.mensagemLogin = e.error;
        }
      );
  }

  logout() : void {
    if(window.confirm('Deseja realmente encerrar sua sessão?')){
      //apagar todos os dados gravados em sessão
      localStorage.removeItem('access_token');
      localStorage.removeItem('nome_usuario');
      localStorage.removeItem('email_usuario');

      //recarregar a página
      this.ngOnInit();
    }
  }

}



