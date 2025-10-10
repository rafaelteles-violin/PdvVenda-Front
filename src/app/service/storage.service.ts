import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private secretKey = '4a37d5cb-b45f-4323-8497-bce2fa5fd2ba';
  public storage: any = window.localStorage;

  public setItem(item: any) {
    const value = this.encryptJson(item);
    this.storage.setItem(this.secretKey, value);
  }

  public getItem(): any {
    const valueToken = this.storage.getItem(this.secretKey);
    if (valueToken == null) return null;

    const value = this.decryptJson(valueToken)
    return value ? value : null;
  }

  // public getToken() {
  //   const valueToken = this.storage.getItem(this.secretKey);
  //   if (valueToken == null) return null;
  //   const token = this.decryptJson(valueToken)

  //   return new HttpHeaders({
  //     Authorization: `Bearer ${token.accessToken}`,
  //   });
  // }

  public getToken(): string | null {
    const valueToken = this.storage.getItem(this.secretKey);
    if (valueToken == null) return null;

    const token = this.decryptJson(valueToken);
    return token.accessToken;
  }


  //Local Storage para armazenar Response

  public setLocalStorageItem(key: string, item: any) {
    const value = this.encryptJson(item);
    this.storage.setItem(key, value);
  }

  public getLocalStorageItem(key: string): any {
    const valueToken = this.storage.getItem(key);
    if (valueToken == null) return null;

    const value = this.decryptJson(valueToken)
    return value ? value : null;
  }

  public removeLocalStorageIgem(key: string) {
    this.storage.removeItem(key);
  }

  //--------------------------------------------

  public clear() {
    localStorage.clear();
    sessionStorage.clear();
  }

  encryptJson(data: any): string {
    const jsonString = JSON.stringify(data);

    return CryptoJS.AES.encrypt(jsonString, this.secretKey).toString();
  }

  decryptJson(encryptedData: string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);

    const jsonString = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(jsonString);
  }
}
