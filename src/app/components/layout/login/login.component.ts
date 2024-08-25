import { Component, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { Login } from '../../../auth/login';
import { Router } from '@angular/router';
import { LoginService } from '../../../auth/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login: Login = new Login();

  router = inject(Router);
  loginService = inject(LoginService);

  logar(){

    this.loginService.logar(this.login).subscribe({
      next: token => {
        if(token){//o usuario estão corretos
          this.loginService.addToken(token);
          this.router.navigate(['/admin']);
        }else{
          Swal.fire({
            title: 'Erro!',
            text: 'Usuário ou senha incorretos',
            icon: 'error',
            confirmButtonText: 'Ok'
          });          
        }
      },
      error: erro => {
        Swal.fire({
          title: 'Erro!',
          text: 'Ocorreu um erro! O erro é: ' + (erro.response?.data?.message || erro.message || 'Erro desconhecido'),
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
      
    });

  }

  

}
