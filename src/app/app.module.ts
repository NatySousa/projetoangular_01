import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

//importando o modulo para acesso a serviços de API..
import { HttpClientModule } from '@angular/common/http';

//importando os modulos para desenvolvimento de formulários..
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CadastroEmpresasComponent } from './cadastro-empresas/cadastro-empresas.component';
import { ConsultaEmpresasComponent } from './consulta-empresas/consulta-empresas.component';
import { CadastroFuncionariosComponent } from './cadastro-funcionarios/cadastro-funcionarios.component';
import { ConsultaFuncionariosComponent } from './consulta-funcionarios/consulta-funcionarios.component';

//mapeamento de navegação do projeto (rotas)
import { Routes, RouterModule } from '@angular/router';

//configuração da biblioteca de paginação
import { NgxPaginationModule } from 'ngx-pagination';

//importando o interceptor
import { TokenInterceptor } from './token-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

//mapear as URLs (Rotas) para cada componente
const routes: Routes = [
  { path: 'cadastro-empresas', component: CadastroEmpresasComponent },
  { path: 'consulta-empresas', component: ConsultaEmpresasComponent },
  { path: 'cadastro-funcionarios', component: CadastroFuncionariosComponent },
  { path: 'consulta-funcionarios', component: ConsultaFuncionariosComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CadastroEmpresasComponent,
    ConsultaEmpresasComponent,
    CadastroFuncionariosComponent,
    ConsultaFuncionariosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, //ativando a biblioteca
    FormsModule, //ativando a biblioteca
    ReactiveFormsModule, //ativando a biblioteca
    NgxPaginationModule, //ativando o componente de paginação
    RouterModule.forRoot(routes) //ativando as rotas
  ],
  providers: [{
    //configurando o interceptor
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }



