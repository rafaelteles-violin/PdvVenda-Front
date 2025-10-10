import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})

export class LojaContextService {

  constructor(private storage: StorageService) {}

  get lojaId(): any {
    return this.storage.getItem()?.userToken?.lojaId;
  }
}