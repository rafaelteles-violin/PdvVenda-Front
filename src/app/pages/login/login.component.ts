import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/AuthService';
import { StorageService } from 'src/app/service/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login: any;
  senha: any;
  autenticando: boolean = false;
  mostrarSenha = false;
  exibirModalEsqueciSenha: boolean = false;


  constructor(private authService: AuthService,
    private router: Router,
    public storage: StorageService
  ) { }

  ngOnInit() {
    this.storage.clear();
  }

  autenticar() {
    this.autenticando = true;

    var objLogin = {
      nome: this.login,
      senha: this.senha,
    };

    this.authService.Autenticar(objLogin).subscribe(
      (res: any) => {
        this.autenticando = false;
        this.storage.clear();

        this.storage.setItem(res);

        this.router.navigate(['/home']);
      },
      (error) => {
        this.autenticando = false;
        this.msgAlert('Login ou senha inválida');
      }
    );
  }

  msgAlert(msg: string) {
    Swal.fire(msg, '', 'info');
  }

}
