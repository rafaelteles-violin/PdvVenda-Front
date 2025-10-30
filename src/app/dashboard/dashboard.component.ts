import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  nome: any;

  constructor(private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.storage.getItem().userToken.perfil == 'Caixa') {
      this.router.navigate(['/']);
    }

    this.nome = this.storage.getItem().userToken.nome;
  }
}
