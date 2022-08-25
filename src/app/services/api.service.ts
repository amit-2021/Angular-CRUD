import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = "http://localhost:3000/ProductList/";

  constructor(private http: HttpClient) { }

  postProduct(data: any) {
    return this.http.post<any>("http://localhost:3000/ProductList/", data);
  }
  getProduct() {
    return this.http.get<any>(this.url);
  }
  putProdut(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/ProductList/"+id, data);
  }
  deleteProduct(id: number) {
    return this.http.delete<any>("http://localhost:3000/ProductList/"+id);
  }
}
