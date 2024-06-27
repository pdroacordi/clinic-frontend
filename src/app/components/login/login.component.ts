import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../model/User';
import { Token } from '../../model/Token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public user: User = new User();
  public loading: boolean = false;
  public mensagem: string = "";

  constructor(private route: Router, private service: LoginService) { }

  public login() {
    this.loading = true;
    this.service.submitLogin(this.user).subscribe({
      next: (res: Token) => {
        this.loading = false;
        this.service.login(res.token);
        this.route.navigate(['']);
      },
      error: (err: any) => {
        this.loading = false;
        this.mensagem = "Usuário/Senha inválido"
      }
    });
  }

}
